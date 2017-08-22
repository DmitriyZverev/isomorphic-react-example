/**
 * Routes module.
 */
import CarsContainer from './containers/CarsContainer';
import CarContainer from './containers/CarContainer';

export default [
  {
    path: '/',
    strict: true,
    exact: true,
    component: CarsContainer,
  },
  {
    path: '/cars/:id/',
    strict: true,
    exact: true,
    component: CarContainer,
  },
];
