/**
 * The watching command module.
 *
 * This command run server, watching the source files for changes,
 * and update bundles without reload server and browser page.
 */
import webpack from 'webpack';
import mount from 'koa-mount';
import serve from 'koa-static';
import {devMiddleware, hotMiddleware} from 'koa-webpack-middleware';

import {
  ASSETS_PATH,
  SERVER_PATH,
  BUILD_SERVER_DIR,
  BUILD_PUBLIC_DIR,
  PUBLIC_DIR,
} from '../config';
import {REGEX_JS} from './constants';
import {Compilers, runServer, print, clean} from './utils';
import webpackConfig from './webpack';

const hotPlugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.NamedModulesPlugin(),
];

/**
 * The object extending webpack config.
 *
 * The object contains functions which add watch and hot reload modes to default
 * webpack configuration.
 */
const extend = {
  server(config) {
    config.output.hotUpdateMainFilename = 'updates/[hash].hot-update.json';
    config.output.hotUpdateChunkFilename = 'updates/[id].[hash].hot-update.js';
    config.plugins.push(...hotPlugins);
    return config;
  },

  client(config) {
    config.entry.client = [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
    ].concat(config.entry.client);
    config.plugins.push(...hotPlugins);
    const jsRule = config.module.rules.find((rule) => {
      return rule.test === REGEX_JS;
    });
    const babelLoader = jsRule.use.find((entry) => {
      return entry.loader === 'babel-loader';
    });
    babelLoader.options.plugins.push('react-hot-loader/babel');
    return config;
  },
};

/**
 * The application factory class.
 *
 * Each time when any webpack compilation (server or client) starts, the
 * factory create a promise, which will return the application instance, after
 * all compilations will be completed.
 */
class AppFactory {
  constructor() {
    this.ready = this.ready.bind(this);
    this.get = this.get.bind(this);
    this._ready = {};
    this._makePromise();
  }

  /**
   * Synchronize the application instance making with compilation events.
   */
  synchronize(compilers) {
    compilers.names().reduce((ready, name) => {
      ready[name] = false;
      return ready;
    }, this._ready);
    compilers.get().forEach((compiler) => {
      compiler.plugin('compile', () => this.ready(compiler.name, false));
      compiler.plugin('done', (stats) => {
        if (stats.hasErrors()) {
          this._reject(new Error('Server bundle compilation failed.'));
          this._promise.done = true;
        } else {
          this.ready(compiler.name, true);
        }
      });
    });
  }

  /**
   * Make a promise of ready the application instance.
   *
   * Makes only if previous promise was resolved/rejected.
   */
  _makePromise() {
    if (!this._promise || this._promise.done) {
      this._promise = new Promise((resolve, reject) => {
        this._reject = reject;
        this._resolve = resolve;
      });
      // Fix throwing unhandled promise error, while promise is pending.
      this._promise.catch(() => {});
      this._promise.done = false;
    }
  }

  /**
   * Get a promise of ready the application instance.
   */
  get() {
    return this._promise;
  }

  /**
   * The trigger resolving a promise.
   *
   * Promise resolves only if all compilations were completed.
   */
  ready(name, value) {
    this._ready[name] = value;
    if (!value) {
      this._makePromise();
    } else if (Object.values(this._ready).every(val => val)) {
      [SERVER_PATH, ASSETS_PATH].forEach(path => delete require.cache[path]);
      this._resolve(require(SERVER_PATH).default(require(ASSETS_PATH)));
      this._promise.done = true;
      print('success', 'Application has been built and ready for usage.');
    }
  }
}

/**
 * The module entrypoint.
 *
 * Run server in which injected new application instance, each time when
 * recompile any bundle. It lets keep server running and update the application.
 */
async function watch() {
  await clean([BUILD_SERVER_DIR, BUILD_PUBLIC_DIR]);
  const compilers = new Compilers(webpackConfig, extend);
  const factory = new AppFactory();
  factory.synchronize(compilers);
  compilers.get('server').watch({}, () => {});
  runServer(factory.get, [
    mount('/', serve(PUBLIC_DIR)),
    devMiddleware(compilers.get('client'), {
      noInfo: true,
      stats: false,
      publicPath: compilers.get('client').options.output.publicPath,
    }),
    hotMiddleware(compilers.get('client'), {log: false}),
  ]);
}

export default watch;
