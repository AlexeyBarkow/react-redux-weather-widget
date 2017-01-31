import React, { PropTypes } from 'react';
import Loading from './Loading';
import WeatherTemperature from './WeatherTemperature';

// ToDo: Move to constants
const FORECAST_INTERVAL = 3600000 * 3;

function WeatherForecastSummary({ className }, { forecast }) {
    const lastForecast = forecast ? forecast[0].calculationTime : null;
    return (
        <section className={className}>
            {
                forecast && forecast[0].status === 200
                ? (
                    <div className="col-sm-10">
                        <h1>Weather forecast in {forecast[0].city}</h1>
                        {
                            forecast.map((current, index) => (
                                <WeatherTemperature
                                  className="row pseudo-paragraph"
                                  date={(index * FORECAST_INTERVAL) + lastForecast}
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
};

WeatherForecastSummary.defaultProps = {
    className: '',
};

WeatherForecastSummary.contextTypes = {
    forecast: PropTypes.array,
};

export default WeatherForecastSummary;
