import React, { PropTypes } from 'react';
import classnames from 'classnames/dedupe';

function Table({ children, className, striped, bordered, condensed, hover }) {
    const tableClasses = classnames(
        striped && 'table-striped',
        bordered && 'table-bordered',
        condensed && 'table-condensed',
        hover && ' table-hover',
    );

    return (
        <div className={className}>
            <table className={tableClasses}>
                <tbody>
                    { children }
                </tbody>
            </table>
        </div>
    );
}

Table.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    striped: PropTypes.bool,
    bordered: PropTypes.bool,
    condensed: PropTypes.bool,
    hover: PropTypes.bool,
};

Table.defaultProps = {
    children: null,
    className: '',
    striped: false,
    bordered: false,
    condensed: false,
    hover: false,
};

export default Table;
