/**
 * The project API application.
 */
import Application from 'koa';

/**
 * Simple router implementation.
 */
function router(regUrl, handler) {
  return function (ctx, next) {
    const path = ctx.request.path;
    if (regUrl.test(path)) {
      handler(ctx, next, path.match(regUrl));
    } else {
      next();
    }
  };
}

/**
 * Application factory.
 */
export default function (data) {
  const app = new Application();

  // set response headers
  app.use((ctx, next) => {
    ctx.set('access-control-allow-origin', '*');
    next();
  });

  // /cars/
  app.use(router(/^\/cars\/$/, (ctx) => {
    ctx.body = data.cars;
  }));

  // /cars/:id/
  app.use(router(/^\/cars\/([0-9]+)\/$/, (ctx, next, match) => {
    const car = data.cars.find(({id}) => match[1] === id);
    const spec = data.specs.find(({carId}) => match[1] === carId);
    if (car) {
      const json = {...car};
      if (spec) {
        json.spec = spec;
      }
      ctx.body = json;
    } else {
      next();
    }
  }));

  // not found
  app.use((ctx) => {
    ctx.status = 404;
    ctx.body = {message: 'Resource not found.'};
  });

  return app;
}
