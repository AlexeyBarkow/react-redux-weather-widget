import React, { PropTypes } from 'react';
import { FieldArray } from 'redux-form';
import FormGroup from './FormGroup';
import DatePicker from './DatePicker';
import MultipleInputFields from '../containers/MultipleInputFields';

function DatepickerInput({
    className,
    name,
    inputName,
    clearField,
    changeField,
    datepickerArray,
    maxForwardInterval,
    maxBackwardInterval,
}) {
    return (
        <FormGroup className={className}>
            <FieldArray
              component={MultipleInputFields}
              name={name}
              addNewFieldOn="change"
              clearField={clearField}
              inputFieldProps={{
                  component: DatePicker,
                  name: inputName,
                  change: changeField,
                  maxForwardInterval,
                  maxBackwardInterval,
                  datepickerArray,
              }}
            />
        </FormGroup>
    );
}

DatepickerInput.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    inputName: PropTypes.string.isRequired,
    maxForwardInterval: PropTypes.number,
    maxBackwardInterval: PropTypes.number,
    clearField: PropTypes.func.isRequired,
    changeField: PropTypes.func.isRequired,
    datepickerArray: PropTypes.array,
};

DatepickerInput.defaultProps = {
    className: '',
    maxForwardInterval: -1,
    maxBackwardInterval: -1,
    datepickerArray: [],
};

export default DatepickerInput;
