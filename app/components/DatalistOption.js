import React, { PropTypes } from 'react';

function DatalistOption({ children, value }){
    return (
        <option value={value}>
            {children}
        </option>
    );
}

DatalistOption.propTypes = {
    children: PropTypes.node.isRequired,
    value: PropTypes.string,
};

DatalistOption.defaultProps = {
    value: '',
};

export default DatalistOption;
