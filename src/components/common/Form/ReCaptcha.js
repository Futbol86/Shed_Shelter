import React from 'react';
import PropTypes from 'prop-types';
import ReCAPTCHA from 'react-google-recaptcha';

import {FormGroup} from 'reactstrap';


const ReCaptcha = (props) => (
    <FormGroup>
        {props.meta.touched && props.meta.error}
        <ReCAPTCHA
            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
            onChange={response => props.input.onChange(response)}
        />
    </FormGroup>
);

ReCaptcha.propTypes = {
    input: PropTypes.object.isRequired
};

export default ReCaptcha;