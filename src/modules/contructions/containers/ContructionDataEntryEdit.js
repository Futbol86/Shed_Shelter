import React, {Component} from 'react';
import {connect} from 'react-redux';
import uuid from "uuid";
import moment from "moment";
import {reduxForm, formValueSelector, getFormValues, change} from "redux-form";
import {onSubmitActions} from "redux-form-submit-saga";
import { push } from 'connected-react-router';
import {openModalAction} from "../../../actions";
import {MODAL_TYPE_CONFIRMATION} from '../../../constants';

import ContructionDataEntryAddComponent from "../components/ContructionDataEntryAdd";
import {CONTRUCTION_DATA_ENTRY_DETAIL_FORM_NAME} from "../constants";
import {loadAContructionDataEntryInfo, OR_SDE_loadUserList, OR_SDE_setActiveStaff, 
        douploadInsurancePolicyFile, doDeleteAnInsurancePolicyFile, doClearInsurancePolicyFile, clearAContructionDataEntryInfo} from '../actions';
import {DOC_changeActiveModal, DOC_changeTypeModal} from "../../documents/actions";

import {getOrSdeUserList, getContructionDataEntryInfo, getInsurancePolicyFile} from "../selectors";
import {getDocCurrentModalId} from "../../documents/selectors";

import {validateRequired} from "../../../components/common/Form/FieldLevelValidation";

import isEmpty from "lodash/isEmpty";

class ContructionDataEntryEdit extends Component {
    componentDidMount() {
        let {contructionDataEntryId} = this.props.match.params;
        if (contructionDataEntryId) {
            this.props.loadAContructionDataEntryInfo({id: contructionDataEntryId});
        }
        
        this.props.DOC_changeTypeModal({modalType: 'add-staff'});
        this.props.OR_SDE_loadUserList({limit: 1000});
    }

    componentWillUnmount() {
        const {insurancePolicyFileRelPaths} = this.props;
        if(insurancePolicyFileRelPaths) {
            this.props.doClearInsurancePolicyFile();
        }

        this.props.clearAContructionDataEntryInfo();
    }

    componentDidUpdate(prevProps) {
        const {savedContructionDataEntryDetail, userList, insurancePolicyFileRelPaths} = this.props;
        const {contructionDataEntryDetail} = prevProps;
        if ((!contructionDataEntryDetail || isEmpty(contructionDataEntryDetail)) && !isEmpty(savedContructionDataEntryDetail)
            || (savedContructionDataEntryDetail && savedContructionDataEntryDetail.id !== prevProps.savedContructionDataEntryDetail.id)
        ) {
            let initialSDEForm = {
                ...savedContructionDataEntryDetail,
                userId: savedContructionDataEntryDetail.userId + '',
                insurancePolicyType: savedContructionDataEntryDetail.insurancePolicyFileRelPaths ? 'File' : 'Text',
            }
            
            this.props.initialize(initialSDEForm);
        }

        if(insurancePolicyFileRelPaths && insurancePolicyFileRelPaths != prevProps.insurancePolicyFileRelPaths) {
            this.props.changeFieldValue("insurancePolicyFileRelPaths", insurancePolicyFileRelPaths);
        }
    }

    handleFileDrops = (acceptedFiles, rejectedFiles) => {
        acceptedFiles.forEach(file => {
            this.props.douploadInsurancePolicyFile(file);
        });
    };

    handleDeleteInsuranceFile = (id) => {
        this.props.openModalAction({
            id: uuid.v4(),
            type: MODAL_TYPE_CONFIRMATION,
            text: 'Are you sure to DELETE this file?',
            onConfirm: () => {
                this.props.changeFieldValue("insurancePolicyFileRelPaths", null);
                this.props.doDeleteAnInsurancePolicyFile({id})
            },
        });
    };

    handleModalChange = (modalId) => {
        this.props.DOC_changeActiveModal({modalId});
    };

    handleModalClose = () => {
        this.props.OR_SDE_setActiveStaff({staff: null});
        this.handleModalChange(0);
    }

    handleEditStaffClick = (id) => {
        const {staffs} = this.props;
        const index = Number(id) - 1;
        if (staffs && staffs.length && index >= 0 && index < staffs.length) {
            const staff = staffs[index];
            this.props.DOC_changeActiveModal({modalId: Number(id)});
            this.props.DOC_changeTypeModal({modalType: 'edit-staff'});
            this.props.OR_SDE_setActiveStaff({
                staff: {
                    ...staff,
                    id: index
                }
            });
        }
    };

    handleDeleteStaffClick = (id) => {
        let {staffs} = this.props;
        const index = Number(id) - 1;
        if (staffs && staffs.length && index >= 0 && index < staffs.length) {
            this.props.openModalAction({
                id: uuid.v4(),
                type: MODAL_TYPE_CONFIRMATION,
                text: 'Are you sure to DELETE this staff?',
                // onClose: () => console.log("fire at closing event"),
                onConfirm: () => {
                    let updatedStaffs = [...staffs];
                    updatedStaffs.splice(index, 1);
                    this.props.changeFieldValue("staffs", updatedStaffs);
                },
            });
        }
    };

