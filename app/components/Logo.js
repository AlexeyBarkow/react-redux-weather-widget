import React, { PropTypes } from 'react';
import Button from './Button';

function Logo({ className, height }) {
    return (
        <div className={className}>
            <Button noDefaultStyles href="/">
                <img height={height} src="http://placehold.it/150x150" alt="logo" />
                <p>lorem ipsum</p>
            </Button>
        </div>
    );
}

Logo.propTypes = {
    className: PropTypes.string,
    height: PropTypes.string,
};

Logo.defaultProps = {
    className: '',
    height: null,
};

export default Logo;
