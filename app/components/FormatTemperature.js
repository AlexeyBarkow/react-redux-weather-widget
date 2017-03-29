import React, { PropTypes } from 'react';
import classnames from 'classnames/dedupe';
import { convertValueToMetric } from '../utils/weatherAPI';

function FormatTemperature({ value, metric, className }) {
    return (
        <span className={className}>
            { convertValueToMetric(value, metric) }
            <span className={classnames(metric, 'temperature-metric')}>
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
