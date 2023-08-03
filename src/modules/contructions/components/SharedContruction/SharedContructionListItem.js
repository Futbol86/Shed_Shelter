import React from 'react';
import {NavLink} from 'react-router-dom';
import {FormattedDate, FormattedTime} from 'react-intl';
import PropTypes from "prop-types";

const SharedOrder = ({ contruction }) => {
    const { id, quoteDetails, status, acceptedContructionDetails, createdAt, updatedAt} = contruction; 

    return (
        <tr>
            <td>
                <NavLink to={`/contructions/shared-contructions/edit/${quoteDetails.id}`} title="Edit Order" className="p-1">
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
                <span className={`font-weight-bold ${status === 'processing' ? 'text-blue' : 'text-red'}`}>
                    {status && status.length ? status.substring(0, 1).toUpperCase() + status.substring(1) : ''}
                </span>
            </td>
            <td>
                {acceptedContructionDetails && acceptedContructionDetails.length ?
                    acceptedContructionDetails.map((item, idx) => { return <div key={idx}><span>{item.tradesRegisteredName}</span></div>; })
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
                <NavLink to={`/contructions/shared-contructions/edit/${quoteDetails.id}`} title="Edit Order" className="p-1">
                    <i className="icon-pencil" />
                </NavLink>
            </td>
        </tr>
    )
};

SharedOrder.propTypes = {
    contruction: PropTypes.object.isRequired
};

export default SharedOrder;