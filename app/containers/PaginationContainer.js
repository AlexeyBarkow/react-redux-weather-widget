import React, { PropTypes, Component, Children } from 'react';
import Pagination from '../components/Pagination';

class PaginationContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currPage: 0,
            itemsCount: Children.count(props.children),
        };
    }

    componentWillReceiveProps(newProps) {
        const { children, pageSize } = newProps;
        const { pageSize: oldPageSize } = this.props;
        const { itemsCount: oldCount } = this.state;
        const itemsCount = Children.count(children);
        const newState = {};

        if (oldCount !== itemsCount) {
            newState.itemsCount = itemsCount;
        }

        if (oldPageSize !== pageSize) {
            newState.currPage = 0;
        }

        if (newState.itemsCount !== undefined || newState.currPage !== undefined) {
            this.setState(newState);
        }
    }

    navigateTo = newPage => () => {
        const { itemsCount, currPage } = this.state;
        const { pageSize } = this.props;

        if (newPage >= 0 &&
            newPage < Math.trunc(itemsCount / pageSize) + 1 &&
            newPage !== currPage) {
            this.setState({
                currPage: newPage,
            });
        }
    };

    render() {
        const { className, pageSize, children } = this.props;
        const { currPage, itemsCount } = this.state;

        return (
            <div className={className}>
                <section>
                    { children.slice(
                        pageSize * currPage, (pageSize * (currPage + 1))) }
                </section>
                { itemsCount > pageSize &&
                    <Pagination
                      className=""
                      navigateTo={this.navigateTo}
                      currPage={currPage}
                      pagesCount={Math.trunc(itemsCount / pageSize) + 1}
                      paginationMaxLength={8}
                    />
                }
            </div>
        );
    }
}

PaginationContainer.propTypes = {
    pageSize: PropTypes.number,
    className: PropTypes.string,
    children: PropTypes.array,
};

PaginationContainer.defaultProps = {
    pageSize: 10,
    className: '',
    children: [],
};

export default PaginationContainer;
