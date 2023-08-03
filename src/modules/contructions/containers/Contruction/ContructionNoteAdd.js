import React, {Component} from 'react';
import {reduxForm, formValueSelector, getFormValues, destroy, change} from "redux-form";
import {connect} from 'react-redux';
import {onSubmitActions} from "redux-form-submit-saga";
import uuid from 'uuid';
import {
    loadListContructionDataEntry,
    uploadContructionNoteFiles,
    deleteAnContructionNoteFile,
    clearContructionNoteDetail
} from '../../actions';
import {CONTRUCTION_NOTE_DETAIL_FORM_NAME} from "../../constants";
import {
    getContructionNoteList,
    getContructionEditingNote,
    getContructionNoteFiles,
    getContructionNoteRemovedFiles,
} from "../../selectors";

import ContructionNoteAddComponent from "../../components/Contruction/ContructionNoteAdd";

import {validateRequired} from "../../../../components/common/Form/FieldLevelValidation";
import {MODAL_TYPE_CONFIRMATION} from '../../../../constants';
import isEmpty from 'lodash/isEmpty';

class ContructionNoteAdd extends Component {
    componentDidMount() {
        this.props.loadListContructionDataEntry({limit: 1000});
    };

    componentDidUpdate(prevProps) {
        const {currentNoteData, userId, contructionDetails} = this.props;
        if ((this.props.editingNote !== prevProps.editingNote)) {
            if (this.props.editingNote)
                this.props.initialize(this.props.editingNote);
        } else if ((!currentNoteData || isEmpty(currentNoteData)) && userId && contructionDetails && contructionDetails.id) {
            let initialNoteAddForm = {
                contructionId: contructionDetails.id,
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
            this.props.uploadContructionNoteFiles(file);
        });
    };

    handleDeleteFile = (id) => {
        this.props.openModalAction({
            id: uuid.v4(),
            type: MODAL_TYPE_CONFIRMATION,
            text: 'Are you sure to DELETE this file?',
            onConfirm: () => this.props.deleteAnContructionNoteFile({id}),
        });
    };

    handleCancelClick = () => {
        this.resetNoteDetail();
    };

    resetNoteDetail = () => {
        //Reset form
        const {userId, contructionDetails} = this.props;
        let initialNoteAddForm = {
            contructionId: contructionDetails.id,
            fromUserId: userId
        }

        this.props.clearContructionNoteDetail();
        this.props.initialize(initialNoteAddForm)
        this.props.changeFieldValue("toUserId", 0);
        this.props.changeFieldValue("content", "");
    };

    render() {
        return (
            <ContructionNoteAddComponent {...this.props}
                staticFileUrl={process.env.REACT_APP_STATIC_FILE_URL2}
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
    return dispatch(destroy(CONTRUCTION_NOTE_DETAIL_FORM_NAME));
};

const formSelector = formValueSelector(CONTRUCTION_NOTE_DETAIL_FORM_NAME);
const mapStateToProps = (state) => ({
    notes:                  getContructionNoteList(state),
    editingNote:            getContructionEditingNote(state),
    currentNoteData:        getFormValues(CONTRUCTION_NOTE_DETAIL_FORM_NAME)(state),

    noteFiles:              getContructionNoteFiles(state),
    noteRemovedFiles:       getContructionNoteRemovedFiles(state),
    toUserId:               formSelector(state, "toUserId"),    
});


const mapDispatchToProps = (dispatch) => ({
    uploadContructionNoteFiles:   payload => dispatch(uploadContructionNoteFiles(payload)),
    deleteAnContructionNoteFile:  payload => dispatch(deleteAnContructionNoteFile(payload)),
    clearContructionNoteDetail:   payload => dispatch(clearContructionNoteDetail(payload)),
    loadListContructionDataEntry:    payload => dispatch(loadListContructionDataEntry(payload)),

    changeFieldValue: function (field, value) {
        dispatch(change(CONTRUCTION_NOTE_DETAIL_FORM_NAME, field, value))
    },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => (
    {
        ...ownProps,
        ...stateProps,
        ...dispatchProps,
    }
);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps) (
    reduxForm({
        form: CONTRUCTION_NOTE_DETAIL_FORM_NAME,
        onSubmit: onSubmitActions(CONTRUCTION_NOTE_DETAIL_FORM_NAME),
        onSubmitSuccess: onSubmitSuccess,
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
        validate
    })(ContructionNoteAdd)
);