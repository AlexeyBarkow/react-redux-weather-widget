import React, { PropTypes, Component } from 'react';
import classnames from 'classnames/dedupe';
import RenderedTooltip from '../components/RenderedTooltip';

class TooltipDomain extends Component {
    renderTooltip = (data, type, index) =>
        (<RenderedTooltip type={type} {...data} key={`${type}-${index}`} />);

    render() {
        const { children, className, tooltip } = this.props;
        const tooltips = Object.entries(tooltip)
            .reduce((res, [type, data], index) => {
                if (data) {
                    return [...res, this.renderTooltip(data, type, index)];
                }
                return res;
            }, []);

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
