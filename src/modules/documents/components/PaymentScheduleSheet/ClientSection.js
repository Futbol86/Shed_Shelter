import React from 'react';
import { Row, Col } from 'reactstrap';
import {FormattedMessage} from "react-intl";
import utils from "../../../../services/utils";
import {Field} from "redux-form";

const ClientSection = ({clientDetail}) => {
    if (!clientDetail)
        return null;

    return (
        <React.Fragment>
            <Row className="pb-1 pl-1">
                <Col xs={3} md={2}>
                    <strong>
                        <FormattedMessage id="app.docs.Customer" defaultMessage="Customer" />:
                    </strong>
                </Col>
                <Col xs={9} md={10}>
                    {(clientDetail.type === 'corp') ?
                        clientDetail.agentName :
                        (clientDetail.type === 'dual') ?
                            `${clientDetail.contact1 && clientDetail.contact1.name} - ${clientDetail.contact2 && clientDetail.contact2.name}` :
                            clientDetail.contact1 && clientDetail.contact1.name
                    }
                </Col>
            </Row>

            <Row className="pb-1 pl-1">
                <Col xs={3} md={2}>
                    <strong>
                        <FormattedMessage id="app.clients.Site_Address" defaultMessage="Site Address" />:
                    </strong>
                </Col>
                <Col xs={9} md={10}>
                    <div
                         dangerouslySetInnerHTML={{ __html: utils.getAddressDisplaying(clientDetail) }}
                    />
                </Col>
            </Row>

            <Row className="pb-1 pl-1">
                <Col xs={3} md={2}>
                    <strong>
                        <FormattedMessage id="app.docs.Phone_Number" defaultMessage="Phone Number" />:
                    </strong>
                </Col>
                <Col xs={9} md={10}>
                    <Row>
                        <Col xs={6}>
                            ({
                            (clientDetail.type === 'corp') ?
                                <FormattedMessage id="app.clients.Landline" defaultMessage="Landline"/> :
                                <FormattedMessage id="app.clients.Home" defaultMessage="Home"/>
                            })
                            {' '}{clientDetail.contact1 && clientDetail.contact1.phoneHome}
                        </Col>
                        <Col xs={6}>
                            ({
                            (clientDetail.type === 'corp') ?
                                <FormattedMessage id="app.clients.Mobile" defaultMessage="Mobile"/> :
                                <FormattedMessage id="app.clients.Work" defaultMessage="Work"/>
                        })
                            {' '}{clientDetail.type === 'corp' ?
                                clientDetail.contact1 && clientDetail.contact1.phoneMobile :
                                clientDetail.contact1 && clientDetail.contact1.phoneWork}
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row className="pb-1 pl-1">
                <Col xs={3} md={2}>
                    <strong>
                        <FormattedMessage id="app.docs.Email_Address" defaultMessage="Email Address" />:
                    </strong>
                </Col>
                <Col xs={9} md={10}>
                    {clientDetail.contact1 && clientDetail.contact1.email ?
                        <a href={`mailto:${clientDetail.contact1 && clientDetail.contact1.email}`}>{clientDetail.contact1 && clientDetail.contact1.email}</a>
                        : null
                    }
                </Col>
            </Row>

        </React.Fragment>
    );
};

export default ClientSection;