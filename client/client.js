import React from 'react';
import {render} from 'react-dom';

import App from '../common/components/App';

render(<App/>, document.getElementById('root'));


if (module.hot) {
  module.hot.accept('../common/components/App', () => {
    const NewApp = require('../common/components/App').default;
    render(<NewApp/>, document.getElementById('root'));
  });
}
