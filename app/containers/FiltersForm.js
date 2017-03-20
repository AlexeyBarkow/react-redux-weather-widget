import React, { PropTypes, Component } from 'react';
import classnames from 'classnames/dedupe';
import { reduxForm, Fields } from 'redux-form';
import throttle from 'lodash/throttle';
import Form from './Form';
import ButtonToolbar from '../components/ButtonToolbar';
import TemperatureFilterFields from '../components/TemperatureFilterFields';
import WeatherDetailsFields from '../components/WeatherDetailsFields';
import WeatherTypeFields from '../components/WeatherTypeFields';
import FilterCitiesFields from '../components/FiltersCitiesFields';
import WeatherDayPicker from '../components/WeatherDayPicker';
import Button from '../components/Button';
import {
    WEATHER_ICON_TYPES_MAP,
    VALIDATE_ADDRESS_REGEXP,
    MIN_AJAX_INTERVAL,
} from '../utils/constants';
import {
    validateAddress,
    validateTemperatureInput,
    validatePressureInput,
    validateHumidityInput,
    validateSpeedInput,
} from '../utils/validateFunctions';
import '../styles/filters.scss';

const FORM_NAME = 'filtersForm';
const WEATHER_ICONS_NAMES = Object.keys(WEATHER_ICON_TYPES_MAP);

const validate = (values) => {
    const errors = {};

    if (values.minTemperature && !validateTemperatureInput(values.minTemperature)) {
        errors.minTemperature = 'Wrong temperature format';
    }

    if (values.maxTemperature && !validateTemperatureInput(values.maxTemperature)) {
        errors.maxTemperature = 'Wrong temperature format';
    }

    if (values.maxTemperature !== undefined && values.minTemperature !== undefined
        && !errors.maxTemperature && !errors.minTemperature
        && parseInt(values.maxTemperature, 10) < parseInt(values.minTemperature, 10)) {
        errors.temperatureErrors = 'Max temperature should not be less than min';
    }

    if (values.minPressure && !validatePressureInput(values.minPressure)) {
        errors.minPressure = 'Wrong pressure format';
    }

    if (values.maxPressure && !validatePressureInput(values.maxPressure)) {
        errors.maxPressure = 'Wrong pressure format';
    }

    if (values.minHumidity && !validateHumidityInput(values.minHumidity)) {
        errors.minHumidity = 'Wrong humidity format';
    }

    if (values.maxHumidity && !validateHumidityInput(values.maxHumidity)) {
        errors.maxHumidity = 'Wrong humidity format';
    }

    if (values.minWindSpeed && !validateSpeedInput(values.minWindSpeed)) {
        errors.minWindSpeed = 'Wrong speed format';
    }

    if (values.maxWindSpeed && !validateSpeedInput(values.maxWindSpeed)) {
        errors.maxWindSpeed = 'Wrong speed format';
    }

    if (values.filterCityRadio === 'custom') {
        if (!values.filterSelectedCities) {
            errors.filterSelectedCities = 'Should be added at least one city';
            if (!validateAddress(values.city)) {
                errors.city = 'Wrong city name format: should be \'Cityname, CountryCode\'';
            }
        }

        if (values.filterSelectedCities &&
            values.filterSelectedCities.indexOf(values.city) !== -1) {
            errors.city = 'Already added';
        }
    }

    return errors;
};

class FiltersForm extends Component {
    autocompleteCity = throttle(({ target }) => {
        this.props.autocompleteCity(target.value, FORM_NAME);
    }, MIN_AJAX_INTERVAL);

    validateDropDown = value =>
        VALIDATE_ADDRESS_REGEXP.test(value);

    changeField = (name, newValue) => {
        const { changeFormField } = this.props;

        changeFormField(FORM_NAME, name, newValue);
    };

    clearField = (name) => {
        const { changeFormField, clearAutocomplete } = this.props;

        changeFormField(FORM_NAME, name, '');
        clearAutocomplete();
    };

    render() {
        const {
            className,
            handleSubmit,
            metric,
            formValues: { filterCityRadio, filterDateCheckbox, filterDatepickerArray },
            formMeta: { city: cityMeta },
            autocomplete,
            reset,
        } = this.props;

        return (
            <Form className={classnames(className, 'filters-form')} onSubmit={handleSubmit} autocompleteOff>
                <div className="container-fluid">
                    <FilterCitiesFields
                      filterCityRadioValue={filterCityRadio}
                      className="row pseudo-paragraph"
                      prefix="filter"
                      cityMeta={cityMeta}
                      autocomplete={autocomplete}
                      validateDropDown={this.validateDropDown}
                      autocompleteName={FORM_NAME}
                      autocompleteCity={this.autocompleteCity}
                      clearField={this.clearField}
                    />
                    <Fields
                      className="row pseudo-paragraph filters-form__min-max"
                      component={TemperatureFilterFields}
                      prefix="filter"
                      metric={metric}
                      names={['minTemperature', 'maxTemperature', 'temperatureErrors']}
                    />
                    <Fields
                      className="row pseudo-paragraph"
                      names={WEATHER_ICONS_NAMES.map(curr => `weatherIcons.${curr}`)}
                      icons={WEATHER_ICON_TYPES_MAP}
                      component={WeatherTypeFields}
                    />
                    <Fields
                      className="row pseudo-paragraph filters-form__min-max"
                      component={WeatherDetailsFields}
                      prefix="filter"
                      names={['minPressure', 'maxPressure', 'minHumidity', 'maxHumidity', 'minWindSpeed', 'maxWindSpeed']}
                    />
                    <WeatherDayPicker
                      className="row pseudo-paragraph"
                      filterDateCheckboxValue={filterDateCheckbox}
                      prefix="filter"
                      changeField={this.changeField}
                      filterDatepickerArray={filterDatepickerArray}
                      maxForwardInterval={4}
                      maxBackwardInterval={0}
                    />
                    <ButtonToolbar className="row pseudo-paragraph">
                        <Button type="submit">Apply filters</Button>
                        <Button type="button" onClickHandler={reset}>Clear filters</Button>
                    </ButtonToolbar>
                </div>
            </Form>
        );
    }
}

FiltersForm.propTypes = {
    className: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
    metric: PropTypes.string.isRequired,
    formValues: PropTypes.object,
    formMeta: PropTypes.object,
    autocomplete: PropTypes.array,
    autocompleteCity: PropTypes.func.isRequired,
    changeFormField: PropTypes.func.isRequired,
    clearAutocomplete: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
};

FiltersForm.defaultProps = {
    className: '',
    formValues: {},
    formMeta: {},
    autocomplete: [],
};

export default reduxForm({
    form: FORM_NAME,
    validate,
    initialValues: {
        weatherIcons: WEATHER_ICONS_NAMES.reduce((prev, icon) => ({
            ...prev,
            [icon]: true,
        }), {}),
        filterCityRadio: 'favorites',
        filterDateCheckbox: true,
    },
})(FiltersForm);
