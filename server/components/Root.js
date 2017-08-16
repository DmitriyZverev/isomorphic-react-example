import React from 'react';
import PropTypes from 'prop-types';
import {StaticRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import App from 'components/App';

import Html from './Html';

/**
 * The root server component.
 */
function Root({assets, store, routes, location, context}) {
  return (
    <Html assets={assets} state={store.getState()}>
      <Provider store={store}>
        <StaticRouter location={location} context={context}>
          <App routes={routes}/>
        </StaticRouter>
      </Provider>
    </Html>
  );
}

Root.propTypes = {
  assets: PropTypes.object.isRequired,
  store: PropTypes.any.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  location: PropTypes.string.isRequired,
  context: PropTypes.object.isRequired,
};

export default Root;
