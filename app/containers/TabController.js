import React, { PropTypes, Component } from 'react';
import classnames from 'classnames/dedupe';
import '../styles/tabs.scss';

class TabController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTabIndex: props.defaultSelectedTabIndex,
        };
    }

    getChildContext() {
        const { selectedTabIndex } = this.state;
        const { setSelectedTabIndex } = this;
        return {
            selectedTabIndex,
            setSelectedTabIndex,
        };
    }

    setSelectedTabIndex = (newIndex) => {
        this.setState({
            selectedTabIndex: newIndex,
        });
    };

    render() {
        const { children, className } = this.props;
        return (
            <div className={classnames('tabs', className)}>
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
    className: PropTypes.string,
    children: PropTypes.node,
    defaultSelectedTabIndex: PropTypes.string,
};

TabController.defaultProps = {
    children: null,
    defaultSelectedTabIndex: '',
    className: '',
};

export default TabController;
