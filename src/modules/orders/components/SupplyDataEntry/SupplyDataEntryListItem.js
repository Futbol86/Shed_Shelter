import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from "prop-types";

const SupplyDataEntryListItem = ({supplyDataEntry, handleDeleteClick}) => {
    const { id, company, supplyType, branchName, daysOfOperation, physicalAddress, primaryContactDetails} = supplyDataEntry;

    return (
        <tr>
            <td>
                <NavLink to={`/orders/supply-data-entries/edit/${id}`} title="Edit Supply Data Entry" className="p-1">
                    {company}
                </NavLink>
            </td>
            <td>
                {supplyType + '' === "1" ? 'Roll form' : 'Supplier'}
            </td>
            <td>
                {branchName}
            </td>
            <td>
                {daysOfOperation}
            </td>
            <td>
                {physicalAddress}
            </td>
            <td>
                {primaryContactDetails}
            </td>
            <td align="center">
                <NavLink to={`/orders/supply-data-entries/edit/${id}`} title="Edit Supply Data Entry" className="p-1">
                    <i className="icon-pencil" />
                </NavLink>
                <button type="button" className="btn btn-link pl-1 pt-0" title="Delete This Supply Data Entry"
                        onClick={() => handleDeleteClick(id)}>
                    <i className="icon-minus"/>
                </button>
            </td>
        </tr>
    )
};

SupplyDataEntryListItem.propTypes = {
    supplyDataEntry: PropTypes.object.isRequired
};

export default SupplyDataEntryListItem;