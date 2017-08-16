/**
 * Server webpack configuration.
 */
import path from 'path';
import stylus from 'stylus';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';

import * as pkg from '../../package.json';
import {
  ROOT_DIR,
  SERVER_PATH,
  STYLUS_CONFIG_PATH,
  PUBLIC_URL,
  CSS_NAME_PATTERN,
  FILE_NAME_PATTERN,
  NODE_ENV,
  DEV,
} from '../../config';
import {REGEX_FILE, REGEX_JS} from '../constants';

/**
 * The configuration object.
 */
export default {
  name: 'server',
  target: 'node',
  devtool: 'inline-source-map',
  entry: {
    server: path.join(ROOT_DIR, 'server', 'server.js'),
  },
  output: {
    path: path.parse(SERVER_PATH).dir,
    filename: path.parse(SERVER_PATH).base,
    libraryTarget: 'commonjs2',
  },
  resolve: {
    modules: [
      'common',
      'node_modules',
    ],
  },
  externals: [
    nodeExternals({
      whitelist: [
        // ...
      ],
    }),
  ],
  stats: 'errors-only',
  module: {
    rules: [
      /**
       * Js files rule.
       */
      {
        test: REGEX_JS,
        exclude: /node_modules/,
        use: [
          /**
           * Babel loader.
           *
           * This loader allows transpiling JavaScript files using Babel.
           *
           * @see https://webpack.js.org/loaders/babel-loader/
           */
          {
            loader: 'babel-loader',
            options: {
              ...pkg.babel,
              plugins: [
                ...pkg.babel.plugins || [],
                /**
                 * Plugin finds all requires for css module files and replace
                 * them with a hash where keys are class names and values are
                 * generated css class names.
                 *
                 * @see https://github.com/michalkvasnicak/babel-plugin-css-modules-transform
                 */
                [
                  'css-modules-transform',
                  {
                    devMode: DEV,
                    generateScopedName: CSS_NAME_PATTERN,
                    preprocessCss(css, file) {
                      const stylusCss = stylus(css);
                      stylusCss.import(STYLUS_CONFIG_PATH);
                      return stylusCss.set('filename', file).render();
                    },
                    extensions: [
                      '.css',
                      '.styl',
                    ],
                  },
                ],
              ],
            },
          },
        ],
      },
      /**
       * Other files rule (e.g. images, fonts).
       */
      {
        test: REGEX_FILE,
        use: [
          /**
           * File loader.
           *
           * Instructs webpack to emit the required object as file and to
           * return its public URL.
           *
           * @see https://webpack.js.org/loaders/file-loader/
           */
          {
            loader: 'file-loader',
            options: {
              emitFile: false, // client should emit files, not server.
              name: FILE_NAME_PATTERN,
              publicPath: PUBLIC_URL,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify(NODE_ENV)},
    }),
  ],
};
