import React, {Component, useState} from 'react';
import { Field } from 'redux-form';
import { Row, Col, Collapse, Card, CardHeader, CardBody, Label, Button } from 'reactstrap';
import {FieldInputPure, FieldDropdownList} from "../../../../../components/common/Form/index";
import { } from "../../../constants";

const BoltAndNutSetting = ({generateBoltAndNut}) => {
    return (
        <div className="animated fadeIn">
            <Card>
                <CardHeader>
                    <h4>Bolt And Nut Settings</h4>
                </CardHeader>
                <CardBody>
                    <Row className="mb-2">
                        <Col xs="12">
                            <Label className="col-form-label"><b>Distance Between Bolt Head And Washer:</b></Label>
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col xs="4">
                            <Label className="col-form-label">Distance</Label> <br />
                        </Col>
                        <Col xs="8">
                            <Field name="boltAndNut.distanceBoltHeadAndBottomWasher" type="number" component={FieldInputPure} 
                                   parse={(value) => value && parseFloat(value)} />
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col xs="12">
                            <Label className="col-form-label"><b>Position:</b></Label>
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col xs="4">
                            <Label className="col-form-label">X</Label> <br />
                        </Col>
                        <Col xs="8">
                            <Field name="boltAndNut.position.x" type="number" component={FieldInputPure} 
                                   parse={(value) => value && parseFloat(value)} />
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col xs="4">
                            <Label className="col-form-label">Y</Label> <br />
                        </Col>
                        <Col xs="8">
                            <Field name="boltAndNut.position.y" type="number" component={FieldInputPure} 
                                   parse={(value) => value && parseFloat(value)} />
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col xs="4">
                            <Label className="col-form-label">Z</Label> <br />
                        </Col>
                        <Col xs="8">
                            <Field name="boltAndNut.position.z" type="number" component={FieldInputPure} 
                                   parse={(value) => value && parseFloat(value)} />
                        </Col>
                    </Row>
                    <hr />
                    <Row className="mb-2">
                        <Col xs="12">
                            <Label className="col-form-label"><b>Rotate:</b></Label>
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col xs="4">
                            <Label className="col-form-label">X</Label> <br />
                        </Col>
                        <Col xs="8">
                            <Field name="boltAndNut.rotate.x" type="number" component={FieldInputPure} 
                                   parse={(value) => value && parseFloat(value)} />
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col xs="4">
                            <Label className="col-form-label">Y</Label> <br />
                        </Col>
                        <Col xs="8">
                            <Field name="boltAndNut.rotate.y" type="number" component={FieldInputPure} 
                                   parse={(value) => value && parseFloat(value)} />
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col xs="4">
                            <Label className="col-form-label">Z</Label> <br />
                        </Col>
                        <Col xs="8">
                            <Field name="boltAndNut.rotate.z" type="number" component={FieldInputPure} 
                                   parse={(value) => value && parseFloat(value)} />
                        </Col>
                    </Row>
                    <hr />
                    <Row className="mb-2">
                        <Col xs="12">
                            <Button color="secondary" onClick={generateBoltAndNut}>
                                Set Bolt And Nut Setting
                            </Button>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    );
}

export default BoltAndNutSetting;