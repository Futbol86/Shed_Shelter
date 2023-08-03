import React from 'react';
import {NavLink} from 'react-router-dom';
import {FormattedDate, FormattedMessage, FormattedNumber} from 'react-intl';
import { Badge, Input } from 'reactstrap';
import PropTypes from "prop-types";
import {QUOTE_STATUS_LIST} from "../constants";
import {PREDEFINED_BUILDING_PRODUCTS} from "../../../constants";

const QuoteListItem = ({quote, isDealer, isAnAccounting, displayClient, handleDeleteClick, handleLockClick, handleUnlockClick, handleCopyClick, handleCheckedQuote}) => {
    const {
        id, status, jobNumber, jobStatus, quoteDate, updatedDate, createdAt, updatedAt, description, value, buildingDetail, 
        clientId, clientName, clientDetail, user
    } = quote;
    const selectedProduct = PREDEFINED_BUILDING_PRODUCTS.find(
        item => parseInt(item.id) === parseInt(buildingDetail && buildingDetail.productId)
    );
    
    return (
        <tr>
            <td>{id}</td>
            <td>
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
            </td>
            <td>
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
            </td>
            <td className='text-center'>
                <Input name={`phoneClients.${clientDetail && clientDetail.contact1.phoneHome}`} type="checkbox" 
                       onChange={(e) => handleCheckedQuote(e, id, clientDetail)} />
            </td>
            <td>
                <NavLink to={`/quotes/edit/${id}`} title="Edit This Quote" className="p-1">
                    {jobNumber}
                </NavLink>
            </td>
            {displayClient &&
                <td>
                    <NavLink to={`/clients/${clientId}`}  className="p-1">
                        {clientDetail && clientDetail.agentName}
                    </NavLink>
                </td>
            }
            <td>
                <FormattedDate value={createdAt} />
            </td>
            <td>
                <FormattedDate value={updatedAt} />
            </td>
            {isDealer &&
            <td>
                <span>
                    {user && user.name}
                </span>
            </td>
            }
            <td>
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
            </td>
            <td align="right">
                <FormattedNumber value={value} style='currency' currency='USD' />
            </td>
            <td align="center">
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
            </td>
        </tr>
    )
};

QuoteListItem.propTypes = {
    quote: PropTypes.object.isRequired,
    handleDeleteClick: PropTypes.func.isRequired
};

export default QuoteListItem;