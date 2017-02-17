import React, { PropTypes } from 'react';

function Temperature({ metric, minTemperature, maxTemperature, currTemperature, className }) {
    return (
        <div className={className}>
            <p className="main-temperature">
                { currTemperature }
                <span className={`temperature-metric ${metric}`}>
                    { metric }
                </span>
            </p>
            {
                (minTemperature === undefined
                || maxTemperature === undefined
                || minTemperature < maxTemperature)
                &&
                (<p className="temperature-range">
                    <span className="min-temperature">
                        { minTemperature }
                        <span className={`temperature-metric ${metric}`}>
                            { metric }
                        </span>
                    </span>
                    {' — '}
                    <span className="max-temperature">
                        { maxTemperature }
                        <span className={`temperature-metric ${metric}`}>
                            { metric }
                        </span>
                    </span>
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
