import React, { PropTypes } from 'react';
import { formatDate } from '../utils/unifiedDateFormat';
import WeatherTemperature from './WeatherTemperature';
import ValueBlock from './ValueBlock';
import css from '../styles/summary.scss';

function WeatherSummary({ className }, { weather }) {
    const date = new Date(weather.calculationTime);
    const formattedDate = formatDate(date);
    return (
        <section className={className}>
            {!weather || weather.status !== 200
                ? (
                    <div className="error-wrapper">
                        <h1>Error: { weather.status }</h1>
                        <p>{ weather.message }</p>
                    </div>
                )
                : (
                    <div>
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
                            <ValueBlock tooltip="Athmospheric pressure" value={weather.clouds} imgUrl="./images/pressure.png" valueClass="temperature-pressure" />
                            <ValueBlock tooltip="Wind speed and direction" value={weather.wind.speed} imgUrl="./images/wind.png" valueClass="km-h" />
                        </div>
                    </div>
                )
            }
        </section>
    );
}

WeatherSummary.propTypes = {
    className: PropTypes.string,
};

WeatherSummary.defaultProps = {
    className: '',
};

WeatherSummary.contextTypes = {
    weather: PropTypes.object,
};

export default WeatherSummary;
