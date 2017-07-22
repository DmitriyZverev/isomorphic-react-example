import path from 'path';
import fs from 'fs-extra';
import Application from 'koa';
import mount from 'koa-mount';
import webpack from 'webpack';

import {PORT} from '../config';

export function print(type, messages) {
  const map = {
    trivial: '37',
    error: '31',
    success: '32',
    warning: '33',
    info: '34',
  };
  if (messages === undefined) {
    messages = type;
    type = 'trivial';
  }
  if (!(messages instanceof Array)) {
    messages = [messages];
  }
  messages.forEach(message => message.split('\n').forEach((line) => {
    console.log(`\x1b[90m[tools]:\x1b[0m \x1b[${map[type]}m${line}\x1b[0m`);
  }));
}

export class Compilers {
  constructor(configs, extend = {}) {
    this.get = this.get.bind(this);
    this.names = this.names.bind(this);
    this._compilers = configs.map((config) => {
      if (extend[config.name]) {
        config = extend[config.name](config);
      }
      return webpack(config);
    });
    this._compilers.forEach((compiler) => {
      const name = compiler.name.charAt(0).toUpperCase()
                 + compiler.name.slice(1);
      compiler.plugin('compile', () => {
        print(`${name} bundle is compiling...`);
      });
      compiler.plugin('done', (stats) => {
        if (stats.hasErrors()) {
          print('error', [
            `\n${name} bundle compilation failed:`,
            stats.toString('errors-only'),
          ]);
        } else {
          print(`${name} bundle compilation has been completed.`);
        }
      });
    });
  }

  get(name) {
    if (!name) {
      return this._compilers;
    }
    return this._compilers.find(compiler => compiler.name === name);
  }

  names() {
    return this._compilers.map(compiler => compiler.name);
  }
}

export function runServer(getApplication, middlewares = []) {
  const server = new Application();
  server.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = 500;
      ctx.type = 'text/plain';
      ctx.body = 'Internal server error.';
      print('error', ['\nUnhandled server error:\n', err.stack]);
    }
  });
  middlewares.forEach(middleware => server.use(middleware));
  server.use(async (ctx, next) => mount(await getApplication())(ctx, next));
  server.listen(PORT, () => {
    print(`Server is listening port ${PORT}.`);
  });
  return server;
}

export async function clean(dirs) {
  if (typeof dirs === 'string') {
    dirs = [dirs];
  }
  const cleanedDirs = [];
  await Promise.all(dirs.map(async (dir) => {
    try {
      await fs.access(dir);
      try {
        const files = await fs.readdir(dir);
        await Promise.all(files.map(file => fs.remove(path.join(dir, file))));
        cleanedDirs.push(dir);
      } catch (err) {
        print('error', err.stack);
      }
    } catch (err) {
      // ...
    }
  }));
  print('Directories have been cleaned up:');
  print(cleanedDirs.map(dir => `- ./${path.relative(process.cwd(), dir)}`));
}
