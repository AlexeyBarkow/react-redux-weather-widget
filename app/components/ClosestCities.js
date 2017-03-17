import React, { PropTypes } from 'react';
import classnames from 'classnames/dedupe';
import Button from './Button';
import ButtonGroup from './ButtonGroup';
import { DEFAULT_COUNTRY_CODE } from '../utils/constants';

function ClosestCities({ list, className, title, keySeed }) {
    return (
        <div className={classnames(className, 'closest-cities-container')}>
            { title }
            <ButtonGroup vertical block>
                { list.map((city, index) => {
                    const text = `${city.name}${
                        city.countryCode !== DEFAULT_COUNTRY_CODE
                        ? `, ${city.countryCode}`
                        : ''}`;
                    return (
                        <Button title={text} key={`${keySeed}-${index}`} href={`/cities/${city.countryCode}/${city.name}`}>{ text }</Button>
                    );
                }) }
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
    className: '',
    keySeed: 'closest-city',
};

export default ClosestCities;
