import path from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';

import * as pkg from '../../package.json';
import {
  ROOT_DIR,
  SERVER_PATH,
  PUBLIC_URL,
  CSS_NAME_PATTERN,
  FILE_NAME_PATTERN,
  DEV,
} from '../../config';

export default {
  name: 'server',
  target: 'node',
  devtool: 'source-map',
  entry: {
    server: path.join(ROOT_DIR, 'server', 'server.js'),
  },
  output: {
    path: path.parse(SERVER_PATH).dir,
    filename: path.parse(SERVER_PATH).base,
    libraryTarget: 'commonjs2',
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
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              ...pkg.babel,
              plugins: [
                ...pkg.babel.plugins || [],
                [
                  'css-modules-transform',
                  {
                    devMode: DEV,
                    generateScopedName: CSS_NAME_PATTERN,
                    extensions: [
                      '.css',
                    ],
                  },
                ],
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
              emitFile: false,
              name: FILE_NAME_PATTERN,
              publicPath: PUBLIC_URL,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false,
    }),
  ],
};
