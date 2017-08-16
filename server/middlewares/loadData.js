import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {matchPath} from 'react-router-dom';

import routes from 'routes';
import reducer from 'reducer';

import data from '../data/data.json';

/**
 * The load data middleware.
 *
 * Find route match and run loadData() function for matched route. loadData()
 * function should contain load data actions. Then pass a initialized store to
 * next middleware.
 */
async function loadData({request, state}, next) {
  const initialState = data;
  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(thunk)
  );
  const promises = [];
  routes.some((route) => {
    let loadFn;
    const match = matchPath(request.url, route);
    if (!match) {
      return false;
    }
    if (route.component && route.component.loadData) {
      loadFn = route.component.loadData;
    }
    if (route.loadData) {
      loadFn = route.loadData;
    }
    if (loadFn) {
      promises.push(loadFn(store.dispatch, match));
    }
    return true;
  });
  await Promise.all(promises);
  state.store = store;
  await next();
}

export default loadData;
