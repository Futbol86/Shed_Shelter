import React, {Component} from 'react';
import {connect} from 'react-redux';
import uuid from "uuid";
import {formValueSelector, reduxForm, change} from "redux-form";
import {
    QD_AD_changeModal,
    QD_AD_setActiveComponent,
    QD_AD_loadListTextMessages,
    QD_AD_loadListNotes,
    QD_AD_deleteANote,
    QD_AD_loadANote
} from '../../actions';
import AdministrationComponent from "../../components/QuoteDetail/Administration";
import {
    getQDADClientInfo,
    getQDADNotes,
    getQDADActiveNote,
    getQDADDisplayedTextMessages,
    getQDADActiveComponent,
    getQDADCurrentModalId,
    getQDADTextMessagesPaginationInfo,
    getQDADNotesPaginationInfo,
    getQDADLastTextMessage,
    getQDBuildingDetailId,
    getQDQuoteId
} from "../../selectors";
import { getUserProfile } from '../../../users/selectors';
import {openModalAction} from "../../../../actions";
import {MODAL_TYPE_CONFIRMATION} from '../../../../constants';
import {
    QUOTES_ADMINISTRATION_FORM_NAME,
    QUOTES_BUILDING_DETAIL_FORM_NAME
} from '../../constants';

class Administration extends Component {
    componentDidMount() {
        const {history, buildingId} = this.props;
        if (history) {
            const query = new URLSearchParams(history.location.search);
            if (query) {
                const noteId = Number(query.get('noteId'));
                if (noteId) {
                    this.props.QD_AD_loadANote({id: noteId, buildingId})
                }
            }
        }

        this.props.QD_AD_loadListNotes({
            filter: {
                searchBy: 'buildingId',
                searchOp: '=',
                search: this.props.buildingId ? this.props.buildingId : -1
            }
        });

        this.props.QD_AD_loadListTextMessages({
            filter: {
                searchBy: 'buildingId',
                searchOp: '=',
                search: this.props.buildingId ? this.props.buildingId : -1
            }
        });
    };

    componentDidUpdate(prevProps) {
        const {history, activeNote, lastTextMessage} = this.props;

        if (history && activeNote && (!prevProps.activeNote || prevProps.activeNote.id !== activeNote.id)) {
            const query = new URLSearchParams(history.location.search);
            if (query) {
                const noteId = Number(query.get('noteId'));
                if (activeNote.id === noteId) {
                    this.props.QD_AD_setActiveComponent({
                        component: {
                            index: noteId,
                            isNote: true
                        }
                    });
                }
            }
        }

        const prevLastTextMessage = prevProps.lastTextMessage;
        if (lastTextMessage && (!prevLastTextMessage || lastTextMessage.id !== prevLastTextMessage.id)) {
            //Reset to page 1
            this.props.QD_AD_loadListTextMessages({
                filter: {
                    searchBy: 'buildingId',
                    searchOp: '=',
                    search: this.props.buildingId ? this.props.buildingId : -1
                }
            });
        }
    };

    onChangeNotePage = (page) => {
        const {limit, total} = this.props.notesPagination;
        const newSkip = (page - 1) * limit;
        if (newSkip >= 0 && newSkip <= total)
            this.props.QD_AD_loadListNotes({
                skip: newSkip,
                filter: {
                    searchBy: 'buildingId',
                    searchOp: '=',
                    search: this.props.buildingId ? this.props.buildingId : -1
                }
            });
    };

    onChangeTextMessagePage = (page) => {
        const {limit, total} = this.props.textMessagesPagination;
        const newSkip = (page - 1) * limit;
        if (newSkip >= 0 && newSkip <= total)
            this.props.QD_AD_loadListTextMessages({
                skip: newSkip,
                filter: {
                    searchBy: 'buildingId',
                    searchOp: '=',
                    search: this.props.buildingId ? this.props.buildingId : -1
                }
            });
    };

    handleModalChange = (componentId) => {
        //componentId === 1: Note
        //componentId === 2: Text message
        this.props.QD_AD_changeModal({componentId});
        //-- If the modal is close, also set activeComponent to null
        if (componentId === 0) {
            this.props.QD_AD_setActiveComponent({component: null});
        }
    };

