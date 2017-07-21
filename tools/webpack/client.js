import path from 'path';
import AssetsPlugin from 'assets-webpack-plugin';
import autoprefixer from 'autoprefixer';

import {
  ROOT_DIR,
  PUBLIC_URL,
  PUBLIC_DIR,
  ASSETS_PATH,
  CSS_NAME_PATTERN,
  FILE_NAME_PATTERN,
  DEV,
} from '../../config';

export default {
  name: 'client',
  target: 'web',
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
        test: /\.css$/,
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
  plugins: [
    new AssetsPlugin({
      path: path.parse(ASSETS_PATH).dir,
      filename: path.parse(ASSETS_PATH).base,
      prettyPrint: true,
    }),
  ],
};
