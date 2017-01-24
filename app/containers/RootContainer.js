import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import DropDown from '../components/DropDown.js';
import Header from '../components/Header.js';
import Navbar from '../components/Navbar.js';
import * as actions from '../actions/actions.js';

class RootContainer extends Component {
    constructor() {
        super();
        this.state = {
            typedCity: ''
        }
    }

    getChildContext() {
        return {changeWeatherInfo: this.props.changeWeatherInfo, weather: this.props.weather}
    }

    _onDropDownChange = (e) => {
        this.setState({typedCity: e.target.value});
    }

    render() {
        const {children} = this.props;
        const {typedCity} = this.state;
        return (
            <div>
                <Header>
                    <Navbar>
                        <DropDown value={typedCity} listId="city-input" onInputChange={this._onDropDownChange}></DropDown>
                    </Navbar>
                </Header>
                <div>
                    {children}
                </div>
                <div>
                    <Link to="/about">about</Link>
                </div>
            </div>
        );
    }
}

RootContainer.childContextTypes = {
    changeWeatherInfo: PropTypes.func,
    weather: PropTypes.object
};

function mapStateToProps(state) {
    return {geolocation: state.weatherApp.geolocation, city: state.weatherApp.city, weather: state.weatherApp.weather}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
