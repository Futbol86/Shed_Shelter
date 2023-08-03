import React from 'react';
import {CardBody, Card, CardHeader, Row, Col, Label} from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import {utils} from "../../../../../services";
import {PREDEFINED_CLIENT_TYPES} from "../../../../../constants";

const CustomerDetail  = ({clientDetail}) => {
    if (!clientDetail)
        return null;
    const contact = clientDetail.contact1;
    const isCorp = (clientDetail.type === 'corp');

    return (
        <Card>
            <CardHeader className="pl-3">
                <strong><FormattedMessage id="app.quotes.Customer_Details" defaultMessage="Customer Details" /></strong>
            </CardHeader>
            <CardBody className="pb-2 pt-2">
                <Row className="mb-1">
                    <Col xs="3" className="pl-1 pr-1">
                        <strong><FormattedMessage id="app.clients.Customer_Type" defaultMessage="Customer Type" />:</strong>
                    </Col>
                    <Col xs="9" className="pl-1">
                        <Label>
                            {PREDEFINED_CLIENT_TYPES[clientDetail.type]}
                        </Label>
                    </Col>
                </Row>

                {isCorp &&
                <Row>
                    <Col xs="3" className="pl-1 pr-1">
                        <Label>
                            <strong><FormattedMessage id="app.clients.Trading_Name" defaultMessage="Trading Name"/>:</strong>
                        </Label>
                    </Col>
                    <Col xs="9" className="pl-1">
                        <Label>
                            {clientDetail.agentName}
                        </Label>
                    </Col>
                </Row>
                }

                <Row>
                    <Col xs="3" className="pl-1 pr-1">
                        <Label>
                            <strong><FormattedMessage id="app.clients.Contact_Name" defaultMessage="Contact Name" />:</strong>
                        </Label>
                    </Col>
                    <Col xs="9" className="pl-1">
                        {contact.name}
                    </Col>
                </Row>

                <Row>
                    <Col xs="3" className="pl-1 pr-1">
                        <Label>
                            <strong><FormattedMessage id="app.clients.Contact_Number" defaultMessage="Contact Number" />:</strong>
                        </Label>
                    </Col>
                    <Col xs="9" className="pl-1">
                        {contact.phoneHome}
                        {contact.phoneWork ? ` - ${contact.phoneWork}` : null}
                        {contact.phoneMobile ? ` - ${contact.phoneMobile}` : null}
                    </Col>
                </Row>

                <Row>
                    <Col xs="3" className="pl-1 pr-1">
                        <Label>
                            <strong><FormattedMessage id="app.Email" defaultMessage="Email" />:</strong>
                        </Label>
                    </Col>
                    <Col xs="9" className="pl-1">
                        <label className="d-flex flex-wrap">
                            <a href={`mailto:${contact.email}`}>{contact.email}</a>
                        </label>
                    </Col>
                </Row>

                <Row>
                    <Col xs="3" className="pl-1 pr-1">
                        <Label>
                            <strong><FormattedMessage id="app.clients.Address" defaultMessage="Address" />:</strong>
                        </Label>
                    </Col>
                    <Col xs="9" className="pl-1">
                        <label className="d-flex flex-wrap">
                            <div dangerouslySetInnerHTML={{
                                __html: utils.getAddressDisplaying(isCorp ? clientDetail : contact)
                            }} />
                        </label>
                    </Col>
                </Row>


            </CardBody>
        </Card>
    );
};

export default CustomerDetail;