    render() {
        const {contructionDataEntryDetail} = this.props;
        const uploadRootURL = process.env.REACT_APP_STATIC_FILE_URL2;
        let insurancePolicyType = contructionDataEntryDetail && contructionDataEntryDetail.insurancePolicyType;
        
        return (
            <ContructionDataEntryAddComponent {...this.props}
                uploadRootURL={uploadRootURL}
                insurancePolicyType={insurancePolicyType}
                handleModalChange={this.handleModalChange}
                handleModalClose={this.handleModalClose}
                handleFileDrops={this.handleFileDrops}
                handleDeleteInsuranceFile={this.handleDeleteInsuranceFile}
                handleEditStaffClick={this.handleEditStaffClick}
                handleDeleteStaffClick={this.handleDeleteStaffClick}
            />
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

    errors.userId = validateRequired(values.userId);
    errors.contructionField = validateRequired(values.contructionField);
    errors.tradesRegisteredName = validateRequired(values.tradesRegisteredName);
    errors.tradingAs = validateRequired(values.tradingAs);
    errors.category = validateRequired(values.category);
    errors.tradeNumber = validateRequired(values.tradeNumber);
    errors.contractorsLicenceNumber = validateRequired(values.contractorsLicenceNumber);
    errors.contractorsLicenceExpiryDate = validateRequired(values.contractorsLicenceExpiryDate);
    errors.australianBusinessNumber = validateRequired(values.australianBusinessNumber);
    errors.insurancePolicyDetails = validateRequired(values.insurancePolicyDetails);
    errors.insurancePolicyExpiryDate = validateRequired(values.insurancePolicyExpiryDate);
    
    var diff_years = values.contractorsLicenceExpiryDate && moment(values.contractorsLicenceExpiryDate).diff(moment(new Date()), 'years');
    if(diff_years > 5 || diff_years < 0) {
        errors.contractorsLicenceExpiryDate = 'Maximun is 5 years from now';
    }

    var diff_insurance_years = values.insurancePolicyExpiryDate && moment(values.insurancePolicyExpiryDate).diff(moment(new Date()), 'years');
    if(diff_insurance_years < 0) {
        errors.insurancePolicyExpiryDate = 'Insurance policy expiry date must from now';
    }

    return errors;
};

const formSelector = formValueSelector(CONTRUCTION_DATA_ENTRY_DETAIL_FORM_NAME);
const mapStateToProps = (state) => ({
    staffs:                     formSelector(state, "staffs"),
    userList:                   getOrSdeUserList(state),
    currentModalId:             getDocCurrentModalId(state),
    contructionDataEntryDetail:      getFormValues(CONTRUCTION_DATA_ENTRY_DETAIL_FORM_NAME)(state),

    savedContructionDataEntryDetail: getContructionDataEntryInfo(state),
    insurancePolicyFileRelPaths:     getInsurancePolicyFile(state),
});

const mapDispatchToProps = (dispatch) => ({
    loadAContructionDataEntryInfo:   payload => dispatch(loadAContructionDataEntryInfo(payload)),

    OR_SDE_loadUserList:        payload => dispatch(OR_SDE_loadUserList(payload)),
    DOC_changeActiveModal:      payload => dispatch(DOC_changeActiveModal(payload)),
    DOC_changeTypeModal:        payload => dispatch(DOC_changeTypeModal(payload)),
    OR_SDE_setActiveStaff:      payload => dispatch(OR_SDE_setActiveStaff(payload)),

    changeFieldValue: function (field, value) {
        dispatch(change(CONTRUCTION_DATA_ENTRY_DETAIL_FORM_NAME, field, value))
    },

    openModalAction:                payload => dispatch(openModalAction(payload)),
    douploadInsurancePolicyFile:    payload => dispatch(douploadInsurancePolicyFile(payload)),
    doDeleteAnInsurancePolicyFile:  payload => dispatch(doDeleteAnInsurancePolicyFile(payload)),
    doClearInsurancePolicyFile:     payload => dispatch(doClearInsurancePolicyFile(payload)),
    clearAContructionDataEntryInfo: payload => dispatch(clearAContructionDataEntryInfo(payload)),
});

const onSubmitSuccess = (result, dispatch) => {
    return dispatch(push(`/contructions/contruction-data-entries/list`));
};

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: CONTRUCTION_DATA_ENTRY_DETAIL_FORM_NAME,
        onSubmit: onSubmitActions(CONTRUCTION_DATA_ENTRY_DETAIL_FORM_NAME),
        onSubmitSuccess: onSubmitSuccess,
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
        validate
    })(ContructionDataEntryEdit)
);