import React from 'react';
import PropTypes from 'prop-types';
import {Route} from 'react-router-dom';

/**
 * Status component.
 *
 * Set response status, and pass it to context.
 */
function Status({code, children}) {
  function render({staticContext}) {
    if (staticContext) {
      staticContext.status = code;
    }
    return children;
  }
  return (
    <Route render={render}/>
  );
}

Status.propTypes = {
  code: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

export default Status;
