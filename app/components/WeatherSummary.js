import React, { Component, PropTypes } from 'react';
import { formatDate } from '../utils/unifiedDateFormat';
import WeatherTemperature from './WeatherTemperature';
import ErrorMessage from './ErrorMessage';
import Loading from './Loading';
import DetailedInfoTable from './DetailedInfoTable';
import '../styles/summary.scss';

class WeatherSummary extends Component {

    componentWillMount() {
        const { getWeatherToCache } = this.props;
        if (getWeatherToCache) {
            const { city, countryCode, location, weather } = this.props;
            if (weather.status === 0) {
                getWeatherToCache(location, city, countryCode);
            }
        }
    }

    render() {
        const { className, weather, metric, showDetailedWithinDropDown } = this.props;
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
                                    {
                                        showDetailedWithinDropDown
                                        ? undefined
                                        : <DetailedInfoTable weather={weather} />
                                    }
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
}


WeatherSummary.propTypes = {
    className: PropTypes.string,
    weather: PropTypes.object,
    metric: PropTypes.string.isRequired,
    showDetailedWithinDropDown: PropTypes.bool,
// these props are for standalone weather summary blocks
    getWeatherToCache: PropTypes.func,
    city: PropTypes.string,
    countryCode: PropTypes.string,
    location: PropTypes.object,
};

WeatherSummary.defaultProps = {
    className: '',
    weather: {
        message: 'No weather data fetched',
        status: 0,
    },
    showDetailedWithinDropDown: false,
    getWeatherToCache: null,
    city: undefined,
    countryCode: undefined,
    location: null,
};

export default WeatherSummary;
