import React, { PropTypes } from 'react';

function MainContainer({ children, className }) {
    return (
        <main className={className}>
            {children}
        </main>
    );
}

MainContainer.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

MainContainer.defaultProps = {
    className: '',
};

export default MainContainer;
