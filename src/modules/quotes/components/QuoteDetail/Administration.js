import React from 'react';
import {FormattedMessage} from 'react-intl';
import { Button } from 'reactstrap';
import Modal from 'react-modal';
import ClientContact from "./Administration/ClientContact";
import NoteList from "./Administration/NoteList";
import TextMessageList from "./Administration/TextMessageList";
import NoteAddEditModal from "../../containers/QuoteDetail/Administration/NoteAddEditModal";
import TextMessageModal from "../../containers/QuoteDetail/Administration/TextMessageModal";
import FindUsModal from "../../containers/QuoteDetail/Administration/FindUsModal";
import { JOB_STATUSES } from '../../constants';

const Administration = ({notes, displayedTextMessages,
    activeNote, activeComponent, currentModalId, client, userInfo, jobStatus,
    changeDisplayedNote, handleModalChange, handleJobTrackingClick, handleNoteEditClick, handleNoteDeleteClick,
    notesPagination, textMessagesPagination,  onChangeNotePage, onChangeTextMessagePage, history}) => {

    return (
        <div className="animated fadeIn">
            <div>
                <ClientContact client={client}/>
            </div>
            <div className="pt-2 pb-2 d-flex justify-content-between">
                <Button onClick={() => handleModalChange(1)} className="btn btn-secondary">
                    <i className="fa fa-file-text-o fa-lg"/> {' '}
                    <FormattedMessage id="app.quotes.Add_New_Note" defaultMessage="Add New Note"/>
                </Button>
                <Button onClick={() => handleModalChange(2)} className="btn btn-secondary"
                    disabled={!userInfo || !userInfo.phone || !userInfo.phone.length}
                >
                    <i className="fa fa-comments-o fa-lg"/> {' '}
                    <FormattedMessage id="app.quotes.Send_Text_Message" defaultMessage="Send Text Message"/>
                </Button>
                <Button onClick={() => handleModalChange(3)} className="btn btn-secondary">
                    <i className="fa fa-refresh fa-lg"/> {' '}
                    <FormattedMessage id="app.quotes.Change_Quote_Status" defaultMessage="Change Quote Status"/>
                </Button>
                <Button onClick={handleJobTrackingClick} className="btn btn-secondary">
                    <i className="fa fa-binoculars fa-lg"/> {' '}
                    <FormattedMessage id="app.quotes.Job_Tracking" defaultMessage="Job Tracking"/>
                </Button>
                <Button onClick={() => handleModalChange(4)} className="btn btn-secondary">
                    <i className="fa fa-search fa-lg"/> {' '}
                    <FormattedMessage id="app.quotes.Find_Us" defaultMessage="Find Us"/>
                </Button>
            </div>
            <div className="pt-1">
                <NoteList   notes={notes}
                            handleNoteEditClick={handleNoteEditClick}
                            handleNoteDeleteClick={handleNoteDeleteClick}
                            pagination={notesPagination}
                            onChangePage={onChangeNotePage}
                />
                <TextMessageList    displayedTextMessages={displayedTextMessages}
                            pagination={textMessagesPagination}
                            onChangePage={onChangeTextMessagePage}
                />
            </div>
            <Modal
                className="Modal__Bootstrap modal-dialog modal-lg"
                isOpen={(currentModalId !== null && currentModalId === 1)
                    || (activeComponent !== null && activeComponent.isNote === true && activeComponent.index > 0)}
                onRequestClose={() => handleModalChange(0)}
                contentLabel="Note"
                style={{content: {outline: 0}}}
            >
                <NoteAddEditModal   notes={notes}
                                    activeNote={activeNote}
                                    activeNoteId={activeComponent ? activeComponent.index : -1}
                                    userInfo={userInfo}

                                    hasQuoteStatus={activeNote && activeNote.jobStatus}
                                    handleModalClose={() => handleModalChange(0)}
                                    changeDisplayedNote={changeDisplayedNote}
                                    history={history}
                />
            </Modal>
            <Modal
                className="Modal__Bootstrap modal-dialog modal-lg"
                isOpen={currentModalId !== null && currentModalId === 2}
                onRequestClose={() => handleModalChange(0)}
                contentLabel="Text Message"
                style={{content: {outline: 0}}}
            >
                <TextMessageModal   client={client}
                                    userInfo={userInfo}
                                    handleModalClose={() => handleModalChange(0)}
                />
            </Modal>
            <Modal
                className="Modal__Bootstrap modal-dialog modal-lg"
                isOpen={currentModalId !== null && currentModalId === 3}
                onRequestClose={() => handleModalChange(0)}
                contentLabel="Quote Status"
                style={{content: {outline: 0}}}
            >
                <NoteAddEditModal   notes={notes}
                                    activeNoteId={activeComponent ? activeComponent.index : -1}
                                    userInfo={userInfo}
                                    jobStatus={jobStatus}
                                    hasQuoteStatus={true}
                                    handleModalClose={() => handleModalChange(0)}
                                    changeDisplayedNote={changeDisplayedNote}
                />
            </Modal>
            <Modal
                className="Modal__Bootstrap modal-dialog modal-lg"
                isOpen={currentModalId !== null && currentModalId === 4}
                onRequestClose={() => handleModalChange(0)}
                contentLabel="Find Us"
            >
                <FindUsModal handleModalClose={() => handleModalChange(0)} />
            </Modal>
        </div>
    );
}

export default Administration;