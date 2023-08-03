import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, formValueSelector, change, reset, getFormValues, SubmissionError} from "redux-form";
import {onSubmitActions} from "redux-form-submit-saga";
import {QUICKBOOKS_CUSTOMER_APIS_FORM_NAME} from "../../constants";
import {validateRequired} from "../../../../components/common/Form/FieldLevelValidation";
import { 
    doQuickBooksGetCustomers, doQuickBooksGetACustomer
} from '../../actions';
import { 
    getQuickBooksCustomers, getQuickBooksCustomer, getQuickBooksCustomerError
} from '../../selectors';
import QuickBooksCustomerApisComponent from '../../components/QuickBooksApis/CustomerApis';

class CustomerApis extends Component {
    componentDidMount() {
        this.props.initialize({
            DataType: "customer",
            DisplayName: "Red Tiger IOT",
            Suffix: "Jr",
            Title: "Mr",
            MiddleName: "Tiger",
            FamilyName: "IOT",
            GivenName: "Hoang",
        })
    }

    handleUpdateCustomer = (data) => {
        this.props.changeFieldValue("Id", data.Id);
        this.props.changeFieldValue("SyncToken", data.SyncToken);
        this.props.changeFieldValue("DisplayName", data.DisplayName);
        this.props.changeFieldValue("Suffix", data.Suffix);
        this.props.changeFieldValue("Title", data.Title);
        this.props.changeFieldValue("MiddleName", data.MiddleName);
        this.props.changeFieldValue("FamilyName", data.FamilyName);
        this.props.changeFieldValue("GivenName", data.GivenName);
    }

    render() {
        return (
            <QuickBooksCustomerApisComponent {...this.props} handleUpdateCustomer={this.handleUpdateCustomer}/>
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

    errors.DisplayName = validateRequired(values.DisplayName);
    errors.Suffix = validateRequired(values.Suffix);
    errors.Title = validateRequired(values.Title);
    errors.MiddleName = validateRequired(values.MiddleName);
    errors.FamilyName = validateRequired(values.FamilyName);
    errors.GivenName = validateRequired(values.GivenName);

    return errors;
};

const formSelector = formValueSelector(QUICKBOOKS_CUSTOMER_APIS_FORM_NAME);
const mapStateToProps = (state) => ({
    quickBooksCustomers:     getQuickBooksCustomers(state),
    quickBooksCustomer:      getQuickBooksCustomer(state),
    quickBooksCustomerError: getQuickBooksCustomerError(state),

    CustomerId:              formSelector(state, "CustomerId"),
});

const mapDispatchToProps = (dispatch) => ({
    doQuickBooksGetCustomers:            payload => dispatch(doQuickBooksGetCustomers(payload)),  
    doQuickBooksGetACustomer:            payload => dispatch(doQuickBooksGetACustomer(payload)), 

    changeFieldValue: function (field, value) {
        dispatch(change(QUICKBOOKS_CUSTOMER_APIS_FORM_NAME, field, value))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: QUICKBOOKS_CUSTOMER_APIS_FORM_NAME,
        onSubmit: onSubmitActions(QUICKBOOKS_CUSTOMER_APIS_FORM_NAME),
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
        validate
    })(CustomerApis)
);