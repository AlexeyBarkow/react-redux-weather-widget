import React, { Component, PropTypes } from 'react';
import ButtonToolbar from './ButtonToolbar';

class Form extends Component {
    render() {
        const { children, className, submitHandler } = this.props;
        return (
            <form className={className} onSubmit={submitHandler}>
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
};

Form.defaultProps = {
    submitHandler: null,
    className: '',
};

export default Form;
