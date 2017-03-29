import React, { PropTypes } from 'react';
import FormGroup from './FormGroup';
import Input from './Input';
import InputError from './InputError';

function WeatherDetailsFields({
    className,
    prefix,
    minPressure,
    maxPressure,
    minHumidity,
    maxHumidity,
    minWindSpeed,
    maxWindSpeed,
}) {
    const minPressureName = `${prefix}MinPressure`;
    const maxPressureName = `${prefix}MaxPressure`;
    const minHumidityName = `${prefix}Humidity`;
    const maxHumidityName = `${prefix}Humidity`;
    const minWindSpeedName = `${prefix}windSpeed`;
    const maxWindSpeedName = `${prefix}windSpeed`;

    return (
        <div className={className}>
            <h2>Filter by additional weather info...</h2>
            <div className="form-inline">
                <h4>Filter by pressure</h4>
                <FormGroup meta={minPressure.meta}>
                    <label htmlFor={minPressureName}>Min pressure (<span className="temperature-pressure" />)</label>
                    <Input type="number" {...minPressure.input} id={minPressureName} placeholder="Enter min pressure here" />
                    { minPressure.meta.error
                        && <InputError popupPanel errorMessage={minPressure.meta.error} />
                }
                </FormGroup>
                <FormGroup meta={maxPressure.meta}>
                    <label htmlFor={maxPressureName}>Max pressure (<span className="temperature-pressure" />)</label>
                    <Input type="number" {...maxPressure.input} id={maxPressureName} placeholder="Enter max pressure here" />
                    { maxPressure.meta.error
                        && <InputError popupPanel errorMessage={maxPressure.meta.error} />
                }
                </FormGroup>
            </div>

            <div className="form-inline">
                <h4>Filter by humidity</h4>
                <FormGroup meta={minHumidity.meta}>
                    <label htmlFor={minHumidityName}>Min humidity (<span className="temperature-percent" />)</label>
                    <Input type="number" {...minHumidity.input} id={minHumidityName} placeholder="Enter humidity here" />
                    { minHumidity.meta.error
                        && <InputError popupPanel errorMessage={minHumidity.meta.error} />
                    }
                </FormGroup>
                <FormGroup meta={maxHumidity.meta}>
                    <label htmlFor={maxHumidityName}>Max humidity (<span className="temperature-percent" />)</label>
                    <Input type="number" {...maxHumidity.input} id={maxHumidityName} placeholder="Enter humidity here" />
                    { maxHumidity.meta.error
                        && <InputError popupPanel errorMessage={maxHumidity.meta.error} />
                    }
                </FormGroup>
            </div>

            <div className="form-inline">
                <h4>Filter by wind speed</h4>
                <FormGroup meta={minWindSpeed.meta}>
                    <label htmlFor={minWindSpeedName}>Min wind speed (<span className="km-h" />)</label>
                    <Input type="number" {...minWindSpeed.input} id={minWindSpeedName} placeholder="Enter wind speed here" />
                    { minWindSpeed.meta.error
                        && <InputError popupPanel errorMessage={minWindSpeed.meta.error} />
                    }
                </FormGroup>
                <FormGroup meta={maxWindSpeed.meta}>
                    <label htmlFor={maxWindSpeedName}>Max wind speed (<span className="km-h" />)</label>
                    <Input type="number" {...maxWindSpeed.input} id={maxWindSpeedName} placeholder="Enter wind speed here" />
                    { maxWindSpeed.meta.error
                        && <InputError popupPanel errorMessage={maxWindSpeed.meta.error} />
                    }
                </FormGroup>
            </div>
        </div>
    );
}

WeatherDetailsFields.propTypes = {
    className: PropTypes.string,
    prefix: PropTypes.string,
    minPressure: PropTypes.object.isRequired,
    maxPressure: PropTypes.object.isRequired,
    minHumidity: PropTypes.object.isRequired,
    maxHumidity: PropTypes.object.isRequired,
    minWindSpeed: PropTypes.object.isRequired,
    maxWindSpeed: PropTypes.object.isRequired,
};

WeatherDetailsFields.defaultProps = {
    className: '',
    prefix: '',
};

export default WeatherDetailsFields;
