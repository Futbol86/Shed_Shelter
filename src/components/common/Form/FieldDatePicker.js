import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import classNames from 'classnames';

import 'react-datepicker/dist/react-datepicker.css';
import {FormText} from "reactstrap";

class FieldDatePicker extends PureComponent {

    handleChange = (date) => {
        this.props.input.onChange(date)
    };

    render () {
        const { input, className, meta: {error, touched, warning}, required, dateFormat, ...rest } = this.props;

        const dateValue = input.value ? new Date(input.value) : new Date();

        return (
            <div className={classNames('', { 'has-danger': error })}>
                <DatePicker {...rest}
                            autoOk
                            className={classNames(className, { 'form-control-danger': error })}
                            dateFormat={dateFormat || 'DD/MM/YYYY'}
                            showTimeSelect={false}
                            onChange={this.handleChange}
                            selected={dateValue}
                />
                <label className='form-col-form-label' htmlFor={input.name}>{required ? '*' : ''}</label>
                {error && <FormText color="red" dangerouslySetInnerHTML={{__html: error}} />}
            </div>
        );
    }
}

FieldDatePicker.propTypes = {
    className: PropTypes.string.isRequired,
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    required: PropTypes.bool
};

FieldDatePicker.defaultProps = {
    className: 'form-control',
    required: false
};

export default FieldDatePicker