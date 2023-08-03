import React, {Component} from 'react';
import {CardBody, Card, CardHeader, Row, Col, Label} from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import {utils} from "../../../../services";

class ClientContactDetail extends Component {
    render() {
        const {isCorp, contact, label} = this.props;
        return (
            <Card>
                <CardHeader className="pl-3">
                    <strong>{label}</strong> Info
                </CardHeader>
                <CardBody className="pb-2 pt-2">
                    <Row>
                        <Col xs="12" md={isCorp ? 6 : 12}>
                            <Row>
                                <Col md={isCorp ? 4 : 2} className="pl-2">
                                    <Label>
                                        <strong><FormattedMessage id="app.Name" defaultMessage="Name" />:</strong>
                                    </Label>
                                </Col>
                                <Col xs="12"  md={isCorp ? 8 : 10} className="pr-1 pl-1">
                                        {contact.name}
                                </Col>
                            </Row>
                        </Col>

                        {isCorp &&
                        <Col xs="12" md="6">
                            <Row>
                                <Col md="4" className="pl-2">
                                    <Label>
                                        <strong><FormattedMessage id="app.clients.Position" defaultMessage="Position" />:</strong>
                                    </Label>
                                </Col>
                                <Col xs="12" md="8" className="pr-1 pl-1">
                                    <Label>
                                        {contact.position}
                                    </Label>
                                </Col>
                            </Row>
                        </Col>
                        }

                        <Col xs="12" md="6">
                            <Row>
                                <Col md="4" className="pl-2">
                                    <Label>
                                        <strong>{isCorp ?
                                            <FormattedMessage id="app.clients.Landline" defaultMessage="Landline" />
                                            : <FormattedMessage id="app.clients.Home" defaultMessage="Home" />
                                }:</strong>
                                    </Label>
                                </Col>
                                <Col xs="12" md="8" className="pr-1 pl-1">
                                    <Label>
                                        {contact.phoneHome}
                                    </Label>
                                </Col>
                            </Row>
                        </Col>

                        {!isCorp &&
                        <Col xs="12" md="6">
                            <Row>
                                <Col md="4" className="pl-2">
                                    <Label>
                                        <strong><FormattedMessage id="app.clients.Work" defaultMessage="Work" />:</strong>
                                    </Label>
                                </Col>
                                <Col xs="12" md="8" className="pr-1 pl-1">
                                    <Label>
                                        {contact.phoneWork}
                                    </Label>
                                </Col>
                            </Row>
                        </Col>
                        }

                        <Col xs="12" md="6">
                            <Row>
                                <Col md="4" className="pl-2">
                                    <Label>
                                        <strong><FormattedMessage id="app.clients.Mobile" defaultMessage="Mobile" />:</strong>
                                    </Label>
                                </Col>
                                <Col xs="12" md="8" className="pr-1 pl-1">
                                    <Label>
                                        {contact.phoneMobile}
                                    </Label>
                                </Col>
                            </Row>
                        </Col>

                        {isCorp &&
                        <Col xs="12" md="6">
                            <Row>
                                <Col md="4" className="pl-2">
                                    <Label>
                                        <strong><FormattedMessage id="app.clients.Fax" defaultMessage="Fax" />:</strong>
                                    </Label>
                                </Col>
                                <Col xs="12" md="8" className="pr-1 pl-1">
                                    <Label>
                                        {contact.fax}
                                    </Label>
                                </Col>
                            </Row>
                        </Col>
                        }

                        <Col xs="12">
                            <Row>
                                <Col md="2" className="pl-2">
                                    <Label>
                                        <strong><FormattedMessage id="app.Email" defaultMessage="Email" />:</strong>
                                    </Label>
                                </Col>
                                <Col xs="12" md="10" className="pr-1 pl-1">
                                    <label className="d-flex flex-wrap">
                                        <a href={`mailto:${contact.email}`}>{contact.email}</a>
                                    </label>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    {!isCorp &&
                    <Row>
                        <Col xs="12" md="2" className="pl-2">
                            <strong><FormattedMessage id="app.clients.Addr" defaultMessage="Addr" />:</strong>
                        </Col>
                        <Col xs="12" md="10" className="pr-1 pl-1">
                            <div dangerouslySetInnerHTML={{ __html: utils.getAddressDisplaying(contact) }} />
                        </Col>
                    </Row>
                    }

                </CardBody>
            </Card>
        )
    }
}

export default ClientContactDetail;