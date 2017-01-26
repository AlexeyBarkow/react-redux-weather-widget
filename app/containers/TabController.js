import React, { PropTypes, Component } from 'react';

class TabController extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { children } = this.props;
        return (
            <div className="tabs-container">
                {children}
            </div>
        );
    }
}

TabController.propTypes = {
    children: PropTypes.node,
};

TabController.defaultProps = {
    children: null,
};

export default TabController;
