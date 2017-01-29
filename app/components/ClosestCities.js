import React, { PropTypes } from 'react';
import Button from './Button';
import ButtonGroup from './ButtonGroup';

function ClosestCities({ list, className, title, keySeed }) {
    return (
        <div className={`${className} closest-cities-container`}>
            { title }
            <ButtonGroup vertical block>
                { list.map((city, index) => (
                    <Button key={`${keySeed}-${index}`} className="" href={city}>{ city }</Button>
                )) }
            </ButtonGroup>
        </div>
    );
}

ClosestCities.propTypes = {
    list: PropTypes.array,
    className: PropTypes.string,
    title: PropTypes.node.isRequired,
    keySeed: PropTypes.string,
};

ClosestCities.defaultProps = {
    list: [],
    className: null,
    keySeed: 'closest-city',
};

export default ClosestCities;
