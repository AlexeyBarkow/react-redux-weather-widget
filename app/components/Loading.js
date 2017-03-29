import React, { PropTypes } from 'react';
import classnames from 'classnames/dedupe';
import times from 'lodash/times';
import map from 'lodash/map';

function Loading({ dots, classNameSeed }) {
    const divs = [];
    times(dots, i => divs.push((
        <div className={classnames(classNameSeed, `${classNameSeed}-${i}`)} key={`${classNameSeed}-${i}`} />
    )));
    return (
        <div className={`${classNameSeed}-animate-loading`}>
            {
                map(divs, curr => curr)
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
