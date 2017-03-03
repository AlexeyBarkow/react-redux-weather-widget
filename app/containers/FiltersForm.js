import React, { PropTypes, Component } from 'react';
import classnames from 'classnames/dedupe';
import { reduxForm, Fields } from 'redux-form';
import Form from './Form';
import TemperatureFilterFields from '../components/TemperatureFilterFields';
import WeatherDetailsFields from '../components/WeatherDetailsFields';
import WeatherTypeFields from '../components/WeatherTypeFields';
import Button from '../components/Button';
import {
    VALIDATE_TEMPERATURE_REGEXP,
    WEATHER_ICON_TYPES_MAP,
    VALIDATE_PRESSURE_REGEXP,
    VALIDATE_HUMIDITY_REGEXP,
    VALIDATE_SPEED_REGEXP,
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

class FiltersForm extends Component {
    render() {
        const { className, handleSubmit } = this.props;

        return (
            <Form className={classnames(className, 'filters-form')} onSubmit={handleSubmit} autocompleteOff>
                <div className="container-fluid">
                    <Fields
                      className="row pseudo-paragraph filters-form__min-max"
                      component={TemperatureFilterFields}
                      prefix="filter"
                      names={['minTemperature', 'maxTemperature']}
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
};

FiltersForm.defaultProps = {
    className: '',
};

export default reduxForm({
    form: 'filtersForm',
    validate,
    initialValues: {
        weatherIcons: weatherIconNames.reduce((prev, icon) => ({
            ...prev,
            [icon]: true,
        }), {}),
    },
})(FiltersForm);
