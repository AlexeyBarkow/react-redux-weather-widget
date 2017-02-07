// import { createSelector } from 'reselect';
export const weatherOverallSelector = ({
    city,
    location,
    weatherTypes,
}) => ({
    city,
    location,
    main: weatherTypes ? weatherTypes[0].main : 'default',
});
//ToDo: Remove this line
export const eslintFiller = {};
