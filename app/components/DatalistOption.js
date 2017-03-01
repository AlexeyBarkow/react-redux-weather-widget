import React, { PropTypes } from 'react';

function DatalistOption({ children, value, selected, hiddenValue }) {
    return (
        <option data-value={hiddenValue} value={value} selected={selected}>
            { children || value }
        </option>
    );
}

DatalistOption.propTypes = {
    children: PropTypes.node,
    value: PropTypes.string,
    selected: PropTypes.bool,
    hiddenValue: PropTypes.number,
};

DatalistOption.defaultProps = {
    children: null,
    selected: null,
    value: undefined,
    hiddenValue: undefined,
};

export default DatalistOption;
