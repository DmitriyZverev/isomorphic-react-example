import fs from 'fs-extra';
import mount from 'koa-mount';
import serve from 'koa-static';

import {
  PUBLIC_URL,
  PUBLIC_DIR,
  SERVER_PATH,
  ASSETS_PATH,
} from '../config';
import {runServer, print} from './utils';
import build from './build';

function run(middlewares) {
  runServer(
    () => Promise.resolve(require(SERVER_PATH).default(require(ASSETS_PATH))),
    middlewares
  );
}

export default async function ({runBuild, serveStatic}) {
  const middlewares = [];
  if (serveStatic) {
    middlewares.push(mount(PUBLIC_URL, serve(PUBLIC_DIR)));
  }
  if (runBuild) {
    await build();
  }
  try {
    await Promise.all([
      fs.access(SERVER_PATH),
      fs.access(ASSETS_PATH),
    ]);
    run(middlewares);
  } catch (err) {
    print('error', [
      '\nCan\'t run server! Server build is not ready:\n',
      err.stack,
      '\nYou should run this command with flag "--build", '
      + 'or before run "yarn build".',
    ]);
  }
}
