import React from 'react';
import {CardBody, Card, CardHeader, Row, Col, Label} from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import {Field} from "redux-form";

import {QUOTES_DS_DELIVERY_SUPPLIERS} from "../../../constants";
import {FieldInputPure} from "../../../../../components/common/Form";
import FieldDatePicker from "../../../../../components/common/Form/FieldDatePicker";

const Delivery  = ({}) => {
    return (
        <Card>
            <CardHeader className="pl-3">
                <strong><FormattedMessage id="app.quotes.Delivery" defaultMessage="Delivery" /></strong>
            </CardHeader>
            <CardBody className="pb-0 pt-2">
                <Row className="mb-2">
                    <Col xs="12" md="6" className="pl-1">
                        <FormattedMessage id="app.quotes.Supplier" defaultMessage="Supplier" />
                    </Col>
                    <Col xs="12" md="6" className="pl-1">
                        <Field component="select" name="deliverySupplier"
                               className="form-control form-control-sm ml-1"
                        >
                            {QUOTES_DS_DELIVERY_SUPPLIERS.map((item, idx) =>
                                <option key={idx} value={item.id}>{item.name}</option>
                            )}
                        </Field>
                    </Col>
                </Row>

                <Row className="mb-1">
                    <Col xs="12" className="pl-1 pr-2">
                        <Label className="d-flex flex-row justify-content-end">
                            <FormattedMessage id="app.quotes.Total_Freight_cost" defaultMessage="Total Freight cost" />

                            <Field name="deliveryFreightCost" type="text" component={FieldInputPure}
                                   className="form-control form-control-sm ml-1 mr-1" style={{maxWidth: '100px'}}
                            />
                        </Label>
                    </Col>
                </Row>

                <Row className="mb-0">
                    <Col xs="12" className="pl-1 d-flex flex-row justify-content-between mb-0">
                        <Label className="d-flex flex-row justify-content-end mb-0">
                            <FormattedMessage id="app.quotes.Mass" defaultMessage="Mass" />

                            <Field name="deliveryMass" type="text" component={FieldInputPure}
                                   className="form-control form-control-sm ml-1" style={{maxWidth: '80px'}}
                            />
                        </Label>

                        <Label className="d-flex flex-row justify-content-end mb-0">
                            <FormattedMessage id="app.quotes.Requested_Delivery_Date" defaultMessage="Requested Delivery Date" />

                            <Field name="deliveryDeliveredBy" type="date" component={FieldDatePicker}
                                   className="form-control form-control-sm ml-1 mr-1"
                                   placeholderText="DD/MM/YYYY" dateFormat="dd/MM/yyyy"
                                   style={{width: '100px'}} withPortal
                            />
                            {/*<Field name="deliveryDeliveredBy" type="text" component={FieldInputPure}*/}
                                   {/*className="form-control form-control-sm ml-1 mr-1" style={{maxWidth: '100px'}}*/}
                            {/*/>*/}
                        </Label>
                    </Col>
                </Row>


            </CardBody>
        </Card>
    );
};

export default Delivery;