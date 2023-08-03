import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, formValueSelector, change} from "redux-form";
import {onSubmitActions} from "redux-form-submit-saga";
import {DOCS_FORM_SHEET_FORM_NAME} from "../constants";
import FormSheetComponent from "../components/FormSheet";

class FormSheet extends Component {
    componentDidMount() {
        this.props.initialize({formType: "office-forms"});
    }

    render() {
        return (
            <FormSheetComponent {...this.props} />
        )
    }
}

/**
 * Form validation
 *
 * @param values
 */

const formSelector = formValueSelector(DOCS_FORM_SHEET_FORM_NAME);
const mapStateToProps = (state) => ({
    formType:         formSelector(state, 'formType'),
});

export default connect(mapStateToProps, {})(
    reduxForm({
        form: DOCS_FORM_SHEET_FORM_NAME,
        onSubmit: onSubmitActions(DOCS_FORM_SHEET_FORM_NAME),
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
    })(FormSheet)
);