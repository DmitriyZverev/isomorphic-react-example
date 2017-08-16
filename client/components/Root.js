import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {AppContainer} from 'react-hot-loader';

import App from 'components/App';

/**
 * The root client component.
 */
function Root({store, routes}) {
  return (
    <AppContainer>
      <Provider store={store}>
        <BrowserRouter>
          <App routes={routes}/>
        </BrowserRouter>
      </Provider>
    </AppContainer>
  );
}

Root.propTypes = {
  store: PropTypes.any.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Root;
