import React from 'react';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

const optionRenderer = (option) => (
    <div className="text-dark">
        {(option.description) && `${option.description} `}
        {(option.thickness) && `${option.thickness} `}
        {(option.color) && option.color}
    </div>
);
const valueRenderer = (value) => (
    <strong>
        {(value.description) && `${value.description} `}
        {(value.thickness) && `${value.thickness} `}
        {(value.color) && `${value.color}`}
    </strong>
);


const BuildingProfileDropdown = ({ input, label, meta: { touched, error }, options}) => (
    <Select
        {...input}
        value={input.value || ''}
        options={options}
        valueRenderer={valueRenderer}
        optionRenderer={optionRenderer}
        multi={false}
        valueKey="id"
        clearable={false}
        searchable={false}
        onChange={(value) => input.onChange(value.id)}
        onBlur={() => input.onBlur(input.id)}
    />
);

export default BuildingProfileDropdown;