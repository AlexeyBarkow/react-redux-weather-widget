import React, { Component, PropTypes } from 'react';

class DropDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validationState: '',
        };
        this.validate = this::this.validate;
        this.dropValidationState = this::this.dropValidationState;
    }

    validate() {
        const { validationFunction, value } = this.props;
        if (validationFunction(value)) {
            this.setState({ validationState: 'has-success' });
        } else {
            this.setState({ validationState: 'has-error' });
        }
    }

    dropValidationState() {
        this.setState({
            validationState: '',
        });
    }

    render() {
        const {
            children,
            className,
            inputClassName,
            dataListClassName,
            name,
            value,
            placeholder,
            listId,
            onInputChange,
            errorBlock,
            validationFunction,
        } = this.props;
        const { validationState } = this.state;

        return (
            <div className={`${className} form-group ${validationState}`}>
                <input
                  className={`${inputClassName} form-control`}
                  type="text"
                  name={name}
                  value={value}
                  placeholder={placeholder}
                  list={listId}
                  onChange={onInputChange}
                  onFocus={this.dropValidationState}
                  onBlur={!!validationFunction && this.validate}
                />
                <datalist id={listId} className={dataListClassName}>
                    { children }
                </datalist>
                { validationState === 'has-error' && errorBlock }
            </div>
        );
    }
}

DropDown.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    dataListClassName: PropTypes.string,
    inputClassName: PropTypes.string,
    listId: PropTypes.string.isRequired,
    name: PropTypes.string,
    onInputChange: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    errorBlock: PropTypes.element,
    validationFunction: PropTypes.func,
};

DropDown.defaultProps = {
    children: null,
    className: '',
    dataListClassName: '',
    inputClassName: '',
    name: '',
    onInputChange: null,
    placeholder: '',
    value: '',
    errorBlock: null,
    validationFunction: null,
};

export default DropDown;
