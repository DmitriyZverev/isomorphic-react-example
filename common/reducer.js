/**
 * Root reducer module.
 */
import {combineReducers} from 'redux';

import * as types from './types';
import * as modes from './components/ModeSwitch';

const carsInitialState = {
  mode: modes.REQUEST_MODE,
  data: [],
};

/**
 * Cars reducer.
 */
function cars(state = carsInitialState, action) {
  switch (action.type) {
    case types.CARS_GET_REQUEST:
      return {
        ...state,
        mode: modes.REQUEST_MODE,
      };
    case types.CARS_GET_SUCCESS:
      return {
        ...state,
        mode: modes.SUCCESS_MODE,
        data: action.data,
      };
    case types.CARS_GET_FAILURE:
      return {
        ...state,
        mode: modes.FAILURE_MODE,
      };
    default:
      return state;
  }
}

const carInitialState = {
  mode: modes.REQUEST_MODE,
  data: {},
};

/**
 * Car reducer.
 */
function car(state = carInitialState, action) {
  switch (action.type) {
    case types.CAR_GET_REQUEST:
      return {
        ...state,
        mode: modes.REQUEST_MODE,
      };
    case types.CAR_GET_SUCCESS:
      return {
        ...state,
        mode: modes.SUCCESS_MODE,
        data: action.data,
      };
    case types.CAR_GET_NOT_FOUND:
      return {
        ...state,
        mode: modes.NOT_FOUND_MODE,
        data: {
          id: action.id,
        },
      };
    case types.CAR_GET_FAILURE:
      return {
        ...state,
        mode: modes.FAILURE_MODE,
      };
    default:
      return state;
  }
}

export default combineReducers({
  cars,
  car,
});
