import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
import Form from './Form';
import DropDown from '../components/DropDown';
import ButtonGroup from '../components/ButtonGroup';
import Button from '../components/Button';
import DatalistOption from '../components/DatalistOption';
import { validateAddress } from '../utils/validateFunctions';
import { MIN_AJAX_INTERVAL } from '../utils/constants';

const autocompleteName = 'add-city';

class AddCityForm extends Component {
    autocompleteCity = _.throttle(({ target }) => {
        this.props.autocompleteCity(target.value, autocompleteName);
    }, MIN_AJAX_INTERVAL);

    validateDropDown = value => (validateAddress(value)
            ? undefined
            : 'Address should be presented in format "City name, Country code"');

    render() {
        const { handleSubmit, className, autocomplete } = this.props;
        return (
            <Form className={className} autocompleteOff onSubmit={handleSubmit}>
                <ButtonGroup>
                    <Field
                      component={DropDown}
                      name="tableCity"
                      id="city-table-input"
                      listId="city-table-list"
                      labelText="City"
                      assistiveLabel
                      placeholder="Type city here"
                      onChange={this.autocompleteCity}
                      validate={this.validateDropDown}
                    >
                        {
                            autocompleteName === autocomplete.input
                            ?
                            autocomplete.map((curr, index) => (
                                <DatalistOption value={`${curr.name}, ${curr.countryCode}`} key={`${curr.name}-${index}`} />
                            ))
                            : undefined
                        }
                    </Field>
                    <Button type="submit">Add city</Button>
                </ButtonGroup>
            </Form>
        );
    }
}

AddCityForm.propTypes = {
    autocompleteCity: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    className: PropTypes.string,
    autocomplete: PropTypes.array,
};

AddCityForm.defaultProps = {
    className: '',
    autocomplete: [],
};

export default reduxForm({
    form: 'addCityForm',
})(AddCityForm);
