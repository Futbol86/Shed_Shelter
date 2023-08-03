import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, formValueSelector, change, reset, getFormValues, SubmissionError} from "redux-form";
import {onSubmitActions} from "redux-form-submit-saga";
import {QUICKBOOKS_INVOICE_APIS_FORM_NAME} from "../../constants";
import {validateRequired} from "../../../../components/common/Form/FieldLevelValidation";
import { 
    doQuickBooksGetInvoices, doQuickBooksGetAInvoice
} from '../../actions';
import {
    getQuickBooksInvoices, getQuickBooksInvoice, getQuickBooksInvoiceError
} from '../../selectors';
import QuickBooksInvoiceApisComponent from '../../components/QuickBooksApis/InvoiceApis';

class InvoiceApis extends Component {
    componentDidMount() {
        this.props.initialize({
            "DataType": "invoice"
        })
    }

    handleUpdateInvoice = (data) => {
        let LineFilter = data.Line.filter(p => p.Id !== undefined && p.Id !== null);

        this.props.changeFieldValue("Id", data.Id);
        this.props.changeFieldValue("SyncToken", data.SyncToken);
        this.props.changeFieldValue("CustomerRef", data.CustomerRef);

        this.props.changeFieldValue("Line", LineFilter);
    }

    render() {
        return (
            <QuickBooksInvoiceApisComponent {...this.props} handleUpdateInvoice={this.handleUpdateInvoice}/>
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

    errors.CustomerRef = validateRequired(values.CustomerRef);
    errors.Line = validateRequired(values.Line);

    return errors;
};

const formSelector = formValueSelector(QUICKBOOKS_INVOICE_APIS_FORM_NAME);
const mapStateToProps = (state) => ({
    quickBooksInvoices:     getQuickBooksInvoices(state),
    quickBooksInvoice:      getQuickBooksInvoice(state),
    quickBooksInvoiceError: getQuickBooksInvoiceError(state),

    InvoiceId:              formSelector(state, "InvoiceId")
});

const mapDispatchToProps = (dispatch) => ({
    doQuickBooksGetInvoices:            payload => dispatch(doQuickBooksGetInvoices(payload)),  
    doQuickBooksGetAInvoice:            payload => dispatch(doQuickBooksGetAInvoice(payload)), 

    changeFieldValue: function (field, value) {
        dispatch(change(QUICKBOOKS_INVOICE_APIS_FORM_NAME, field, value))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: QUICKBOOKS_INVOICE_APIS_FORM_NAME,
        onSubmit: onSubmitActions(QUICKBOOKS_INVOICE_APIS_FORM_NAME),
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
        validate
    })(InvoiceApis)
);