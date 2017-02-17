import React, { PropTypes, Component } from 'react';

class Tooltip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHovered: false,
        };
    }

    onHover = () => {
        this.setState({
            isHovered: true,
        });
    };

    onLeave = () => {
        this.setState({
            isHovered: false,
        });
    };

    render() {
        const { isHovered } = this.state;
        const { className, tooltipText, children, placement } = this.props;
        return (
            <div onMouseOver={this.onHover} onMouseOut={this.onLeave} className={`${className} tooltip-container`}>
                { children }
                {
                    isHovered &&
                    (<div className={`tooltip in ${placement}`}>
                        <div className="tooltip-inner">
                            {tooltipText}
                        </div>
                        <div className="tooltip-arrow" />
                    </div>)
                }
            </div>
        );
    }
}

Tooltip.propTypes = {
    className: PropTypes.string,
    tooltipText: PropTypes.string.isRequired,
    children: PropTypes.node,
    placement: PropTypes.string,
};

Tooltip.defaultProps = {
    className: '',
    children: null,
    placement: 'bottom',
};

export default Tooltip;
