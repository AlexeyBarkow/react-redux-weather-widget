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

    handleEnterClick = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();

            const { validateField, fields, clearField, inputFieldProps } = this.props;
            const inputValue = event.target.value;

            if (validateField(inputValue)) {
                // it seems like there is an error in redux-form library:
                // first argument just returns stringified array variable name, lol
                if (!fields.reduce((flag, _, index, arr) =>
                    flag || arr.get(index) === inputValue, false)) {
                    fields.push(inputValue);
                }
                clearField(inputFieldProps.name);
            }
        }
    }

    render() {
        const { className, inputFieldProps, fields } = this.props;

        return (
            <div className={className}>
                <div className="form-control auto-form-height">
                    <div className="clearfix">
                        {
                            fields.map((_, index, arr) => (
                                <DeleteInputBox
                                  deleteHandler={() => { fields.remove(index); }}
                                  key={index}
                                >{ arr.get(index) }</DeleteInputBox>
                            ))
                        }
                    </div>
                    <Field
                      {...inputFieldProps}
                      onKeyPress={this.handleEnterClick}
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
};

MultipleInputFields.defaultProps = {
    className: '',
    fields: [],
    validateField: () => true,
};

export default MultipleInputFields;
