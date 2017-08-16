/**
 * The build command module.
 *
 * This command build all needed bundles and assets.
 */
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import {BUILD_SERVER_DIR, BUILD_PUBLIC_DIR} from '../config';
import {Compilers, print, clean} from './utils';
import webpackConfig from './webpack';
import {REGEX_STYLES} from './constants';

/**
 * The object extending webpack config.
 *
 * The object contains function which add ExtractTextPlugin to client webpack
 * config. In "watch" configuration this plugin do not needed, but in "build"
 * configuration without it can't collect styles to files.
 */
const expand = {
  client(config) {
    const stylesRule = config.module.rules.find((rule) => {
      return rule.test === REGEX_STYLES;
    });
    stylesRule.use = ExtractTextPlugin.extract({use: stylesRule.use.slice(1)});
    config.plugins.push(new ExtractTextPlugin('[name].[contenthash].css'));
    return config;
  },
};

/**
 * The module entry point.
 *
 * Clean build directories, and run client build, then run server build.
 */
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
