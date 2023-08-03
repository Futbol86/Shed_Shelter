import React from 'react';
import {Card, CardHeader, CardBody, Row, Col, Label, Button} from 'reactstrap';
import {Field} from 'redux-form';
import {FormattedMessage} from 'react-intl';

import {FieldInputPure} from "../../../../../components/common/Form";

const BraceModule = ({braceWidths, braceSelection}) => (
    <Card>
        <CardHeader className="p-2">
            <strong><FormattedMessage id="app.quotes.Brace" defaultMessage="Brace" /></strong>
        </CardHeader>
        <CardBody className="p-2">
            <Row>
                <Col xs="6">
                    <Row className="mb-1">
                        <Col xs="12">
                            <span className="font-italic font-weight-bold">
                                <FormattedMessage id="app.quotes.End_Wall" defaultMessage="End Wall" />
                            </span>
                        </Col>
                    </Row>

                    <Row className="mb-1">
                        <Col xs={5} className="pl-4">
                            <Label className="col-form-label">
                                <FormattedMessage id="app.quotes.Height" defaultMessage="Height"/>:
                            </Label>
                        </Col>
                        <Col xs={7}>
                            <div className="form-group d-flex flex-row mb-0">
                                <Field type="number" component={FieldInputPure} readOnly={true}
                                       name='averageHeight'
                                       parse={(value) => value && parseInt(value, 10)}
                                       className="form-control form-control-sm text-right p-1"
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row className="mb-1">
                        <Col xs={5} className="pl-4">
                            <Label className="col-form-label">
                                <FormattedMessage id="app.quotes.Width" defaultMessage="Width"/>:
                            </Label>
                        </Col>
                        <Col xs={7}>
                            <Field component="select" name="ewBraceWidth"
                                   parse={(value) => value && parseInt(value, 10)}
                                   className="form-control form-control-sm text-left ml-0"
                            >
                                {braceWidths.map((item, idx) =>
                                    <option key={idx} value={item}>{item}</option>
                                )}
                            </Field>
                        </Col>
                    </Row>
                    <Row className="mb-1">
                        <Col xs={5} className="pl-4">
                            <Label className="col-form-label">
                                <FormattedMessage id="app.quotes.Brace" defaultMessage="Brace"/>:
                            </Label>
                        </Col>
                        <Col xs={7}>
                            <div className="form-group d-flex flex-row mb-0">
                                <Field component="select" name="ewBraceSelection"
                                       parse={(value) => value && parseInt(value, 10)}
                                       className="form-control form-control-sm text-left ml-0">
                                    <option value="0"></option>
                                    {braceSelection.map((item, idx) =>
                                        <option key={idx} value={item.id}>{item.name}</option>
                                    )}
                                </Field>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={5} className="pl-4">
                            <Label className="col-form-label">
                                <FormattedMessage id="app.quotes.Brace_Strength" defaultMessage="Strength"/>:
                            </Label>
                        </Col>
                        <Col xs={7}>
                            <div className="form-group d-flex flex-row mb-0">
                                <Field name="ewBraceStrength" type="number" component={FieldInputPure} readOnly={true}
                                       parse={(value) => value && parseFloat(value)}
                                       className="form-control form-control-sm text-right p-1" />
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col xs="6" style={{borderLeft: '1px solid #d4cdcd'}}>
                    <Row className="mb-1">
                        <Col xs="12">
                            <span className="font-italic font-weight-bold">
                                <FormattedMessage id="app.quotes.Side_Wall" defaultMessage="Side Wall" />
                            </span>
                        </Col>
                    </Row>

                    <Row className="mb-1">
                        <Col xs={5} className="pl-4">
                            <Label className="col-form-label">
                                <FormattedMessage id="app.quotes.Height" defaultMessage="Height"/>:
                            </Label>
                        </Col>
                        <Col xs={7}>
                            <div className="form-group d-flex flex-row mb-0">
                                <Field name="buildingHeight" type="number" component={FieldInputPure} readOnly={true}
                                       className="form-control form-control-sm text-right p-1" />
                            </div>
                        </Col>
                    </Row>
                    <Row className="mb-1">
                        <Col xs={5} className="pl-4">
                            <Label className="col-form-label">
                                <FormattedMessage id="app.quotes.Width" defaultMessage="Width"/>:
                            </Label>
                        </Col>
                        <Col xs={7}>
                            <Field component="select" name="swBraceWidth"
                                   parse={(value) => value && parseInt(value, 10)}
                                   className="form-control form-control-sm text-left ml-0"
                            >
                                {braceWidths.map((item, idx) =>
                                    <option key={idx} value={item}>{item}</option>
                                )}
                            </Field>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={5} className="pl-4">
                            <Label className="col-form-label">
                                <FormattedMessage id="app.quotes.Brace" defaultMessage="Brace"/>:
                            </Label>
                        </Col>
                        <Col xs={7}>
                            <div className="form-group d-flex flex-row mb-0">
                                <Field component="select" name="swBraceSelection"
                                       parse={(value) => value && parseInt(value, 10)}
                                       className="form-control form-control-sm text-left ml-0">
                                    <option value="0"></option>
                                    {braceSelection.map((item, idx) =>
                                        <option key={idx} value={item.id}>{item.name}</option>
                                    )}
                                </Field>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={5} className="pl-4">
                            <Label className="col-form-label">
                                <FormattedMessage id="app.quotes.Brace_Strength" defaultMessage="Strength"/>:
                            </Label>
                        </Col>
                        <Col xs={7}>
                            <div className="form-group d-flex flex-row mb-0">
                                <Field name="swBraceStrength" type="number" component={FieldInputPure} readOnly={true}
                                       parse={(value) => value && parseFloat(value)}
                                       className="form-control form-control-sm text-right p-1" />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>

        </CardBody>
    </Card>
);

export default BraceModule;