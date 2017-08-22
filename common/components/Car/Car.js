import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import Button from '../Button';
import styles from './Car.styl';
import image1 from './images/1.jpg';
import image2 from './images/2.jpg';
import image3 from './images/3.jpg';

// Car images map, where key - is car ID, value - is image path.
const imagesMap = {
  1: image1,
  2: image2,
  3: image3,
};

/**
 * The car page component.
 *
 * Render the car information.
 */
function Car({data}) {
  return (
    <div>
      <div className={styles.breadcrumbs}>
        <Link className={styles.breadcrumbsLink} to="/">Cars</Link>
        &nbsp;&nbsp;&gt;&nbsp;&nbsp;
        <span className={styles.breadcrumbsCurrent}>{data.name}</span>
      </div>
      <img className={styles.image} src={imagesMap[data.id]}/>
      <div className={styles.name}>{data.name}</div>
      <table className={styles.table}>
        <tbody>
          <tr className={styles.row}>
            <td className={styles.cell}><b>Engine</b></td>
            <td className={styles.cell}>{data.spec.engine}</td>
          </tr>
          <tr className={styles.row}>
            <td className={styles.cell}><b>Transmission</b></td>
            <td className={styles.cell}>{data.spec.transmission}</td>
          </tr>
          <tr className={styles.row}>
            <td className={styles.cell}><b>Max speed</b></td>
            <td className={styles.cell}>{data.spec.maxSpeed}</td>
          </tr>
          <tr className={styles.row}>
            <td className={styles.cell}><b>Acceleration (0-100 km/h)</b></td>
            <td className={styles.cell}>{data.spec.acceleration}</td>
          </tr>
          <tr className={styles.row}>
            <td className={styles.cell}><b>Weight</b></td>
            <td className={styles.cell}>{data.spec.weight}</td>
          </tr>
        </tbody>
      </table>
      <Button link="/" text="Back"/>
    </div>
  );
}

Car.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    spec: PropTypes.shape({
      engine: PropTypes.string.isRequired,
      transmission: PropTypes.string.isRequired,
      maxSpeed: PropTypes.string.isRequired,
      acceleration: PropTypes.string.isRequired,
      weight: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Car;