    handleJobTrackingClick = () => {
        const {history, quoteId} = this.props;

        if (quoteId) {
            history.push(`/payment-and-job-tracker/job-tracking/${quoteId}`);
        }
    };

    handleNoteEditClick = (noteId) => {
        if (noteId) {
            this.props.QD_AD_setActiveComponent({
                component: {
                    index: noteId,
                    isNote: true
                }
            });
        }
    };

    handleNoteDeleteClick = (noteId) => {
        if (noteId) {
            this.props.openModalAction({
                id: uuid.v4(),
                type: MODAL_TYPE_CONFIRMATION,
                text: 'Are you sure to DELETE this note?',
                // onClose: () => console.log("fire at closing event"),
                onConfirm: () => {
                    this.props.QD_AD_deleteANote({id: noteId});
                },
            });
        }
    };

    render() {
        const {notes, displayedTextMessages, notesPagination, textMessagesPagination, client, userInfo, activeComponent, currentModalId} = this.props;
        let activeNote = this.props.activeNote;
        if (!activeNote && notes && notes.length && activeComponent && activeComponent.isNote === true && activeComponent.index > 0) {
            activeNote = notes.find(note => note.id === activeComponent.index);
        }

        return (
            <AdministrationComponent    notes={notes}
                                        displayedTextMessages={displayedTextMessages}
                                        client={client}
                                        userInfo={userInfo}
                                        jobStatus={this.props.jobStatus}
                                        handleModalChange={this.handleModalChange}
                                        handleJobTrackingClick={this.handleJobTrackingClick}
                                        currentModalId={currentModalId}
                                        activeComponent={activeComponent}
                                        activeNote={activeNote}
                                        handleNoteEditClick={this.handleNoteEditClick}
                                        handleNoteDeleteClick={this.handleNoteDeleteClick}
                                        handleSendSMSClick={this.handleSendSMSClick}
                                        notesPagination={notesPagination}
                                        textMessagesPagination={textMessagesPagination}
                                        onChangeNotePage={this.onChangeNotePage}
                                        onChangeTextMessagePage={this.onChangeTextMessagePage}
                                        changeDisplayedNote={this.changeDisplayedNote}
                                        history={this.props.history}
            />
        );
    }
}

const formSelector = formValueSelector(QUOTES_BUILDING_DETAIL_FORM_NAME);
const mapStateToProps = (state) => ({
    notes:              getQDADNotes(state),
    activeNote:         getQDADActiveNote(state),
    displayedTextMessages:     getQDADDisplayedTextMessages(state),
    activeComponent:    getQDADActiveComponent(state),
    client :            getQDADClientInfo(state),
    currentModalId:     getQDADCurrentModalId(state),
    textMessagesPagination: getQDADTextMessagesPaginationInfo(state),
    notesPagination:     getQDADNotesPaginationInfo(state),
    lastTextMessage:    getQDADLastTextMessage(state),
    buildingId:         getQDBuildingDetailId(state),
    userInfo:           getUserProfile(state),
    jobStatus:          formSelector(state, "jobStatus"),
    quoteId:            getQDQuoteId(state)
});

const mapDispatchToProps = (dispatch) => ({
    QD_AD_changeModal:          payload => dispatch(QD_AD_changeModal(payload)),
    QD_AD_setActiveComponent:   payload => dispatch(QD_AD_setActiveComponent(payload)),
    QD_AD_loadListTextMessages: payload => dispatch(QD_AD_loadListTextMessages(payload)),
    QD_AD_loadListNotes:        payload => dispatch(QD_AD_loadListNotes(payload)),
    QD_AD_deleteANote:          payload => dispatch(QD_AD_deleteANote(payload)),
    QD_AD_loadANote:            payload => dispatch(QD_AD_loadANote(payload)),

    changeFieldValue: function (field, value) {
        dispatch(change(QUOTES_BUILDING_DETAIL_FORM_NAME, field, value))
    },

    openModalAction:            payload => dispatch(openModalAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: QUOTES_ADMINISTRATION_FORM_NAME
    })(Administration)
);