import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import CustomInput from './CustomInput';
import DatepickerInput from './DatepickerInput';

function WeatherDayPicker({
    className,
    filterDateCheckboxValue,
    filterDatepickerArray,
    maxForwardInterval,
    maxBackwardInterval,
    prefix,
    changeField,
}) {
    const checkboxName = `${prefix}DateCheckbox`;
    const datepickerName = `${prefix}DatepickerArray`;
    const datepickerInputName = `${prefix}DatepickerInput`;

    return (
        <div className={className}>
            <h2>Days to filter weather</h2>
            <div className="pseudo-paragraph">
                <Field
                    name={checkboxName}
                    id={`${prefix}-date-now`}
                    type="checkbox"
                    className="custom-radio"
                    component={CustomInput}
                >Right now</Field>
                {
                    !filterDateCheckboxValue &&
                    <DatepickerInput
                        clearField={(name) => { changeField(name, ''); }}
                        changeField={changeField}
                        maxForwardInterval={maxForwardInterval}
                        maxBackwardInterval={maxBackwardInterval}
                        name={datepickerName}
                        change={changeField}
                        inputName={datepickerInputName}
                        datepickerArray={filterDatepickerArray}
                    />
                }
            </div>
        </div>
    );
}

WeatherDayPicker.propTypes = {
    className: PropTypes.string,
    maxForwardInterval: PropTypes.number,
    maxBackwardInterval: PropTypes.number,
    prefix: PropTypes.string,
    filterDateCheckboxValue: PropTypes.bool,
    changeField: PropTypes.func.isRequired,
    filterDatepickerArray: PropTypes.array,
};

WeatherDayPicker.defaultProps = {
    prefix: 'filters',
    className: '',
    maxForwardInterval: -1,
    maxBackwardInterval: -1,
    filterDateCheckboxValue: false,
    filterDatepickerArray: [],
};

export default WeatherDayPicker;
