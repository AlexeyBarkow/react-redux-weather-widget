import React, { Component, PropTypes } from 'react';

class StaticFixator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFixed: window.pageYOffset > 0,
            contentHeight: 0,
        };
        this.handleScroll = this::this.handleScroll;
        this.getContent = this::this.getContent;
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleScroll);
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleScroll);
        window.removeEventListener('scroll', this.handleScroll);
    }

    getContent(element) {
        if (!element) {
            return;
        }
        this.contentElement = element;
    }

    handleScroll() {
        const { isFixed } = this.state;
        const { contentElement } = this;
        const newState = {
            contentHeight: `${contentElement.offsetHeight}px`,
        };

        if (isFixed && window.pageYOffset === 0) {
            newState.isFixed = false;
        } else if (!isFixed && window.pageYOffset > 0) {
            newState.isFixed = true;
        }

        this.setState(newState);
    }

    render() {
        const { isFixed, contentHeight } = this.state;
        const { placeholderClass, children } = this.props;

        return (
            <div className={`${isFixed ? 'fixed-children' : ''}`}>
                {
                    isFixed
                        ?
                          (<div
                            className={placeholderClass}
                            style={{ height: contentHeight }}
                          />)
                        : undefined
                }
                <div className="fixed-wrapper" ref={this.getContent}>
                    { children }
                </div>
            </div>
        );
    }
}

StaticFixator.propTypes = {
    placeholderClass: PropTypes.string,
    children: PropTypes.element.isRequired,
};

StaticFixator.defaultProps = {
    placeholderClass: '',
};

export default StaticFixator;
