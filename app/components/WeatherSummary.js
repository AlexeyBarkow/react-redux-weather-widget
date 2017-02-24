import React, { PropTypes } from 'react';
import { formatDate } from '../utils/unifiedDateFormat';
import WeatherTemperature from './WeatherTemperature';
import ErrorMessage from './ErrorMessage';
import Loading from './Loading';
import DetailedInfoTable from './DetailedInfoTable';
import '../styles/summary.scss';

function WeatherSummary({ className, weather, metric }) {
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
                                  className="row"
                                  metric={metric}
                                  weatherType={weather.weatherTypes[0]}
                                  minTemperature={weather.temperature.min}
                                  maxTemperature={weather.temperature.max}
                                  currTemperature={weather.temperature.curr}
                                />
                                <DetailedInfoTable weather={weather} />
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
    metric: PropTypes.string.isRequired,
};

WeatherSummary.defaultProps = {
    className: '',
    weather: {
        message: 'No weather data fetched',
        status: 0,
    },
};

export default WeatherSummary;
