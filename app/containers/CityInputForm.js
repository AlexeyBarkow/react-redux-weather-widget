import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import Select from '../components/Select';
import DatalistOption from '../components/DatalistOption';
import DropDown from '../components/DropDown';
import InputError from '../components/InputError';
import Form from '../components/Form';
import ButtonGroup from '../components/ButtonGroup';
import Button from '../components/Button';
import { validateAddress } from '../utils/validateFunctions';
import * as actions from '../dataflow/actions/actions';
import { MIN_AJAX_INTERVAL } from '../utils/constants';

class CityInputForm extends Component {
    constructor(props) {
        super(props);

        const { autocompleteCity } = props;

        this.state = {
            typedCity: '',
            selectedMetric: 'C',
            triggerValidation: false,
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

        if (validateAddress(typedCity)) {
            redirectToCity(typedCity.split(', ')[0], typedCity.split(', ')[1], selectedMetric);
            //ToDo: find out more applicable solution
            this.setState({ triggerValidation: true });
        }
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
        const { typedCity, selectedMetric, triggerValidation } = this.state;

        return (
            <Form className={className} autocompleteOff submitHandler={this.onSubmit}>
                <ButtonGroup>
                    <DropDown
                      className="header__city-search__name"
                      name="city"
                      placeholder="Type city here"
                      value={typedCity}
                      listId="city-input"
                      onInputChange={this.onDropDownChange}
                      validationFunction={validateAddress}
                      triggerValidation={triggerValidation}
                      errorBlock={<InputError errorMessage="Address should be presented in format 'City name, Country code'" />}
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
        );
    }
}

CityInputForm.propTypes = {
    className: PropTypes.string,
    autocompleteCity: PropTypes.func.isRequired,
    autocomplete: PropTypes.array,
    redirectToCity: PropTypes.func.isRequired,
};

CityInputForm.defaultProps = {
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

export default connect(mapStateToProps, mapDispatchToProps)(CityInputForm);
