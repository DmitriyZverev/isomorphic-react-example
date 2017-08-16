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
  new webpack.DefinePlugin({
    'process.env': {NODE_ENV: JSON.stringify(NODE_ENV)},
  }),
  new AssetsPlugin({
    path: path.parse(ASSETS_PATH).dir,
    filename: path.parse(ASSETS_PATH).base,
    prettyPrint: true,
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: module => /node_modules/.test(module.resource),
  }),
];

if (PROD) {
  plugins.push(
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
      {
        test: REGEX_JS,
        exclude: /node_modules/,
        use: [
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
      {
        test: REGEX_STYLES,
        use: [
          {
            loader: 'style-loader',
          },
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
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: DEV,
              plugins: () => [
                autoprefixer,
              ],
            },
          },
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
      {
        test: REGEX_FILE,
        use: [
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
