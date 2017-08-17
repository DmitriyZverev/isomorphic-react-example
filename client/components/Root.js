import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import App from 'components/App';

/**
 * The root client component.
 */
function Root({store, routes}) {
  const component = (
    <Provider store={store}>
      <BrowserRouter>
        <App routes={routes}/>
      </BrowserRouter>
    </Provider>
  );
  if (process.env.NODE_ENV === 'development') {
    const {AppContainer} = require('react-hot-loader');
    return <AppContainer>{component}</AppContainer>;
  }
  return component;
}

Root.propTypes = {
  store: PropTypes.any.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Root;
