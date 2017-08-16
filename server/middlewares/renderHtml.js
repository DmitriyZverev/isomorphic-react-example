import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';

import routes from 'routes';

import Root from '../components/Root';

/**
 * The render html middleware.
 *
 * Gets all needed data outside, renders the root react component,
 * and prepares success response or redirect.
 */
function renderHtml(assets) {
  return function (ctx, next) {
    const context = {};
    const props = {
      assets,
      context,
      routes,
      store: ctx.state.store,
      location: ctx.request.url,
    };
    const html = `<!DOCTYPE html>${renderToStaticMarkup(<Root {...props}/>)}`;
    if (context.url) {
      ctx.status = 301;
      ctx.redirect(context.url);
    } else {
      ctx.status = context.status || 200;
      ctx.type = 'text/html';
      ctx.body = html;
    }
  };
}

export default renderHtml;
