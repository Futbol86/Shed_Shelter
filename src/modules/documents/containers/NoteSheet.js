import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, formValueSelector, change, getFormValues} from "redux-form";
import {onSubmitActions} from "redux-form-submit-saga";
import uuid from 'uuid';
import {MODAL_TYPE_CONFIRMATION} from '../../../constants';
import {
    DOCS_SWMS_GENERIC_FORM_NAME, DOCS_TYPE_SWMS_GENERIC_FORM_SHEET,
    JOB_TASK, WORK_LOCATIONS, INITIATED_AND_APPROVED, 
    KEY_SAFETY_ISSUES_TO_BE_MANAGED, KEY_PPE, REFERENCE_DOCUMENTS,
    WARNING_SIGNS, PERMITS_REQUIRED, ENGINEERING_CERTIFICATES, KEY_INDIVIDUALS, KEY_SAFETY_DUTIES,
    DETAIL_TRAINING_REQUIRED_TO_COMPLETE_WORK, PLANT_AND_EQUIPMENT, HAZARDOUS_SUBSTANCES, POSSIBLE_HAZARDS,
    SPECIFIC_TASK_REQUIREMENTS, CONTRACTORS, PROJECT_SUPERVISORS, APPROVALS, SIGNATURES
} from "../constants";
import {openModalAction} from "../../../actions";
import {DOC_loadASWMSGenericForm, DOC_clearASWMSGenericForm, DOC_exportSWMSGenericFormPDF, DOC_clearRemoteNoteSheetPDF, DOC_loadAQuoteInfo} from "../actions";
import {getASWMSGenericFormInfo, getRemoteNoteSheetPDF, getAQuoteInfo} from "../selectors";
import NoteSheetComponent from "../components/NoteSheet";

class NoteSheet extends Component {
    componentDidMount() {
        let {quoteId}  = this.props;

        this.props.initialize({
            quoteId,
            jobTask: JOB_TASK,
            initiatedAndApprovedDate: new Date(),
            workLocationsAreas: WORK_LOCATIONS,
            initiatedAndApproved: INITIATED_AND_APPROVED,
            keySafetyIssues: KEY_SAFETY_ISSUES_TO_BE_MANAGED,
            keyPPE: KEY_PPE,
            referenceDocuments: REFERENCE_DOCUMENTS,
            warningSigns: WARNING_SIGNS,
            permitsRequired: PERMITS_REQUIRED,
            engineeringCertificates: ENGINEERING_CERTIFICATES,
            keyIndividuals: KEY_INDIVIDUALS,
            keySafetyDuties: KEY_SAFETY_DUTIES,
            detailTrainingRequired: DETAIL_TRAINING_REQUIRED_TO_COMPLETE_WORK,
            plantAndEquipment: PLANT_AND_EQUIPMENT,
            hazardousSubstances: HAZARDOUS_SUBSTANCES,
            possibleHazards: POSSIBLE_HAZARDS,
            specificTaskRequirements: SPECIFIC_TASK_REQUIREMENTS,
            contractors: CONTRACTORS,
            projectSupervisors: PROJECT_SUPERVISORS,
            approvals: APPROVALS,
            signatures: SIGNATURES
        });

        this.props.DOC_loadASWMSGenericForm({quoteId});
        this.props.DOC_loadAQuoteInfo({id: quoteId});
    }

    componentDidUpdate(prevProps) {
        const {sWMSGenericFormDetail} = this.props;

        if(sWMSGenericFormDetail && !prevProps.sWMSGenericFormDetail || 
          (sWMSGenericFormDetail && prevProps.sWMSGenericFormDetail && sWMSGenericFormDetail.quoteId !== prevProps.sWMSGenericFormDetail.quoteId)) {
            this.props.initialize(sWMSGenericFormDetail)
        }

        const {remotePDF} = this.props;

        let blobPDF, pdfFileURL;
        if (remotePDF){
            blobPDF = new Blob([remotePDF], {type: 'application/pdf'});
            //Build a URL from the file
            pdfFileURL = window.URL.createObjectURL(blobPDF);
            //Open the URL on new Window
            window.open(pdfFileURL, '_blank');

            this.props.DOC_clearRemoteNoteSheetPDF();
        }
    }

    componentWillUnmount() {
        this.props.DOC_clearASWMSGenericForm();
    }

