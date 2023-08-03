import React from 'react';
import {Input, FormGroup, Label, FormText, Col} from 'reactstrap';
import classnames from "classnames";

const FieldHorizontal = ({input, label, type, readOnly, meta: {error, touched, warning}}) => {
    if (touched && error)
        input = Object.assign({}, input, {className: 'is-invalid'});
    return (
        <FormGroup className={classnames({error: touched && error})} row>
            <Col md="3">
                <Label className="col-form-label">{label}</Label>
            </Col>
            <Col xs="12" md="9">
                <Input {...input} placeholder={label} type={type} readOnly={readOnly} />
                {touched && error && <FormText color="red">{error}</FormText>}
                {touched && warning && <FormText color="warning">{warning}</FormText>}
            </Col>
        </FormGroup>
    )
};

export default FieldHorizontal;