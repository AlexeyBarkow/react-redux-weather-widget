import React, { PropTypes } from 'react';
import FiltersForm from './FiltersForm';

function FiltersContainer({ children }) {
    return (
        <div className="container-fluid">
            <h1>Apply filters to your form</h1>
            <FiltersForm />
            { children }
        </div>
    );
}

FiltersContainer.propTypes = {
    children: PropTypes.node,
};

FiltersContainer.defaultProps = {
    children: null,
};

export default FiltersContainer;
