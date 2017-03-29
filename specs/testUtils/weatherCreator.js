import times from 'lodash/times';
import { WEATHER_ICON_TYPES_MAP } from '../../app/utils/constants';

const icons = Object.keys(WEATHER_ICON_TYPES_MAP);

export function createInfoAbout(city, index, more = {
    country: 'test',
}) {
    return {
        ...more,
        humidity: index,
        temperature: {
            curr: index,
            min: index - 1,
            max: index + 1,
        },
        pressure: index,
        wind: { speed: index },
        weatherTypes: [{ icon: `${icons[index % icons.length].slice(1)}d` }],
        calculationTime: new Date(2017, 2, 1 + index),
        city,
    };
}

export function createInfoArray(
    city,
    count,
    indexStart = 1,
    disarray = i => i,
    more = () => undefined,
) {
    return times(count, index =>
        createInfoAbout(typeof city === 'function' ? city(index + indexStart) : city,
            disarray(index + indexStart),
            more(index + indexStart),
    ));
}
