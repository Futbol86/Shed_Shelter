import React from 'react';
import {Card, CardHeader, CardBody, Row, Col, Label} from 'reactstrap';
import {Field} from 'redux-form';
import {FormattedMessage} from 'react-intl';

import WallsColourDropDown from './WallsColourDropDown';
import {PRODUCT_CATEGORY_SKILLION_CARPORTS, PRODUCT_CATEGORY_GABLE_CARPORTS} from "../../../../../constants";

const Flashings = ({flashingIsRollerDoor, flashingIsRollerDoorCopied, flashingIsAccessDoor, flashingIsAccessDoorCopied,
        flashingIsBarge, flashingIsBargeCopied, flashingIsCorner, flashingIsCornerCopied, productCategoryId
}) => {
    return (
        <Card>
            <CardHeader className="p-2">
                <strong><FormattedMessage id="app.quotes.Flashings" defaultMessage="Flashings" /></strong>
            </CardHeader>
            <CardBody className="p-2">
                {(productCategoryId === PRODUCT_CATEGORY_SKILLION_CARPORTS
                    || productCategoryId === PRODUCT_CATEGORY_GABLE_CARPORTS) ? null :
                <React.Fragment>
                    <Row>
                        <Col xs="12">
                            <Label className="col-form-label font-weight-bold">
                                <Field name="flashingIsRollerDoor" id="flashingIsRollerDoor" component="input" type="checkbox"

                                />
                                {' '}
                                <FormattedMessage id="app.quotes.Roller_door_flashing" defaultMessage="Roller door flashing" />
                            </Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="2" xs="4" className="offset-1">
                            <Label className="col-form-label">
                                <FormattedMessage id="app.quotes.Colour" defaultMessage="Colour" />
                            </Label>
                        </Col>
                        <Col md="4" xs="7">
                            <Label className="col-form-label">
                                <Field name="flashingIsRollerDoorCopied" id="flashingIsRollerDoorCopied"
                                       disabled={!flashingIsRollerDoor} component="input" type="checkbox" />
                                {' '}
                                <FormattedMessage id="app.quotes.The_same_as_wall" defaultMessage="The same as wall" />
                            </Label>
                        </Col>
                        <Col md="5" xs="12">
                            <Field name="flashingRollerDoorColor" component={WallsColourDropDown}
                                   disabled={!flashingIsRollerDoor || flashingIsRollerDoorCopied} />
                        </Col>
                    </Row>

                    <Row>
                        <Col xs="12">
                            <Label className="col-form-label font-weight-bold">
                                <Field name="flashingIsAccessDoor" id="flashingIsAccessDoor" component="input" type="checkbox"

                                />
                                {' '}
                                <FormattedMessage id="app.quotes.Access_door_flashing" defaultMessage="Access door flashing" />
                            </Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="2" xs="4" className="offset-1">
                            <Label className="col-form-label">
                                <FormattedMessage id="app.quotes.Colour" defaultMessage="Colour" />
                            </Label>
                        </Col>
                        <Col md="4" xs="7">
                            <Label className="col-form-label">
                                <Field name="flashingIsAccessDoorCopied" id="flashingIsAccessDoorCopied"
                                       disabled={!flashingIsAccessDoor} component="input" type="checkbox" />
                                {' '}
                                <FormattedMessage id="app.quotes.The_same_as_wall" defaultMessage="The same as wall" />
                            </Label>
                        </Col>
                        <Col md="5" xs="12">
                            <Field name="flashingAccessDoorColor" component={WallsColourDropDown}
                                   disabled={!flashingIsAccessDoor || flashingIsAccessDoorCopied} />
                        </Col>
                    </Row>
                </React.Fragment>
                }

                <Row className="pt-2">
                    <Col xs="12">
                        <Label className="col-form-label font-weight-bold">
                            <Field name="flashingIsBarge" id="flashingIsBarge" component="input" type="checkbox" />
                            {' '}
                            <FormattedMessage id="app.quotes.Barge" defaultMessage="Barge" />
                        </Label>
                    </Col>
                </Row>
                <Row>
                    <Col md="2" xs="4" className="offset-1">
                        <Label className="col-form-label">
                            <FormattedMessage id="app.quotes.Colour" defaultMessage="Colour" />
                        </Label>
                    </Col>
                    <Col md="4" xs="7">
                        <Label className="col-form-label">
                            <Field name="flashingIsBargeCopied" id="flashingIsBargeCopied"
                                   disabled={!flashingIsBarge} component="input" type="checkbox" />
                            {' '}
                            <FormattedMessage id="app.quotes.The_same_as_roof" defaultMessage="The same as roof" />
                        </Label>
                    </Col>
                    <Col md="5" xs="12">
                        <Field name="flashingBargeColor" component={WallsColourDropDown}
                               disabled={!flashingIsBarge || flashingIsBargeCopied} />
                    </Col>
                </Row>

                {(productCategoryId === PRODUCT_CATEGORY_SKILLION_CARPORTS ||
                    productCategoryId === PRODUCT_CATEGORY_GABLE_CARPORTS) ? null :
                    <React.Fragment>
                        <Row className="pt-2">
                            <Col xs="12">
                                <Label className="col-form-label font-weight-bold">
                                    <Field name="flashingIsCorner" id="flashingIsCorner" component="input"
                                           type="checkbox"/>
                                    {' '}
                                    <FormattedMessage id="app.quotes.Corner_Capping" defaultMessage="Corner Capping"/>
                                </Label>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="2" xs="4" className="offset-1">
                                <Label className="col-form-label">
                                    <FormattedMessage id="app.quotes.Colour" defaultMessage="Colour"/>
                                </Label>
                            </Col>
                            <Col md="4" xs="7">
                                <Label className="col-form-label">
                                    <Field name="flashingIsCornerCopied" id="flashingIsCornerCopied"
                                           disabled={!flashingIsCorner} component="input" type="checkbox"/>
                                    {' '}
                                    <FormattedMessage id="app.quotes.The_same_as_wall"
                                                      defaultMessage="The same as wall"/>
                                </Label>
                            </Col>
                            <Col md="5" xs="12">
                                <Field name="flashingCornerColor" component={WallsColourDropDown}
                                       disabled={!flashingIsCorner || flashingIsCornerCopied}/>
                            </Col>
                        </Row>
                    </React.Fragment>
                }
            </CardBody>
        </Card>
    );
};

export default Flashings;