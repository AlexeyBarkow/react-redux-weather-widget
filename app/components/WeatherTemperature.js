import React, { PropTypes } from 'react';
import Tooltip from '../containers/Tooltip';
import Temperature from './Temperature';
import CalendarPage from './CalendarPage';

// ToDo move to constants
const IMAGES_BASE_PATH = './images/';

function WeatherTemperature({
    metric,
    weatherType,
    minTemperature,
    currTemperature,
    maxTemperature,
    className,
    title,
    date,
}) {
    return (
        <div className={className}>
            { title ? (<h3>{title}</h3>) : undefined }
            { date ? (
                <CalendarPage className="col-xs-3" date={date} showTime />
            ) : undefined }
            <div className={date ? 'col-xs-8' : ''}>
                <div className="col-xs-7">
                    <Tooltip
                      className="weather-pictures"
                      placement="bottom"
                      tooltipText={weatherType.desc}
                    >
                        <img
                          src={`${IMAGES_BASE_PATH}${weatherType.main}.png`}
                          alt={weatherType.desc}
                        />
                    </Tooltip>
                </div>
                <Temperature
                  className="col-xs-5"
                  metric={metric}
                  minTemperature={minTemperature}
                  maxTemperature={maxTemperature}
                  currTemperature={currTemperature}
                />
            </div>
        </div>
    );
}

WeatherTemperature.propTypes = {
    metric: PropTypes.string.isRequired,
    weatherType: PropTypes.object.isRequired,
    minTemperature: PropTypes.number.isRequired,
    currTemperature: PropTypes.number.isRequired,
    maxTemperature: PropTypes.number.isRequired,
    className: PropTypes.string,
    title: PropTypes.string,
    date: PropTypes.number,
};

WeatherTemperature.defaultProps = {
    className: '',
    title: null,
    date: 0,
};

export default WeatherTemperature;
