import React, { PropTypes } from 'react';
import FormatTemperature from './FormatTemperature';

function Temperature({ metric, minTemperature, maxTemperature, currTemperature, className }) {
    return (
        <div className={className}>
            <p className="main-temperature">
                <FormatTemperature value={currTemperature} metric={metric} />
            </p>
            {
                (minTemperature === undefined
                || maxTemperature === undefined
                || minTemperature < maxTemperature)
                &&
                (<p className="temperature-range">
                    <FormatTemperature className="min-temperature" value={minTemperature} metric={metric} />
                    {' — '}
                    <FormatTemperature className="max-temperature" value={minTemperature} metric={metric} />
                </p>)
            }
        </div>
    );
}

Temperature.propTypes = {
    metric: PropTypes.string.isRequired,
    minTemperature: PropTypes.number,
    maxTemperature: PropTypes.number,
    currTemperature: PropTypes.number.isRequired,
    className: PropTypes.string,
};

Temperature.defaultProps = {
    minTemperature: undefined,
    maxTemperature: undefined,
    className: '',
};

export default Temperature;
