import React, { PropTypes } from 'react';
import { getMonth, getDay, getHours, getMinutes } from '../utils/unifiedDateFormat';

function CalendarPage({ date, className, showTime }) {
    return (
        <div className={`${className}`}>
            <div className="calendar-wrapper">
                <div className="panel panel-default panel-calendar">
                    <div className="panel-heading"><span>{getMonth(date)}</span></div>
                    <div className="panel-body">{getDay(date)}</div>
                </div>
                { showTime && (
                    <div className="calendar__time clearfix">
                        <div className="calendar__time__clock">
                            {getHours(date)}
                        </div>
                        <div className="calendar__time__separator" />
                        <div className="calendar__time__clock">
                            {getMinutes(date)}
                        </div>
                    </div>
                ) }
            </div>
        </div>
    );
}

CalendarPage.propTypes = {
    date: PropTypes.any.isRequired,
    className: PropTypes.string,
    showTime: PropTypes.bool,
};

CalendarPage.defaultProps = {
    className: '',
    showTime: false,
};

export default CalendarPage;
