import React from 'react';
import {Field} from 'redux-form';
import {Row, Col, Card, CardHeader, CardBody, Badge, Form, Label, Button} from 'reactstrap';
import {FieldInputPure} from "../../../../components/common/Form";
import FieldDatePicker from "../../../../components/common/Form/FieldDatePicker";
import {FormattedMessage} from 'react-intl';

const RollForm = ({ rollFormDetails, userId, isAdmin, handleSubmit, submitting, invalid, pristine }) => {
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader className="pl-3">
                        <strong><FormattedMessage id= "app.order.Roll_Form" defaultMessage= "Roll Form" /></strong>
                        <span className='ml-2'><Badge color="primary">{rollFormDetails.company}</Badge></span>
                    </CardHeader>
                    <CardBody className="pb-2 pt-2">
                        <fieldset disabled={!rollFormDetails || (!isAdmin && (userId !== rollFormDetails.userId))}>
                            <Row className="mb-3">
                                <Col xs="6" md="2" className="pl-2">
                                    <Label className="col-form-label">
                                        <FormattedMessage id= "app.order.Scheduled_Delivery_Date" defaultMessage= "Scheduled Delivery Date" />
                                    </Label>
                                </Col>
                                <Col xs="6" md="4" className="pr-1 pl-1">
                                    <Field name="scheduledDeliveryDate" type="date" component={FieldDatePicker}
                                        className="form-control form-control-sm"
                                        placeholderText="DD/MM/YYYY" dateFormat="dd/MM/yyyy"
                                        style={{width: '400px'}}
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col xs="6" md="2" className="pl-2">
                                    <Label className="col-form-label">
                                        <FormattedMessage id="app.order.Order_Reference" defaultMessage="Order Reference" />
                                    </Label>
                                </Col>
                                <Col xs="6" md="4" className="pr-1 pl-1">
                                    <Field name='orderReference' type="text" component={FieldInputPure} className="form-control form-control-sm"/>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col xs="6" md="2" className="pl-2">
                                    <Label className="col-form-label">
                                        <FormattedMessage id="app.order.Consolidation_Address" defaultMessage="Consolidation Address" />
                                    </Label>
                                </Col>
                                <Col xs="6" md="4" className="pr-1 pl-1">
                                    <Field name='consolidationAddress' type="text" component={FieldInputPure} className="form-control form-control-sm" />
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col xs="6" md="6" className="d-flex justify-content-center">
                                    <Button type="submit" className="btn btn-dark" disabled={pristine || submitting || invalid}> 
                                        <FormattedMessage id="app.Save" defaultMessage="Save" />
                                    </Button>
                                </Col>
                            </Row>
                        </fieldset>
                    </CardBody>
                </Card>
            </Form>
        </div>
    )
};

export default RollForm;