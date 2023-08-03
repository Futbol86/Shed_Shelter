import React from 'react';
import {NavLink} from 'react-router-dom';
import {FormattedDate, FormattedTime} from 'react-intl';
import PropTypes from "prop-types";

const OrderListItem = ({order, handleOpenOrCloseClick, handleDeleteClick}) => {
    const { id, quoteDetails, status, rollFormDetails, supplierDetails, acceptedSupplierDetails, rejectedSupplierDetails, createdAt, updatedAt} = order; 

    return (
        <tr>
            <td>
                <NavLink to={`/orders/edit/${quoteDetails.id}`} title="Edit Order" className="p-1">
                    {quoteDetails.id}
                </NavLink>
            </td>
            <td>
                <NavLink to={`/quotes/edit/${quoteDetails.id}`} title="Edit Quote" className="p-1">
                    {quoteDetails.jobNumber}
                </NavLink>
            </td>
            <td>
                <NavLink to={`/clients/${quoteDetails.client && quoteDetails.client.id}`} className="p-1">
                    {quoteDetails.client && quoteDetails.client.agentName}
                </NavLink>
            </td>
            <td>
                {status === 'processing' ?
                     <button className="btn btn-link pl-1 pt-0" title="Close order" onClick={() => handleOpenOrCloseClick(id, status)}>
                        <i className="icon-lock-open"/>
                    </button> :
                    <button className="btn btn-link pl-1 pt-0" title="Open order" onClick={() => handleOpenOrCloseClick(id, status)}>
                        <i className="icon-lock"/>
                    </button>
                }
                <span className={`font-weight-bold ${status === 'processing' ? 'text-blue' : 'text-red'}`}>
                    {status && status.length ? status.substring(0, 1).toUpperCase() + status.substring(1) : ''}
                </span>
            </td>
            <td>
                {rollFormDetails && rollFormDetails.length ?
                    rollFormDetails.map((item, idx) => { return <div key={idx}><span>{item.company}</span></div>; })
                    : null
                }
            </td>
            <td>
                {supplierDetails && supplierDetails.length ?
                    supplierDetails.map((item, idx) => { return <div key={idx}><span>{item.company}</span></div>; })
                    : null
                }
            </td>
            <td>
                {acceptedSupplierDetails && acceptedSupplierDetails.length ?
                    acceptedSupplierDetails.map((item, idx) => { return <div key={idx}><span style={{color: 'green'}}>{item.company}</span></div>; })
                    : null
                }
            </td>
            <td>
                {rejectedSupplierDetails && rejectedSupplierDetails.length ?
                    rejectedSupplierDetails.map((item, idx) => { return <div key={idx}><span style={{color: 'red'}}>{item.company}</span></div>; })
                    : null
                }
            </td>
            <td>
                <FormattedDate value={createdAt} /> <FormattedTime value={createdAt} />
            </td>
            <td>
                <FormattedDate value={updatedAt} /> <FormattedTime value={updatedAt} />
            </td>
            <td align="center">
                <NavLink to={`/orders/edit/${quoteDetails.id}`} title="Edit Order" className="p-1">
                    <i className="icon-pencil" />
                </NavLink>
                <button className="btn btn-link pl-1 pt-0" title="Delete This Order"
                        onClick={() => handleDeleteClick(id)}>
                    <i className="icon-minus"/>
                </button>
            </td>
        </tr>
    )
};

OrderListItem.propTypes = {
    order: PropTypes.object.isRequired
};

export default OrderListItem;