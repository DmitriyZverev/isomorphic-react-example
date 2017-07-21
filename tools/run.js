import fs from 'fs';
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

function fileAccess(path, mode) {
  return new Promise((resolve, reject) => {
    fs.access(path, mode, (err) => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
}

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
    build(() => run(middlewares));
  } else {
    try {
      await Promise.all([
        fileAccess(SERVER_PATH),
        fileAccess(ASSETS_PATH),
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
}
