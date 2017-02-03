import React, { Component, PropTypes } from 'react';
import ButtonToolbar from './ButtonToolbar';

class Form extends Component {
    render() {
        const { children, className, submitHandler, autocompleteOff } = this.props;
        return (
            <form className={className} onSubmit={submitHandler} autoComplete={autocompleteOff ? 'off' : null}>
                <ButtonToolbar>
                    { children }
                </ButtonToolbar>
            </form>
        );
    }
}

Form.propTypes = {
    children: PropTypes.node.isRequired,
    submitHandler: PropTypes.func,
    className: PropTypes.string,
    autocompleteOff: PropTypes.bool,
};

Form.defaultProps = {
    submitHandler: null,
    className: '',
    autocompleteOff: null,
};

export default Form;
