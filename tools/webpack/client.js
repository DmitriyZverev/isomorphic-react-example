/**
 * Client webpack configuration.
 */
import path from 'path';
import webpack from 'webpack';
import AssetsPlugin from 'assets-webpack-plugin';
import autoprefixer from 'autoprefixer';

import {
  ROOT_DIR,
  PUBLIC_URL,
  BUILD_PUBLIC_DIR,
  ASSETS_PATH,
  STYLUS_CONFIG_PATH,
  CSS_NAME_PATTERN,
  FILE_NAME_PATTERN,
  NODE_ENV,
  DEV,
  PROD,
} from '../../config';
import {REGEX_FILE, REGEX_JS, REGEX_STYLES} from '../constants';

const plugins = [
  /**
   * Plugin defines global variables.
   *
   * @see https://webpack.js.org/plugins/define-plugin/
   */
  new webpack.DefinePlugin({
    'process.env': {NODE_ENV: JSON.stringify(NODE_ENV)},
  }),

  /**
   * Plugin that emits a json file with assets paths.
   *
   * @see https://github.com/kossnocorp/assets-webpack-plugin
   */
  new AssetsPlugin({
    path: path.parse(ASSETS_PATH).dir,
    filename: path.parse(ASSETS_PATH).base,
    prettyPrint: true,
  }),

  /**
   * Plugin collects all modules from 'node_modules' to single file.
   *
   * @see https://webpack.js.org/plugins/commons-chunk-plugin/
   */
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: module => /node_modules/.test(module.resource),
  }),
];

if (PROD) {
  plugins.push(
    /**
     * Plugin optimize and minimize output js-files.
     *
     * @see https://webpack.js.org/plugins/uglifyjs-webpack-plugin/
     */
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true, // eslint-disable-line camelcase
        unused: true,
        dead_code: true, // eslint-disable-line camelcase
      },
      mangle: {
        screw_ie8: true, // eslint-disable-line camelcase
      },
      output: {
        comments: false,
        screw_ie8: true, // eslint-disable-line camelcase
      },
    })
  );
}

/**
 * The configuration object.
 */
export default {
  name: 'client',
  target: 'web',
  devtool: DEV ? 'inline-source-map' : false,
  entry: {
    client: [
      'babel-polyfill',
      path.join(ROOT_DIR, 'client', 'client.js'),
    ],
  },
  output: {
    path: BUILD_PUBLIC_DIR,
    publicPath: PUBLIC_URL,
    filename: DEV ? '[name].[hash].js' : '[name].[chunkhash].js',
  },
  resolve: {
    modules: [
      'common',
      'node_modules',
    ],
  },
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
              presets: [
                'react',
                'es2015',
                'stage-0',
              ],
              plugins: [],
            },
          },
        ],
      },
      /**
       * Style files rule.
       */
      {
        test: REGEX_STYLES,
        use: [
          /**
           * Style loader.
           *
           * @see https://webpack.js.org/loaders/style-loader/
           */
          {
            loader: 'style-loader',
          },
          /**
           * CSS loader.
           *
           * The loader interprets @import and url() like import/require()
           * and will resolve them.
           *
           * @see https://webpack.js.org/loaders/css-loader/
           */
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: CSS_NAME_PATTERN,
              minimize: !DEV,
              importLoaders: 1,
              sourceMap: DEV,
            },
          },
          /**
           * PostCSS loader.
           *
           * The loader for transforming styles with JS plugins.
           *
           * @see https://webpack.js.org/loaders/postcss-loader/
           */
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: DEV,
              plugins: () => [
                autoprefixer,
              ],
            },
          },
          /**
           * Stylus loader.
           *
           * This loader compiles stylus to css.
           *
           * @see https://github.com/shama/stylus-loader
           */
          {
            loader: 'stylus-loader',
            options: {
              import: [
                STYLUS_CONFIG_PATH,
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
              name: FILE_NAME_PATTERN,
              publicPath: PUBLIC_URL,
            },
          },
        ],
      },
    ],
  },
  plugins,
};
