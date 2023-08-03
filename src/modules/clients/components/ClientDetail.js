import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardHeader, CardBody, CardFooter, Row, Col, Label} from 'reactstrap';
import {NavLink} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

import NotFound from '../../../components/common/NotFound';
import {PREDEFINED_CLIENT_TYPES} from '../../../constants';
import ClientContactDetail from "./ClientDetail/ClientContactDetail";
import {utils} from '../../../services';
import DashboardQuoteList from "../../dashboard/containers/DashboardQuoteList";

const ClientDetail = ({client, loading}) => {
    if (loading)
        return null;
    if (!client || !client.agentName)
        return <NotFound />;

    return (
        <div className="animated fadeIn">
            <Card>
                <CardHeader>
                    <h2>
                        <FormattedMessage id="app.clients.Client_Detail" defaultMessage="Client Detail" />
                    </h2>
                    <div className="card-actions">
                        <NavLink to={`/clients/edit/${client.id}`}>
                            <h2>
                                <i className="icon-pencil" title="Edit this Client" />
                            </h2>
                        </NavLink>
                    </div>
                </CardHeader>

                <CardBody>
                    <Row className="mb-1">
                        <Col xs="6" md="2">
                            <strong><FormattedMessage id="app.clients.Customer_Type" defaultMessage="Customer Type" />:</strong>
                        </Col>
                        <Col xs="6" md="4">
                            <Label>
                                {PREDEFINED_CLIENT_TYPES[client.type]}
                            </Label>
                        </Col>
                    </Row>

                    {(client.type === "corp") &&
                    <React.Fragment>
                        <Row>
                            <Col xs="12" md="6">
                                <Row>
                                    <Col md="4">
                                        <Label>
                                            <strong><FormattedMessage id="app.clients.Agent_Name" defaultMessage="Agent Name" />:</strong>
                                        </Label>
                                    </Col>
                                    <Col xs="12" md="8">
                                        <Label>
                                            {client.agentName}
                                        </Label>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" md="6">
                                <Row>
                                    <Col md="4">
                                        <Label>
                                            <strong><FormattedMessage id="app.clients.Business_Number" defaultMessage="Business Number" />:</strong>
                                        </Label>
                                    </Col>
                                    <Col xs="12" md="8">
                                        <Label>
                                            {client.businessNumber}
                                        </Label>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs="12" md="6">
                                <Row>
                                    <Col md="4">
                                        <Label><strong><FormattedMessage id="app.clients.Company_Number" defaultMessage="Company Number" />:</strong></Label>
                                    </Col>
                                    <Col xs="12" md="8">
                                        <Label>
                                            {client.companyNumber}
                                        </Label>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </React.Fragment>
                    }

                    <Row>
                        {(client.contact1) &&
                        <Col xs="12" lg={(client.type === 'sing') ? 10 : 6}>
                            <ClientContactDetail label="Contact 1"
                                                 isCorp={client.type === 'corp'} contact={client.contact1} />
                        </Col>
                        }
                        {(client.contact2) &&
                        <Col xs="12" lg="6">
                            <ClientContactDetail label="Contact 2"
                                                 isCorp={client.type === 'corp'} contact={client.contact2} />
                        </Col>
                        }
                        {(client.contact3) &&
                        <Col xs="12" lg="6">
                            <ClientContactDetail label="Contact 3"
                                                 isCorp={client.type === 'corp'} contact={client.contact3} />
                        </Col>
                        }
                        {(client.contact4) &&
                        <Col xs="12" lg="6">
                            <ClientContactDetail label="Contact 4"
                                                 isCorp={client.type === 'corp'} contact={client.contact4} />
                        </Col>
                        }
                    </Row>


                    <Row>
                        <Col xs="12" md="10">
                            <Card>
                                <CardHeader>
                                    <strong><FormattedMessage id="app.clients.Site_Address" defaultMessage="Site Address" /></strong> {' '}
                                    <FormattedMessage id="app.Info" defaultMessage="Info" />
                                </CardHeader>
                                <CardBody className="pb-2 pt-2">
                                    <Label>
                                        <div dangerouslySetInnerHTML={{ __html: utils.getAddressDisplaying(client) }} />
                                    </Label>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    {(client && client.latestQuotes) &&
                    <Row>
                        <Col xs="12">
                            <DashboardQuoteList quotes={client.latestQuotes} displayClient = {false}/>
                        </Col>
                    </Row>
                    }
                </CardBody>

                <CardFooter className="d-flex justify-content-between">
                    <NavLink to={`/clients/list`} className="btn btn-outline-secondary text-dark">
                        <FormattedMessage id="app.clients.Return_Client_List" defaultMessage="Return Client List" />
                    </NavLink>
                    <NavLink to={`/quotes/add/${client.id}`} className="btn btn-dark text-white">
                        <FormattedMessage id="app.clients.Create_a_New_Quote" defaultMessage="Create a New Quote" />
                    </NavLink>
                </CardFooter>
            </Card>
        </div>
    );
};

ClientDetail.propTypes = {
    client: PropTypes.object
};

export default ClientDetail;
