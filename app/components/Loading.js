import React, { PropTypes } from 'react';
import classnames from 'classnames/dedupe';
import _ from 'lodash';

function Loading({ dots, classNameSeed }) {
    const divs = [];
    _.times(dots, i => divs.push((
        <div className={classnames(classNameSeed, `${classNameSeed}-${i}`)} key={`${classNameSeed}-${i}`} />
    )));
    return (
        <div className={`${classNameSeed}-animate-loading`}>
            {
                divs.map(curr => curr)
            }
        </div>
    );
}

Loading.propTypes = {
    dots: PropTypes.number,
    classNameSeed: PropTypes.string,
};

Loading.defaultProps = {
    dots: 8,
    classNameSeed: 'ball',
};

export default Loading;
