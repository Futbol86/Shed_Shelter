/**
 * This will use react-select and its HOC react-virtualized-select for better-performance rendering
 */

import React from 'react';
import PropTypes from 'prop-types';
import VirtualizedSelect from 'react-virtualized-select'

//-- styles
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';

FieldAutoComplete.defaultProps = {
    multi: false,
    className: ""
};

FieldAutoComplete.propTypes = {
    input: PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
        onBlur: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
        onFocus: PropTypes.func.isRequired,
    }).isRequired,
    options: PropTypes.array.isRequired,
    multi: PropTypes.bool,
    className: PropTypes.string
};

export default function FieldAutoComplete({ input , options, multi, className }) {
    const { name, value, onBlur, onChange, onFocus } = input;
    let transformedValue = transformValue(value, options, multi);
    if (!transformedValue) {
        transformedValue = transformValue(value + '', options, multi);
    }

    return (
        <VirtualizedSelect
            valueKey="value"
            name={name}
            value={transformedValue}
            multi={multi}
            options={options}
            onChange={multi
                ? multiChangeHandler(onChange)
                : singleChangeHandler(onChange)
            }
            onBlur={() => onBlur(value)}
            onFocus={onFocus}
            className={className}
        />
    );
}

/**
 * onChange from redux-form Field has to be called explicitly.
 */
function singleChangeHandler(func) {
    return function handleSingleChange(value) {
        func(value ? value.value : '');
    };
}

/**
 * onBlur from redux-form Field has to be called explicitly.
 */
function multiChangeHandler(func) {
    return function handleMultiHandler(values) {
        func(values.map(value => value.value));
    };
}

/**
 * For single select, Redux Form keeps the value as a string, while React Select
 * wants the value in the form { value: "grape", label: "Grape" }
 *
 * * For multi select, Redux Form keeps the value as array of strings, while React Select
 * wants the array of values in the form [{ value: "grape", label: "Grape" }]
 */
function transformValue(value, options, multi) {
    if (multi && typeof value === 'string') return [];

    const filteredOptions = options.filter(option => {
        return multi
            ? value.indexOf(option.value) !== -1
            : option.value === value;
    });

    return multi ? filteredOptions : filteredOptions[0];
}