import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, formValueSelector, change, getFormValues} from "redux-form";
import {onSubmitActions} from "redux-form-submit-saga";
import {push} from "connected-react-router";

import {openModalAction} from "../../../../actions";
import {DOCS_OFFICE_FORM_NAME, DOCS_TYPE_OFFICE_FORM_SHEET} from "../../constants";
import {DOC_changeActiveModal} from "../../../documents/actions";
import {getDocCurrentModalId} from "../../../documents/selectors";
import {DOC_loadAQuoteInfo, DOC_loadAnOfficeForm, DOC_clearAnOfficeForm, DOC_exportOfficeFormPDF, DOC_clearRemoteFormSheetPDF} from "../../actions";
import {getAQuoteInfo, getAnOfficeFormInfo, getFormRemotePDF} from "../../selectors";
import OfficeFormSheetComponent from "../../components/FormSheet/OfficeFormSheet";

class OfficeFormSheet extends Component {
    componentDidMount() {
        let {quoteId}  = this.props;

        this.props.initialize({quoteId});
        this.props.DOC_loadAQuoteInfo({id: quoteId});
        this.props.DOC_loadAnOfficeForm({quoteId});
    }

    componentDidUpdate(prevProps) {
        const {officeFormDetail} = this.props;

        if(officeFormDetail && !prevProps.officeFormDetail || 
            (officeFormDetail && prevProps.officeFormDetail && officeFormDetail.quoteId !== prevProps.officeFormDetail.quoteId)) {
            this.props.initialize(officeFormDetail);
        }

        const {remotePDF} = this.props;

        let blobPDF, pdfFileURL;
        if (remotePDF){
            blobPDF = new Blob([remotePDF], {type: 'application/pdf'});
            //Build a URL from the file
            pdfFileURL = window.URL.createObjectURL(blobPDF);
            //Open the URL on new Window
            window.open(pdfFileURL, '_blank');

            this.props.DOC_clearRemoteFormSheetPDF();
        }
    }

    componentWillUnmount() {
        this.props.DOC_clearAnOfficeForm();
    }

    handleExportPDFFile = (evt) => {
        evt.preventDefault();
        const {quoteDetail, formDatas} = this.props;

        this.props.DOC_exportOfficeFormPDF({
            pageId: DOCS_TYPE_OFFICE_FORM_SHEET,
            pageData: {
                ...formDatas,
                quoteDetail,
            }
        });
    }

    render() {
        return (
            <OfficeFormSheetComponent {...this.props} handleExportPDFFile={this.handleExportPDFFile}/>
        );
    }
}

/**
 * Form validation
 *
 * @param values
 */

const formSelector = formValueSelector(DOCS_OFFICE_FORM_NAME);
const mapStateToProps = (state) => ({
    currentModalId:         getDocCurrentModalId(state),
    quoteDetail:            getAQuoteInfo(state),
    officeFormDetail:       getAnOfficeFormInfo(state),
    remotePDF:              getFormRemotePDF(state),

    formDatas:              getFormValues(DOCS_OFFICE_FORM_NAME)(state),
});

const mapDispatchToProps = (dispatch) => ({
    DOC_changeActiveModal:      payload => dispatch(DOC_changeActiveModal(payload)),

    changeFieldValue: function (field, value) {
        dispatch(change(DOCS_OFFICE_FORM_NAME, field, value))
    },

    openModalAction:            payload => dispatch(openModalAction(payload)),
    DOC_loadAQuoteInfo:         payload => dispatch(DOC_loadAQuoteInfo(payload)),
    DOC_loadAnOfficeForm:       payload => dispatch(DOC_loadAnOfficeForm(payload)),
    DOC_clearAnOfficeForm:      payload => dispatch(DOC_clearAnOfficeForm(payload)),
    DOC_exportOfficeFormPDF:    payload => dispatch(DOC_exportOfficeFormPDF(payload)),
    DOC_clearRemoteFormSheetPDF:payload => dispatch(DOC_clearRemoteFormSheetPDF(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: DOCS_OFFICE_FORM_NAME,
        onSubmit: onSubmitActions(DOCS_OFFICE_FORM_NAME),
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
    })(OfficeFormSheet)
);