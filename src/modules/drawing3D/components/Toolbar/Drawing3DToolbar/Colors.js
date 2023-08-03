import React, {Component, useState} from 'react';
import { Field } from 'redux-form';
import { Form, Row, Col, Collapse, Card, CardHeader, CardBody, CardFooter, Button, Alert, Label } from 'reactstrap';
import {FieldDropdownList} from "../../../../../components/common/Form/index";
import FieldLevelValidation from "../../../../../components/common/Form/FieldLevelValidation";
import WallsColourDropDown from "../../../../quotes/components/QuoteDetail/BuildingColour/WallsColourDropDown";
import {CLADDING_TEXTURE_TYPES, DOOR_TYPES, DOOR_COMPONENTS} from "../../../constants";

const Colors = ({}) => {
    return (
        <div className="animated fadeIn">
            <Card>
                <CardHeader>
                    <h4>Colours</h4>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col xs="12">
                            <Row>
                                <Col xs="12">
                                    <Label className="col-form-label">
                                        <b>Roof Type:</b>
                                    </Label>
                                </Col>
                                <Col xs="12">
                                    <Field
                                        name="colours.roofType"
                                        component={FieldDropdownList}
                                        data={CLADDING_TEXTURE_TYPES}
                                        valueField="code"
                                        textField="name"
                                        titleOption="--- Select ---"
                                        validate={FieldLevelValidation.validateRequired}
                                        className="form-control-sm pt-1"
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12">
                                    <Label className="col-form-label">
                                        <b>Roof Colour:</b>
                                    </Label>
                                </Col>
                                <Col xs="12">
                                    <Field name="colours.roofColour" component={WallsColourDropDown} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col xs="12">
                            <Row>
                                <Col xs="12">
                                    <Label className="col-form-label">
                                        <b>Wall Type:</b>
                                    </Label>
                                </Col>
                                <Col xs="12">
                                    <Field
                                        name="colours.wallType"
                                        component={FieldDropdownList}
                                        data={CLADDING_TEXTURE_TYPES}
                                        valueField="code"
                                        textField="name"
                                        titleOption="--- Select ---"
                                        validate={FieldLevelValidation.validateRequired}
                                        className="form-control-sm pt-1"
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12">
                                    <Label className="col-form-label">
                                        <b>Wall Colour:</b>
                                    </Label>
                                </Col>
                                <Col xs="12">
                                    <Field name="colours.wallColour" component={WallsColourDropDown} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col xs="12">
                            <Row>
                                <Col xs="12">
                                    <Label className="col-form-label">
                                        <b>Door Types:</b>
                                    </Label>
                                </Col>
                                <Col xs="12">
                                    <Field
                                        name="colours.doorType"
                                        component={FieldDropdownList}
                                        data={DOOR_TYPES}
                                        valueField="code"
                                        textField="name"
                                        titleOption="--- Select Door Type ---"
                                        validate={FieldLevelValidation.validateRequired}
                                        className="form-control-sm pt-1"
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12">
                                    <Label className="col-form-label">
                                        <b>Door Component:</b>
                                    </Label>
                                </Col>
                                <Col xs="12">
                                    <Field
                                        name="colours.doorComponent"
                                        component={FieldDropdownList}
                                        data={DOOR_COMPONENTS}
                                        valueField="code"
                                        textField="name"
                                        titleOption="--- Select Door Component ---"
                                        validate={FieldLevelValidation.validateRequired}
                                        className="form-control-sm pt-1"
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12">
                                    <Label className="col-form-label">
                                        <b>Door Colour:</b>
                                    </Label>
                                </Col>
                                <Col xs="12">
                                    <Field name="colours.doorColour" component={WallsColourDropDown} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    );
}

export default Colors;