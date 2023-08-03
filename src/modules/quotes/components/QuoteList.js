import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBody, Table, Button } from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import Modal from 'react-modal';

import ClientListFilter from '../containers/QuoteListFilter';
import QuoteListItem from "./QuoteListItem";
import Pagination from '../../../components/common/Pagination';
import TextMessageClientsModal from '../containers/QuoteDetail/Administration/TextMessageClientsModal';
import QuotePagePDFModal from '../containers/QuoteDetail/PDFModal/QuotePagePDFModal';

const QuoteList = ({quotes, displayClient, isDealer, isAnAccounting, currentModalId, userInfo, pagination, onChangePage,
    filter, handleDeleteClick, handleLockClick, handleUnlockClick, handleCheckedQuote, handleModalChange
}) => (
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
                            <ClientListFilter />
                        </div>
                        <Table responsive striped>
                            <thead>
                            <tr>
                                <th>
                                    <FormattedMessage id="app.ID" defaultMessage='ID' />
                                </th>
                                <th>
                                    <FormattedMessage id="app.quotes.Status" defaultMessage='Status' />
                                </th>
                                <th></th>
                                <th>
                                    <FormattedMessage id="app.quotes.Select_For_Text" defaultMessage='Select For Text' />                       
                                </th>
                                <th>
                                    <FormattedMessage id="app.quotes.Job_Number" defaultMessage='Job #' />
                                </th>
                                {displayClient &&
                                    <th>
                                        <FormattedMessage id="app.quotes.Client" defaultMessage='Client' />
                                    </th>
                                }
                                <th>
                                    <FormattedMessage id="app.quotes.Created_Date" defaultMessage='Created Date' />
                                </th>
                                <th>
                                    <FormattedMessage id="app.quotes.Updated_Date" defaultMessage='Updated Date' />
                                </th>
                                {isDealer &&
                                    <th>
                                        <FormattedMessage id="app.quotes.Created_by" defaultMessage='Created by' />
                                    </th>
                                }
                                <th>
                                    <FormattedMessage id="app.quotes.Description" defaultMessage='Description' />
                                </th>
                                <th>
                                    <span className="pull-right">
                                        <FormattedMessage id="app.quotes.Value" defaultMessage='Value' />
                                    </span>
                                </th>
                                <th align="center"></th>
                            </tr>
                            </thead>
                            <tbody>
                            {(quotes && quotes.length > 0)
                                ? quotes.map((quote, idx) => (
                                    <QuoteListItem key={idx} quote={quote} isDealer={isDealer} isAnAccounting={isAnAccounting}
                                                   displayClient = {displayClient}
                                                   handleDeleteClick={handleDeleteClick}
                                                   handleLockClick={handleLockClick}
                                                   handleUnlockClick={handleUnlockClick}
                                                   handleCheckedQuote={handleCheckedQuote}
                                    />
                                ))
                                : <tr><td colSpan={7}><FormattedMessage id="app.quotes.No_Quote_Found" defaultMessage='No Quote Found' /></td></tr>
                            }
                            </tbody>
                        </Table>

                        {/*TO DO*/}
                        <Pagination pagination={pagination} onChangePage={onChangePage} />
                    </Col>
                </Row>
            </CardBody>
        </Card>
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
);

QuoteList.propTypes = {
    quotes: PropTypes.array,
    pagination: PropTypes.object,
    onChangePage: PropTypes.func.isRequired,
    handleDeleteClick: PropTypes.func.isRequired
};

export default QuoteList;