import ExtractTextPlugin from 'extract-text-webpack-plugin';

import {DEV, BUILD_SERVER_DIR} from '../config';
import {Compilers, print, clear} from './utils';
import webpackConfig from './webpack';

const expand = {
  client(config) {
    const stylesRule = config.module.rules.find((rule) => {
      return rule.test.toString() === '/\\.(css|styl)$/';
    });
    stylesRule.use = ExtractTextPlugin.extract({use: stylesRule.use.slice(1)});
    config.plugins.push(new ExtractTextPlugin(
      DEV ? '[name].[hash].css' : '[name].[chunkhash].css'
    ));
    return config;
  },
};

async function build() {
  await clear(BUILD_SERVER_DIR);
  const compilers = new Compilers(webpackConfig, expand);
  await new Promise((resolve) => {
    compilers.get('client').run(() => compilers.get('server').run(() => {
      print('success', 'Application is built.');
      resolve();
    }));
  });
}

export default build;
