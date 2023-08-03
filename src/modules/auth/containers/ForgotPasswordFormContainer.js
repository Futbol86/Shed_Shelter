import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import { onSubmitActions } from 'redux-form-submit-saga';

import {FORGOT_PASSWORD_FORM_NAME} from '../constants';
import {validateEmail, validateRequired} from "../../../components/common/Form/FieldLevelValidation";
import ForgotPasswordFormComponent from "../components/ForgotPasswordFormComponent";

const validate = values => {
    const errors = {};
    errors.email = validateRequired(values.email);
    if (values.email) {
        errors.email = validateEmail(values.email);
    }
    if(!values.captcharesponse) {
        errors.captcharesponse = 'Please confirm you are not a robot.';
    }
    return errors;
};

export default
connect(null, null)(
    reduxForm({
        form: FORGOT_PASSWORD_FORM_NAME,
        fields: ['email', 'captcharesponse'],
        onSubmit: onSubmitActions(FORGOT_PASSWORD_FORM_NAME),
        validate
    })(ForgotPasswordFormComponent)
);