import React, { PropTypes } from 'react';
import css from '../styles/header.scss';

const Header = ({ children }, { weather }) => {
    return (
        <header className="container header">
            <div className="line-up row">
                <figure className="header__logo text-center col-sm-3">
                    <img src='http://placehold.it/150x150' alt='logo'/>
                    <figcaption>lorem ipsum</figcaption>
                </figure>
                <div className="col-sm-9">
                    { children }
                </div>
            </div>
            <div>{ weather
                    ? weather.temperature
                    : 'no weather fetched now' }
            </div>
        </header>
    )
};

Header.propTypes = {
    children: PropTypes.object
};

Header.contextTypes = {
    weather: PropTypes.object
};

export default Header;
