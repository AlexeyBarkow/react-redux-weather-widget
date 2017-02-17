import React, { PropTypes } from 'react';
import Loading from './Loading';
import WeatherTemperature from './WeatherTemperature';
import ErrorMessage from './ErrorMessage';
import ButtonGroup from './ButtonGroup';
import Radio from './Radio';
import DetailedInfoTable from './DetailedInfoTable';

import { FORECAST_INTERVAL } from '../utils/constants';

function WeatherForecastSummary({ className, forecast, forecastFilter, changeFilter }) {
    const lastForecast = forecast.length > 0 ? forecast[0].calculationTime : 0;
    const forecastInterval = forecastFilter === '12H' ? FORECAST_INTERVAL * 4 : FORECAST_INTERVAL;
    return (
        <section className={className}>
            {(() => {
                if (forecast.length > 0 && forecast[0].status !== 1) {
                    if (forecast[0].status === 200) {
                        return (
                            <div>
                                <div className="row">
                                    <h1 className="col-xs-9">Weather forecast in { forecast[0].city }</h1>
                                    <div className="panel panel-heading col-xs-3">
                                        <span>Interval:</span>
                                        <ButtonGroup className="btn-group-justified-sm btn-group-vertical-rsm" >
                                            <Radio
                                              buttonStyle
                                              id="forecast-rad-1"
                                              name="forecast-filter"
                                              onChange={changeFilter}
                                              checked={forecastFilter === '12H'} value="12H"
                                            >
                                                12h
                                            </Radio>
                                            <Radio
                                              buttonStyle
                                              id="forecast-rad-2"
                                              name="forecast-filter"
                                              onChange={changeFilter}
                                              checked={forecastFilter === '3H'}
                                              value="3H"
                                            >
                                                3h
                                            </Radio>
                                        </ButtonGroup>
                                    </div>
                                </div>
                                <div className="col-md-9 col-lg-7">
                                    {
                                        forecast.map((current, index) => (
                                            <div className="row pseudo-paragraph" key={`forecast-${index}`}>
                                                <WeatherTemperature
                                                  className="pull-left"
                                                  date={new Date((index * forecastInterval)
                                                        + lastForecast)}
                                                  metric={current.metric}
                                                  weatherType={current.weatherTypes[0]}
                                                  minTemperature={current.temperature.min}
                                                  maxTemperature={current.temperature.max}
                                                  currTemperature={current.temperature.curr}
                                                />
                                                <DetailedInfoTable className="pull-right clear-500" weather={current} />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        );
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
    forecastFilter: PropTypes.string.isRequired,
    changeFilter: PropTypes.func.isRequired,
};

WeatherForecastSummary.defaultProps = {
    className: '',
    forecast: [],
};

export default WeatherForecastSummary;
