import React, {Component, useState} from 'react';
import { Field } from 'redux-form';
import {FieldInputPure} from "../../../../../components/common/Form/index";
import { Row, Col, Card, CardHeader, CardBody, CardFooter, Button, Alert, Label } from 'reactstrap';

const Size = ({handleAddBay, handleRemoveBay}) => {
    return (
        <div className="animated fadeIn">
            <Card>
                <CardHeader>
                    <h4>Size</h4>
                </CardHeader>
                <CardBody>
                    <Row className="mb-2">
                        <Col xs="6">
                            <Label className="col-form-label">
                                <b>Bays:</b>
                            </Label>
                        </Col>
                        <Col xs="6">
                            <Field name="baySheds" type="number" readOnly={true} component={FieldInputPure} className="form-control form-control-sm" />
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col xs="6">
                            <Button color="secondary" onClick={handleAddBay}>
                                <i className="fa fa-plus fa-lg" title="Add Bay" /> {` `}Bay
                            </Button>
                        </Col>
                        <Col xs="6">
                            <Button color="secondary" onClick={handleRemoveBay}>
                                <i className="fa fa-minus fa-lg" title="Remove Bay" /> {` `}Bay
                            </Button>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    );
}

export default Size;