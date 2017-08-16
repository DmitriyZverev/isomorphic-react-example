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
      {
        test: REGEX_JS,
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
      {
        test: REGEX_FILE,
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
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify(NODE_ENV)},
    }),
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false,
    }),
  ],
};
