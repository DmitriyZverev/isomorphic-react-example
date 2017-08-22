import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route} from 'react-router-dom';

import Layout from '../Layout';
import NotFound from '../NotFound';

/**
 * The application component.
 */
function App({routes}) {
  return (
    <Layout>
      <Switch>
        {routes.map((route, i) => <Route {...route} key={i}/>)}
        <Route render={NotFound}/>
      </Switch>
    </Layout>
  );
}

App.propTypes = {
  routes: PropTypes.array.isRequired,
};

export default App;
