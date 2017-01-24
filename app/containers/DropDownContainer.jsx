import React, { Component } from 'react';
import DropDown from '../components/DropDown.jsx';
import _ from 'lodash';
import getCityAjax from '../non-react-api/getCity.js';

console.log(Object.keys(_))
class DropDownContainer extends Component {
  constructor () {
    super();
    this.state = {
      typedCity : ''
    }
  }
  _onChange = (e) => {
    this.setState({
      typedCity : e.target.value
    });
  }

  _throttledAjax = _.throttle(function () {

  })

  render () {
    const { typedCity } = this.state;
    return (
      <DropDown { ...this.props } value={ typedCity } onChange={ this._onChange }>
      </DropDown>
    );
  }
}

export default DropDownContainer;
