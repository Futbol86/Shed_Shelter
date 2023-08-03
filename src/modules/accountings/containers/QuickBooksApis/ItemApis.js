import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, formValueSelector, change, reset, getFormValues, SubmissionError} from "redux-form";
import {onSubmitActions} from "redux-form-submit-saga";
import {QUICKBOOKS_ITEM_APIS_FORM_NAME} from "../../constants";
import {validateRequired} from "../../../../components/common/Form/FieldLevelValidation";
import { 
    doQuickBooksGetItems, doQuickBooksGetAItem
} from '../../actions';
import {
    getQuickBooksItems, getQuickBooksItem, getQuickBooksItemError
} from '../../selectors';
import QuickBooksItemApisComponent from '../../components/QuickBooksApis/ItemApis';

class ItemApis extends Component {
    componentDidMount() {
        this.props.initialize({
            "DataType": "item",
            "IncomeAccountRef": {
                "name": "Income Account 1",
                "value": 94
            },     
            "ExpenseAccountRef": {
                "name": "Expense Account 1",
                "value": 96
            },
        })
    }

    handleUpdateItem = (data) => {
        this.props.changeFieldValue("Id", data.Id);
        this.props.changeFieldValue("SyncToken", data.SyncToken);
        this.props.changeFieldValue("Name", data.Name);
        this.props.changeFieldValue("QtyOnHand", data.QtyOnHand);
        this.props.changeFieldValue("IncomeAccountRef", data.IncomeAccountRef);
        this.props.changeFieldValue("ExpenseAccountRef", data.ExpenseAccountRef);
        this.props.changeFieldValue("Description", data.Description);
    }

    render() {
        return (
            <QuickBooksItemApisComponent {...this.props} handleUpdateItem={this.handleUpdateItem}/>
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
    //errors.QtyOnHand = validateRequired(values.QtyOnHand);
    errors.IncomeAccountRef = validateRequired(values.IncomeAccountRef);
    errors.ExpenseAccountRef = validateRequired(values.ExpenseAccountRef);
    //errors.Description = validateRequired(values.Description);

    return errors;
};

const formSelector = formValueSelector(QUICKBOOKS_ITEM_APIS_FORM_NAME);
const mapStateToProps = (state) => ({
    quickBooksItems:     getQuickBooksItems(state),
    quickBooksItem:      getQuickBooksItem(state),
    quickBooksItemError: getQuickBooksItemError(state),

    ItemId:              formSelector(state, "ItemId"),
    SubItem:             formSelector(state, "SubItem"),
});

const mapDispatchToProps = (dispatch) => ({
    doQuickBooksGetItems:            payload => dispatch(doQuickBooksGetItems(payload)),  
    doQuickBooksGetAItem:            payload => dispatch(doQuickBooksGetAItem(payload)), 

    changeFieldValue: function (field, value) {
        dispatch(change(QUICKBOOKS_ITEM_APIS_FORM_NAME, field, value))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: QUICKBOOKS_ITEM_APIS_FORM_NAME,
        onSubmit: onSubmitActions(QUICKBOOKS_ITEM_APIS_FORM_NAME),
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
        validate
    })(ItemApis)
);