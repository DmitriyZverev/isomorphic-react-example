/**
 * The start server module.
 */
import fs from 'fs-extra';
import mount from 'koa-mount';
import serve from 'koa-static';

import {
  PUBLIC_URL,
  PUBLIC_DIR,
  BUILD_PUBLIC_DIR,
  SERVER_PATH,
  ASSETS_PATH,
} from '../config';
import {runServer, print} from './utils';
import build from './build';

/**
 * The module entry point.
 *
 * - Run server.
 * - Build server bundle before run (optional).
 * - Mode of serve static files (optional).
 */
export default async function ({runBuild, serveStatic}) {
  const middlewares = [];
  if (serveStatic) {
    middlewares.push(
      mount('/', serve(PUBLIC_DIR)),
      mount(PUBLIC_URL, serve(BUILD_PUBLIC_DIR))
    );
  }
  if (runBuild) {
    await build();
  }
  try {
    await Promise.all([
      fs.access(SERVER_PATH),
      fs.access(ASSETS_PATH),
    ]);
    const app = require(SERVER_PATH).default(require(ASSETS_PATH));
    runServer(app, middlewares);
  } catch (err) {
    print('error', [
      '\nCan\'t run server! Server build is not ready:\n',
      err.stack,
      '\nYou should run this command with flag "--build", '
      + 'or before run "yarn build".',
    ]);
  }
}
