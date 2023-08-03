import React from 'react';
import {NavLink} from 'react-router-dom';
import {FormattedDate, FormattedMessage, FormattedNumber} from 'react-intl';
import { Badge, Input, Row, Col } from 'reactstrap';
import PropTypes from "prop-types";
import {QUOTE_STATUS_LIST} from "../constants";
import {PREDEFINED_BUILDING_PRODUCTS} from "../../../constants";

import NoteList from "../../quotes/components/QuoteDetail/Administration/NoteList";
import TextMessageList from "../../quotes/components/QuoteDetail/Administration/TextMessageList";

const QuoteAttachedNoteAndTextListItem = ({
    quote, isDealer, isAnAccounting, displayClient, 
    handleDeleteClick, handleLockClick, handleUnlockClick, handleCopyClick, handleCheckedQuote,
    handleNoteEditClick, handleNoteDeleteClick
}) => {
    const {
        id, status, jobNumber, jobStatus, quoteDate, updatedDate, createdAt, updatedAt, description, value, buildingDetail, 
        clientId, clientName, clientDetail, user
    } = quote;
    const selectedProduct = PREDEFINED_BUILDING_PRODUCTS.find(
        item => parseInt(item.id) === parseInt(buildingDetail && buildingDetail.productId)
    );

    return (
        <React.Fragment>
            <hr />
            <Row className='mb-2'>
                <Col xs={1}>{id}</Col>
                <Col xs={1}>
                    {(status === QUOTE_STATUS_LIST.LOCKED) ?
                        <span className="font-weight-bold text-red">Locked</span>
                        : (status === QUOTE_STATUS_LIST.OPENED) ?
                            <span>Opened</span>
                            : (status === QUOTE_STATUS_LIST.SENT) ?
                                <span className="font-weight-bold text-blue">SENT</span>
                            : status
                    }
                    {(status === QUOTE_STATUS_LIST.SENT) ? null : (status !== QUOTE_STATUS_LIST.LOCKED) ?
                        <button className="btn btn-link pl-1 pt-0" title="Lock This Quote"
                                onClick={() => handleLockClick(id)}>
                            <i className="icon-lock-open"/>
                        </button>
                        :
                        <button className="btn btn-link pl-1 pt-0" title="This Quote is Locked"
                                onClick={() => handleUnlockClick(id)}>
                            <i className="icon-lock"/>
                        </button>
                    }
                </Col>
                <Col xs={1}>
                    {jobStatus !== 'sold' ?
                        <Badge color={(jobStatus === 'active') ? 'success' : ((jobStatus === 'dormant') ? 'warning' : 'dark')}
                            className={(jobStatus === 'dead') ? 'text-red' : ''}
                        >
                            {jobStatus && jobStatus.length && (jobStatus.charAt(0).toUpperCase() + jobStatus.slice(1))}
                        </Badge>
                        :
                        <div>
                            <img src={require('../assets/img/firework.png')} style={{height: '45px', width: '45px' }} />
                        </div>
                    }
                </Col>
                <Col xs={1} className='text-center'>
                    <Input name={`phoneClients.${clientDetail && clientDetail.contact1.phoneHome}`} type="checkbox" 
                        onChange={(e) => handleCheckedQuote(e, id, clientDetail)} />
                </Col>
                <Col xs={1}>
                    <NavLink to={`/quotes/edit/${id}`} title="Edit This Quote" className="p-1">
                        {jobNumber}
                    </NavLink>
                </Col>
                {displayClient &&
                    <Col xs={1}>
                        <NavLink to={`/clients/${clientId}`}  className="p-1">
                            {clientDetail && clientDetail.agentName}
                        </NavLink>
                    </Col>
                }
                <Col xs={1}>
                    <FormattedDate value={createdAt} />
                </Col>
                <Col xs={1}>
                    <FormattedDate value={updatedAt} />
                </Col>
                {isDealer &&
                <Col xs={1}>
                    <span>
                        {user && user.name}
                    </span>
                </Col>
                }
                <Col xs={1}>
                    {buildingDetail &&
                    <div>
                        <span className="font-weight-bold font-italic">{selectedProduct && selectedProduct.name}</span>
                        <br />
                        <span>
                            {buildingDetail.buildingLength}mm x{' '}
                            {buildingDetail.buildingSpan}mm x{' '}
                            {buildingDetail.buildingHeight}mm
                        </span>
                    </div>
                    }
                </Col>
                <Col xs={1} align="right">
                    <FormattedNumber value={value} style='currency' currency='USD' />
                </Col>
                <Col xs={2} align="center">
                    <NavLink to={`/quotes/edit/${id}`} title="Edit This Quote" className="p-1">
                        <i className="icon-pencil" />
                    </NavLink>

                    {(status !== QUOTE_STATUS_LIST.SENT) &&
                    <button className="btn btn-link pl-1 pt-0" title="Delete This Quote"
                            onClick={() => handleDeleteClick(id)}>
                        <i className="icon-minus"/>
                    </button>
                    }

                    <NavLink to={`/payment-and-job-tracker/job-tracking/${id}`} title="Tracking This Quote">
                        <i className="icon-eye" />
                    </NavLink>
                    <NavLink to={`/orders/add/${id}`} title="Add new order" className="pl-2">
                        <i className="icon-basket" />
                    </NavLink>
                    <NavLink to={`/documents/quote-printer/${id}`} title="Document" className="pl-2">
                        <i className="icon-docs" />
                    </NavLink>
                    { isAnAccounting &&
                        <NavLink to={`/documents/accounting/${id}`} title="Accounting This Quote" className="pl-2">
                            $$
                        </NavLink>
                    }
                </Col>
            </Row>
            <Row className="mb-2 mt-2">
                <Col xs={12}>
                    {   quote.notes && quote.notes.length > 0 &&
                        <NoteList notes={quote.notes}
                                  handleNoteEditClick={handleNoteEditClick}
                                  handleNoteDeleteClick={handleNoteDeleteClick}
                                  pagination={quote.notesPagination}/>
                    }
                    {   quote.displayedTextMessages && quote.displayedTextMessages.length > 0 &&
                        <TextMessageList displayedTextMessages={quote.displayedTextMessages}
                                         pagination={quote.textMessagesPagination}/>
                    }
                </Col>
            </Row>
        </React.Fragment>
    )
};

QuoteAttachedNoteAndTextListItem.propTypes = {
    quote: PropTypes.object.isRequired,
    handleDeleteClick: PropTypes.func.isRequired
};

export default QuoteAttachedNoteAndTextListItem;