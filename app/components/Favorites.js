import React, { PropTypes } from 'react';
import SingleFavorite from './SingleFavorite';

function Favorites({ className, favorites, metric }) {
    return (
        <div className={className}>
            {
                !favorites || favorites.length === 0
                ? <span>No favorites provided</span>
                : (
                    <div>
                        { favorites.map((curr, index) => (
                            <SingleFavorite key={`fav-${index}`} favorite={curr} metric={metric} />
                        )) }
                    </div>
                )
            }
        </div>
    );
}

Favorites.propTypes = {
    className: PropTypes.string,
    favorites: PropTypes.array,
    metric: PropTypes.string.isRequired,
};

Favorites.defaultProps = {
    className: '',
    favorites: [],
};

export default Favorites;
