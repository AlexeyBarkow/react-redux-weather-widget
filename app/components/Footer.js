import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames/dedupe';

function Footer({ children, className }) {
    return (
        <footer className={classnames(className, 'container')}>
            <div className="row">
                <p className="col-sm-3 col-xs-4">
                    <Link to="/home">home</Link> / <Link to="/about">about</Link>
                </p>
                <p className="col-sm-9 col-xs-8 text-right">
                    © 2017 Aliaksei Barkou, <a href="mailto:imbarkowal@gmail.com">imbarkowal@gmail.com</a>
                </p>
            </div>
            {children}
        </footer>
    );
}

Footer.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

Footer.defaultProps = {
    children: null,
    className: '',
};

export default Footer;
