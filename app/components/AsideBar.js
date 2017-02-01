import React, { PropTypes } from 'react';
import ClosestCities from './ClosestCities';
import css from '../styles/aside.scss';

// temporary data filler
const closestCities = [
    'City1',
    'City2',
    'City3',
    'City4',
    'City5',
];

function AsideBar({ className }) {
    return (
        <aside className={className}>
            <ClosestCities
              title={(<h3>Closest cities to your current location</h3>)}
              list={closestCities}
            />
        </aside>
    );
}

AsideBar.propTypes = {
    className: PropTypes.string,
};

AsideBar.defaultProps = {
    className: '',
};

export default AsideBar;
