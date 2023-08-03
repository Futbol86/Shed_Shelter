import React, {Component} from 'react';
import {reduxForm, formValueSelector, getFormValues, reset, change} from "redux-form";
import {connect} from 'react-redux';
import {onSubmitActions} from "redux-form-submit-saga";
import uuid from 'uuid';
import {
    loadListSupplyDataEntry,
    uploadOrderNoteFiles,
    deleteAnOrderNoteFile,
    clearOrderNoteDetail
} from '../../actions';
import {ORDER_DETAIL_FORM_NAME, ORDER_NOTE_DETAIL_FORM_NAME} from "../../constants";
import {
    getSupplyDataEntryList,
    getOrderUserInfo,
    getOrderNoteList,
    getOrderEditingNote,
    getOrderNoteFiles,
    getOrderNoteRemovedFiles,
    getOrderInvitedSupplyDataEntries
} from "../../selectors";

import OrderNoteAddComponent from "../../components/Order/OrderNoteAdd";

import {validateRequired} from "../../../../components/common/Form/FieldLevelValidation";
import {MODAL_TYPE_CONFIRMATION} from '../../../../constants';
import isEmpty from 'lodash/isEmpty';

class OrderNoteAdd extends Component {
    componentDidMount() {
        this.props.loadListSupplyDataEntry({limit: 1000});
    };

    componentDidUpdate(prevProps) {
        const {currentNoteData, userId, orderDetails} = this.props;
        
        if ((this.props.editingNote !== prevProps.editingNote)) {
            if (this.props.editingNote)
                this.props.initialize(this.props.editingNote);
        } else if ((!currentNoteData || isEmpty(currentNoteData)) && userId && orderDetails && orderDetails.id) {
            let initialNoteAddForm = {
                orderId: orderDetails.id,
                fromUserId: userId
            }
    
            this.props.initialize(initialNoteAddForm);
        }

        if (this.props.noteFiles && (this.props.noteFiles !== prevProps.noteFiles)) {
            this.props.changeFieldValue("fileRelPaths", this.props.noteFiles);
        }

        if (this.props.noteRemovedFiles && (this.props.noteRemovedFiles !== prevProps.noteRemovedFiles)) {
            this.props.changeFieldValue("removedFiles", this.props.noteRemovedFiles);
        }
    };

    componentWillUnmount() {
        this.resetNoteDetail();
    };

    handleFileDrops = (acceptedFiles, rejectedFiles) => {
        acceptedFiles.forEach(file => {
            this.props.uploadOrderNoteFiles(file);
        });
    };

    handleDeleteFile = (id) => {
        this.props.openModalAction({
            id: uuid.v4(),
            type: MODAL_TYPE_CONFIRMATION,
            text: 'Are you sure to DELETE this file?',
            onConfirm: () => this.props.deleteAnOrderNoteFile({id}),
        });
    };

    handleCancelClick = () => {
        this.resetNoteDetail();
    };

    resetNoteDetail = () => {
        //Reset form
        this.props.clearOrderNoteDetail();
        this.props.changeFieldValue("toUserId", 0);
        this.props.changeFieldValue("content", "");
    };

    render() {
        return (
            <OrderNoteAddComponent {...this.props}
                staticFileUrl={process.env.REACT_APP_STATIC_FILE_URL}
                handleFileDrops={this.handleFileDrops}
                handleDeleteFile={this.handleDeleteFile}
                handleAddNoteClick={this.handleAddNoteClick}
                handleCancelClick={this.handleCancelClick}
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

    errors.toUserId = validateRequired(values.toUserId);
    errors.content = validateRequired(values.content);

    return errors;
};

const onSubmitSuccess = (result, dispatch) => {
    return dispatch(reset(ORDER_NOTE_DETAIL_FORM_NAME));
};

const orderFormSelector = formValueSelector(ORDER_DETAIL_FORM_NAME);
const formSelector = formValueSelector(ORDER_NOTE_DETAIL_FORM_NAME);
const mapStateToProps = (state) => ({
    notes:                  getOrderNoteList(state),
    editingNote:            getOrderEditingNote(state),
    currentNoteData:        getFormValues(ORDER_NOTE_DETAIL_FORM_NAME)(state),

    noteFiles:              getOrderNoteFiles(state),
    noteRemovedFiles:       getOrderNoteRemovedFiles(state),
    toUserId:               formSelector(state, "toUserId"),

    supplyDataEntries:      getSupplyDataEntryList(state),
    rollForms:              orderFormSelector(state, "rollForms"),
    suppliers:              orderFormSelector(state, "suppliers"),
    orderUserDetails:       getOrderUserInfo(state)            
});


const mapDispatchToProps = (dispatch) => ({
    uploadOrderNoteFiles:   payload => dispatch(uploadOrderNoteFiles(payload)),
    deleteAnOrderNoteFile:  payload => dispatch(deleteAnOrderNoteFile(payload)),
    clearOrderNoteDetail:   payload => dispatch(clearOrderNoteDetail(payload)),
    loadListSupplyDataEntry:    payload => dispatch(loadListSupplyDataEntry(payload)),

    changeFieldValue: function (field, value) {
        dispatch(change(ORDER_NOTE_DETAIL_FORM_NAME, field, value))
    },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => (
    {
        ...ownProps,
        ...stateProps,
        ...dispatchProps,
        invitedSupplyDataEntries:  getOrderInvitedSupplyDataEntries(stateProps.supplyDataEntries,
            stateProps.rollForms, stateProps.suppliers)
    }
);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps) (
    reduxForm({
        form: ORDER_NOTE_DETAIL_FORM_NAME,
        onSubmit: onSubmitActions(ORDER_NOTE_DETAIL_FORM_NAME),
        onSubmitSuccess: onSubmitSuccess,
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
        validate
    })(OrderNoteAdd)
);