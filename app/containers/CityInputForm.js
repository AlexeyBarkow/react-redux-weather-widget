import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { Field, reduxForm } from 'redux-form';
import Select from '../components/Select';
import DatalistOption from '../components/DatalistOption';
import AutocompleteField from '../components/AutocompleteField';
import Form from '../containers/Form';
import ButtonGroup from '../components/ButtonGroup';
import Button from '../components/Button';
import { validateAddress } from '../utils/validateFunctions';
import { MIN_AJAX_INTERVAL } from '../utils/constants';

const autocompleteName = 'city-input';

class CityInputForm extends Component {
    autocompleteCity = _.throttle(({ target }) => {
        const { value } = target;
        this.props.autocompleteCity(value, autocompleteName);
    }, MIN_AJAX_INTERVAL);

    validateDropDown = value => (validateAddress(value)
            ? undefined
            : 'Address should be presented in format "City name, Country code"');

    render() {
        const { className, autocomplete, handleSubmit } = this.props;

        return (
            <Form className={className} autocompleteOff onSubmit={handleSubmit}>
                <ButtonGroup>
                    <Field
                      component={AutocompleteField}
                      className="header__city-search__name"
                      name="city"
                      placeholder="Type city here"
                      listId="city-input-list"
                      id="city-input"
                      assistiveLabel
                      labelText="City"
                      onChange={this.autocompleteCity}
                      validate={this.validateDropDown}
                      autocomplete={autocomplete}
                      autocompleteName={autocompleteName}
                    />
                    <Field
                      component={Select}
                      name="metric"
                      className="header__city-search__metric"
                      btnStyle
                      id="metric-input"
                      assistiveLabel
                      labelText="Metric"
                    >
                        <DatalistOption value="C">C&deg;</DatalistOption>
                        <DatalistOption value="F">F&deg;</DatalistOption>
                        <DatalistOption value="K">K</DatalistOption>
                    </Field>
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
    handleSubmit: PropTypes.func.isRequired,
};

CityInputForm.defaultProps = {
    className: '',
    autocomplete: [],
};

export default reduxForm({
    form: 'cityInputForm',
})(CityInputForm);
