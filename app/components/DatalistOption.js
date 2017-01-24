import React from 'react';

const DatalistOption = ({ children, value }) => (
    <option value={value}>
        {children}
    </option>
);

export default DatalistOption;
