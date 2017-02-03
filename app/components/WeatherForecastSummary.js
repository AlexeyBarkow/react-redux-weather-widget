import React, { PropTypes } from 'react';
import Loading from './Loading';
import WeatherTemperature from './WeatherTemperature';
import { FORECAST_INTERVAL } from '../utils/constants';

function WeatherForecastSummary({ className, forecast }) {
    const lastForecast = forecast.length > 0 ? forecast[0].calculationTime : 0;
    return (
        <section className={className}>
            {
                forecast.length > 0 && forecast[0].status === 200
                ? (
                    <div className="col-sm-10">
                        <h1>Weather forecast in {forecast[0].city}</h1>
                        {
                            forecast.map((current, index) => (
                                <WeatherTemperature
                                  className="row pseudo-paragraph"
                                  date={new Date((index * FORECAST_INTERVAL) + lastForecast)}
                                  metric={current.metric}
                                  weatherType={current.weatherTypes[0]}
                                  minTemperature={current.temperature.min}
                                  maxTemperature={current.temperature.max}
                                  currTemperature={current.temperature.curr}
                                  key={`forecast-${index}`}
                                />
                            ))
                        }
                    </div>
                  )
                : (
                    <div>
                        <h1>Fetching weather from server...</h1>
                        <Loading />
                    </div>
                )
            }
        </section>
    );
}

WeatherForecastSummary.propTypes = {
    className: PropTypes.string,
    forecast: PropTypes.array,
};

WeatherForecastSummary.defaultProps = {
    className: '',
    forecast: [],
};

export default WeatherForecastSummary;
