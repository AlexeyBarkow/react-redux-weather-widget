import React, { PropTypes } from 'react';
import classnames from 'classnames/dedupe';

function RenderedTooltip({ left, right, bottom, tooltipText, type }) {
    if (type === 'bottom') {
        return (
            <div style={{ left: (left + right) / 2, top: bottom }} className={classnames('tooltip in', type)}>
                <div className="tooltip-inner">
                    {tooltipText}
                </div>
                <div className="tooltip-arrow" />
            </div>
        );
    }
    return null;
}

RenderedTooltip.propTypes = {
    bottom: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired,
    tooltipText: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

export default RenderedTooltip;
