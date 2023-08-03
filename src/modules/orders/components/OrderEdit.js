import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import { Row, Col, Card, CardHeader, CardBody, Alert } from 'reactstrap';

import OrderInfo from './Order/OrderInfo';
import SupplyChainMember from '../containers/Order/SupplyChainMember';
import OrderNote from '../containers/Order/OrderNote';
import AttachFileInvitation from '../containers/Order/AttachFileInvitation';

class OrderEdit extends Component {
    render() {
        const { orderDetails, quoteId, userId } = this.props;
        const isLocked = orderDetails && orderDetails.status !== 'processing';
        const quoteDetails = orderDetails ? orderDetails.quoteDetails || {} : {};
        const jobNumber = quoteDetails && quoteDetails.jobNumber;
        const clientDetails = quoteDetails.client;

        return (
            <div className="animated fadeIn">
                <fieldset disabled={isLocked}>
                    <Card>
                        <CardHeader>
                            <h2><FormattedMessage id="app.order.Edit_Order" defaultMessage="Edit Order" /></h2>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col xs="12">
                                    <OrderInfo orderDetails={orderDetails} quoteId={quoteId}
                                        jobNumber={jobNumber} clientDetails={clientDetails}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12">
                                    <SupplyChainMember quoteId={quoteId} orderDetails={orderDetails} />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12">
                                    <AttachFileInvitation orderDetails={orderDetails} isLocked={true}/>
                                </Col>
                            </Row>
                            {orderDetails && orderDetails.id ?
                                <Row>
                                    <Col xs="12">
                                        <OrderNote orderDetails={orderDetails} userId={userId} isLocked={isLocked}/>
                                    </Col>
                                </Row>
                                : null
                            }
                        </CardBody>
                    </Card>
                </fieldset>
                {isLocked &&
                    <Alert color="info" className="text-center">
                        <FormattedMessage id="app.order.This_Order_is_Closed_and_READ_ONLY" defaultMessage="This Order is Closed and READ ONLY!" />
                    </Alert>
                }
            </div>
        );
    }
}

export default OrderEdit;