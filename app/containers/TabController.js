import React, { PropTypes, Component } from 'react';
import css from '../styles/tabs.scss';

class TabController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTabIndex: props.defaultSelectedTabIndex,
        };
        this.setSelectedTabIndex = this::this.setSelectedTabIndex;
    }

    getChildContext() {
        const { selectedTabIndex } = this.state;
        const { setSelectedTabIndex } = this;
        return {
            selectedTabIndex,
            setSelectedTabIndex,
        };
    }

    setSelectedTabIndex(newIndex) {
        this.setState({
            selectedTabIndex: newIndex,
        });
    }

    render() {
        const { children } = this.props;
        return (
            <div className="tabs">
                {children}
            </div>
        );
    }
}

TabController.childContextTypes = {
    selectedTabIndex: PropTypes.string,
    setSelectedTabIndex: PropTypes.func,
};

TabController.propTypes = {
    children: PropTypes.node,
    defaultSelectedTabIndex: PropTypes.string,
};

TabController.defaultProps = {
    children: null,
    defaultSelectedTabIndex: '',
};

export default TabController;
