import mount from 'koa-mount';
import serve from 'koa-static';

import {PUBLIC_URL, PUBLIC_DIR} from '../config';
import {runServer} from './utils';
import build from './build';

function run(middlewares) {
  const assets = require('../build/assets.json');
  const app = require('../build/server.js').default(assets);
  runServer(() => Promise.resolve(app), middlewares);
}

export default function ({runBuild, serveStatic}) {
  const middlewares = [];
  if (serveStatic) {
    middlewares.push(mount(PUBLIC_URL, serve(PUBLIC_DIR)));
  }
  if (runBuild) {
    build(() => run(middlewares));
  } else {
    run(middlewares);
  }
}
