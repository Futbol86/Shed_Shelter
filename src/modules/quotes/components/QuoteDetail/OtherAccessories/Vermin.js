import React from 'react';
import {Card, CardHeader, CardBody, Row, Col, Label} from 'reactstrap';
import {Field} from 'redux-form';
import {FormattedMessage} from 'react-intl';
import {PREDEFINED_VERMIN_SEAL_MATERIAL_LIST} from "../../../../../constants";
import {FieldInputPure} from "../../../../../components/common/Form";
import WallsColourDropDown from "../BuildingColour/WallsColourDropDown";

const Vermin = ({verminIsColorCopied, handleQtyInput}) => {
    return (
        <Card>
            <CardHeader className="p-2">
                <strong><FormattedMessage id="app.quotes.Vermin_Seal" defaultMessage="Vermin Seal" /></strong>
            </CardHeader>
            <CardBody className="p-2">
                <Row>
                    <Col xs="3">
                        <Label className="col-form-label">
                            <FormattedMessage id="app.quotes.Material" defaultMessage="Material" />
                        </Label>
                    </Col>
                    <Col xs="9">
                        <Field component="select" name="verminMaterial" id="verminMaterial"
                               className="form-control form-control-sm text-right">
                            <option value=""></option>
                            {PREDEFINED_VERMIN_SEAL_MATERIAL_LIST.map((item, idx) =>
                                <option key={idx} value={item.id}>{item.name}</option>
                            )}
                        </Field>
                    </Col>
                </Row>

                <Row>
                    <Col xs="6" md={3}>
                        <Label className="col-form-label">
                            <FormattedMessage id="app.quotes.Qty" defaultMessage="Qty" />
                        </Label>
                    </Col>
                    <Col xs="6" md={2}>
                        <Field name="verminQty" type="text" pattern="[0-9]*" component={FieldInputPure}
                               className="form-control form-control-sm text-right" style={{width: '40px'}}
                               onChange={handleQtyInput}
                               parse={value => Number(!isNaN(value) && value)}
                        />
                    </Col>
                    <Col xs="12" md={7} className="d-flex flex-row justify-content-between">
                        <Label className="col-form-label">
                            <FormattedMessage id="app.quotes.Length" defaultMessage="Length" />
                        </Label>
                        <Field name="verminLength" type="number" component={FieldInputPure}
                               className="form-control form-control-sm text-right" style={{width: '80px'}}
                               parse={value => Number(value)}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col xs="3">
                        <Label className="col-form-label">
                            <FormattedMessage id="app.quotes.Colour" defaultMessage="Colour" />
                        </Label>
                    </Col>
                    <Col xs={3}>
                        <Label className="col-form-label">
                            <Field name="verminIsColorCopied" id="verminIsColorCopied"
                                   component="input" type="checkbox" />
                            {' '}
                            <FormattedMessage id="app.quotes.The_same_as_wall" defaultMessage="The same as wall" />
                        </Label>
                    </Col>
                    <Col xs="6">
                        <Field name="verminColor" component={WallsColourDropDown} disabled={verminIsColorCopied} />
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
};

export default Vermin;