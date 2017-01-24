import React, { PropTypes } from 'react';
import Button from './Button.jsx';
import MenuItem from './MenuItem.jsx';
import ButtonGroup from './ButtonGroup.jsx';
import ButtonDropDown from '../containers/ButtonDropDown.jsx';
import weatherAPI from '../API/weather.api.js';

//ToDo: move it to the container component
function weatherClickHandler(callback) {
  return function () {
    callback({
      temperature: Math.random()
    });
  }
}

const Navbar = ({ children }, { changeWeatherInfo }) => {
  console.log('wow',changeWeatherInfo)
  return (
    <nav>
      <ButtonGroup noPadding>
        <Button href='#' onClickHandler={ weatherClickHandler(changeWeatherInfo) }>getWeather</Button>

      </ButtonGroup>
    </nav>
  );
};
console.log(Object.keys(PropTypes))
Navbar.contextTypes = {
  changeWeatherInfo: PropTypes.func
}

Navbar.propTypes = {
  children: PropTypes.object
}

export default Navbar;
