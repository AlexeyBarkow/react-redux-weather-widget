import React, { PropTypes } from 'react';
import Button from './Button';

function Logo({ className }) {
    return (
        <div className={className}>
            <Button className="navbar-brand" noDefaultStyles href="/">
                WeatherApp
            </Button>
        </div>
    );
}

Logo.propTypes = {
    className: PropTypes.string,
};

Logo.defaultProps = {
    className: '',
};

export default Logo;
