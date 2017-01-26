import React, { PropTypes } from 'react';
import Button from './Button';
import ButtonGroup from './ButtonGroup';


function Navbar({ children, className }, { changeWeatherInfo }) {
    return (
        <nav className={`${className}`}>
            <ButtonGroup noPadding>
                <Button
                  href="#"
                  onClickHandler={changeWeatherInfo}
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
    children: PropTypes.node,
    className: PropTypes.string,
};

Navbar.defaultProps = {
    children: null,
    className: '',
};

export default Navbar;
