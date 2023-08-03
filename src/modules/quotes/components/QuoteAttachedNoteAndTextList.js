import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBody, Table, Button } from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import Modal from 'react-modal';
// import ClientListFilter from '../containers/QuoteAttachedNoteAndTextListFilter';
import QuoteAttachedNoteAndTextListItem from "./QuoteAttachedNoteAndTextListItem";
import Pagination from '../../../components/common/Pagination';
import NoteAddEditModal from '../containers/QuoteDetail/Administration/NoteAddEditModal';
import TextMessageClientsModal from '../containers/QuoteDetail/Administration/TextMessageClientsModal';
import QuotePagePDFModal from '../containers/QuoteDetail/PDFModal/QuotePagePDFModal';

const QuoteAttachedNoteAndTextList = ({
        quotes, displayClient, isDealer, isAnAccounting, currentModalId, userInfo, pagination, onChangePage,
        activeComponent, filter,
        handleDeleteClick, handleLockClick, handleUnlockClick, handleCheckedQuote, handleModalChange,
        handleNoteEditClick, handleNoteDeleteClick
    }) => {
        return (
            <div className="animated fadeIn">
                <Card>
                    <CardHeader>
                        <h2>
                            <FormattedMessage id="app.quotes.Quote_List" defaultMessage='Quote List' />
                        </h2>
                        <div className="card-actions">
                            <a href="#" onClick={() => handleModalChange(3-currentModalId)}>
                                <h2>
                                    <i className="icon-printer" title="Print" />
                                </h2>
                            </a>
                            <Modal className="Modal__Bootstrap modal-dialog modal-lg"
                                isOpen={(currentModalId === 3)}
                                onRequestClose={() => handleModalChange(0)}
                                contentLabel="Quotes"
                                style={{content: {outline: 0}}}
                            >
                                <QuotePagePDFModal quotes={quotes} filter={filter}
                                                   handleModalClose={() => handleModalChange(0)}
                                />
                            </Modal>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col xs="12">
                                <Button onClick={() => handleModalChange(1)} className="btn btn-secondary">
                                    <i className="fa fa-comments-o fa-lg"/> {' '}
                                    <FormattedMessage id="app.quotes.Send_Text_Message" defaultMessage="Send Text Message"/>
                                </Button>
                                <div className="float-right mb-2">
                                    {/* <ClientListFilter /> */}
                                </div>
                                <Row className='mb-2 p-2'>
                                    <Col xs={1}>
                                        <b><FormattedMessage id="app.ID" defaultMessage='ID' /></b>
                                    </Col>
                                    <Col xs={1}>
                                        <b><FormattedMessage id="app.quotes.Status" defaultMessage='Status' /></b>
                                    </Col>
                                    <Col xs={1}></Col>
                                    <Col xs={1} className='text-center'>
                                        <b><FormattedMessage id="app.quotes.Select_For_Text" defaultMessage='Select For Text' /></b>
                                    </Col>
                                    <Col xs={1}>
                                        <b><FormattedMessage id="app.quotes.Job_Number" defaultMessage='Job #' /></b>
                                    </Col>
                                    {displayClient &&
                                        <Col xs={1}>
                                            <b><FormattedMessage id="app.quotes.Client" defaultMessage='Client' /></b>
                                        </Col>
                                    }
                                    <Col xs={1}>
                                        <b><FormattedMessage id="app.quotes.Created_Date" defaultMessage='Created Date' /></b>
                                    </Col>
                                    <Col xs={1}>
                                        <b><FormattedMessage id="app.quotes.Updated_Date" defaultMessage='Updated Date' /></b>
                                    </Col>
                                    {isDealer &&
                                    <Col xs={1}>
                                        <b><FormattedMessage id="app.quotes.Created_by" defaultMessage='Created by' /></b>
                                    </Col>
                                    }
                                    <Col xs={1}>
                                        <b><FormattedMessage id="app.quotes.Description" defaultMessage='Description' /></b>
                                    </Col>
                                    <Col xs={1} align="right">
                                        <b><FormattedMessage id="app.quotes.Value" defaultMessage='Value' /></b>
                                    </Col>
                                    <Col xs={2} align="center"></Col>
                                </Row>
                                {(quotes && quotes.length > 0)
                                    && quotes.map((quote, idx) => (
                                        <QuoteAttachedNoteAndTextListItem key={idx} quote={quote} isDealer={isDealer} isAnAccounting={isAnAccounting}
                                                    displayClient = {displayClient}
                                                    handleDeleteClick={handleDeleteClick}
                                                    handleLockClick={handleLockClick}
                                                    handleUnlockClick={handleUnlockClick}
                                                    handleCheckedQuote={handleCheckedQuote}
                                                    handleNoteEditClick={handleNoteEditClick}
                                                    handleNoteDeleteClick={handleNoteDeleteClick}
                                        />
                                    ))
                                }
                                {/*TO DO*/}
                                <Pagination pagination={pagination} onChangePage={onChangePage} />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                <Modal
                    className="Modal__Bootstrap modal-dialog modal-lg"
                    isOpen={(currentModalId !== null && currentModalId === 2)
                        || (activeComponent !== null && activeComponent.isNote === true && activeComponent.index > 0)}
                    onRequestClose={() => handleModalChange(0)}
                    contentLabel="Note"
                    style={{content: {outline: 0}}}
                >
                    <NoteAddEditModal   activeNoteId={activeComponent ? activeComponent.index : -1}
                                        userInfo={userInfo}
                                        handleModalClose={() => handleModalChange(0)}
                    />
                </Modal>
                <Modal
                    className="Modal__Bootstrap modal-dialog modal-lg"
                    isOpen={currentModalId !== null && currentModalId === 1}
                    onRequestClose={() => handleModalChange(0)}
                    contentLabel="Text Message"
                    style={{content: {outline: 0}}}
                >
                    <TextMessageClientsModal quotes={quotes} userInfo={userInfo} handleModalClose={() => handleModalChange(0)}/>
                </Modal>
            </div>
    )
};

QuoteAttachedNoteAndTextList.propTypes = {
    quotes: PropTypes.array,
    pagination: PropTypes.object,
    onChangePage: PropTypes.func.isRequired,
    handleDeleteClick: PropTypes.func.isRequired
};

export default QuoteAttachedNoteAndTextList;