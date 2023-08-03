import React from 'react';
import {Input, FormGroup, Label, FormText} from 'reactstrap';
import classnames from "classnames";

const FieldStandard = ({input, label, type, readOnly, meta: {touched, error, warning}}) => {
    // console.log("Input of ", label, ": ", input);
    if (touched && error)
        input = Object.assign({}, input, {className: 'is-invalid'});
    return (
        <FormGroup className={classnames({error: touched && error})}>
            <Label>{label}</Label>
            <Input {...input} placeholder={label} type={type} readOnly={readOnly} />
            {touched && error && <FormText color="red">{error}</FormText>}
            {touched && warning && <FormText color="warning">{warning}</FormText>}
        </FormGroup>
    )
};

export default FieldStandard;