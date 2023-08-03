import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, formValueSelector, change, getFormValues} from "redux-form";
import {onSubmitActions} from "redux-form-submit-saga";
import {push} from "connected-react-router";
import uuid from 'uuid';

import {MODAL_TYPE_CONFIRMATION} from '../../../../constants';
import {openModalAction} from "../../../../actions";
import {DOCS_SAFETY_FORM_NAME, DOCS_TYPE_SAFETY_FORM_SHEET, DEFAULT_NUM_ROW_PRINT_NAMES, DEFAULT_NUM_ROW_BASIC_STEPS} from "../../constants";
import {DOC_changeActiveModal} from "../../../documents/actions";
import {getDocCurrentModalId} from "../../../documents/selectors";
import {DOC_loadAQuoteInfo, DOC_loadAnSafetyForm, DOC_clearASafetyForm, DOC_exportSafetyFormPDF, DOC_clearRemoteFormSheetPDF} from "../../actions";
import {getAQuoteInfo, getASafetyFormInfo, getFormRemotePDF} from "../../selectors";
import SafetyFormSheetComponent from "../../components/FormSheet/SafetyFormSheet";

class SafetyFormSheet extends Component {
    componentDidMount() {
        let {quoteId}  = this.props;
        
        this.props.initialize({quoteId});
        this.props.DOC_loadAQuoteInfo({id: quoteId});
        this.props.DOC_loadAnSafetyForm({quoteId});

        //*** set 5 rows default for 'print name' and 10 rows default for 'basic step'
        let {signatureNames = [], jHABasicSteps = []} = this.props;
        let signatureNameLength = signatureNames.length;
        let jHABasicLength = jHABasicSteps.length;

        if(signatureNameLength < DEFAULT_NUM_ROW_PRINT_NAMES) {
            for(let i = DEFAULT_NUM_ROW_PRINT_NAMES - signatureNameLength; i > 0; i--) {
                signatureNames.push({"printName": ""});
            }
            this.props.changeFieldValue("signatureNames", signatureNames);
        }

        if(jHABasicLength < DEFAULT_NUM_ROW_BASIC_STEPS) {
            for(let i = DEFAULT_NUM_ROW_BASIC_STEPS - jHABasicLength; i > 0; i--) {
                jHABasicSteps.push({"basicSteps": "", "potentialHazzards": "", "riskRankings": "", "hazzardControls": "", "whoWillEnsures": ""});
            }
            this.props.changeFieldValue("jHABasicSteps", jHABasicSteps);
        }
    }

    componentDidUpdate(prevProps) {
        const {safetyFormDetail} = this.props;

        if(safetyFormDetail && !prevProps.safetyFormDetail || 
          (safetyFormDetail && prevProps.safetyFormDetail && safetyFormDetail.quoteId !== prevProps.safetyFormDetail.quoteId)) {
            this.props.initialize(safetyFormDetail)
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
        this.props.DOC_clearASafetyForm();
    }

    handlePrintNameRemove = (fields, index) => {
        this.props.openModalAction({
            id: uuid.v4(),
            type: MODAL_TYPE_CONFIRMATION,
            text: 'Do you want to remove?',
            onConfirm: () => {
                fields.remove(index);
            },
        });
    }

    handlePotentialHazzardRemove = (fields, index) => {
        this.props.openModalAction({
            id: uuid.v4(),
            type: MODAL_TYPE_CONFIRMATION,
            text: 'Do you want to remove?',
            onConfirm: () => {
                fields.remove(index);
            },
        });
    }

    handleExportPDFFile = (evt) => {
        evt.preventDefault();
        const {quoteDetail, formDatas} = this.props;

        this.props.DOC_exportSafetyFormPDF({
            pageId: DOCS_TYPE_SAFETY_FORM_SHEET,
            pageData: {
                ...formDatas,
                quoteDetail,
            }
        });
    }

    render() {
        return (
            <SafetyFormSheetComponent {...this.props} handlePrintNameRemove={this.handlePrintNameRemove} 
                                                      handlePotentialHazzardRemove={this.handlePotentialHazzardRemove}
                                                      handleExportPDFFile={this.handleExportPDFFile}/>
        );
    }
}

/**
 * Form validation
 *
 * @param values
 */

const formSelector = formValueSelector(DOCS_SAFETY_FORM_NAME);
const mapStateToProps = (state) => ({
    currentModalId:         getDocCurrentModalId(state),
    quoteDetail:            getAQuoteInfo(state),
    safetyFormDetail:       getASafetyFormInfo(state),
    remotePDF:              getFormRemotePDF(state),

    signatureNames:         formSelector(state, 'signatureNames'),
    jHABasicSteps:          formSelector(state, 'jHABasicSteps'),
    formDatas:              getFormValues(DOCS_SAFETY_FORM_NAME)(state),
});

const mapDispatchToProps = (dispatch) => ({
    DOC_changeActiveModal:      payload => dispatch(DOC_changeActiveModal(payload)),

    changeFieldValue: function (field, value) {
        dispatch(change(DOCS_SAFETY_FORM_NAME, field, value))
    },

    openModalAction:                payload => dispatch(openModalAction(payload)),
    
    DOC_loadAQuoteInfo:             payload => dispatch(DOC_loadAQuoteInfo(payload)),
    DOC_loadAnSafetyForm:           payload => dispatch(DOC_loadAnSafetyForm(payload)),
    DOC_clearASafetyForm:           payload => dispatch(DOC_clearASafetyForm(payload)),
    DOC_exportSafetyFormPDF:        payload => dispatch(DOC_exportSafetyFormPDF(payload)),
    DOC_clearRemoteFormSheetPDF:    payload => dispatch(DOC_clearRemoteFormSheetPDF(payload)),
});

const onSubmitSuccess = (result, dispatch) => {
};

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: DOCS_SAFETY_FORM_NAME,
        onSubmit: onSubmitActions(DOCS_SAFETY_FORM_NAME),
        onSubmitSuccess: onSubmitSuccess,
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
    })(SafetyFormSheet)
);