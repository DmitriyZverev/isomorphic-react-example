import React from 'react';

import Status from '../Status';
import Button from '../Button';
import styles from './NotFound.styl';

/**
 * Not found page.
 *
 * Set not found status and render a stub page.
 */
function NotFound() {
  return (
    <Status code={404}>
      <div>
        <div className={styles.container}>
          <div className={styles.text}>Sorry, page not found.</div>
          <div>
            <Button link="/" text="Home"/>
          </div>
        </div>
      </div>
    </Status>
  );
}

export default NotFound;
