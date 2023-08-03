import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBody, Table } from 'reactstrap';
import {FormattedMessage} from 'react-intl';

import ClientListFilter from '../containers/ClientListFilter';
import ClientListItem from "./ClientListItem";
import Pagination from '../../../components/common/Pagination';

const ClientList = ({clients, pagination, onChangePage}) => (
    <div className="animated fadeIn">
        <Card>
            <CardHeader>
                <h2>
                    <FormattedMessage id="app.clients.Client_List" defaultMessage="Client List" />
                </h2>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col xs="12">
                        <div className="float-right mb-2">
                            <ClientListFilter />
                        </div>
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

                        {/*TO DO*/}
                        <Pagination pagination={pagination} onChangePage={onChangePage} />
                    </Col>
                </Row>
            </CardBody>
        </Card>
    </div>
);

ClientList.propTypes = {
    clients: PropTypes.array,
    pagination: PropTypes.object,
    onChangePage: PropTypes.func.isRequired
};

export default ClientList;