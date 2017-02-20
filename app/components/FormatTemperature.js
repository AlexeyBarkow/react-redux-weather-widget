import React, { PropTypes } from 'react';
import { convertValueToMetric } from '../utils/weatherAPI';

function FormatTemperature({ value, metric, className }) {
    return (
        <span className={className}>
            { convertValueToMetric(value, metric) }
            <span className={`temperature-metric ${metric}`}>
                { metric }
            </span>
        </span>
    );
}

FormatTemperature.propTypes = {
    value: PropTypes.number.isRequired,
    metric: PropTypes.string.isRequired,
    className: PropTypes.string,
};

FormatTemperature.defaultProps = {
    className: '',
};

export default FormatTemperature;
