//ToDo delete this component
import React, { Component } from 'react';
import DropDown from '../components/DropDown.js';
import getCityAjax from '../API/getCity.js';

class DropDownContainer extends Component {
    constructor() {
        super();
        this.state = {
            typedCity: ''
        }
    }
    _onChange = (e) => {
        this.setState({typedCity: e.target.value});
    }


    render() {
        const {typedCity} = this.state;
        return (
            <DropDown {...this.props} value={typedCity} onChange={this._onChange}></DropDown>
        );
    }
}

export default DropDownContainer;
