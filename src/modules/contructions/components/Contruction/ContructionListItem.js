import React from 'react';
import {NavLink} from 'react-router-dom';
import {FormattedDate, FormattedTime} from 'react-intl';
import PropTypes from "prop-types";

const ContructionListItem = ({contruction, handleOpenOrCloseClick, handleDeleteClick}) => {
    const { id, quoteDetails, status, dealerDetail, contructionMemberDetails, acceptedContructionDetails, rejectedContructionDetails, createdAt, updatedAt} = contruction;
    return (
        <tr>
            <td>
                <NavLink to={`/contructions/edit/${quoteDetails.id}`} title="Edit Contruction" className="p-1">
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
                {dealerDetail && (dealerDetail.firstName + ' ' + dealerDetail.lastName)}
            </td>
            <td>
                {status === 'processing' ?
                     <button className="btn btn-link pl-1 pt-0" title="Close contruction" onClick={() => handleOpenOrCloseClick(id, status)}>
                        <i className="icon-lock-open"/>
                    </button> :
                    <button className="btn btn-link pl-1 pt-0" title="Open contruction" onClick={() => handleOpenOrCloseClick(id, status)}>
                        <i className="icon-lock"/>
                    </button>
                }
                <span className={`font-weight-bold ${status === 'processing' ? 'text-blue' : 'text-red'}`}>
                    {status && status.length ? status.substring(0, 1).toUpperCase() + status.substring(1) : ''}
                </span>
            </td>
            <td>
                {contructionMemberDetails && contructionMemberDetails.length ?
                    contructionMemberDetails.map((item, idx) => { return <div key={idx}><span>{item.tradesRegisteredName}</span></div>; })
                    : null
                }
            </td>
            <td>
                {acceptedContructionDetails && acceptedContructionDetails.length ?
                    acceptedContructionDetails.map((item, idx) => { return <div key={idx}><span style={{color: 'green'}}>{item.tradesRegisteredName}</span></div>; })
                    : null
                }
            </td>
            <td>
                {rejectedContructionDetails && rejectedContructionDetails.length ?
                    rejectedContructionDetails.map((item, idx) => { return <div key={idx}><span style={{color: 'red'}}>{item.tradesRegisteredName}</span></div>; })
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
                <NavLink to={`/contructions/edit/${quoteDetails.id}`} title="Edit Contruction" className="p-1">
                    <i className="icon-pencil" />
                </NavLink>
                <button className="btn btn-link pl-1 pt-0" title="Delete This Contruction"
                        onClick={() => handleDeleteClick(id)}>
                    <i className="icon-minus"/>
                </button>
            </td>
        </tr>
    )
};

ContructionListItem.propTypes = {
    contruction: PropTypes.object.isRequired
};

export default ContructionListItem;