import Application from 'koa';

import loadData from './middlewares/loadData';
import renderHtml from './middlewares/renderHtml';

export default function (assets) {
  const app = new Application();
  app.use(loadData);
  app.use(renderHtml(assets));
  return app;
}
