import React, { PropTypes } from 'react';
import ClosestCities from './ClosestCities';
import Loading from './Loading';

function AsideBar({ className, nearestCities, getNearestTo }) {
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
                            <h3>{ (nearestCities.error && nearestCities.error.message) || 'No cities found' }</h3>
                            <p>
                                <a href="#" onClick={getNearestTo}>Retry?</a>
                            </p>
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
    getNearestTo: PropTypes.func.isRequired,
};

AsideBar.defaultProps = {
    className: '',
    nearestCities: [],
};

export default AsideBar;
