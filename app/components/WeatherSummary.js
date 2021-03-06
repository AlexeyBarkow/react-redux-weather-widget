import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import WeatherTemperature from './WeatherTemperature';
import ErrorMessage from './ErrorMessage';
import Button from './Button';
import Loading from './Loading';
import DetailedInfoTable from './DetailedInfoTable';
import '../styles/summary.scss';

class WeatherSummary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showTable: !props.shortView || false,
        };
    }

    componentWillMount() {
        const { getWeatherToCache } = this.props;
        if (getWeatherToCache) {
            const { city, countryCode, location, weather } = this.props;
            if (weather.status === 0) {
                getWeatherToCache(location, city, countryCode);
            }
        }
    }

    chevronToggle = () => {
        const { showTable } = this.state;

        this.setState({
            showTable: !showTable,
        });
    }

    render() {
        const { className, weather, metric, shortView, formatDate } = this.props;
        const { showTable } = this.state;
        const date = new Date(weather.calculationTime);
        return (
            <section className={classnames('summary', className)}>
                {(() => {
                    if (weather.status === 200) {
                        return (
                            <div className="clearfix">
                                {
                                    shortView
                                    ? undefined
                                    : <h1>{ weather.city }</h1>
                                }

                                <div className="data-block">
                                    {
                                        formatDate && date
                                        ? <span>{formatDate(date)}</span>
                                        : undefined
                                    }
                                    <div className="pseudo-paragraph">
                                        <WeatherTemperature
                                            className="pull-left"
                                            metric={metric}
                                            weatherType={weather.weatherTypes[0]}
                                            minTemperature={weather.temperature.min}
                                            maxTemperature={weather.temperature.max}
                                            currTemperature={weather.temperature.curr}
                                        />
                                        {
                                            shortView
                                            ?
                                                <Button onClickHandler={this.chevronToggle} className="pull-right chevron">
                                                    <span className={`glyphicon glyphicon-chevron-${showTable ? 'up' : 'down'}`} aria-hidden="true" />
                                                </Button>
                                            : undefined
                                        }
                                    </div>
                                    {
                                        showTable
                                        ? (
                                            <div className="pseudo-paragraph">
                                                <DetailedInfoTable className="clear-left" weather={weather} />
                                            </div>
                                        )
                                        : undefined
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
    shortView: PropTypes.bool,
    formatDate: PropTypes.func,
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
    shortView: false,
    getWeatherToCache: null,
    city: undefined,
    countryCode: undefined,
    location: null,
    formatDate: undefined,
};

export default WeatherSummary;
