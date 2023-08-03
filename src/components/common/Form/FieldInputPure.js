import React from 'react';
import {Input, FormText} from 'reactstrap';
import classnames from "classnames";

const FieldInputPure = ({input, label, type, readOnly, className, autoComplete, style, meta: {error, touched, warning}}) => {
    if (className)
        input = Object.assign({}, input, {className: classnames(input.className, className)});
    if (touched && error)
        input = Object.assign({}, input, {className: classnames(input.className, 'is-invalid')});
    return (
        <React.Fragment>
            <Input {...input} placeholder={label} type={type} readOnly={readOnly} style={style} autoComplete = {autoComplete}/>
            {touched && error && <FormText color="red">{error}</FormText>}
            {touched && warning && <FormText color="warning">{warning}</FormText>}
        </React.Fragment>
    )
};

export default FieldInputPure;