    handlePossibleHazardRemove = (fields, index) => {
        this.props.openModalAction({
            id: uuid.v4(),
            type: MODAL_TYPE_CONFIRMATION,
            text: 'Do you want to remove?',
            onConfirm: () => {
                fields.remove(index);
            },
        });
    }

    handleSpecificTaskRequirementsRemove = (fields, index) => {
        this.props.openModalAction({
            id: uuid.v4(),
            type: MODAL_TYPE_CONFIRMATION,
            text: 'Do you want to remove?',
            onConfirm: () => {
                fields.remove(index);
            },
        });
    }

    handleContractorsRemove = (fields, index) => {
        this.props.openModalAction({
            id: uuid.v4(),
            type: MODAL_TYPE_CONFIRMATION,
            text: 'Do you want to remove?',
            onConfirm: () => {
                fields.remove(index);
            },
        });
    }

    handleProjectSupervisorsRemove = (fields, index) => {
        this.props.openModalAction({
            id: uuid.v4(),
            type: MODAL_TYPE_CONFIRMATION,
            text: 'Do you want to remove?',
            onConfirm: () => {
                fields.remove(index);
            },
        });
    }

    handleApprovalsRemove = (fields, index) => {
        this.props.openModalAction({
            id: uuid.v4(),
            type: MODAL_TYPE_CONFIRMATION,
            text: 'Do you want to remove?',
            onConfirm: () => {
                fields.remove(index);
            },
        });
    }

    handleSignaturesRemove = (fields, index) => {
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

        this.props.DOC_exportSWMSGenericFormPDF({
            pageId: DOCS_TYPE_SWMS_GENERIC_FORM_SHEET,
            pageData: {
                ...formDatas,
                quoteDetail,
            }
        });
    }

    render() {
        return (
            <NoteSheetComponent {...this.props} 
                                handlePossibleHazardRemove={this.handlePossibleHazardRemove}
                                handleSpecificTaskRequirementsRemove={this.handleSpecificTaskRequirementsRemove}
                                handleContractorsRemove={this.handleContractorsRemove}
                                handleProjectSupervisorsRemove={this.handleProjectSupervisorsRemove}
                                handleApprovalsRemove={this.handleApprovalsRemove}
                                handleSignaturesRemove={this.handleSignaturesRemove}
                                handleExportPDFFile={this.handleExportPDFFile}/>
        )
    }
}

/**
 * Form validation
 *
 * @param values
 */

const formSelector = formValueSelector(DOCS_SWMS_GENERIC_FORM_NAME);
const mapStateToProps = (state) => ({
    quoteDetail:                 getAQuoteInfo(state),
    sWMSGenericFormDetail:       getASWMSGenericFormInfo(state),
    remotePDF:                   getRemoteNoteSheetPDF(state),

    possibleHazards:             formSelector(state, 'possibleHazards'),
    specificTaskRequirements:    formSelector(state, 'specificTaskRequirements'),
    contractors:                 formSelector(state, 'contractors'),
    projectSupervisors:          formSelector(state, 'projectSupervisors'),
    approvals:                   formSelector(state, 'approvals'),
    signatures:                  formSelector(state, 'signatures'),
    formDatas:                   getFormValues(DOCS_SWMS_GENERIC_FORM_NAME)(state),
});

const mapDispatchToProps = (dispatch) => ({
    changeFieldValue: function (field, value) {
        dispatch(change(DOCS_SWMS_GENERIC_FORM_NAME, field, value))
    },

    openModalAction:                payload => dispatch(openModalAction(payload)),
    DOC_loadASWMSGenericForm:       payload => dispatch(DOC_loadASWMSGenericForm(payload)),
    DOC_clearASWMSGenericForm:      payload => dispatch(DOC_clearASWMSGenericForm(payload)),
    DOC_exportSWMSGenericFormPDF:   payload => dispatch(DOC_exportSWMSGenericFormPDF(payload)),
    DOC_clearRemoteNoteSheetPDF:    payload => dispatch(DOC_clearRemoteNoteSheetPDF(payload)),
    DOC_loadAQuoteInfo:             payload => dispatch(DOC_loadAQuoteInfo(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: DOCS_SWMS_GENERIC_FORM_NAME,
        onSubmit: onSubmitActions(DOCS_SWMS_GENERIC_FORM_NAME),
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
    })(NoteSheet)
);