import React from 'react';
import PropTypes from 'prop-types';

import NotFound from '../NotFound';
import InternalError from '../InternalError';
import Preloader from '../Preloader';

// Mode values
export const REQUEST_MODE = 'REQUEST';
export const SUCCESS_MODE = 'SUCCESS';
export const FAILURE_MODE = 'FAILURE';
export const NOT_FOUND_MODE = 'NOT_FOUND';

/**
 * Mode switcher.
 *
 * Depending on the "mode" property value render some stub page
 * (not found, error, loading) or render a page component.
 */
function ModeSwitch({mode, render}) {
  switch (mode) {
    case REQUEST_MODE:
      return <Preloader/>;
    case SUCCESS_MODE:
      return render();
    case NOT_FOUND_MODE:
      return <NotFound/>;
    default:
      return <InternalError/>;
  }
}

ModeSwitch.propTypes = {
  mode: PropTypes.oneOf([
    REQUEST_MODE,
    SUCCESS_MODE,
    FAILURE_MODE,
    NOT_FOUND_MODE,
  ]).isRequired,
  render: PropTypes.func.isRequired,
};

export default ModeSwitch;
