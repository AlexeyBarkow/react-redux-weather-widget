import React, { PropTypes } from 'react';
import ClosestCities from './ClosestCities';
import Loading from './Loading';

function AsideBar({ className, nearestCities }) {
    return (
        <aside className={className}>
            {(() => {
                if (nearestCities.length === 0) {
                    if (nearestCities.error && nearestCities.error.code === 0) {
                        return (
                            <div>
                                <h3>Loading...</h3>
                                <Loading />
                            </div>
                        );
                    }
                    return (
                        <div className="error-container">
                            <h3>No cities found</h3>
                        </div>
                    );
                }
                return (
                    <ClosestCities
                      title={<h3>Nearest cities to your current location</h3>}
                      list={nearestCities}
                    />
                );
            })()}
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
