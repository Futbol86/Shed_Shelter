import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getFormValues, formValueSelector} from 'redux-form';

import {DOC_loadListAccountingLog, DOC_changeActiveModal, DOC_exportAccountingLogToPDF, DOC_clearAccountingLogPDF} from "../../actions";
import {getAccountingLogList, getAccountingLogRemotePDF} from "../../selectors";
import {getDocCurrentModalId} from "../../../documents/selectors";
import {DOCS_ACCOUNTING_LOG_FORM_NAME, DOCS_TYPE_ACCOUNTING_LOGS_SHEET} from "../../constants";
import AccountingLogModalComponent from "../../components/Accounting/AccountingLogModal";

class AccountingLogModal extends Component {
    componentDidMount() {
        const {quoteId} = this.props;
        let filter = {};
        filter.quoteId = quoteId;
        this.props.DOC_loadListAccountingLog({filter});
    }

    componentDidUpdate() {
        const {remotePDF} = this.props;

        let blobPDF, pdfFileURL;
        if (remotePDF){
            blobPDF = new Blob([remotePDF], {type: 'application/pdf'});
            //Build a URL from the file
            pdfFileURL = window.URL.createObjectURL(blobPDF);
            //Open the URL on new Window
            window.open(pdfFileURL, '_blank');
        }
    }

    handleModalChange = (modalId) => {
        this.props.DOC_changeActiveModal({modalId});
    };

    handleModalClose = () => {
        this.props.DOC_clearAccountingLogPDF();
        this.handleModalChange(0);
    }

    handleExportPDFFile = () => {
        this.props.DOC_exportAccountingLogToPDF({
            pageId: DOCS_TYPE_ACCOUNTING_LOGS_SHEET,
            pageData: {
                accountingLogs: this.props.accountingLogs,
            }
        });
    }

    render() {
        return (
            <AccountingLogModalComponent {...this.props} handleModalClose={this.handleModalClose} 
                                                         handleExportPDFFile={this.handleExportPDFFile}/>
        );
    }
}

const formSelector = formValueSelector(DOCS_ACCOUNTING_LOG_FORM_NAME);
const mapStateToProps = (state) => ({
    currentModalId:     getDocCurrentModalId(state),
    accountingLogs:     getAccountingLogList(state),
    remotePDF:          getAccountingLogRemotePDF(state),
});

export default connect(mapStateToProps, {DOC_loadListAccountingLog, DOC_changeActiveModal, 
                                         DOC_exportAccountingLogToPDF, DOC_clearAccountingLogPDF})(AccountingLogModal);