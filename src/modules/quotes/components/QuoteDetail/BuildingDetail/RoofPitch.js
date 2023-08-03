import React from 'react';
import {Card, CardHeader, CardBody, Row, Col, Label, Button} from 'reactstrap';
import {Field} from 'redux-form';
import {FormattedMessage} from 'react-intl';

import {PREDEFINED_ROOF_PITCH_DEGREES} from "../../../../../constants";

const RoofPitch = () => (
    <Card>
        <CardHeader className="p-2">
            <strong><FormattedMessage id="app.quotes.Roof_Pitch" defaultMessage="Roof Pitch" /></strong>
        </CardHeader>
        <CardBody className="p-2">
            <Row>
                <Col xs="12" className="d-flex flex-row justify-content-between">
                    <Label>
                        <FormattedMessage id="app.quotes.Roof_Pitch" defaultMessage="Roof Pitch" />
                    </Label>
                    <div className="form-group d-flex flex-row mb-0">
                        <Field component="select" name="roofPitch" id="roofPitch"
                               className="form-control form-control-sm text-right">
                            {PREDEFINED_ROOF_PITCH_DEGREES.map((item, idx) =>
                                <option key={idx} value={item}>{item}</option>
                            )}
                        </Field>{' '}
                        <Label for="roofPitch">
                            deg
                        </Label>
                    </div>
                </Col>
            </Row>
        </CardBody>
    </Card>
);

export default RoofPitch;