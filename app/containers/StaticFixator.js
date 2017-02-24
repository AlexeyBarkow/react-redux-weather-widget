import React, { Component, PropTypes } from 'react';

class StaticFixator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFixed: window.pageYOffset > 0,
            contentHeight: 0,
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleScroll);
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleScroll);
        window.removeEventListener('scroll', this.handleScroll);
    }

    getContent = (element) => {
        if (!element) {
            return;
        }
        this.contentElement = element;
    };

    handleScroll = () => {
        const { isFixed } = this.state;
        const { alwaysFixed } = this.props;
        const { contentElement } = this;
        const fixedThreshold = alwaysFixed ? -1 : 0;
        const newState = {
            contentHeight: `${contentElement.offsetHeight}px`,
        };

        if (isFixed && window.pageYOffset <= fixedThreshold) {
            newState.isFixed = false;
        } else if (!isFixed && window.pageYOffset > fixedThreshold) {
            newState.isFixed = true;
        }

        this.setState(newState);
    };

    render() {
        const { isFixed, contentHeight } = this.state;
        const { placeholderClass, children } = this.props;

        return (
            <div className={`${isFixed ? 'fixed-children' : ''}`}>
                <div className="fixed-wrapper" ref={this.getContent}>
                    { children }
                </div>
                {
                    isFixed &&
                        (<div
                          className={placeholderClass}
                          style={{ height: contentHeight }}
                        />)
                }
            </div>
        );
    }
}

StaticFixator.propTypes = {
    placeholderClass: PropTypes.string,
    children: PropTypes.element.isRequired,
    alwaysFixed: PropTypes.bool,
};

StaticFixator.defaultProps = {
    placeholderClass: '',
    alwaysFixed: false,
};

export default StaticFixator;
