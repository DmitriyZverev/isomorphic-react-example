import React from 'react';
import PropTypes from 'prop-types';

import githubLogo from '!!svg-inline-loader!./github.svg';
import styles from './Layout.styl';

/**
 * The layout component.
 */
function Layout({children}) {
  return (
    <div>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.slogan}>
            <div className={styles.name}>Muscle cars</div>
            <div className={styles.descr}>Encyclopedia</div>
          </div>
        </header>
        <hr className={styles.hr}/>
        {children}
      </div>
      <footer className={styles.footer}>
        <a
          href="https://github.com/DmitriyZverev/isomorphic-react-skeleton"
          className={styles.githubLogo}
          dangerouslySetInnerHTML={{__html: githubLogo}}
        />
      </footer>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
