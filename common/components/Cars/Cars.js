import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import styles from './Cars.styl';

/**
 * The car list page component.
 *
 * Render list of cars and link to not found page.
 */
function Cars({data}) {
  return (
    <ul className={styles.list}>
      {data.map(car => (
        <li className={styles.item} key={car.id}>
          <Link className={styles.link} to={`/cars/${car.id}/`}>
            {car.name}
          </Link>
        </li>
      ))}
      <li className={styles.item}>
        <Link className={styles.link} to="/cars/9999/">
          Fake car (Not found)
        </Link>
      </li>
    </ul>
  );
}

Cars.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default Cars;
