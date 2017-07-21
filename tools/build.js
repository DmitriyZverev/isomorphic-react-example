import ExtractTextPlugin from 'extract-text-webpack-plugin';

import {DEV} from '../config';
import {Compilers, print} from './utils';
import webpackConfig from './webpack';

const expand = {
  client(config) {
    const stylesRule = config.module.rules.find((rule) => {
      return rule.test.toString() === '/\\.css$/';
    });
    stylesRule.use = ExtractTextPlugin.extract({use: stylesRule.use.slice(1)});
    config.plugins.push(new ExtractTextPlugin(
      DEV ? '[name].[hash].css' : '[name].[chunkhash].css'
    ));
    return config;
  },
};

function build(cb) {
  const compilers = new Compilers(webpackConfig, expand);
  compilers.get('client').run(() => compilers.get('server').run(() => {
    print('success', 'Application is built.');
    if (cb) {
      cb();
    }
  }));
}

export default build;
