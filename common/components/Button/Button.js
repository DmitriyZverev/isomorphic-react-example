import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import styles from './Button.styl';

/**
 * Simple button component.
 *
 * Just a wrapper around Link component.
 */
function Button({link, text}) {
  return (
    <Link className={styles.button} to={link}>{text}</Link>
  );
}

Button.propTypes = {
  link: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Button;
