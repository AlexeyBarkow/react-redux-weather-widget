import React, { Component, PropTypes } from 'react';
import Logo from '../components/Logo';
import Navbar from '../components/Navbar';
import ButtonGroup from '../components/ButtonGroup';
import Button from '../components/Button';
import DropDown from '../components/DropDown';
import Form from '../components/Form';
import css from '../styles/header.scss';

// ToDo: move it to constants
const COLLAPSED_IMG_HEIGHT = '85px';
const DEFAULT_IMG_HEIGHT = '150px';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typedCity: '',
            isFixed: true,
            headerContentHeight: 0,
        };
        this.onDropDownChange = this::this.onDropDownChange;
    }

    onDropDownChange(e) {
        this.setState({ typedCity: e.target.value });
    }

    // handleScroll(e) {
    //
    // }

    render() {
        const { className } = this.props;
        const { typedCity, isFixed } = this.state;
        return (
            <header className={`${className} container line-up`}>
                <div className={`header__content row ${isFixed ? 'fixed' : ''}`}>
                    <Logo
                      height={isFixed
                        ? COLLAPSED_IMG_HEIGHT
                        : DEFAULT_IMG_HEIGHT}
                      className="header__logo col-sm-3 col-xs-4 stop-550"
                    />
                    <div className="header__navbar col-sm-9 col-xs-8 stop-550">
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
                        <Form>
                            <ButtonGroup>
                                <DropDown
                                  value={typedCity}
                                  listId="city-input"
                                  onInputChange={this.onDropDownChange}
                                />
                                <Button type="submit">Get Weather!</Button>
                            </ButtonGroup>
                        </Form>
                    </div>
                </div>
                <div className="header__placeholder" />
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

// Header.contextTypes = {
//     weather: PropTypes.object,
// };

export default Header;
