import React, { Component, PropTypes } from 'react';
import ButtonToolbar from '../components/ButtonToolbar';
import '../styles/forms.scss';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasFocus: false,
        };
    }

    onBlurHandler = () => {
        this.setState({
            hasFocus: false,
        });
    };

    onFocusHandler = () => {
        this.setState({
            hasFocus: true,
        });
    };

    render() {
        const { hasFocus } = this.state;
        const { children, className, onSubmit, autocompleteOff } = this.props;
        return (
            <form
              className={`${hasFocus ? 'active-form ' : ''}${className}`}
              onSubmit={onSubmit}
              onFocus={this.onFocusHandler}
              onBlur={this.onBlurHandler}
              autoComplete={autocompleteOff ? 'off' : null}
            >
                <ButtonToolbar>
                    { children }
                </ButtonToolbar>
            </form>
        );
    }
}
Form.propTypes = {
    children: PropTypes.node.isRequired,
    onSubmit: PropTypes.func,
    className: PropTypes.string,
    autocompleteOff: PropTypes.bool,
};

Form.defaultProps = {
    onSubmit: null,
    className: '',
    autocompleteOff: null,
};

export default Form;
