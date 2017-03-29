import React, { PropTypes } from 'react';
import map from 'lodash/map';
import DropDown from './DropDown';
import DatalistOption from './DatalistOption';

function AutocompleteField(props) {
    const { autocomplete, autocompleteName, ...theRest } = props;

    return (
        <DropDown {...theRest}>
            {
                autocomplete.input === autocompleteName
                ?
                map(autocomplete, (curr, index) => (
                    <DatalistOption hiddenValue={index} value={`${curr.name}, ${curr.countryCode}`} key={`${curr.name}-${index}`} />
                ))
                : undefined
            }
        </DropDown>
    );
}

AutocompleteField.propTypes = {
    autocomplete: PropTypes.array.isRequired,
    autocompleteName: PropTypes.string.isRequired,
};

export default AutocompleteField;
