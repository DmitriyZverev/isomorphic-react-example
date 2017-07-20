import {Compilers, print} from './utils';
import webpackConfig from './webpack';

function build(cb) {
  const compilers = new Compilers(webpackConfig);
  compilers.get('client').run(() => compilers.get('server').run(() => {
    print('success', 'Application is built.');
    if (cb) {
      cb();
    }
  }));
}

export default build;
