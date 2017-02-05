import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import Logo from '../components/Logo';
import Navbar from '../components/Navbar';
import ButtonGroup from '../components/ButtonGroup';
import Button from '../components/Button';
import Select from '../components/Select';
import DatalistOption from '../components/DatalistOption';
import DropDown from '../components/DropDown';
import Form from '../components/Form';
import css from '../styles/header.scss';
import * as actions from '../dataflow/actions/actions';
import { MIN_AJAX_INTERVAL } from '../utils/constants';

class Header extends Component {
    constructor(props) {
        super(props);
        const { autocompleteCity } = props;

        this.state = {
            typedCity: '',
            selectedMetric: 'C',
        };
        this.onDropDownChange = this::this.onDropDownChange;
        this.onSelectChange = this::this.onSelectChange;
        this.autocompleteCity = _.throttle(autocompleteCity, MIN_AJAX_INTERVAL);
        this.onSubmit = this::this.onSubmit;
    }

    onSubmit(e) {
        e.preventDefault();
        const { redirectToCity } = this.props;
        const { typedCity, selectedMetric } = this.state;
        redirectToCity(typedCity.split(', ')[0], typedCity.split(', ')[1], selectedMetric);
    }

    onSelectChange(e) {
        const selectedMetric = e.target.value;
        this.setState({ selectedMetric });
    }

    onDropDownChange(e) {
        const typedCity = e.target.value;

        this.autocompleteCity(typedCity);
        this.setState({ typedCity });
    }

    render() {
        const { className, autocomplete } = this.props;
        const { typedCity, selectedMetric } = this.state;
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
                            <Form className="header__city-search" autocompleteOff submitHandler={this.onSubmit}>
                                <ButtonGroup>
                                    <DropDown
                                      className="header__city-search__name"
                                      name="city"
                                      placeholder="Type city here"
                                      value={typedCity}
                                      listId="city-input"
                                      onInputChange={this.onDropDownChange}
                                    >
                                        {
                                            autocomplete.map((curr, index) => (
                                                <DatalistOption value={`${curr.name}, ${curr.countryCode}`} key={`${curr.name}-${index}`} />
                                            ))
                                        }
                                    </DropDown>
                                    <Select name="metric" value={selectedMetric} onChange={this.onSelectChange} className="header__city-search__metric" btnStyle>
                                        <DatalistOption value="C">C&deg;</DatalistOption>
                                        <DatalistOption value="F">F&deg;</DatalistOption>
                                    </Select>
                                    <Button type="submit">Get Weather!</Button>
                                </ButtonGroup>
                            </Form>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

Header.propTypes = {
    className: PropTypes.string,
    autocompleteCity: PropTypes.func.isRequired,
    autocomplete: PropTypes.array,
    redirectToCity: PropTypes.func.isRequired,
};

Header.defaultProps = {
    className: '',
    autocomplete: [],
};

function mapStateToProps(state) {
    return {
        autocomplete: state.weatherApp.autocomplete,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
