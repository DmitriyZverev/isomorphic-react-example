import ExtractTextPlugin from 'extract-text-webpack-plugin';

import {DEV, BUILD_SERVER_DIR, BUILD_PUBLIC_DIR} from '../config';
import {Compilers, print, clean} from './utils';
import webpackConfig from './webpack';
import {REGEX_STYLES} from './constants';

const expand = {
  client(config) {
    const stylesRule = config.module.rules.find((rule) => {
      return rule.test === REGEX_STYLES;
    });
    stylesRule.use = ExtractTextPlugin.extract({use: stylesRule.use.slice(1)});
    config.plugins.push(new ExtractTextPlugin(
      DEV ? '[name].[hash].css' : '[name].[chunkhash].css'
    ));
    return config;
  },
};

async function build() {
  await clean([BUILD_SERVER_DIR, BUILD_PUBLIC_DIR]);
  const compilers = new Compilers(webpackConfig, expand);
  await new Promise((resolve) => {
    compilers.get('client').run(() => compilers.get('server').run(() => {
      print('success', 'Application has been built and ready for usage.');
      resolve();
    }));
  });
}

export default build;
