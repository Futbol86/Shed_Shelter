import React from 'react';
import {Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import classnames from "classnames";

const PrependField = ({input, label, type, readOnly, className, iconClassName, meta: {error, touched, warning}}) => {
    if (touched && error)
        input = Object.assign({}, input, {className: 'is-invalid'});
    return (
        <InputGroup className={classnames(className, {error: touched && error})}>
            <InputGroupAddon addonType="prepend">
                <InputGroupText>
                    <i className={iconClassName}></i>
                </InputGroupText>
            </InputGroupAddon>
            <Input {...input} placeholder={label} type={type} readOnly={readOnly} />
            {touched && error && <div className="invalid-feedback">{error}</div>}
            {touched && warning && <div className="invalid-feedback" color="warning">{warning}</div>}
        </InputGroup>
    )
};

export default PrependField;