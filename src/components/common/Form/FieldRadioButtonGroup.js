import React from 'react';
import {Input, Label, FormText} from 'reactstrap';
import classNames from 'classnames';

const FieldRadioButtonGroup = ({input, items, readOnly, value, groupClassName, className, meta: {error, touched, warning}}) => {
    if (items){
        if (!groupClassName)
            groupClassName  = "d-flex flex-column";
        if (!className)
            className       = "d-flex justify-content-between";
        return (
            <div className={groupClassName}>
                {items.map((item, idx) =>
                    <div key={idx} className={classNames(className, 'form-check',  (error && (input.value === item.id)) ? 'is-invalid text-red' : null)}>
                        <Label className="form-check-label">{item.name}</Label>
                        <Input {...input} type="radio" checked={(input.value === item.id)} value={item.id} />
                    </div>
                )}
                {error && <FormText color="red">{error}</FormText>}
                {touched && warning && <FormText color="warning">{warning}</FormText>}
            </div>
        );
    } else
        return null;
};

export default FieldRadioButtonGroup;