import React, { PropTypes } from 'react';
import classnames from 'classnames/dedupe';
import times from 'lodash/times';
import PaginationItem from './PaginationItem';

function Pagination({
    className,
    currPage,
    pagesCount,
    paginationMaxLength,
    navigateTo,
    numberMapper,
}) {
    const offset = Math.trunc((paginationMaxLength - 2) / 2);

    return pagesCount > 1 ? (
        <nav className={classnames(className, 'pagination-wrapper')} aria-label="Page navigation">
            <ul className="pagination">
                <PaginationItem
                    className={classnames(currPage <= 0 && 'disabled')}
                    onClickHandler={navigateTo(currPage - 1)}
                >
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous page</span>
                </PaginationItem>
                <PaginationItem
                    className={classnames(currPage === 0 && 'active')}
                    onClickHandler={navigateTo(0)}
                >
                    { numberMapper(0) }
                </PaginationItem>
                {
                    currPage - offset > 1 &&
                    <PaginationItem className="disabled">
                        ...
                    </PaginationItem>
                }
                {
                    times(Math.min(offset, currPage - 1), (index) => {
                        const pageNumber = (currPage - Math.min(offset, currPage - 1)) + index;
                        return (
                            <PaginationItem key={`page-${pageNumber}`} onClickHandler={navigateTo(pageNumber)}>
                                { numberMapper(pageNumber) }
                            </PaginationItem>
                        );
                    })
                }
                {
                    currPage !== 0 && currPage !== pagesCount - 1 &&
                    <PaginationItem className="active">
                        { numberMapper(currPage) }
                    </PaginationItem>
                }
                {
                    times(Math.min(offset, pagesCount - currPage - 2), (index) => {
                        const pageNumber = index + currPage + 1;
                        return (
                            <PaginationItem key={`page-${pageNumber}`} onClickHandler={navigateTo(pageNumber)}>
                                { numberMapper(pageNumber) }
                            </PaginationItem>
                        );
                    })
                }
                {
                    pagesCount - offset - currPage > 2 &&
                    <PaginationItem className="disabled">
                        ...
                    </PaginationItem>
                }
                <PaginationItem
                    className={classnames(currPage === pagesCount - 1 && 'active')}
                    onClickHandler={navigateTo(pagesCount - 1)}
                >
                    { numberMapper(pagesCount - 1) }
                </PaginationItem>
                <PaginationItem
                    className={classnames(currPage >= pagesCount - 1 && 'disabled')}
                    onClickHandler={navigateTo(currPage + 1)}
                >
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only">Next page</span>
                </PaginationItem>
            </ul>
        </nav>
    ) : null;
}

Pagination.propTypes = {
    className: PropTypes.string,
    currPage: PropTypes.number.isRequired,
    pagesCount: PropTypes.number.isRequired,
    paginationMaxLength: PropTypes.number,
    navigateTo: PropTypes.func.isRequired,
    numberMapper: PropTypes.func,
};

Pagination.defaultProps = {
    className: '',
    paginationMaxLength: 6,
    numberMapper: number => number + 1,
};

export default Pagination;
