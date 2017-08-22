import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import * as actions from '../actions';
import ModeSwitch from '../components/ModeSwitch';
import Car from '../components/Car';

/**
 * The car page container.
 *
 * Container connect view layer (Car component) with data layer (redux state).
 */
class CarContainer extends Component {
  static propTypes = {
    getCar: PropTypes.func.isRequired,
    mode: PropTypes.string.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  /**
   * Load data function.
   *
   * Router use this function for making initial state, i. e. router load all
   * needed data for render this component on server side.
   */
  static loadData(dispatch, match) {
    return Promise.all([
      dispatch(actions.getCar(match.params.id)),
    ]);
  }

  /**
   * Load all needed data when component will have been mounted on client side.
   */
  componentDidMount() {
    this.props.getCar(this.props.match.params.id);
  }

  render() {
    return (
      <ModeSwitch
        mode={this.props.mode}
        render={() => <Car {...this.props}/>}
      />
    );
  }
}

function mapStateToProps(state) {
  return state.car;
}

function mapDispatchToProps(dispatch) {
  return {
    getCar(id) {
      return dispatch(actions.getCar(id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CarContainer);
