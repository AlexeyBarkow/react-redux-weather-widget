import React, { Component, PropTypes } from 'react';
import Logo from '../components/Logo';
import Navbar from '../components/Navbar';
import DropDown from '../components/DropDown';
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
        this.setState({ typedCity: e.target.value });
    }

    render() {
        const { className } = this.props;
        const { typedCity } = this.state;
        return (
            <header className={`${className} container line-up`}>
                <div className="row">
                    <Logo className="header__logo col-md-3 col-sm-3 col-xs-12" />
                    <Navbar className="header__navbar clo-md-6 col-sm-9 col-xs-12">
                        <DropDown
                          value={typedCity}
                          listId="city-input"
                          onInputChange={this.onDropDownChange}
                        />
                    </Navbar>
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
