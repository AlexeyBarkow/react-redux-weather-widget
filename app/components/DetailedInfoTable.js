import React, { PropTypes } from 'react';
import Table from './Table';
import ValueBlock from './ValueBlock';
import { fromMetheoDirection } from '../utils/weatherAPI';

function DetailedInfoTable({ weather, className }) {
    return (
        <Table className={className} striped bordered condensed hover>
            <ValueBlock tooltip="Humidity" value={weather.humidity} valueClass="temperature-percent" />
            <ValueBlock tooltip="Coludiness" value={weather.clouds} valueClass="temperature-percent" />
            <ValueBlock tooltip="Athmospheric pressure" value={weather.pressure} valueClass="temperature-pressure" />
            <ValueBlock tooltip="Wind speed" value={weather.wind.speed} valueClass="km-h" />
            <ValueBlock tooltip="Wind direction" value={fromMetheoDirection(weather.wind.direction)} />
            {
                weather.rain
                ? <ValueBlock tooltip="Precipitation chance" value={weather.rain * 100} valueClass="temperature-percent" /> : null
            }
            {
                weather.snow
                ? <ValueBlock tooltip="Snow chance" value={weather.snow * 100} valueClass="temperature-percent" /> : null
            }
        </Table>
    );
}

DetailedInfoTable.propTypes = {
    weather: PropTypes.object.isRequired,
    className: PropTypes.string,
};

DetailedInfoTable.defaultProps = {
    className: '',
};

export default DetailedInfoTable;
