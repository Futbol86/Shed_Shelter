import React from 'react';
import {NavLink} from 'react-router-dom';
import { Table, Card, CardHeader, CardBody } from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import ClientListItem from "../../clients/components/ClientListItem";

const DashboardClientList = ({clients}) => (
    <Card>
        <CardHeader>
            <h5 className="m-0">
                <i className="icon-user" /> {' '}
                <FormattedMessage id="app.dashboard.Latest_Active_Clients" defaultMessage="Latest Active Clients" />
            </h5>
            <div className="card-actions">
                <NavLink to={`/clients/list`}>
                    <small className="text-muted">
                        <FormattedMessage id="app.More" defaultMessage="More" />
                    </small>
                </NavLink>
            </div>
        </CardHeader>
        <CardBody>
            <Table responsive striped>
                <thead>
                <tr>
                    <th><FormattedMessage id="app.clients.Client_Name" defaultMessage="Client Name" /></th>
                    <th><FormattedMessage id="app.clients.Phone" defaultMessage="Phone" /></th>
                    <th><FormattedMessage id="app.clients.Site_Address" defaultMessage="Site Address" /></th>
                    <th><FormattedMessage id="app.clients.Type" defaultMessage="Type" /></th>
                    <th align="center"></th>
                </tr>
                </thead>
                <tbody>
                {(clients && clients.length > 0)
                    ? clients.map((client, idx) => (
                        <ClientListItem key={idx} client={client} />
                    ))
                    : <tr><td colSpan={5}><FormattedMessage id="app.clients.No_Client_Found" defaultMessage="No Client Found" /></td></tr>
                }
                </tbody>
            </Table>
        </CardBody>
    </Card>
);

export default DashboardClientList;