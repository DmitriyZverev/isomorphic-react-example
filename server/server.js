import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import Application from 'koa';

import Html from './components/Html';
import App from '../common/components/App';

export default function (assets) {
  const app = new Application();

  app.use(async (ctx, next) => {
    ctx.type = 'text/html';
    ctx.body = renderToStaticMarkup(<Html assets={assets}><App/></Html>);
    await next();
  });

  if (module.hot) {
    app.hot = module.hot;
    module.hot.accept('../common/components/App');
  }
  return app;
}
