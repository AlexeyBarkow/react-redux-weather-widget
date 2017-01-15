import React, {PropTypes} from 'react';
import Header from './Header.jsx';
import Navbar from './Navbar.jsx';
import {Link} from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js';


const App = ({children}) => (
  <div>
    <Header>
      <Navbar></Navbar>
    </Header>
    <div>
      {children}
    </div>
    <div>
      <Link to="/about">about</Link>
    </div>
  </div>
);

App.propTypes = {
  children: PropTypes.object
};

function mapStateToProps(state) {
  return {
    geolocation: state.geolocation,
      city: state.city,
      weather: state.weather
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    actions, dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
