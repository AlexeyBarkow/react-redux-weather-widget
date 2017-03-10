import React, { PropTypes, Component } from 'react';
import classnames from 'classnames/dedupe';
import { reduxForm, Fields } from 'redux-form';
import throttle from 'lodash/throttle';
import Form from './Form';
import TemperatureFilterFields from '../components/TemperatureFilterFields';
import WeatherDetailsFields from '../components/WeatherDetailsFields';
import WeatherTypeFields from '../components/WeatherTypeFields';
import FiltersCitiesFields from '../components/FiltersCitiesFields';
import Button from '../components/Button';
import {
    VALIDATE_TEMPERATURE_REGEXP,
    WEATHER_ICON_TYPES_MAP,
    VALIDATE_PRESSURE_REGEXP,
    VALIDATE_HUMIDITY_REGEXP,
    VALIDATE_SPEED_REGEXP,
    MIN_AJAX_INTERVAL,
} from '../utils/constants';
import '../styles/filters.scss';

const weatherIconNames = Object.keys(WEATHER_ICON_TYPES_MAP);

const validate = (values) => {
    const errors = {};

    if (values.minTemperature) {
        if (!VALIDATE_TEMPERATURE_REGEXP.test(values.minTemperature)) {
            errors.minTemperature = 'Wrong temperature format';
        }
    }

    if (values.maxTemperature) {
        if (!VALIDATE_TEMPERATURE_REGEXP.test(values.maxTemperature)) {
            errors.maxTemperature = 'Wrong temperature format';
        }
    }

    if (values.maxTemperature !== undefined && values.minTemperature !== undefined
        && !errors.maxTemperature && !errors.minTemperature) {
        if (parseInt(values.maxTemperature, 10) < parseInt(values.minTemperature, 10)) {
            errors.temperatureErrors = 'Max temperature should not be less than min';
        }
    }

    if (values.minPressure) {
        if (!VALIDATE_PRESSURE_REGEXP.test(values.minPressure)) {
            errors.minPressure = 'Wrong pressure format';
        }
    }

    if (values.maxPressure) {
        if (!VALIDATE_PRESSURE_REGEXP.test(values.maxPressure)) {
            errors.maxPressure = 'Wrong pressure format';
        }
    }

    if (values.minHumidity) {
        if (!VALIDATE_HUMIDITY_REGEXP.test(values.minHumidity)) {
            errors.minHumidity = 'Wrong humidity format';
        }
    }

    if (values.maxHumidity) {
        if (!VALIDATE_HUMIDITY_REGEXP.test(values.maxHumidity)) {
            errors.maxHumidity = 'Wrong humidity format';
        }
    }

    if (values.minWindSpeed) {
        if (!VALIDATE_SPEED_REGEXP.test(values.minWindSpeed)) {
            errors.minWindSpeed = 'Wrong speed format';
        }
    }

    if (values.maxWindSpeed) {
        if (!VALIDATE_SPEED_REGEXP.test(values.maxWindSpeed)) {
            errors.maxWindSpeed = 'Wrong speed format';
        }
    }

    return errors;
};

const autocompleteName = 'filters-form';

class FiltersForm extends Component {
    autocompleteCity = throttle(({ target }) => {
        this.props.autocompleteCity(target.value, autocompleteName);
    }, MIN_AJAX_INTERVAL);

    render() {
        const {
            className,
            handleSubmit,
            metric,
            formValues: { filterCityRadio },
            autocomplete,
        } = this.props;

        return (
            <Form className={classnames(className, 'filters-form')} onSubmit={handleSubmit} autocompleteOff>
                <div className="container-fluid">
                    <FiltersCitiesFields
                      filterCityRadioValue={filterCityRadio}
                      className="row pseudo-paragraph"
                      prefix="filter"
                      autocomplete={autocomplete}
                      autocompleteName={autocompleteName}
                      autocompleteCity={this.autocompleteCity}
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
                      names={weatherIconNames.map(curr => `weatherIcons.${curr}`)}
                      icons={WEATHER_ICON_TYPES_MAP}
                      component={WeatherTypeFields}
                    />
                    <Fields
                      className="row pseudo-paragraph filters-form__min-max"
                      component={WeatherDetailsFields}
                      prefix="filter"
                      names={['minPressure', 'maxPressure', 'minHumidity', 'maxHumidity', 'minWindSpeed', 'maxWindSpeed']}
                    />
                    <div className="row pseudo-paragraph">
                        <Button type="submit">Apply filters</Button>
                    </div>
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
    autocomplete: PropTypes.array,
    autocompleteCity: PropTypes.func.isRequired,
};

FiltersForm.defaultProps = {
    className: '',
    formValues: {},
    autocomplete: [],
};

export default reduxForm({
    form: 'filtersForm',
    validate,
    initialValues: {
        weatherIcons: weatherIconNames.reduce((prev, icon) => ({
            ...prev,
            [icon]: true,
        }), {}),
        filterCityRadio: 'favorites',
    },
})(FiltersForm);
