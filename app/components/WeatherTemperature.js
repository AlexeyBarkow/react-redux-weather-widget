import React, { PropTypes } from 'react';
import Tooltip from '../containers/Tooltip';
import Temperature from './Temperature';

// ToDo move to constants
const IMAGES_BASE_PATH = './images/';

function WeatherTemperature({
    metric,
    weatherType,
    minTemperature,
    currTemperature,
    maxTemperature,
    className,
}) {
    return (
        <div className={className}>
            <div className="col-xs-7">
                {
                    weatherType.map((type, index) => (
                        <Tooltip
                          className="weather-pictures"
                          placement="bottom"
                          key={type + index}
                          tooltipText={type.desc}
                        >
                            <img
                              src={`${IMAGES_BASE_PATH}${type.main}.png`}
                              alt={type.desc}
                            />
                        </Tooltip>
                    ))
                }
            </div>
            <Temperature
              className="col-xs-5"
              metric={metric}
              minTemperature={minTemperature}
              maxTemperature={maxTemperature}
              currTemperature={currTemperature}
            />
        </div>
    );
}

WeatherTemperature.propTypes = {
    metric: PropTypes.string.isRequired,
    weatherType: PropTypes.array.isRequired,
    minTemperature: PropTypes.number.isRequired,
    currTemperature: PropTypes.number.isRequired,
    maxTemperature: PropTypes.number.isRequired,
    className: PropTypes.string,
};

WeatherTemperature.defaultProps = {
    className: '',
};

export default WeatherTemperature;
