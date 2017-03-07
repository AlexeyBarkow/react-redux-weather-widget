import React, { PropTypes } from 'react';
import classnames from 'classnames/dedupe';
import WeatherSummary from './WeatherSummary';
import { formatDate } from '../utils/unifiedDateFormat';

// ToDo: add highlighting
function FilteredItem({ className, weather, metric }) {
    return (
        <section className={classnames(className, 'modal-content')}>
            <div className="modal-header">
                <h4 className="modal-title">{`${weather.city}, ${weather.country}`}</h4>
            </div>
            <div className="modal-body">
                <WeatherSummary weather={weather} shortView formatDate={date => `${formatDate(date)}`} metric={metric} />
            </div>
        </section>
    );
}

FilteredItem.propTypes = {
    className: PropTypes.string,
    weather: PropTypes.object.isRequired,
    metric: PropTypes.string.isRequired,
};

FilteredItem.defaultProps = {
    className: '',
};

export default FilteredItem;
