import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from "prop-types";

const ContructionDataEntryListItem = ({contructionDataEntry, handleDeleteClick}) => {
    const { id, tradesRegisteredName, contructionField, category, contractorsLicenceNumber, contractorsLicenceExpiryDate, australianBusinessNumber} = contructionDataEntry;

    return (
        <tr>
            <td>
                <NavLink to={`/contructions/contruction-data-entries/edit/${id}`} title="Edit Contruction Data Entry" className="p-1">
                    {tradesRegisteredName}
                </NavLink>
            </td>
            <td>
                {contructionField}
            </td>
            <td>
                {category}
            </td>
            <td>
                {contractorsLicenceNumber}
            </td>
            <td>
                {contractorsLicenceExpiryDate}
            </td>
            <td>
                {australianBusinessNumber}
            </td>
            <td align="center">
                <NavLink to={`/contructions/contruction-data-entries/edit/${id}`} title="Edit Contruction Data Entry" className="p-1">
                    <i className="icon-pencil" />
                </NavLink>
                <button type="button" className="btn btn-link pl-1 pt-0" title="Delete This Contruction Data Entry"
                        onClick={() => handleDeleteClick(id)}>
                    <i className="icon-minus"/>
                </button>
            </td>
        </tr>
    )
};

ContructionDataEntryListItem.propTypes = {
    contructionDataEntry: PropTypes.object.isRequired
};

export default ContructionDataEntryListItem;