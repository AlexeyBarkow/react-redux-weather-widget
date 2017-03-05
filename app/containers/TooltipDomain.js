import React, { PropTypes, Component } from 'react';
import classnames from 'classnames/dedupe';

class TooltipDomain extends Component {
    renderTooltip = ({ top, left, right, bottom, tooltipText }, type, index) => {
        if (type === 'bottom') {
            return (
                <div key={`${type}-${index}`} style={{ left: (left + right) / 2, top: bottom }} className={classnames('tooltip in', type)}>
                    <div className="tooltip-inner">
                        {tooltipText}
                    </div>
                    <div className="tooltip-arrow" />
                </div>
            );
        }
        return undefined;
    };

    render() {
        const { children, className, tooltip } = this.props;
        const tooltips = Object.entries(tooltip)
            .map(([type, data], index) => data && this.renderTooltip(data, type, index));

        return (
            <div className={classnames(className, 'tooltip-container')}>
                { children }
                { tooltips }
            </div>
        );
    }
}

TooltipDomain.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    tooltip: PropTypes.object.isRequired,
};

TooltipDomain.defaultProps = {
    children: null,
    className: '',
};

export default TooltipDomain;
