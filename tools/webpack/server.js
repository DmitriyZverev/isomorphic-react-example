import path from 'path';
import nodeExternals from 'webpack-node-externals';

import {
  ROOT_DIR,
  SERVER_PATH,
} from '../../config';

export default {
  name: 'server',
  target: 'node',
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
          },
        ],
      },
    ],
  },
  plugins: [],
};
