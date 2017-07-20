import webpack from 'webpack';
import {devMiddleware, hotMiddleware} from 'koa-webpack-middleware';

import {ASSETS_PATH, SERVER_PATH} from '../config';
import {Compilers, runServer, print} from './utils';
import webpackConfig from './webpack';

const hotPlugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.NamedModulesPlugin(),
];

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
      return rule.test.toString() === '/\\.js$/';
    });
    const babelLoader = jsRule.use.find((entry) => {
      return entry.loader === 'babel-loader';
    });
    babelLoader.options.plugins.push('react-hot-loader/babel');
    return config;
  },
};

class AppFactory {
  constructor() {
    this.ready = this.ready.bind(this);
    this.get = this.get.bind(this);
    this._ready = {};
    this._makePromise();
  }

  synchronize(compilers) {
    compilers.names().reduce((ready, name) => {
      ready[name] = false;
      return ready;
    }, this._ready);
    compilers.get().forEach((compiler) => {
      compiler.plugin('compile', () => this.ready(compiler.name, false));
      compiler.plugin('done', (stats) => {
        if (stats.hasErrors()) {
          this._reject(new Error('Server compilation failed!'));
          this._promise.done = true;
        } else {
          this.ready(compiler.name, true);
        }
      });
    });
  }

  _makePromise() {
    if (!this._promise || this._promise.done) {
      this._promise = new Promise((resolve, reject) => {
        this._reject = reject;
        this._resolve = resolve;
      });
      this._promise.catch(() => {});
      this._promise.done = false;
    }
  }

  get() {
    return this._promise;
  }

  ready(name, value) {
    this._ready[name] = value;
    if (!value) {
      this._makePromise();
    } else if (Object.values(this._ready).every(val => val)) {
      [SERVER_PATH, ASSETS_PATH].forEach(path => delete require.cache[path]);
      this._resolve(require(SERVER_PATH).default(require(ASSETS_PATH)));
      this._promise.done = true;
      print('success', 'Application is ready.');
    }
  }
}

async function watch() {
  const compilers = new Compilers(webpackConfig, extend);
  const factory = new AppFactory();
  factory.synchronize(compilers);
  compilers.get('server').watch({}, () => {});
  runServer(factory.get, [
    devMiddleware(compilers.get('client'), {
      noInfo: true,
      stats: false,
      publicPath: compilers.get('client').options.output.publicPath,
    }),
    hotMiddleware(compilers.get('client'), {log: false}),
  ]);
}

export default watch;
