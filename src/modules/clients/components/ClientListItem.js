import React from 'react';
import {NavLink} from 'react-router-dom';
import { Badge } from 'reactstrap';
import PropTypes from "prop-types";

import {utils} from '../../../services';

const ClientListItem = ({client}) => {
    const {id, agentName, businessNumber, type} = client;
    return (
        <tr>
            <td>
                <NavLink to={`/clients/${id}`} title="View Client" className="p-1">
                    {agentName}
                </NavLink>
            </td>
            <td>{businessNumber}</td>
            <td>
                <div dangerouslySetInnerHTML={{ __html: utils.getAddressDisplaying(client) }} />
            </td>
            <td>
                <Badge color={(type === 'corp') ? 'primary' : ((type === 'dual') ? 'success' : 'info')}>
                    {type}
                </Badge>
            </td>
            <td align="center">
                <NavLink to={`/clients/edit/${id}`} title="Edit Client Information" className="p-1">
                    <i className="icon-pencil" />
                </NavLink>

                <NavLink to={`/quotes/add/${id}`} title="Add Quote for this Client" className="p-1">
                    <i className="icon-plus" />
                </NavLink>
            </td>
        </tr>
    )
};

ClientListItem.propTypes = {
    client: PropTypes.object.isRequired
};

export default ClientListItem;