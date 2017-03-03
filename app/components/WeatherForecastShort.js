import React, { PropTypes } from 'react';
import { formatDate } from '../utils/unifiedDateFormat';
import ErrorMessage from './ErrorMessage';
import WeatherSummary from './WeatherSummary';
import Loading from './Loading';

function WeatherForecastShort({ metric, forecast, className }) {
    return (
        <section className={className}>
            {(() => {
                if (forecast.length > 0 && forecast[0].status !== 1) {
                    if (forecast[0].status === 200) {
                        const weatherMap = forecast.map((curr, index) => (
                            <WeatherSummary
                              formatDate={date => formatDate(date)}
                              shortView
                              className="forecast-single"
                              key={`forecast-${index}`}
                              weather={curr}
                              metric={metric}
                            />
                        ));
                        return weatherMap;
                    } else if (forecast[0]) {
                        return (
                            <ErrorMessage
                              status={forecast[0].status !== 0 ? forecast[0].status : null}
                              message={forecast[0].message}
                            />
                        );
                    }
                }
                return (
                    <div>
                        <h3>Fetching data from server...</h3>
                        <Loading />
                    </div>
                );
            })()}
        </section>
    );
}

WeatherForecastShort.propTypes = {
    metric: PropTypes.string.isRequired,
    className: PropTypes.string,
    forecast: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
    ]).isRequired,
};

WeatherForecastShort.defaultProps = {
    className: '',
};

export default WeatherForecastShort;
