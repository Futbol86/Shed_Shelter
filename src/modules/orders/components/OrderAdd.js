import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import {FormattedMessage} from 'react-intl';
import { Row, Col, Form, Button, Card, CardHeader, CardBody, CardFooter } from 'reactstrap';

import OrderInfo from './Order/OrderInfo';
import SupplyChainMember from '../containers/Order/SupplyChainMember';
import AttachFileInvitation from '../containers/Order/AttachFileInvitation';

class OrderAdd extends Component {
    render() {
        const { orderDetails, quoteId, jobNumber, clientDetails, handleSubmit, submitting, pristine, invalid, reset} = this.props;
        return (
            <div className="animated fadeIn">
                <Form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <h2><FormattedMessage id="app.order.Add_New_Order" defaultMessage="Add New Order" /></h2>
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
                                    <AttachFileInvitation orderDetails={orderDetails} />
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter className="d-flex justify-content-between">
                            <Button color="secondary" disabled={pristine || submitting || pristine} onClick={reset}>
                                <FormattedMessage id="app.Cancel" defaultMessage="Cancel" />
                            </Button>
                            <LaddaButton data-size={L} data-style={EXPAND_LEFT} data-color="green"
                                        data-spinner-lines={12} className="btn btn-dark" type="submit"
                                        loading={submitting}  disabled={submitting || invalid || pristine}>
                                <FormattedMessage id="app.Create" defaultMessage="Create" />
                            </LaddaButton>
                        </CardFooter>
                    </Card>
                </Form>
            </div>
        );
    }
}

OrderAdd.propTypes = {
    handleSubmit: PropTypes.func
};

export default OrderAdd;