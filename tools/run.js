import {runServer} from './utils';
import build from './build';

function run() {
  const assets = require('../build/assets.json');
  const app = require('../build/server.js').default(assets);
  runServer(() => Promise.resolve(app));
}

export default function (isBuild) {
  if (isBuild) {
    build(run);
  } else {
    run();
  }
}
