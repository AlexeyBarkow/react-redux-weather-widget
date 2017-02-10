import React, { PropTypes } from 'react';
import { formatDate } from '../utils/unifiedDateFormat';
import WeatherTemperature from './WeatherTemperature';
import ErrorMessage from './ErrorMessage';
import ValueBlock from './ValueBlock';
import Loading from './Loading';
import css from '../styles/summary.scss';
import { IMAGES_UNUSUAL_PATH } from '../utils/constants';

function WeatherSummary({ className, weather }) {
    const date = new Date(weather.calculationTime);
    const formattedDate = formatDate(date);
    return (
        <section className={className}>
            {(() => {
                if (weather.status === 200) {
                    return (
                        <div className="clearfix">
                            <h1>Weather in { weather.city }</h1>
                            <div className="row col-md-7">
                                <h3>Today (gathered in {formattedDate})</h3>
                                <WeatherTemperature
                                  metric={weather.metric}
                                  weatherType={weather.weatherTypes[0]}
                                  minTemperature={weather.temperature.min}
                                  maxTemperature={weather.temperature.max}
                                  currTemperature={weather.temperature.curr}
                                />
                                <ValueBlock tooltip="Humidity" value={weather.humidity} imgUrl={`${IMAGES_UNUSUAL_PATH}/drop.png`} valueClass="temperature-percent" />
                                <ValueBlock tooltip="Coludiness" value={weather.clouds} imgUrl={`${IMAGES_UNUSUAL_PATH}/cloudiness.png`} valueClass="temperature-percent" />
                                <ValueBlock tooltip="Athmospheric pressure" value={weather.pressure} imgUrl={`${IMAGES_UNUSUAL_PATH}/pressure.png`} valueClass="temperature-pressure" />
                                <ValueBlock tooltip="Wind speed and direction" value={weather.wind.speed} imgUrl={`${IMAGES_UNUSUAL_PATH}/wind.png`} valueClass="km-h" />
                            </div>
                        </div>
                    );
                } else if (weather.status === 1) {
                    return (
                        <div>
                            <h1>Fetching data from server...</h1>
                            <Loading />
                        </div>
                    );
                }
                return (
                    <ErrorMessage
                      status={weather.status !== 0 ? weather.status : null}
                      message={weather.message}
                    />
                );
            })()
        }
        </section>
    );
}

WeatherSummary.propTypes = {
    className: PropTypes.string,
    weather: PropTypes.object,
};

WeatherSummary.defaultProps = {
    className: '',
    weather: {
        message: 'No weather data fetched',
        status: 0,
    },
};

export default WeatherSummary;
