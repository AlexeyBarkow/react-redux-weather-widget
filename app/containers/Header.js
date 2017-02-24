import React, { Component, PropTypes } from 'react';
import classnames from 'classnames/dedupe';
import Logo from '../components/Logo';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Collapse from '../components/Collapse';
import CityInputForm from '../containers/connectors/CityInputFormConnector';
import '../styles/header.scss';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            collapsed: true,
        };
    }

    onCollapseButtonClick = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    cityInputFormSubmit = ({ city, metric }) => {
        const { redirectToCity } = this.props;
        const splitted = city.split(', ');
        redirectToCity(splitted[0], splitted[1], metric);
    }

    render() {
        const { className } = this.props;
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
                        <CityInputForm className="navbar-left header__city-search" onSubmit={this.cityInputFormSubmit} />
                    </div>
                    <Collapse className="navbar-collapse" collapsed={collapsed}>
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
};

Header.defaultProps = {
    className: '',
};


export default Header;
