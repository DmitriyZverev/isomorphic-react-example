import path from 'path';
import webpack from 'webpack';
import AssetsPlugin from 'assets-webpack-plugin';
import autoprefixer from 'autoprefixer';

import {
  ROOT_DIR,
  PUBLIC_URL,
  PUBLIC_DIR,
  ASSETS_PATH,
  STYLUS_CONFIG_PATH,
  CSS_NAME_PATTERN,
  FILE_NAME_PATTERN,
  NODE_ENV,
  DEV,
  PROD,
} from '../../config';

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {NODE_ENV: JSON.stringify(NODE_ENV)},
  }),
  new AssetsPlugin({
    path: path.parse(ASSETS_PATH).dir,
    filename: path.parse(ASSETS_PATH).base,
    prettyPrint: true,
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
    path: PUBLIC_DIR,
    publicPath: PUBLIC_URL,
    filename: '[name].[hash].js',
  },
  stats: 'errors-only',
  module: {
    rules: [
      {
        test: /\.js$/,
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
        test: /\.(css|styl)$/,
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
        test: /\.(png|jpg|jpeg|svg)$/,
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
