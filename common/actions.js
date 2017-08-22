/**
 * Actions module.
 */
import 'isomorphic-fetch';

import * as types from './types';

export function carsGetRequest() {
  return {
    type: types.CARS_GET_REQUEST,
  };
}

export function carsGetSuccess(data) {
  return {
    type: types.CARS_GET_SUCCESS,
    data,
  };
}

export function carsGetFailure() {
  return {
    type: types.CARS_GET_FAILURE,
  };
}

export function getCars() {
  return function (dispatch, getState) {
    if (getState().cars.data.length) {
      return Promise.resolve();
    }
    dispatch(carsGetRequest());
    return fetch('http://localhost:7000/cars/')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(`Unexpected response status: ${response.status}`);
      })
      .then(json => dispatch(carsGetSuccess(json)))
      .catch((err) => {
        console.error(err.stack);
        return dispatch(carsGetFailure());
      });
  };
}

export function carGetRequest() {
  return {
    type: types.CAR_GET_REQUEST,
  };
}

export function carGetSuccess(data) {
  return {
    type: types.CAR_GET_SUCCESS,
    data,
  };
}

export function carGetNotFound(id) {
  return {
    type: types.CAR_GET_NOT_FOUND,
    id,
  };
}

export function carGetFailure() {
  return {
    type: types.CAR_GET_FAILURE,
  };
}

export function getCar(id) {
  return function (dispatch, getState) {
    if (getState().car.data.id === id) {
      return Promise.resolve();
    }
    dispatch(carGetRequest());
    return fetch(`http://localhost:7000/cars/${id}/`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 404) {
          const error = new Error(`Resource with id ${id} not found.`);
          error.status = 404;
          throw error;
        }
        throw new Error(`Unexpected response status: ${response.status}`);
      })
      .then(json => dispatch(carGetSuccess(json)))
      .catch((err) => {
        if (err.status === 404) {
          return dispatch(carGetNotFound(id));
        }
        console.error(err.stack);
        return dispatch(carGetFailure());
      });
  };
}
