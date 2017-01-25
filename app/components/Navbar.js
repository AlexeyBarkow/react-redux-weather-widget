import React, { PropTypes } from 'react';
import Button from './Button';
import ButtonGroup from './ButtonGroup';

//    ToDo: move it to the container component
function weatherClickHandler(callback) {
    return function handle() {
        callback({ temperature: Math.random() });
    };
}

function Navbar({ children }, { changeWeatherInfo }) {
    return (
        <nav>
            <ButtonGroup noPadding>
                <Button
                  href="#"
                  onClickHandler={weatherClickHandler(changeWeatherInfo)}
                >
                    getWeather
                </Button>
            </ButtonGroup>
        </nav>
    );
}

Navbar.contextTypes = {
    changeWeatherInfo: PropTypes.func,
};

Navbar.propTypes = {
    children: PropTypes.object,
};

Navbar.defaultProps = {
    children: null,
};

export default Navbar;
