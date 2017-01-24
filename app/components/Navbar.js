import React, { PropTypes } from 'react';
import Button from './Button.js';
import MenuItem from './MenuItem.js';
import ButtonGroup from './ButtonGroup.js';
import ButtonDropDown from '../containers/ButtonDropDown.js';
import weatherAPI from '../API/weather.api.js';

//ToDo: move it to the container component
function weatherClickHandler(callback) {
    return function() {
        callback({temperature: Math.random()});
    }
}

const Navbar = ({ children }, { changeWeatherInfo }) => {
    return (
        <nav>
            <ButtonGroup noPadding>
                <Button href='#' onClickHandler={weatherClickHandler(changeWeatherInfo)}>getWeather</Button>
            </ButtonGroup>
        </nav>
    );
};

Navbar.contextTypes = {
    changeWeatherInfo: PropTypes.func
};

Navbar.propTypes = {
    children: PropTypes.object
};

export default Navbar;
