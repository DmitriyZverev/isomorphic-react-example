import React from 'react';

import Status from '../Status';
import Button from '../Button';
import styles from './InternalError.styl';

/**
 * Internal error component.
 *
 * Set error status and render a stub page.
 */
function InternalError() {
  return (
    <Status code={500}>
      <div className={styles.container}>
        <div className={styles.text}>Oops, something went wrong...</div>
        <div>
          <Button link="/" text="Home"/>
        </div>
      </div>
    </Status>
  );
}

export default InternalError;
