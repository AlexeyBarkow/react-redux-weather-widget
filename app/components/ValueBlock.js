import React, { PropTypes } from 'react';
import Tooltip from '../containers/Tooltip';

function ValueBlock({ className, imgUrl, value, tooltip, valueClass }) {
    return (
        <div className={`row ${className}`}>
            <div className="col-xs-7 col-sm-5 col-md-7">
                <Tooltip className="weather-pictures" placement="bottom" tooltipText={tooltip}>
                    <img src={imgUrl} alt="" />
                </Tooltip>
            </div>
            <p className="weather-text col-xs-5 col-sm-7 col-md-5">
                {value}
                <span className={valueClass} />
            </p>
        </div>
    );
}

ValueBlock.propTypes = {
    className: PropTypes.string,
    value: PropTypes.number.isRequired,
    imgUrl: PropTypes.string.isRequired,
    tooltip: PropTypes.string.isRequired,
    valueClass: PropTypes.string,
};

ValueBlock.defaultProps = {
    className: '',
    valueClass: '',
};

export default ValueBlock;
