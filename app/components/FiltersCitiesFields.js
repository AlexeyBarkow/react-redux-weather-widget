import React, { PropTypes, Component } from 'react';
import { Field, FieldArray } from 'redux-form';
import FormGroup from './FormGroup';
import CustomInput from './CustomInput';
import MultipleInputFields from './MultipleInputFields';
import AutocompleteField from './AutocompleteField';

class FiltersCitiesFields extends Component {
    render() {
        const {
            prefix,
            className,
            filterCityRadioValue,
            autocompleteName,
            autocomplete,
            autocompleteCity,
            validateDropDown,
        } = this.props;
        const radioName = `${prefix}CityRadio`;
        const selectedFieldsName = `${prefix}SelectedCities`;

        return (
            <div className={className}>
                <h2>Select cities to filter...</h2>
                <Field
                  name={radioName}
                  id={`${prefix}-favorites`}
                  type="radio"
                  className="custom-radio"
                  component={CustomInput}
                  value="favorites"
                >Use favorites</Field>
                <Field
                  name={radioName}
                  id={`${prefix}-custom`}
                  type="radio"
                  className="custom-radio"
                  component={CustomInput}
                  value="custom"
                >Use selected cities</Field>
                {
                    filterCityRadioValue === 'custom' &&
                    <FormGroup>
                        <FieldArray
                          component={MultipleInputFields}
                          name={selectedFieldsName}
                          validateField={validateDropDown}
                          inputFieldProps={{
                              component: AutocompleteField,
                              name: 'city',
                              placeholder: 'Type cities here',
                              listId: 'filter-cities-input-list',
                              id: 'filter-cities-input',
                              onChange: autocompleteCity,
                              autocomplete,
                              autocompleteName,
                          }}
                        />
                    </FormGroup>
                }
            </div>
        );
    }
}

FiltersCitiesFields.propTypes = {
    prefix: PropTypes.string,
    className: PropTypes.string,
    filterCityRadioValue: PropTypes.string,
    autocomplete: PropTypes.array.isRequired,
    autocompleteName: PropTypes.string.isRequired,
    autocompleteCity: PropTypes.func.isRequired,
    validateDropDown: PropTypes.func,
};

FiltersCitiesFields.defaultProps = {
    prefix: 'filters',
    className: '',
    filterCityRadioValue: 'favorites',
    validateDropDown: undefined,
};

export default FiltersCitiesFields;
