import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import { onSubmitActions } from 'redux-form-submit-saga';

import AuthSigninComponent from '../components/AuthSigninComponent';
import {LOGIN_FORM_NAME} from '../constants';
import {validateEmail, validateRequired} from "../../../components/common/Form/FieldLevelValidation";

const validate = values => {
    const errors = {};
    errors.email = validateRequired(values.email);
    if (errors.email == null)
        errors.email = validateEmail(values.email);
    errors.password = validateRequired(values.password);
    return errors;
};

export default 
    connect(null, null)(
        reduxForm({
            form: LOGIN_FORM_NAME,
            onSubmit: onSubmitActions(LOGIN_FORM_NAME),
            validate
        })(AuthSigninComponent)
    );