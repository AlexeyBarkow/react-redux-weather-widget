import React, { PropTypes } from 'react';
import forOwn from 'lodash/forOwn';
import CustomInput from './CustomInput';
import Tooltip from '../containers/connectors/TooltipConnector';
import { IMAGES_BASE_PATH } from '../utils/constants';

function WeatherTypeFields({ className, weatherIcons, icons }) {
    return (
        <div className={className}>
            <h2>Select preferred weather types</h2>
            <ul className="filters-form__icons-list">
                {(() => {
                    const inputs = [];
                    forOwn(weatherIcons, ({ input }, key) => {
                        inputs.push(
                            <li key={`weather-checkbox-${key}`}>
                                <CustomInput noControl className="filters-form__icons-list__icon" id={key} type="checkbox" {...input}>
                                    <Tooltip placement="bottom" tooltipText={icons[key]}>
                                        <div className="icon-wrapper">
                                            <img className="icon" src={`${IMAGES_BASE_PATH}${key.slice(1)}d.png`} alt="" />
                                        </div>
                                    </Tooltip>
                                </CustomInput>
                            </li>);
                    });
                    return inputs;
                })()}
            </ul>
        </div>
    );
}

WeatherTypeFields.propTypes = {
    className: PropTypes.string,
    weatherIcons: PropTypes.object.isRequired,
    icons: PropTypes.object.isRequired,
};

WeatherTypeFields.defaultProps = {
    className: '',
};

export default WeatherTypeFields;
