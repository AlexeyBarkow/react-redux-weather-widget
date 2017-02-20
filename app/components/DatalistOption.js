import React, { PropTypes } from 'react';

function DatalistOption({ children, value, selected }) {
    return (
        <option value={value} selected={selected}>
            { children || value }
        </option>
    );
}

DatalistOption.propTypes = {
    children: PropTypes.node,
    value: PropTypes.string.isRequired,
    selected: PropTypes.bool,
};

DatalistOption.defaultProps = {
    children: null,
    selected: null,
};

export default DatalistOption;
