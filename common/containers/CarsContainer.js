import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import * as actions from '../actions';
import ModeSwitch from '../components/ModeSwitch';
import Cars from '../components/Cars';

/**
 * The cars page container.
 *
 * Container connect view layer (Cars component) with data layer (redux state).
 */
class CarsContainer extends Component {
  static propTypes = {
    getCars: PropTypes.func.isRequired,
    mode: PropTypes.string.isRequired,
  };

  /**
   * Load data function.
   *
   * Router use this function for making initial state, i. e. router load all
   * needed data for render this component on server side.
   */
  static loadData(dispatch) {
    return Promise.all([
      dispatch(actions.getCars()),
    ]);
  }

  /**
   * Load all needed data when component will have been mounted on client side.
   */
  componentDidMount() {
    this.props.getCars();
  }

  render() {
    return (
      <ModeSwitch
        mode={this.props.mode}
        render={() => <Cars {...this.props}/>}
      />
    );
  }
}

function mapStateToProps(state) {
  return state.cars;
}

function mapDispatchToProps(dispatch) {
  return {
    getCars() {
      return dispatch(actions.getCars());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CarsContainer);
