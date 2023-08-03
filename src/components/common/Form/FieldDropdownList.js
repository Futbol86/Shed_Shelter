import React from 'react';
import { Input, FormText } from 'reactstrap';
import classnames from "classnames";

class FieldDropdownList extends React.Component {
    render() {
        const { input, data, valueField, textField, titleOption, className, meta: {error, touched} } = this.props;
        if (!data)
            return null;
            
        return (
            <React.Fragment>
                <Input type="select" {...input} className={`flat ${className}`}>
                    {titleOption ? <option value="">
                            {titleOption}
                        </option>
                        : null
                    }
                    {data.map((item, idx) => (
                        <option key={idx} value={item[valueField]}>
                            {item[textField]}
                        </option>
                    ))}
                </Input>
                {touched && error && <FormText color="red">{error}</FormText>}
            </React.Fragment>
        );
    }
}

export default FieldDropdownList;