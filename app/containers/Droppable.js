import React, { Component, PropTypes } from 'react';
import classnames from 'classnames/dedupe';

class Droppable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dragover: false,
        };
    }

    componentWillUnmount() {
        this.setState({
            dragover: false,
        });
    }

    onDragEnter = (e) => {
        const { onDragEnter } = this.props;

        this.setState({
            dragover: true,
        });

        if (onDragEnter) {
            onDragEnter(e);
        }
    }

    onDragLeave = (e) => {
        const { onDragLeave } = this.props;
        this.setState({
            dragover: false,
        });

        if (onDragLeave) {
            onDragLeave(e);
        }
    }

    onDrop = (e) => {
        const { onDrop, dragData } = this.props;

        this.setState({
            dragover: false,
        });

        if (onDrop) {
            onDrop(e, dragData);
        }
    }

    render() {
        const { className, children } = this.props;
        const { dragover } = this.state;
        return (
            <div
              onDragEnter={this.onDragEnter}
              onDragLeave={this.onDragLeave}
              onDrop={this.onDrop}
              className={classnames(className, dragover && 'over')}
            >
                { children }
            </div>
        );
    }
}

Droppable.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    onDrop: PropTypes.func,
    onDragEnter: PropTypes.func,
    onDragLeave: PropTypes.func,
    dragData: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.number,
        PropTypes.array,
    ]),
};

Droppable.defaultProps = {
    className: '',
    children: null,
    onDrop: undefined,
    onDragEnter: undefined,
    onDragLeave: undefined,
    dragData: null,
};

export default Droppable;
