import React from 'react';
import {Input, FormText, ButtonGroup, Button} from 'reactstrap';
import classnames from 'classnames';

const FieldButtonCheckbox = ({input, meta: {error, touched, warning}, iconChecked, iconUnchecked, color}) => {
    if (touched && error)
        input = Object.assign({}, input, {className: classnames(input.className, 'is-invalid')});
    return (
        <ButtonGroup className="btn-group-toggle">
            <Button tag="label" color={color}>
                <Input type="checkbox" {...input} checked={input.value} />
                <i className={input.value ? iconChecked : iconUnchecked} />
                {touched && error && <FormText color="red">{error}</FormText>}
                {touched && warning && <FormText color="warning">{warning}</FormText>}
            </Button>
        </ButtonGroup>
    );
};

export default FieldButtonCheckbox;