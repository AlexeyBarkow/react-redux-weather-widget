import React, { Component, PropTypes } from 'react';
import ClickOutComponent from 'react-onclickout';
import Button from '../components/Button.jsx';

class ButtonDropDown extends ClickOutComponent {
    constructor() {
        super();
        this._toggleClick = this._toggleClick.bind(this);
        this.state = {
            open: false
        };
    }

    _toggleClick() {
        this.setState({
            open: !this.state.open
        });
    }

    onClickOut() {
        const { open } = this.state;
        if (open) {
            this.setState({
                open: false
            });
        }
    }

    render() {
        const { open } = this.state;
        const { children, value, className, dropDownClassName, caretClassName } = this.props;
        return (
            <div className={`dropdown btn-group ${ open ? 'open' : '' }`}>
                <Button className={ `${ className || '' } dropdown-toggle` }
                        onClickHandler={ this._toggleClick }>
                    { value }
                    <span className={ caretClassName || `caret` }></span>
                </Button>
                <ul className={ `${ dropDownClassName || '' } dropdown-menu` }>
                    { children }
                </ul>
            </div>
        );
    }
}

ButtonDropDown.PropTypes = {
    children: PropTypes.object,
    value: PropTypes.string,
    className: PropTypes.string,
    dropDownClassName: PropTypes.string,
    caretClassName: PropTypes.string
}

export default ButtonDropDown;
