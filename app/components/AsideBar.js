import React, { PropTypes } from 'react';
import css from '../styles/aside.scss';

function AsideBar({ className }) {
    return (
        <aside className={className}>
            {/*ToDo: create a separete component for this*/}
            <h3>Closest cities:</h3>
            <ul>
                <li>City1</li>
                <li>City2</li>
                <li>City3</li>
                <li>City4</li>
                <li>City5</li>
                <li>City6</li>
                <li>City7</li>
                <li>City8</li>
                <li>City9</li>
                <li>City0</li>
            </ul>
            {/*ToDo: create a separete component for this*/}
            <div className="google-map">
                <img src="http://placehold.it/450x450" alt="placehoder for google map" />
            </div>
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
