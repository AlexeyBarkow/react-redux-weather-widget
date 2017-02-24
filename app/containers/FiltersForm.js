import React, { PropTypes, Component } from 'react';
import classnames from 'classnames/dedupe';
import { reduxForm, Fields } from 'redux-form';
import Form from './Form';
import TemperatureFilterFields from '../components/TemperatureFilterFields';
import WeatherTypeFields from '../components/WeatherTypeFields';
import Button from '../components/Button';
import { VALIDATE_TEMPERATURE_REGEXP, WEATHER_ICON_TYPES_MAP } from '../utils/constants';
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

    return errors;
};

class FiltersForm extends Component {
    render() {
        const { className, handleSubmit } = this.props;

        return (
            <Form className={classnames(className, 'filters-form')} onSubmit={handleSubmit} autocompleteOff>
                <div className="container-fluid">
                    <Fields
                      className="row pseudo-paragraph filters-form__min-max-temperature"
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
