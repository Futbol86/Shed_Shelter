import React, {Component} from 'react';
import {connect} from 'react-redux';
import uuid from "uuid";
import {reduxForm, formValueSelector, change} from "redux-form";
import {onSubmitActions} from "redux-form-submit-saga";
import { push } from 'connected-react-router';
import {openModalAction} from "../../../actions";
import {MODAL_TYPE_CONFIRMATION} from '../../../constants';

import SupplyDataEntryAddComponent from "../components/SupplyDataEntryAdd";
import {SUPPLY_DATA_ENTRY_DETAIL_FORM_NAME} from "../constants";
import {OR_SDE_loadUserList, OR_SDE_setActiveStaff, clearASupplyDataEntryInfo} from '../actions';
import {DOC_changeActiveModal} from "../../documents/actions";

import {getOrSdeUserList} from "../selectors";
import {getDocCurrentModalId} from "../../documents/selectors";

import {validateRequired} from "../../../components/common/Form/FieldLevelValidation";

class SupplyDataEntryAdd extends Component {
    componentDidMount() {
        this.props.OR_SDE_loadUserList({limit: 1000});
        let initialSDEForm = {
            supplyType: '1'
        }

        this.props.initialize(initialSDEForm);
    }

    componentWillUnmount() {
        this.props.clearASupplyDataEntryInfo();
    }

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
        return (
            <SupplyDataEntryAddComponent {...this.props}
                handleModalChange={this.handleModalChange}
                handleModalClose={this.handleModalClose}
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
    errors.supplyType = validateRequired(values.supplyType);
    errors.company = validateRequired(values.company);
    errors.vendorNumber = validateRequired(values.vendorNumber);
    errors.branchName = validateRequired(values.branchName);
    errors.daysOfOperation = validateRequired(values.daysOfOperation);
    errors.australianBusinessNumber = validateRequired(values.australianBusinessNumber);
    errors.physicalAddress = validateRequired(values.physicalAddress);
    errors.postalAddress = validateRequired(values.postalAddress);
    errors.primaryContactDetails = validateRequired(values.primaryContactDetails);

    return errors;
};

const formSelector = formValueSelector(SUPPLY_DATA_ENTRY_DETAIL_FORM_NAME);
const mapStateToProps = (state) => ({
    staffs:             formSelector(state, "staffs"),
    userList:           getOrSdeUserList(state),
    currentModalId:     getDocCurrentModalId(state)
});

const mapDispatchToProps = (dispatch) => ({
    OR_SDE_loadUserList:        payload => dispatch(OR_SDE_loadUserList(payload)),
    DOC_changeActiveModal:      payload => dispatch(DOC_changeActiveModal(payload)),
    OR_SDE_setActiveStaff:      payload => dispatch(OR_SDE_setActiveStaff(payload)),
    clearASupplyDataEntryInfo:  payload => dispatch(clearASupplyDataEntryInfo(payload)),

    changeFieldValue: function (field, value) {
        dispatch(change(SUPPLY_DATA_ENTRY_DETAIL_FORM_NAME, field, value))
    },

    openModalAction:            payload => dispatch(openModalAction(payload)),
});

const onSubmitSuccess = (result, dispatch) => {
    return dispatch(push(`/orders/supply-data-entries/list`));
};

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: SUPPLY_DATA_ENTRY_DETAIL_FORM_NAME,
        onSubmit: onSubmitActions(SUPPLY_DATA_ENTRY_DETAIL_FORM_NAME),
        onSubmitSuccess: onSubmitSuccess,
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
        validate
    })(SupplyDataEntryAdd)
);