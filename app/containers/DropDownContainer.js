//ToDo delete this component
import React, { Component } from 'react';
import DropDown from '../components/DropDown';

class DropDownContainer extends Component {
    constructor() {
        super();
        this.state = {
            typedCity: '',
        };
        this.onChange = this::this.onChange;
    }
    onChange = (e) => {
        this.setState({ typedCity: e.target.value });
    }

    render() {
        const { typedCity } = this.state;
        return (
            <DropDown {...this.props} value={typedCity} onChange={this.onChange} />
        );
    }
}

export default DropDownContainer;
