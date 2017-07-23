import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import image from './image.png';
import styles from './App.styl';

function App({title, onClick}) {
  return (
    <div>
      <h1 className={styles.title}>{title}</h1>
      <div>
        <button onClick={onClick}>Change</button>
      </div>
      <img src={image}/>
    </div>
  );
}

App.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    onClick: () => dispatch({type: 'TITLE_CHANGE'}),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
