import React, { Component, PropTypes } from 'react';
import classnames from 'classnames/dedupe';

class Draggable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dragging: false,
        };
    }

    componentWillUnmount() {
        this.setState({
            dragging: false,
        });
    }

    onDragOver = (e) => {
        e.preventDefault();
    }

    handleDragStart = (e) => {
        const { dataOnDragStart, setDragData, onDragStart } = this.props;

        setDragData(dataOnDragStart);
        onDragStart(e);

        this.setState({
            dragging: true,
        });
    }

    handleDragEnd = () => {
        const { dropData } = this.props;

        dropData();

        this.setState({
            dragging: false,
        });
    }

    render() {
        const { className, classNameWhenDragging, children } = this.props;
        const { dragging } = this.state;
        return (
            <div
                draggable="true"
                onDragStart={this.handleDragStart}
                onDragEnd={this.handleDragEnd}
                onDragOver={this.onDragOver}
                className={classnames(className, dragging && classNameWhenDragging)}
            >
                { children }
            </div>
        );
    }
}

Draggable.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    classNameWhenDragging: PropTypes.string,
    dataOnDragStart: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.number,
        PropTypes.array,
    ]),
    setDragData: PropTypes.func.isRequired,
    dropData: PropTypes.func.isRequired,
    onDragStart: PropTypes.func,
};

Draggable.defaultProps = {
    className: '',
    classNameWhenDragging: 'dragging',
    dataOnDragStart: null,
    onDragStart: () => undefined,
};

export default Draggable;
