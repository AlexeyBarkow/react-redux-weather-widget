import React, { Component, PropTypes } from 'react';
import Logo from '../components/Logo';
import Navbar from '../components/Navbar';
import ButtonGroup from '../components/ButtonGroup';
import Button from '../components/Button';
import CityInputForm from '../containers/Connectors/CityInputFormConnector';
import css from '../styles/header.scss';

class Header extends Component {
    render() {
        const { className } = this.props;
        return (
            <header ref={this.getHeader} className={`${className} line-up`}>
                <div className="header__content container">
                    <div className="row">
                        <Logo logoSrc="http://placehold.it/150x150" className="header__logo col-sm-3 hidden-xs" />
                        <div className="header__navbar col-sm-9 col-xs-12">
                            <Navbar>
                                <ButtonGroup>
                                    <Button href="/home">
                                        Home
                                    </Button>
                                    <Button href="/about">
                                        About
                                    </Button>
                                </ButtonGroup>
                            </Navbar>
                            <CityInputForm className="header__city-search" />
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

Header.propTypes = {
    className: PropTypes.string,
};

Header.defaultProps = {
    className: '',
};


export default Header;
