/**
 * The client entry point.
 */
import React from 'react';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';

import reducer from 'reducer';
import rootRoutes from 'routes';

import Root from './components/Root';

const args = [
  reducer,
  __PRELOADED_STATE__,
  applyMiddleware(thunk),
];

// Add redux devtools middleware for development.
if (process.env.NODE_ENV === 'development') {
  const {composeWithDevTools} = require('redux-devtools-extension');
  args[2] = composeWithDevTools(args[2]);
}

const root = document.getElementById('root');
const store = createStore(...args);

/**
 * Main render function.
 */
function render(Component, routes) {
  ReactDOM.render(
    <Component {...{store, routes}}/>,
    root
  );
}

render(Root, rootRoutes);

// Hot reload for development.
if (process.env.NODE_ENV === 'development' && module.hot) {
  const RedBox = require('redbox-react').default;
  module.hot.accept(['./components/Root', 'reducer', 'routes'], () => {
    store.replaceReducer(require('reducer').default);
    try {
      render(require('./components/Root').default, require('routes').default);
    } catch (err) {
      ReactDOM.render(<RedBox error={err}/>, root);
    }
  });
}
