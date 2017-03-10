import { formValueSelector } from 'redux-form';

const filterSelector = formValueSelector('filtersForm');
export const selectFilterFormValues = state => ({
    filterCityRadio: filterSelector(state, 'filterCityRadio'),
});
