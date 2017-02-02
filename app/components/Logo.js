import React, { PropTypes } from 'react';
import Button from './Button';

function Logo({ className, height, logoSrc }) {
    return (
        <div className={className}>
            <Button noDefaultStyles href="/">
                <img className="logo-img" height={height} src={logoSrc} alt="logo" />
                <p>lorem ipsum</p>
            </Button>
        </div>
    );
}

Logo.propTypes = {
    className: PropTypes.string,
    height: PropTypes.string,
    logoSrc: PropTypes.string.isRequired,
};

Logo.defaultProps = {
    className: '',
    height: null,
};

export default Logo;
