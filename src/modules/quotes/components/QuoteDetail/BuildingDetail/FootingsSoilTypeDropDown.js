import React from 'react';

import Select from 'react-select';
import 'react-select/dist/react-select.css';
import {PREDEFINED_FOOTINGS_WARNING_SOIL_TYPES} from "../../../../../constants";

const optionRenderer = (option) => (
    <div className={PREDEFINED_FOOTINGS_WARNING_SOIL_TYPES.includes(option.type) ? "text-danger" : "text-dark"}>
        {option.type}
        {(option.surface) && ` (${option.surface})`}
        {(option.foundation) && ` - ${option.foundation}`}
    </div>
);

const valueRenderer = (value) => (
    <strong>
        {value.type}
        {(value.surface) && ` (${value.surface})`}
    </strong>
);


const FootingsSoilTypeDropDown = ({ input, label, meta: { touched, error }, options}) => (
    <Select
        {...input}
        value={input.value || ''}
        options={options}
        valueRenderer={valueRenderer}
        optionRenderer={optionRenderer}
        multi={false}
        valueKey="type"
        clearable={false}
        searchable={false}
        onChange={(value) => input.onChange(value.type)}
        onBlur={() => input.onBlur(input.type)}
    />
);

export default FootingsSoilTypeDropDown;