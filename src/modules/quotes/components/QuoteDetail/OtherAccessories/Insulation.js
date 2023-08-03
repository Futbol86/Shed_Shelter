import React from 'react';
import {Card, CardHeader, CardBody, Row, Col, Label} from 'reactstrap';
import {Field} from 'redux-form';
import {FieldInputPure} from "../../../../../components/common/Form";
import {FormattedMessage} from 'react-intl';

const Insulation = ({buildingInsulations}) => {
    return (
        <Card>
            <CardHeader className="p-2">
                <strong><FormattedMessage id="app.quotes.Insulation" defaultMessage="Insulation" /></strong>
            </CardHeader>
            <CardBody className="p-2">
                <Row>
                    <Col>
                        <Label className="col-form-label font-weight-bold">
                            <FormattedMessage id="app.quotes.Roof_Insulation" defaultMessage="Roof Insulation" />
                        </Label>
                    </Col>
                </Row>
                <Row>
                    <Col xs="2" className="offset-1">
                        <Label className="col-form-label">
                            <FormattedMessage id="app.quotes.Type" defaultMessage="Type" />
                        </Label>
                    </Col>
                    <Col xs="9">
                        <Field component="select" name="roofInsulationType" id="roofInsulationType"
                               className="form-control form-control-sm text-right"
                        >
                            <option value=""></option>
                            {buildingInsulations['Roof Insulation'].map((item, idx) =>
                                <option key={idx} value={item.id}>{item.name}</option>
                            )}
                        </Field>
                    </Col>
                </Row>
                <Row>
                    <Col xs="2" className="offset-1">
                        <Label className="col-form-label">
                            <FormattedMessage id="app.quotes.Qty" defaultMessage="Qty" />
                        </Label>
                    </Col>
                    <Col xs="9">
                        <Field name="roofInsulationQty" type="number" component={FieldInputPure}
                               className="form-control form-control-sm text-right" style={{width: '80px'}}
                        />
                    </Col>
                </Row>
                <Row className="pt-2">
                    <Col>
                        <Label className="col-form-label font-weight-bold">
                        <FormattedMessage id="app.quotes.Roof_Safe_Wire" defaultMessage="Roof Safe Wire" />
                        </Label>
                    </Col>
                </Row>
                <Row>
                    <Col xs="2" className="offset-1">
                        <Label className="col-form-label">
                            <FormattedMessage id="app.quotes.Type" defaultMessage="Type" />
                        </Label>
                    </Col>
                    <Col xs="9">
                        <Field component="select" name="roofSafeWireType" id="roofSafeWireType"
                               className="form-control form-control-sm text-right"
                        >
                            <option value=""></option>
                            {buildingInsulations['Roof Safe Wire'].map((item, idx) =>
                                <option key={idx} value={item.id}>{item.name}</option>
                            )}
                        </Field>
                    </Col>
                </Row>
                <Row>
                    <Col xs="2" className="offset-1">
                        <Label className="col-form-label">
                            <FormattedMessage id="app.quotes.Qty" defaultMessage="Qty" />
                        </Label>
                    </Col>
                    <Col xs="9">
                        <Field name="roofSafeWireQty" type="number" component={FieldInputPure}
                               className="form-control form-control-sm text-right" style={{width: '80px'}}
                        />
                    </Col>
                </Row>
                <Row className="pt-2">
                    <Col>
                        <Label className="col-form-label font-weight-bold">
                        <FormattedMessage id="app.quotes.Wall_Insulation" defaultMessage="Wall Insulation" />
                        </Label>
                    </Col>
                </Row>
                <Row>
                    <Col xs="2" className="offset-1">
                        <Label className="col-form-label">
                            <FormattedMessage id="app.quotes.Type" defaultMessage="Type" />
                        </Label>
                    </Col>
                    <Col xs="9">
                        <Field component="select" name="wallInsulationType" id="wallInsulationType"
                               className="form-control form-control-sm text-right"
                        >
                            <option value=""></option>
                            {buildingInsulations['Wall Insulation'].map((item, idx) =>
                                <option key={idx} value={item.id}>{item.name}</option>
                            )}
                        </Field>
                    </Col>
                </Row>
                <Row>
                    <Col xs="2" className="offset-1">
                        <Label className="col-form-label">
                            <FormattedMessage id="app.quotes.Qty" defaultMessage="Qty" />
                        </Label>
                    </Col>
                    <Col xs="9">
                        <Field name="wallInsulationQty" type="number" component={FieldInputPure}
                               className="form-control form-control-sm text-right" style={{width: '80px'}}
                        />
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
};

export default Insulation;