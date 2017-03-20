import React, { PropTypes, Component } from 'react';
import { Field } from 'redux-form';
import entries from 'lodash/entries';
import every from 'lodash/every';
import DeleteInputBox from './DeleteInputBox';

class MultipleInputFields extends Component {
    shouldComponentUpdate(newProps) {
        const { inputFieldProps: newInputProps, ...rest } = newProps;
        const { inputFieldProps: oldInputProps, ...oldRest } = this.props;

        return !this.shallowEqual(rest, oldRest) ||
            !this.shallowEqual(newInputProps, oldInputProps);
    }

    shallowEqual = (obj1, obj2) => {
        if (obj1 === obj2) {
            return true;
        }
        const enriesObj1 = entries(obj1);
        if (entries.length !== entries(obj2)) {
            return false;
        }
        return every(
            enriesObj1,
            ([value, key]) => value === obj2[key],
        );
    };

    addNewField = (event) => {
        const { validateField, fields, clearField, inputFieldProps } = this.props;
        const inputValue = event.target.value;
        const isRemove = event.target.remove;

        if (validateField(inputValue)) {
            // it seems like there is an error in redux-form library:
            // first argument just returns stringified array variable name, lol
            const indexInArray = fields.reduce((flag, _, index, arr) =>
                ((flag !== -1 || arr.get(index) !== inputValue) ? flag : index), -1);

            if (indexInArray !== -1 && isRemove) {
                fields.remove(indexInArray);
            } else if (indexInArray === -1) {
                fields.push(inputValue);
            }
            clearField(inputFieldProps.name);
        }
    };

    handleEnterClick = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.addNewField(event);
        }
    };

    render() {
        const { className, inputFieldProps, fields, addNewFieldOn } = this.props;

        return (
            <div className={className}>
                <div className="form-control auto-form-height clearfix">
                    {
                        fields.length > 0 &&
                        <div className="clearfix delete-box-container">
                            {
                                fields.map((_, index, arr) => (
                                    <DeleteInputBox
                                      deleteHandler={() => { fields.remove(index); }}
                                      key={index}
                                    >{ arr.get(index) }</DeleteInputBox>
                                ))
                            }
                        </div>
                    }
                    <Field
                      onChangeHandler={addNewFieldOn === 'change'
                          ? this.addNewField
                          : undefined}
                      onKeyPress={addNewFieldOn === 'enter'
                          ? this.handleEnterClick
                          : undefined}
                      {...inputFieldProps}
                    />
                </div>
            </div>
        );
    }
}

MultipleInputFields.propTypes = {
    className: PropTypes.string,
    inputFieldProps: PropTypes.object.isRequired,
    fields: PropTypes.object,
    validateField: PropTypes.func,
    clearField: PropTypes.func.isRequired,
    addNewFieldOn: PropTypes.oneOf(['change', 'enter']),
};

MultipleInputFields.defaultProps = {
    className: '',
    fields: [],
    validateField: () => true,
    addNewFieldOn: 'enter',
};

export default MultipleInputFields;
