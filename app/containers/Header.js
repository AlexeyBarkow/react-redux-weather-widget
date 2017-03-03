import React, { Component, PropTypes } from 'react';
import classnames from 'classnames/dedupe';
import isEqual from 'lodash/isEqual';
import Logo from '../components/Logo';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Collapse from '../components/Collapse';
import CityInputForm from '../containers/CityInputForm';
import '../styles/header.scss';
import { VALIDATE_ADDRESS_REGEXP } from '../utils/constants';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            collapsed: true,
        };
    }

    shouldComponentUpdate(newProps) {
        return !isEqual(newProps, this.props);
    }

    onCollapseButtonClick = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    cityInputFormSubmit = ({ city, metric }) => {
        const { redirectToCity } = this.props;
        const [cityName, countryCode] = city.match(VALIDATE_ADDRESS_REGEXP).slice(1);
        redirectToCity(cityName, countryCode, metric);
    }

    render() {
        const { className, autocomplete, autocompleteCity, metric } = this.props;
        const { collapsed } = this.state;

        return (
            <header className={classnames('navbar navbar-default', className)}>
                <div className="container">
                    <div className="navbar-header">
                        <Logo className="navbar-left" />
                        <Button noDefaultStyles onClickHandler={this.onCollapseButtonClick} className={classnames(!collapsed && 'collapsed', 'navbar-toggle')}>
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                        </Button>
                        <CityInputForm initialValues={{ metric }} autocomplete={autocomplete} autocompleteCity={autocompleteCity} className="navbar-left header__city-search" onSubmit={this.cityInputFormSubmit} />
                    </div>
                    <Collapse className="navbar-collapse" collapsed={!collapsed}>
                        <Navbar>
                            <li>
                                <Button noDefaultStyles href="/home">
                                    Home
                                </Button>
                            </li>
                            <li>
                                <Button noDefaultStyles href="/filters">
                                    Filters
                                </Button>
                            </li>
                            <li>
                                <Button noDefaultStyles href="/about">
                                    About
                                </Button>
                            </li>
                        </Navbar>
                    </Collapse>

                </div>
            </header>
        );
    }
}

Header.propTypes = {
    className: PropTypes.string,
    redirectToCity: PropTypes.func.isRequired,
    autocomplete: PropTypes.array,
    autocompleteCity: PropTypes.func.isRequired,
    metric: PropTypes.string.isRequired,
};

Header.defaultProps = {
    className: '',
    autocomplete: [],
};


export default Header;
