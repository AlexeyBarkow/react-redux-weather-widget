import React, { PropTypes } from 'react';
import classnames from 'classnames/dedupe';
import Input from './Input';
import InputError from './InputError';
import FormGroup from './FormGroup';

function TemperatureFilterFields({ className, prefix, minTemperature, maxTemperature }) {
    const minInputName = `${prefix}MinTemperature`;
    const maxInputName = `${prefix}MaxTemperature`;

    return (
        <div className={classnames(className, 'form-inline')}>
            <h2>Filter by temperature</h2>
            <FormGroup meta={minTemperature.meta}>
                <label className="sr-only-sm" htmlFor={minInputName}>Min temperature</label>
                <Input type="number" {...minTemperature.input} id={minInputName} placeholder="Min temperature" />
                { minTemperature.meta.error
                    && <InputError popupPanel errorMessage={minTemperature.meta.error} /> }
            </FormGroup>
            <FormGroup meta={maxTemperature.meta}>
                <label className="sr-only-sm" htmlFor={maxInputName}>Max temperature</label>
                <Input type="number" {...maxTemperature.input} id={maxInputName} placeholder="Max temperature" />
                { maxTemperature.meta.error
                    && <InputError popupPanel errorMessage={maxTemperature.meta.error} /> }
            </FormGroup>
        </div>
    );
}

TemperatureFilterFields.propTypes = {
    className: PropTypes.string,
    prefix: PropTypes.string,
    minTemperature: PropTypes.object.isRequired,
    maxTemperature: PropTypes.object.isRequired,
};

TemperatureFilterFields.defaultProps = {
    className: '',
    prefix: '',
};

export default TemperatureFilterFields;
