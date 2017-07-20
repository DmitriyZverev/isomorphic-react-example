import path from 'path';
import AssetsPlugin from 'assets-webpack-plugin';

import {
  ROOT_DIR,
  PUBLIC_URL,
  PUBLIC_DIR,
  ASSETS_PATH,
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
