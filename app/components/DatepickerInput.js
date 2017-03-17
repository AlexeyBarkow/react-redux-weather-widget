import React, { PropTypes } from 'react';
import { FieldArray } from 'redux-form';
import FormGroup from './FormGroup';
import DatePicker from './DatePicker';
import MultipleInputFields from './MultipleInputFields';

function DatepickerInput({
    className,
    name,
    inputName,
    clearField,
    changeField,
    datepickerArray,
    maxForwardInterval,
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
    clearField: PropTypes.func.isRequired,
    changeField: PropTypes.func.isRequired,
    datepickerArray: PropTypes.array,
};

DatepickerInput.defaultProps = {
    className: '',
    maxForwardInterval: undefined,
    datepickerArray: [],
};

export default DatepickerInput;
