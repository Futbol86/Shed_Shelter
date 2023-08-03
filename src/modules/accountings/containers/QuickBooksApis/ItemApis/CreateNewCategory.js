import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, formValueSelector, change, reset, getFormValues, SubmissionError} from "redux-form";
import {onSubmitActions} from "redux-form-submit-saga";
import {QUICKBOOKS_ITEM_APIS_CREATE_NEW_CATEGORY_FORM_NAME} from "../../../constants";
import {validateRequired} from "../../../../../components/common/Form/FieldLevelValidation";
import { 
} from '../../../actions';
import {
} from '../../../selectors';
import QuickBooksCreateNewCategoryComponent from '../../../components/QuickBooksApis/ItemApis/CreateNewCategory';

class CreateNewCategory extends Component {
    componentDidMount() {
        this.props.initialize({
            "DataType": "item",
            "Type": "Category",
            "MinorVersion": 4 // to set item type = 'Category', we must pass MinorVersion = 4
        })
    }

    render() {
        return (
            <QuickBooksCreateNewCategoryComponent {...this.props} />
        );
    }
}

/**
 * Form validation
 *
 * @param values
 */
const validate = (values) => {
    const errors = {};

    errors.Name = validateRequired(values.Name);
    errors.Type = validateRequired(values.Type);

    return errors;
};

const formSelector = formValueSelector(QUICKBOOKS_ITEM_APIS_CREATE_NEW_CATEGORY_FORM_NAME);
const mapStateToProps = (state) => ({
    SubItem:             formSelector(state, "SubItem"),
});

const mapDispatchToProps = (dispatch) => ({
    changeFieldValue: function (field, value) {
        dispatch(change(QUICKBOOKS_ITEM_APIS_CREATE_NEW_CATEGORY_FORM_NAME, field, value))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: QUICKBOOKS_ITEM_APIS_CREATE_NEW_CATEGORY_FORM_NAME,
        onSubmit: onSubmitActions(QUICKBOOKS_ITEM_APIS_CREATE_NEW_CATEGORY_FORM_NAME),
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
        validate
    })(CreateNewCategory)
);