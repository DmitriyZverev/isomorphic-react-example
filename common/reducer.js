import {combineReducers} from 'redux';

function title(state = '', action) {
  if (action.type === 'TITLE_CHANGE') {
    return 'Hi, world!';
  }
  return state;
}

export default combineReducers({
  title,
});
