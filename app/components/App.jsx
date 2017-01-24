//delete this file later
import React, {PropTypes} from 'react';
import Header from './Header.jsx';
import Navbar from './Navbar.jsx';
// import DropDown from './DropDown.jsx';
import DropDownContainer from '../containers/DropDownContainer.jsx';
import DatalistOption from './DatalistOption.jsx';
import {Link} from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js';


const App = ({children, geolocation, city}) => {
  return (
    <div>
      <Header>
        <Navbar></Navbar>
        <h1>{ city ? `weather for ${ city }` : `no city selected` }</h1>
        <DropDownContainer listId='city-data' placeholder='Type city here'>
        </DropDownContainer>
      </Header>
      <main>
        {children}
      </main>
      <footer>
        <Link to="/about">about</Link>
      </footer>
    </div>
  )
};

App.propTypes = {
  children: PropTypes.object
};

function mapStateToProps(state) {
  return {
    geolocation: state.weatherApp.geolocation,
    city: state.weatherApp.city,
    weather: state.weatherApp.weather
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    actions, dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
