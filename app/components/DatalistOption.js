import React, { PropTypes } from 'react';

function DatalistOption({ children, value }) {
    return (
        <option value={value}>
            { children || value }
        </option>
    );
}

DatalistOption.propTypes = {
    children: PropTypes.node,
    value: PropTypes.string.isRequired,
};

DatalistOption.defaultProps = {
    children: null,
};

export default DatalistOption;
