import React, { PropTypes } from 'react';
import ClickOutComponent from 'react-onclickout';
import Button from '../components/Button';

class ButtonDropDown extends ClickOutComponent {
    constructor() {
        super();
        this.toggleClick = ::this.toggleClick;
        this.state = {
            open: false,
        };
    }

    toggleClick() {
        this.setState({
            open: !this.state.open,
        });
    }

    onClickOut() {
        const { open } = this.state;
        if (open) {
            this.setState({ open: false });
        }
    }

    render() {
        const { open } = this.state;
        const {
            children,
            value,
            className,
            dropDownClassName,
            caretClassName,
        } = this.props;
        return (
            <div
              className={`dropdown btn-group ${
                open
                ? 'open'
                : ''}`}
            >
                <Button className={`${className || ''} dropdown-toggle`} onClickHandler={this.toggleClick}>
                    {value}
                    <span className={caretClassName || 'caret'} />
                </Button>
                <ul className={`${dropDownClassName || ''} dropdown-menu`}>
                    {children}
                </ul>
            </div>
        );
    }
}

ButtonDropDown.propTypes = {
    children: PropTypes.node,
    value: PropTypes.string,
    className: PropTypes.string,
    dropDownClassName: PropTypes.string,
    caretClassName: PropTypes.string,
};

ButtonDropDown.defaultProps = {
    children: null,
    value: '',
    className: '',
    dropDownClassName: '',
    caretClassName: '',
};

export default ButtonDropDown;
