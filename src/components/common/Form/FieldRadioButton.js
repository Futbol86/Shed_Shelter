import React from 'react';
import {Input, FormGroup, Label, FormText} from 'reactstrap';

const FieldRadioButton = ({input, label, readOnly, inline, value, meta: {error, touched, warning}}) => {
    if (touched && error)
        input = Object.assign({}, input, {className: 'is-invalid'});
    return (
        <FormGroup check inline={inline}>
            <Label check>
                <Input type="radio" {...input} checked={input.value} value={value} />
                {label}
            </Label>
            {touched && error && <FormText color="red">{error}</FormText>}
            {touched && warning && <FormText color="warning">{warning}</FormText>}
        </FormGroup>
    );
    /*
        <FormGroup check inline>
            <Input className="form-check-input" type="radio" id="inline-radio1" name="inline-radios" value="option1"/>
            <Label className="form-check-label" check htmlFor="inline-radio1">One</Label>
        </FormGroup>
     */
};

export default FieldRadioButton;