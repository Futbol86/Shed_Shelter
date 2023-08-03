import React from 'react';
import { Card, CardHeader, CardBody, Row, Col, Label } from 'reactstrap';
import {NavLink} from 'react-router-dom';
import {FormattedMessage, FormattedDate, FormattedTime} from 'react-intl';

const OrderInfo = ({ jobNumber, quoteId, clientDetails, orderDetails }) => {
    return (
        <Card>
            <CardHeader className="pl-3">
                <strong><FormattedMessage id="app.order.Order_Info" defaultMessage="Order Info" /></strong>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col md="2" className="pl-2">
                        <Label>
                            <strong>
                                <FormattedMessage id="app.order.Job_Number" defaultMessage="Job Number" />:                    
                            </strong>
                        </Label>
                    </Col>
                    <Col md="4" className="pr-1 pl-1">
                        <NavLink to={`/quotes/edit/${quoteId}`}>
                            {jobNumber}
                        </NavLink>
                    </Col>
                </Row>
                <Row>
                    <Col md="2" className="pl-2">
                        <Label>
                            <strong>
                                <FormattedMessage id="app.order.Client_Name" defaultMessage="Client Name" />:                    
                            </strong>
                        </Label>
                    </Col>
                    <Col md="4" className="pr-1 pl-1">
                        <NavLink to={`/clients/${clientDetails && clientDetails.id}`}>
                            {clientDetails && clientDetails.agentName}
                        </NavLink>
                    </Col>
                </Row>
                <Row>
                    <Col md="2" className="pl-2">
                        <Label>
                            <strong>
                                <FormattedMessage id="app.order.Created_Date" defaultMessage="Created Date" />:
                            </strong>
                        </Label>
                    </Col>
                    <Col md="4" className="pr-1 pl-1">
                        <Label>
                            <FormattedDate value={orderDetails && orderDetails.createdAt} />
                            {`  `}
                            <FormattedTime value={orderDetails && orderDetails.createdAt}/>
                        </Label>
                    </Col>
                </Row>
                <Row>
                    <Col md="2" className="pl-2">
                        <Label>
                            <strong>
                                <FormattedMessage id="app.order.Updated_Date" defaultMessage="Updated Date" />:
                            </strong>
                        </Label>
                    </Col>
                    <Col md="4" className="pr-1 pl-1">
                        <Label>
                            <FormattedDate value={orderDetails && orderDetails.updatedAt} />
                            {`  `}
                            <FormattedTime value={orderDetails && orderDetails.updatedAt} />
                        </Label>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}

export default OrderInfo;