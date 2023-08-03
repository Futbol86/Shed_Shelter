import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import { onSubmitActions } from 'redux-form-submit-saga';

import ProfilePasswordComponent from '../components/ProfilePasswordComponent';
import {PROFILE_PASSWORD_FORM_NAME} from '../constants';
import auth from "../../../services/auth";
import {validateRequired} from "../../../components/common/Form/FieldLevelValidation";

const validate = values => {
    const errors = {};
    errors.currentPassword = validateRequired(values.currentPassword);
    errors.password = validateRequired(values.password);
    errors.passwordAgain = validateRequired(values.passwordAgain);
    if (values.password !== values.passwordAgain) {
        errors.passwordAgain = 'Password must be matched!';
    }
    return errors;
};

const {id} = auth.getUserFromStorage();

export default
connect(
    state => ({
        initialValues: {id}
    })
)(
    reduxForm({
        form: PROFILE_PASSWORD_FORM_NAME,
        onSubmit: onSubmitActions(PROFILE_PASSWORD_FORM_NAME),
        validate
    })(ProfilePasswordComponent)
);