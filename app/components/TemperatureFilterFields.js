import React, { PropTypes } from 'react';
import classnames from 'classnames/dedupe';
import Input from './Input';
import InputError from './InputError';
import FormGroup from './FormGroup';

function TemperatureFilterFields({
    className,
    prefix,
    minTemperature,
    maxTemperature,
    temperatureErrors,
    metric,
}) {
    const minInputName = `${prefix}MinTemperature`;
    const maxInputName = `${prefix}MaxTemperature`;

    return (
        <div className={className}>
            <h2>Filter by temperature (<span className={classnames('temperature-metric', metric)}>{ metric }</span>)</h2>
            <div className="pseudo-paragraph form-inline">
                <FormGroup meta={minTemperature.meta}>
                    <label htmlFor={minInputName}>Min temperature</label>
                    <Input type="number" {...minTemperature.input} id={minInputName} placeholder="Min temperature" />
                    { minTemperature.meta.error
                        && <InputError popupPanel errorMessage={minTemperature.meta.error} />
                    }
                </FormGroup>
                <FormGroup meta={maxTemperature.meta}>
                    <label htmlFor={maxInputName}>Max temperature</label>
                    <Input type="number" {...maxTemperature.input} id={maxInputName} placeholder="Max temperature" />
                    { maxTemperature.meta.error
                        && <InputError popupPanel errorMessage={maxTemperature.meta.error} /> }
                </FormGroup>
            </div>
            { temperatureErrors.meta.error &&
                <div className="pseudo-paragraph">
                    <FormGroup className="stretch-width" alwaysTouched showWhenFocusout meta={temperatureErrors.meta}>
                        <InputError errorMessage={temperatureErrors.meta.error} />
                    </FormGroup>
                </div>
            }
        </div>
    );
}

TemperatureFilterFields.propTypes = {
    className: PropTypes.string,
    prefix: PropTypes.string,
    minTemperature: PropTypes.object.isRequired,
    maxTemperature: PropTypes.object.isRequired,
    metric: PropTypes.string.isRequired,
    temperatureErrors: PropTypes.object.isRequired,
};

TemperatureFilterFields.defaultProps = {
    className: '',
    prefix: '',
};

export default TemperatureFilterFields;
