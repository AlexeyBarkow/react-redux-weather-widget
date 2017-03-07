import React, { PropTypes } from 'react';
import FilteredItem from './FilteredItem';

function FilteredItemsContainer({ className, items, metric }) {
    return (
        <section className={className}>
            {
                items.length > 0
                ? items.map((curr, index) => (<FilteredItem className="pseudo-paragraph" key={`fi-${index}`} weather={curr} metric={metric} />))
                : <p>No items found</p>
            }
        </section>
    );
}

FilteredItemsContainer.propTypes = {
    className: PropTypes.string,
    items: PropTypes.array,
    metric: PropTypes.string.isRequired,
};

FilteredItemsContainer.defaultProps = {
    className: '',
    items: [],
};

export default FilteredItemsContainer;
