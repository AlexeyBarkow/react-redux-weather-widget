import React, { PropTypes, Component } from 'react';
import classnames from 'classnames/dedupe';

class Tooltip extends Component {
    componentWillUnmount() {
        const { destroyTooltip, placement } = this.props;
        destroyTooltip(placement);
    }

    onHover = () => {
        const rect = this.el.getBoundingClientRect();
        const top = rect.top + document.body.scrollTop;
        const left = rect.left + document.body.scrollLeft;
        const bottom = top + this.el.offsetHeight;
        const right = left + this.el.offsetWidth;
        const { createTooltip, tooltipText, placement } = this.props;

        createTooltip(tooltipText, { top, left, bottom, right }, placement);
    };

    onLeave = () => {
        const { destroyTooltip, placement } = this.props;

        destroyTooltip(placement);
    };

    getTooltipRef = (el) => {
        if (!el) {
            return;
        }
        this.el = el;
    }

    render() {
        const { className, children } = this.props;

        return (
            <div ref={this.getTooltipRef} onMouseOver={this.onHover} onMouseOut={this.onLeave} className={classnames(className, 'tooltip-container')}>
                { children }
            </div>
        );
    }
}

Tooltip.propTypes = {
    className: PropTypes.string,
    tooltipText: PropTypes.string.isRequired,
    children: PropTypes.node,
    placement: PropTypes.string,
    createTooltip: PropTypes.func.isRequired,
    destroyTooltip: PropTypes.func.isRequired,
};

Tooltip.defaultProps = {
    className: '',
    children: null,
    placement: 'bottom',
};

export default Tooltip;
