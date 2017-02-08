import React, { PropTypes } from 'react';
import ClosestCities from './ClosestCities';
import css from '../styles/aside.scss';

function AsideBar({ className, nearestCities }) {
    return (
        <aside className={className}>
            {
                nearestCities.length === 0
                ? (
                    <div className="error-container">
                        <h3>No cities found</h3>
                    </div>
                )
                : (
                    <ClosestCities
                      title={<h3>Nearest cities to your current location</h3>}
                      list={nearestCities}
                    />
                )
            }
        </aside>
    );
}

AsideBar.propTypes = {
    className: PropTypes.string,
    nearestCities: PropTypes.array,
};

AsideBar.defaultProps = {
    className: '',
    nearestCities: [],
};

export default AsideBar;
