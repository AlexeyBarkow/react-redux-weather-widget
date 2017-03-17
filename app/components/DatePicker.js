import React, { PropTypes, Component } from 'react';
import classnames from 'classnames/dedupe';
import 'bootstrap-datepicker/dist/css/bootstrap-datepicker.css';
import { getFirstDayOfMonth, getMonthLength, addDays, addMonths, compareDatesDay, convertToDateString } from '../utils/unifiedDateFormat';
import { WEEK_DAY_NAMES, MONTH_NAMES } from '../utils/constants';
import Button from './Button';
import Input from './Input';

function isDescendant(parent, child) {
    let node = child.parentNode;
    while (node != null) {
        if (node === parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

class DatePicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currDate: props.startDate ? new Date(props.startDate) : new Date(),
            hideInput: true,
        };
    }

    componentWillMount() {
        window.addEventListener('click', this.hideCalendar);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.hideCalendar);
    }

    getCalendar = (elem) => {
        if (!elem) {
            return;
        }
        this.calendar = elem;
    };

    toggleCalendar = (e) => {
        e.preventDefault();
        this.setState(({ hideInput }) => ({ hideInput: !hideInput }));
    };

    hideCalendar = (e) => {
        if (!isDescendant(this.calendar, e.target)) {
            this.setState({ hideInput: true });
        }
    };

    addMonth = (e) => {
        e.preventDefault();
        this.setState(({ currDate }) => ({
            currDate: addMonths(currDate, 1),
        }));
    };

    reduceMonth = (e) => {
        e.preventDefault();
        this.setState(({ currDate }) => ({
            currDate: addMonths(currDate, -1),
        }));
    };

    renderMonth = () => {
        const { currDate: date } = this.state;
        const { change, input: { name }, onChangeHandler, datepickerArray } = this.props;
        const firstDay = getFirstDayOfMonth(date);
        const daysInMonth = getMonthLength(date);
        const firstWeekday = firstDay.getDay();
        const today = new Date();
        const rows = [];
        const firstDateCopy = new Date(firstDay.valueOf());
        const setValue = (day, month, year, isActive) => (e) => {
            e.preventDefault();
            const value = convertToDateString(day, month, year);
            change(name, value);
            onChangeHandler({
                target: {
                    value,
                    remove: isActive,
                },
            });
        };

        let counter = -firstWeekday;
        addDays(firstDateCopy, -firstWeekday);

        while (counter < daysInMonth) {
            const cols = [];

            for (let i = 0; i < 7; i += 1) {
                addDays(firstDateCopy, 1);
                const isActive = datepickerArray.indexOf(
                    convertToDateString(
                        firstDateCopy.getDate(),
                        firstDateCopy.getMonth(),
                        firstDateCopy.getFullYear(),
                    )) !== -1;
                cols.push(
                    <td
                      key={i}
                      className={classnames(
                          'day',
                          counter + i < 0 && 'old',
                          counter + i >= daysInMonth && 'new',
                          compareDatesDay(today, firstDateCopy) && 'today',
                          isActive && 'active',
                      )}
                    >
                        <Button stretch noDefaultStyles href="#" onClickHandler={setValue(firstDateCopy.getDate(), firstDateCopy.getMonth(), firstDateCopy.getFullYear(), isActive)}>
                            { firstDateCopy.getDate() }
                        </Button>
                    </td>);
            }
            rows.push(<tr key={counter}>{ cols }</tr>);
            counter += 7;
        }

        return rows;
    };

    render() {
        const { className, title, input } = this.props;
        const { currDate: date, hideInput } = this.state;
        const month = date.getMonth();
        const year = date.getFullYear();

        return (
            <div ref={this.getCalendar} className={classnames(className, 'datepicker-wrapper')}>
                <Button onClickHandler={this.toggleCalendar}>Change</Button>
                {
                    !hideInput &&
                    <div className="datepicker datepicker-dropdown dropdown-menu datepicker-orient-left datepicker-orient-bottom">
                        <div className="datepicker-days">
                            <table className="table-condensed">
                                <thead>
                                    {
                                        title &&
                                        <tr>
                                            <th colsSpan="7">{ title }</th>
                                        </tr>
                                    }
                                    <tr>
                                        <th className="prev">
                                            <Button stretch noDefaultStyles onClickHandler={this.reduceMonth} href="#">&laquo;</Button>
                                        </th>
                                        <th colSpan="5">{ MONTH_NAMES[month] }, { year }</th>
                                        <th className="prev">
                                            <Button stretch noDefaultStyles onClickHandler={this.addMonth} href="#">&raquo;</Button>
                                        </th>
                                    </tr>
                                    <tr>
                                        {
                                            WEEK_DAY_NAMES.map((curr, index) => (
                                                <th key={index} className="dow">{ curr.slice(0, 2) }</th>
                                            ))
                                        }
                                    </tr>
                                </thead>
                                <tbody>{ this.renderMonth() }</tbody>
                            </table>
                        </div>
                    </div>
                }
                <Input type="hidden" {...input} />
            </div>
        );
    }
}

DatePicker.propTypes = {
    className: PropTypes.string,
    title: PropTypes.node,
    startDate: PropTypes.number,
    input: PropTypes.object.isRequired,
    onChangeHandler: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
    datepickerArray: PropTypes.array.isRequired,
};

DatePicker.defaultProps = {
    className: '',
    title: null,
    startDate: undefined,
};

export default DatePicker;
