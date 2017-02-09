import React, { PropTypes } from 'react';
import Loading from './Loading';
import WeatherTemperature from './WeatherTemperature';
import ErrorMessage from './ErrorMessage';
import { FORECAST_INTERVAL } from '../utils/constants';

function WeatherForecastSummary({ className, forecast }) {
    const lastForecast = forecast.length > 0 ? forecast[0].calculationTime : 0;
    return (
        <section className={className}>
            {(() => {
                if (forecast.length > 0 && forecast[0].status !== 1) {
                    if (forecast[0].status === 200) {
                        return (
                            <div className="col-md-10">
                                <h1>Weather forecast in {forecast[0].city}</h1>
                                {
                                    forecast.map((current, index) => (
                                        <WeatherTemperature
                                          className="pseudo-paragraph"
                                          date={new Date((index * FORECAST_INTERVAL)
                                              + lastForecast)}
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
                        );
                    } else if (forecast[0]) {
                        return (
                            <ErrorMessage
                              status={forecast[0].status}
                              message={forecast[0].message}
                            />
                        );
                    }
                }
                return (
                    <div>
                        <h1>Fetching data from server...</h1>
                        <Loading />
                    </div>
                );
            })()}
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
