import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import { Row, Col, Card, CardHeader, CardBody, Alert } from 'reactstrap';

import OrderInfo from './Order/OrderInfo';
import RollForm from '../containers/SharedOrder/RollForm';
import OrderNote from '../containers/Order/OrderNote';

class SharedOrderEdit extends Component {
    render() {
        const { orderDetails, quoteId, userId, isAdmin } = this.props;
        const isLocked = orderDetails && orderDetails.status !== 'processing';
        const quoteDetails = orderDetails ? orderDetails.quoteDetails || {} : {};
        const jobNumber = quoteDetails && quoteDetails.jobNumber;
        const clientDetails = quoteDetails.client;

        return (
            <div className="animated fadeIn">
                <fieldset disabled={isLocked}>
                    <Card>
                        <CardHeader>
                            <h2><FormattedMessage id="app.order.Edit_Shared_Order" defaultMessage="Edit Shared Order" /></h2>
                        </CardHeader>
                        <CardBody>
                            {orderDetails ?
                                <Row>
                                    <Col xs="12">
                                        <OrderInfo orderDetails={orderDetails} quoteId={quoteId}
                                            jobNumber={jobNumber} clientDetails={clientDetails}
                                        />
                                    </Col>
                                </Row>
                                : null
                            }
                            {orderDetails && orderDetails.rollFormDetails && orderDetails.rollFormDetails.length ?
                                orderDetails.rollFormDetails.map((item, idx) => {
                                    return  <Row key={idx}>
                                                <Col xs="12">
                                                    <RollForm orderDetails={orderDetails}
                                                            rollFormDetails={item}
                                                            userId={userId}
                                                            isAdmin={isAdmin}
                                                    />
                                                </Col>
                                            </Row>
                                }) : null
                            }
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

export default SharedOrderEdit;