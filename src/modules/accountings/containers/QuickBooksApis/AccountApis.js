import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, formValueSelector, change, reset, getFormValues, SubmissionError} from "redux-form";
import {onSubmitActions} from "redux-form-submit-saga";
import {QUICKBOOKS_ACCOUNT_APIS_FORM_NAME} from "../../constants";
import {validateRequired} from "../../../../components/common/Form/FieldLevelValidation";
import { 
    doQuickBooksGetAccounts, doQuickBooksGetAnAccount
} from '../../actions';
import { 
    getQuickBooksAccounts, getQuickBooksAccount, getQuickBooksAccountError
} from '../../selectors';
import QuickBooksAccountApisComponent from '../../components/QuickBooksApis/AccountApis';

class AccountApis extends Component {
    componentDidMount() {
        this.props.initialize({
            DataType: "account"
        })
    }

    handleUpdateAccount = (data) => {
        this.props.changeFieldValue("Id", data.Id);
        this.props.changeFieldValue("SyncToken", data.SyncToken);
        this.props.changeFieldValue("Name", data.Name);
        this.props.changeFieldValue("AccountType", data.AccountType);
    }

    render() {
        return (
            <QuickBooksAccountApisComponent {...this.props} handleUpdateAccount={this.handleUpdateAccount}/>
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
    errors.AccountType = validateRequired(values.AccountType);

    return errors;
};

const formSelector = formValueSelector(QUICKBOOKS_ACCOUNT_APIS_FORM_NAME);
const mapStateToProps = (state) => ({
    quickBooksAccounts:     getQuickBooksAccounts(state),
    quickBooksAccount:      getQuickBooksAccount(state),
    quickBooksAccountError: getQuickBooksAccountError(state),

    AccountId:             formSelector(state, "AccountId"),
});

const mapDispatchToProps = (dispatch) => ({
    doQuickBooksGetAccounts:            payload => dispatch(doQuickBooksGetAccounts(payload)),  
    doQuickBooksGetAnAccount:           payload => dispatch(doQuickBooksGetAnAccount(payload)), 

    changeFieldValue: function (field, value) {
        dispatch(change(QUICKBOOKS_ACCOUNT_APIS_FORM_NAME, field, value))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: QUICKBOOKS_ACCOUNT_APIS_FORM_NAME,
        onSubmit: onSubmitActions(QUICKBOOKS_ACCOUNT_APIS_FORM_NAME),
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
        validate
    })(AccountApis)
);