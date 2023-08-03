import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import { onSubmitActions } from 'redux-form-submit-saga';

import ProfileFormComponent from '../components/ProfileFormComponent';
import {PROFILE_FORM_NAME} from '../constants';
import {validateImgLink, validateRequired} from "../../../components/common/Form/FieldLevelValidation";

const validate = values => {
    const errors = {};
    errors.firstName = validateRequired(values.firstName);
    if (values.avatar) {
        errors.avatar = validateImgLink(values.avatar);
    }
    return errors;
};

const mapStateToProps = (state) => ({
    initialValues: state.users.profileForm.user
});

export default
connect(mapStateToProps, null)(
    reduxForm({
        form: PROFILE_FORM_NAME,
        onSubmit: onSubmitActions(PROFILE_FORM_NAME),
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
        validate
    })(ProfileFormComponent)
);