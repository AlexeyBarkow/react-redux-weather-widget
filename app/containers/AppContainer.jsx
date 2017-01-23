import React, { Component, PropTypes } from 'react';
// import App from '../components/App.jsx';
import Header from '../components/Header.jsx';
import Navbar from '../components/Navbar.jsx';
import {Link} from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js';

class AppContainer extends Component {
    constructor () {
        super();
    }

    getChildContext() {
      return {
        changeWeatherInfo: this.props.changeWeatherInfo,
        weather: this.props.weather
      }
    }

    render () {
      const { children } = this.props;
      return (
        <div>
          <Header>
            <Navbar></Navbar>
          </Header>
          <div>
            { children }
          </div>
          <div>
            <Link to="/about">about</Link>
          </div>
        </div>
      );
    }
}


AppContainer.childContextTypes = {
    changeWeatherInfo: PropTypes.func,
    weather: PropTypes.object
}

function mapStateToProps(state) {
  return {
    geolocation: state.weatherApp.geolocation,
      city: state.weatherApp.city,
      weather: state.weatherApp.weather
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    actions, dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
