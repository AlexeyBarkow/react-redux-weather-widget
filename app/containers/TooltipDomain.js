import React, { PropTypes } from 'react';
import classnames from 'classnames/dedupe';

const renderTooltip = ({ top, left, right, bottom, tooltipText }, type, index) => {
    if (type === 'bottom') {
        return (
            <div key={`${type}-${index}`} style={{ left, top: bottom }} className={classnames('tooltip in', type)}>
                <div className="tooltip-inner">
                    {tooltipText}
                </div>
                <div className="tooltip-arrow" />
            </div>
        );
    }
    return undefined;
};


function TooltipDomain({ children, className, tooltip }) {
    const tooltips = Object.entries(tooltip)
        .map(([type, data], index) => data && renderTooltip(data, type, index));

    return (
        <div className={classnames(className, 'tooltip-container')}>
            { children }
            { tooltips }
        </div>
    );
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
