import React, { PropTypes } from 'react';
import { formatDate } from '../utils/unifiedDateFormat';
import WeatherTemperature from './WeatherTemperature';
import ValueBlock from './ValueBlock';
import Loading from './Loading';
import css from '../styles/summary.scss';

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
                                <ValueBlock tooltip="Humidity" value={weather.humidity} imgUrl="./images/drop.png" valueClass="temperature-percent" />
                                <ValueBlock tooltip="Coludiness" value={weather.clouds} imgUrl="./images/cloudiness.png" valueClass="temperature-percent" />
                                <ValueBlock tooltip="Athmospheric pressure" value={weather.pressure} imgUrl="./images/pressure.png" valueClass="temperature-pressure" />
                                <ValueBlock tooltip="Wind speed and direction" value={weather.wind.speed} imgUrl="./images/wind.png" valueClass="km-h" />
                            </div>
                        </div>
                    );
                } else if (weather.status === 0) {
                    return (
                        <div>
                            <h1>Fetching data from server...</h1>
                            <Loading />
                        </div>
                    );
                }
                return (
                    <div className="error-wrapper">
                        <h1>Error: { weather.status }</h1>
                        <p>{ weather.message }</p>
                    </div>
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

WeatherSummary.contextTypes = {
};

export default WeatherSummary;
