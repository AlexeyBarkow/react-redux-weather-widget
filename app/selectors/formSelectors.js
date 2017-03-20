import { createSelector } from 'reselect';
import { formValueSelector } from 'redux-form';
import mapValues from 'lodash/mapValues';

const filterSelector = formValueSelector('filtersForm');
export const selectFilterFormValues = state => ({
    filterCityRadio: filterSelector(state, 'filterCityRadio'),
    filterDateCheckbox: filterSelector(state, 'filterDateCheckbox'),
    filterDatepickerArray: filterSelector(state, 'filterDatepickerArray'),
});

const validitySelect = (formName, fieldName) => ({ form }) =>
    (form && form[formName] && form[formName].syncErrors
        ? form[formName].syncErrors[fieldName]
        : undefined);

const dirtynessSelect = (formName, fieldName) => ({ form }) =>
    (form && form[formName] && form[formName].fields && form[formName].fields[fieldName]
        ? form[formName].fields[fieldName].touched
        : undefined);

const selectFilterFormValidity = createSelector(
    [validitySelect('filtersForm', 'city')],
    city => ({ city }),
);

const selectFilterFormDirtyness = createSelector(
    [dirtynessSelect('filtersForm', 'city')],
    city => ({ city }),
);

export const selectFilterFormMeta = createSelector(
    [selectFilterFormValidity, selectFilterFormDirtyness],
    (validity, dirtyness) => mapValues(validity, (value, key) => ({
        error: value,
        touched: dirtyness[key],
    })),
);
