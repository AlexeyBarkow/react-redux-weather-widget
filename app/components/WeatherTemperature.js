import React, { PropTypes } from 'react';
import classnames from 'classnames/dedupe';
import Tooltip from '../containers/connectors/TooltipConnector';
import Temperature from './Temperature';
import CalendarPage from './CalendarPage';
import { IMAGES_BASE_PATH } from '../utils/constants';

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
            { !!title && (<h3>{title}</h3>) }
            { !!date && <CalendarPage className="pull-left" date={date} showTime /> }
            <div className={date ? 'col-xs-7' : ''}>
                <div className={classnames('pull-left', date && 'stretch-width')}>
                    <Tooltip
                      className="weather-pictures"
                      placement="bottom"
                      tooltipText={weatherType.desc}
                    >
                        <img
                          className="temperature-icon"
                          src={`${IMAGES_BASE_PATH}${weatherType.icon}.png`}
                          alt={weatherType.desc}
                        />
                    </Tooltip>
                </div>
                <Temperature
                  className={classnames(date && 'stretch-width', 'pull-left')}
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
    date: PropTypes.any,
};

WeatherTemperature.defaultProps = {
    className: '',
    title: null,
    date: 0,
};

export default WeatherTemperature;
