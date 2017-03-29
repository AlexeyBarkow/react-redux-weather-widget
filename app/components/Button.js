import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames/dedupe';
import Tooltip from '../containers/connectors/TooltipConnector';


class Button extends Component {
    onClick = (e) => {
        const { onClickHandler } = this.props;
        e.preventDefault();

        if (onClickHandler) {
            onClickHandler(e);
        }
    };

    render() {
        const {
            children,
            onClickHandler,
            className,
            href,
            disabled,
            link,
            noDefaultStyles,
            type,
            title,
            tooltip,
            primary,
            stretch,
            preventDefaultAnyway,
        } = this.props;
        const renderButton = (btnClassName = '') => {
            const classesToPass = classnames(
                !noDefaultStyles && `btn btn-${
                    link ? 'link' :
                    primary ? 'primary' : 'default'
                }`,
                stretch && 'stretch',
                btnClassName,
            );
            const clickHandler = onClickHandler || preventDefaultAnyway
            ? this.onClick
            : undefined;

            if (href !== undefined) {
                if (href[0] === '#') {
                    return (
                        <a
                          href={href}
                          disabled={disabled}
                          className={classesToPass}
                          title={title}
                          onClick={clickHandler}
                        >
                            { children }
                        </a>
                    );
                }
                return (
                    <Link
                      disabled={disabled}
                      className={classesToPass}
                      title={title}
                      to={href}
                      onClick={clickHandler}
                    >
                        { children }
                    </Link>
                );
            }
            return (
                <button
                  disabled={disabled}
                  className={classesToPass}
                  onClick={clickHandler}
                  type={type}
                >
                    { children }
                </button>
            );
        };

        if (tooltip) {
            return (
                <Tooltip className={className} {...tooltip}>
                    { renderButton() }
                </Tooltip>
            );
        }
        return renderButton(className);
    }
}

Button.propTypes = {
    children: PropTypes.node,
    onClickHandler: PropTypes.func,
    className: PropTypes.string,
    href: PropTypes.string,
    disabled: PropTypes.bool,
    noDefaultStyles: PropTypes.bool,
    type: PropTypes.string,
    link: PropTypes.bool,
    title: PropTypes.string,
    tooltip: PropTypes.object,
    primary: PropTypes.bool,
    stretch: PropTypes.bool,
    preventDefaultAnyway: PropTypes.bool,
};

Button.defaultProps = {
    children: null,
    onClickHandler: null,
    className: '',
    href: undefined,
    disabled: false,
    noDefaultStyles: false,
    type: null,
    link: false,
    title: null,
    primary: false,
    tooltip: null,
    stretch: false,
    preventDefaultAnyway: false,
};

export default Button;
