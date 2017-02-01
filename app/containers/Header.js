import React, { Component, PropTypes } from 'react';
import Logo from '../components/Logo';
import Navbar from '../components/Navbar';
import ButtonGroup from '../components/ButtonGroup';
import Button from '../components/Button';
import Select from '../components/Select';
import DatalistOption from '../components/DatalistOption';
import DropDown from '../components/DropDown';
import Form from '../components/Form';
import css from '../styles/header.scss';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typedCity: '',
        };
        this.onDropDownChange = this::this.onDropDownChange;
    }

    onDropDownChange(e) {
        this.setState({
            typedCity: e.target.value,
        });
    }

    render() {
        const { className } = this.props;
        const { typedCity } = this.state;
        return (
            <header ref={this.getHeader} className={`${className} container line-up`}>
                <div className="header__content row">
                    <Logo logoSrc="http://placehold.it/150x150" className="header__logo col-sm-3 hidden-xs stop-550" />
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
                        <Form className="header__city-search">
                            <ButtonGroup>
                                <DropDown
                                  className="header__city-search__name"
                                  name="city"
                                  placeholder="Type city here"
                                  value={typedCity}
                                  listId="city-input"
                                  onInputChange={this.onDropDownChange}
                                />
                                <Select name="metric" className="header__city-search__metric" btnStyle>
                                    <DatalistOption value="C">C&deg;</DatalistOption>
                                    <DatalistOption value="F">F&deg;</DatalistOption>
                                </Select>
                                <Button type="submit">Get Weather!</Button>
                            </ButtonGroup>
                        </Form>
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

// Header.contextTypes = {
//     weather: PropTypes.object,
// };

export default Header;
