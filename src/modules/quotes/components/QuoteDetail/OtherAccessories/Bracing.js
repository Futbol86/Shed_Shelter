import React from 'react';
import {Card, CardHeader, CardBody, Row, Col, Label} from 'reactstrap';
import {Field} from 'redux-form';
import {FormattedMessage} from 'react-intl';
import {FieldInputPure} from "../../../../../components/common/Form";

const Bracing = () => {
    return (
        <Card>
            <CardHeader className="p-2">
                <strong><FormattedMessage id="app.quotes.Bracing" defaultMessage="Bracing" /></strong>
            </CardHeader>
            <CardBody className="p-2">
                <Row>
                    <Col xs="12" sm={8}>
                        <Label className="col-form-label">
                            <FormattedMessage id="app.quotes.Strap_Bracing_for_1_Roof_2_Side_All_Panels"
                                              defaultMessage="Strap Bracing for 1 Roof & 2 Side All Panels" />
                        </Label>
                    </Col>
                    <Col xs="12" sm={4}>
                        <Label className="col-form-label d-flex flex-row">
                            <FormattedMessage id="app.quotes.Qty" defaultMessage="Qty" />
                            <Field name="bracingStrapQty" type="number" component={FieldInputPure}
                                   className="form-control form-control-sm text-right ml-2" style={{width: '80px'}}
                                   parse={value => Number(value)}
                            />
                        </Label>
                    </Col>
                </Row>

                <Row>
                    <Col xs="12" sm={8}>
                        <Label className="col-form-label">
                            <FormattedMessage id="app.quotes.Full_Rod_Bracing_Set" defaultMessage="Full Rod Bracing Set" />
                        </Label>
                    </Col>
                    <Col xs="12" sm={4}>
                        <Label className="col-form-label d-flex flex-row">
                            <FormattedMessage id="app.quotes.Qty" defaultMessage="Qty" />
                            <Field name="bracingFullRodQty" type="number" component={FieldInputPure}
                                   className="form-control form-control-sm text-right ml-2" style={{width: '80px'}}
                                   parse={value => Number(value)}
                            />
                        </Label>
                    </Col>
                </Row>

                <Row>
                    <Col xs={4}>
                        <Label className="col-form-label font-weight-bold">
                            <FormattedMessage id="app.quotes.Exclusions" defaultMessage="Exclusions" />
                        </Label>
                    </Col>
                    <Col xs={8} className="d-flex flex-column">
                        <Label className="col-form-label">
                            <Field name="bracingExclNotSealer" component="input" type="checkbox" />
                            {' '}
                            <FormattedMessage id="app.quotes.Do_Not_Include_Silicone_Sealer"
                                              defaultMessage="Do Not Include Silicone Sealer" />
                        </Label>
                        <Label className="col-form-label pt-0">
                            <Field name="bracingExclNotStraps" component="input" type="checkbox" />
                            {' '}
                            <FormattedMessage id="app.quotes.Do_Not_Supply_Base_Straps"
                                              defaultMessage="Do Not Supply Base Straps" />
                        </Label>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
};

export default Bracing;