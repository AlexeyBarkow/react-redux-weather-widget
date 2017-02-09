import React, { Component, PropTypes } from 'react';
import ButtonToolbar from '../components/ButtonToolbar';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasFocus: false,
        };
        this.onBlurHandler = this::this.onBlurHandler;
        this.onFocusHandler = this::this.onFocusHandler;
    }

    onBlurHandler() {
        this.setState({
            hasFocus: false,
        });
    }

    onFocusHandler() {
        this.setState({
            hasFocus: true,
        });
    }

    render() {
        const { hasFocus } = this.state;
        const { children, className, submitHandler, autocompleteOff } = this.props;
        return (
            <form className={`${hasFocus ? 'active-form ' : ''}${className}`} onSubmit={submitHandler} onFocus={this.onFocusHandler} onBlur={this.onBlurHandler} autoComplete={autocompleteOff ? 'off' : null}>
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