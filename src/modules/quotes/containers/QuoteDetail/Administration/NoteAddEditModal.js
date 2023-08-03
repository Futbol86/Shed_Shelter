import React, {Component} from 'react';
import {connect} from 'react-redux';
import {change, formValueSelector, reduxForm} from "redux-form";
import NoteAddEditComponent from "../../../components/QuoteDetail/Administration/NoteAddEditModal";
import {
    QUOTES_AD_NOTE_ADD_FORM_NAME,
    QUOTES_BUILDING_DETAIL_FORM_NAME
} from "../../../constants";
import { getQDBuildingDetailId } from '../../../selectors';
import { QD_AD_addANote, QD_AD_updateANote } from '../../../actions';
import {validateRequired} from "../../../../../components/common/Form/FieldLevelValidation";

import isEmpty from "lodash/isEmpty";

class NoteAddEditModal extends Component {
    componentDidMount() {
        const {jobStatus, hasQuoteStatus, notes, activeNoteId, userInfo, history} = this.props;
        let initialNoteForm = {};
        if (history) {
            const query = new URLSearchParams(history.location.search);
            if (query) {
                const noteId = Number(query.get('noteId'));
                const activeNote = this.props.activeNote;
                if (noteId && activeNote && Number(activeNote.id) === noteId) {
                    const isTaskCompleted = query.get('isTaskCompleted') === undefined || query.get('isTaskCompleted') === null ?
                        activeNote.isTaskCompleted : (query.get('isTaskCompleted') + '') === "1";
                    const hasReminder = query.get('hasReminder') === undefined || query.get('hasReminder') === null ?
                        activeNote.hasReminder : (query.get('hasReminder') + '') === "1";

                    initialNoteForm = {
                        noteName: activeNote.name,
                        noteDescription: activeNote.description,
                        noteContent: activeNote.content,
                        noteHasReminder: hasReminder,
                        noteReminderDate: activeNote.reminderDate,
                        noteIsTaskCompleted: isTaskCompleted
                    }

                    history.push({...history.location, search: ''});
                }
            }
        }

        if (isEmpty(initialNoteForm) && activeNoteId > 0 && notes) {
            const activeNote = notes.find(note => note.id === activeNoteId);
            if (activeNote) {
                initialNoteForm = {
                    noteName: activeNote.name,
                    noteDescription: activeNote.description,
                    noteContent: activeNote.content,
                    noteHasReminder: activeNote.hasReminder,
                    noteReminderDate: activeNote.reminderDate,
                    noteIsTaskCompleted: activeNote.isTaskCompleted
                }

                if (activeNote.jobStatus) {
                    initialNoteForm = {
                        ...initialNoteForm,
                        noteJobStatus: activeNote.jobStatus
                    }
                }
            }
        } else {
            if (userInfo) {
                initialNoteForm = {
                    ...initialNoteForm,
                    noteName: `${userInfo.firstName} ${userInfo.lastName}`
                }
            }
            if (jobStatus && hasQuoteStatus) {
                initialNoteForm = {
                    ...initialNoteForm,
                    noteJobStatus: jobStatus
                }
            }
        }

        //console.log('initialNoteForm', initialNoteForm);
        this.props.initialize(initialNoteForm);
    }
    
    componentDidUpdate(prevProps) {
        const {currentNoteData, jobStatus, changeCurrentFormFieldValue} = this.props;
        const prevNoteData = prevProps.currentNoteData;

        if (currentNoteData && prevNoteData && currentNoteData.jobStatus
            && currentNoteData.jobStatus !== jobStatus && currentNoteData.jobStatus !== prevNoteData.jobStatus
        ) {
            changeCurrentFormFieldValue('noteDescription', `Change quote status to ${currentNoteData.jobStatus.toUpperCase()}`);
        }
    }

    /**
     * Handle Note submit: We will need to do it by ourselves, cannot use the default submission since it cause
     * the parent form (buildingDetail) to be submitted too.
     *
     * @param event
     */
    handleNoteSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        
        const {activeNoteId, buildingId, handleModalClose, currentNoteData, userInfo} = this.props;
        if (activeNoteId > 0) {         //-- Edit note
            this.props.QD_AD_updateANote({
                id: activeNoteId,
                buildingId,
                ...currentNoteData,
                reminderToEmail: userInfo && userInfo.email,
                reminderCCEmail: userInfo && userInfo.dealer && userInfo.dealer.adminEmail
            });
        } else if (currentNoteData) {   //-- Add new note
            this.props.QD_AD_addANote({
                buildingId,
                ...currentNoteData,
                reminderToEmail: userInfo && userInfo.email,
                reminderCCEmail: userInfo && userInfo.dealer && userInfo.dealer.adminEmail
            });
        }

        if (currentNoteData && currentNoteData.jobStatus) {
            this.props.changeFieldValue(`jobStatus`, currentNoteData.jobStatus);
        }

        handleModalClose();
    };
    
    render() {
        return (
            <NoteAddEditComponent {...this.props}
                handleNoteSubmit={this.handleNoteSubmit}
                handleModalClose={this.props.handleModalClose}
            />
        );
    }
}

/**
 * Form validation
 *
 * @param values
 */
const validate = (values, {jobStatus, activeNote}) => {
    const errors = {};
    errors.noteName = validateRequired(values.noteName);
    errors.noteContent = validateRequired(values.noteContent);
    if (values.noteJobStatus === jobStatus) {
        errors.noteJobStatus = "Quote status hasn't been not changed";
    }

    return errors;
};

const formSelector = formValueSelector(QUOTES_AD_NOTE_ADD_FORM_NAME);
const mapStateToProps = (state) => ({
    currentNoteData: {
        jobStatus:      formSelector(state, "noteJobStatus"),
        name:           formSelector(state, "noteName"),
        description:    formSelector(state, "noteDescription"),
        content:        formSelector(state, "noteContent"),
        hasReminder:    formSelector(state, "noteHasReminder"),
        reminderDate:   formSelector(state, "noteReminderDate"),
        isTaskCompleted:    formSelector(state, "noteIsTaskCompleted"),
    },
    buildingId:     getQDBuildingDetailId(state)
});

const mapDispatchToProps = (dispatch) => ({
    QD_AD_addANote:         payload => dispatch(QD_AD_addANote(payload)),
    QD_AD_updateANote:      payload => dispatch(QD_AD_updateANote(payload)),

    changeFieldValue: function (field, value) {
        dispatch(change(QUOTES_BUILDING_DETAIL_FORM_NAME, field, value))
    },
    changeCurrentFormFieldValue: function (field, value) {
        dispatch(change(QUOTES_AD_NOTE_ADD_FORM_NAME, field, value))
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: QUOTES_AD_NOTE_ADD_FORM_NAME,
        validate
    })(NoteAddEditModal)
);