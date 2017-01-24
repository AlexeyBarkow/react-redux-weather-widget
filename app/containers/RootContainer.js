import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import DropDown from '../components/DropDown';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import * as actions from '../actions/actions';

class RootContainer extends Component {
    constructor() {
        super();
        this.state = {
            typedCity: '',
        };
    }

    getChildContext() {
        return {
            changeWeatherInfo: this.props.changeWeatherInfo,
            weather: this.props.weather,
        };
    }

    onDropDownChange(e) {
        this.setState({ typedCity: e.target.value });
    }

    render() {
        const { children } = this.props;
        const { typedCity } = this.state;
        return (
            <div>
                <Header>
                    <Navbar>
                        <DropDown
                          value={typedCity}
                          listId="city-input"
                          onInputChange={this.onDropDownChange}
                        />
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
    weather: PropTypes.object,
};

RootContainer.propTypes = {
    children: PropTypes.node,
};

RootContainer.defaultProps = {
    children: null,
};


function mapStateToProps(state) {
    return {
        geolocation: state.weatherApp.geolocation,
        city: state.weatherApp.city,
        weather: state.weatherApp.weather,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
