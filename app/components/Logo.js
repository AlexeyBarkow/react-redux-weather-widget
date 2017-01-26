import React, { PropTypes } from 'react';

function Logo({ className }) {
    return (
        <div className={className}>
            <figure className="text-center">
                <img src="http://placehold.it/150x150" alt="logo" />
                <figcaption>lorem ipsum</figcaption>
            </figure>
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
