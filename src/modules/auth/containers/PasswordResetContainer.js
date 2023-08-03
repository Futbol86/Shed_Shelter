import {reduxForm, change} from 'redux-form';
import {connect} from 'react-redux';
import { onSubmitActions } from 'redux-form-submit-saga';

import {PASSWORD_RESET_FORM_NAME} from '../constants';
import {validateRequired} from "../../../components/common/Form/FieldLevelValidation";
import PasswordResetComponent from "../components/PasswordResetComponent";

const validate = values => {
    const errors = {};
    errors.password = validateRequired(values.password);
    errors.passwordAgain = validateRequired(values.passwordAgain);
    if (values.password !== values.passwordAgain) {
        errors.passwordAgain = 'Password must be matched!';
    }
    return errors;
};

const mapDispatchToProps = function(dispatch) {
    return {
        // This will be passed as a property to the presentational component
        changeFieldValue: function (field, value) {
            dispatch(change(PASSWORD_RESET_FORM_NAME, field, value))
        }
    }
}

export default
connect(
    undefined,
    mapDispatchToProps
)(
    reduxForm({
        form: PASSWORD_RESET_FORM_NAME,
        fields: ['token', 'password', 'passwordAgain'],
        onSubmit: onSubmitActions(PASSWORD_RESET_FORM_NAME),
        validate
    })(PasswordResetComponent)
);