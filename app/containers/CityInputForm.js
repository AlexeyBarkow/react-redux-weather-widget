import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import Select from '../components/Select';
import DatalistOption from '../components/DatalistOption';
import DropDown from '../components/DropDown';
import InputError from '../components/InputError';
import Form from '../containers/Form';
import ButtonGroup from '../components/ButtonGroup';
import Button from '../components/Button';
import { validateAddress } from '../utils/validateFunctions';
import { MIN_AJAX_INTERVAL } from '../utils/constants';

class CityInputForm extends Component {
    constructor(props) {
        super(props);

        const { autocompleteCity, metric } = props;

        this.state = {
            typedCity: '',
            selectedMetric: metric,
            dropDownValidationState: '',
        };
        this.onDropDownChange = this::this.onDropDownChange;
        this.onSelectChange = this::this.onSelectChange;
        this.autocompleteCity = _.throttle(autocompleteCity, MIN_AJAX_INTERVAL);
        this.onSubmit = this::this.onSubmit;
        this.validateDropDown = this::this.validateDropDown;
        this.setDropDownValidationState = this::this.setDropDownValidationState;
    }

    onSubmit(e) {
        e.preventDefault();
        const { push } = this.props;
        const { typedCity, selectedMetric } = this.state;
        const splitted = typedCity.split(', ');
        if (this.validateDropDown()) {
            push({
                pathname: `/cities/${splitted[1]}/${splitted[0]}`,
                query: { metric: selectedMetric },
            });
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

    setDropDownValidationState(newState) {
        this.setState({
            dropDownValidationState: newState,
        });
    }

    validateDropDown() {
        const { typedCity } = this.state;

        if (validateAddress(typedCity)) {
            this.setDropDownValidationState('has-success');
            return true;
        }
        this.setDropDownValidationState('has-error');
        return false;
    }

    render() {
        const { className, autocomplete } = this.props;
        const { typedCity, selectedMetric, dropDownValidationState } = this.state;
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
                      onBlur={this.validateDropDown}
                      validationState={dropDownValidationState}
                      errorBlock={<InputError popupPanel errorMessage="Address should be presented in format 'City name, Country code'" />}
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
                        <DatalistOption value="K">K</DatalistOption>
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
    push: PropTypes.func.isRequired,
    metric: PropTypes.string.isRequired,
};

CityInputForm.defaultProps = {
    className: '',
    autocomplete: [],
};

export default CityInputForm;
