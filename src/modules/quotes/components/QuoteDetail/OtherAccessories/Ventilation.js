import React from 'react';
import {Card, CardHeader, CardBody, Row, Col, Label} from 'reactstrap';
import {Field} from 'redux-form';
import {FormattedMessage} from 'react-intl';
import {PREDEFINED_VENTILATION_MATERIAL_LIST} from "../../../../../constants";
import {FieldInputPure} from "../../../../../components/common/Form";
import WallsColourDropDown from "../BuildingColour/WallsColourDropDown";

const Ventilation = ({ventilationMaterial, ventilationIsColorCopied, handleVentilationProfileChange, handleQtyInput}) => {
    return (
        <Card>
            <CardHeader className="p-2">
                <strong><FormattedMessage id="app.quotes.Ventilation" defaultMessage="Ventilation" /></strong>
            </CardHeader>
            <CardBody className="p-2">
                <Row>
                    <Col xs="3">
                        <Label className="col-form-label">
                            <FormattedMessage id="app.quotes.Material" defaultMessage="Material" />
                        </Label>
                    </Col>
                    <Col xs="9">
                        <Field component="select" name="ventilationMaterial" id="ventilationMaterial"
                               className="form-control form-control-sm text-right"
                               onChange={handleVentilationProfileChange}
                        >
                            <option value=""></option>
                            {PREDEFINED_VENTILATION_MATERIAL_LIST.map((item, idx) =>
                                <option key={idx} value={item.id}>{item.name}</option>
                            )}
                        </Field>
                    </Col>
                </Row>

                <Row>
                    <Col xs="3">
                        <Label className="col-form-label">
                            <FormattedMessage id="app.quotes.Qty" defaultMessage="Qty" />
                        </Label>
                    </Col>
                    <Col xs="9">
                        <Field name="ventilationQty" type="text" pattern="[0-9]*" component={FieldInputPure}
                               className="form-control form-control-sm text-right" style={{width: '80px'}}
                               onChange={handleQtyInput}
                               parse={value => Number(!isNaN(value) && value)}
                        />
                    </Col>
                </Row>

                {(!ventilationMaterial || (ventilationMaterial && PREDEFINED_VENTILATION_MATERIAL_LIST.find(v => v.id === ventilationMaterial)
                    && !PREDEFINED_VENTILATION_MATERIAL_LIST.find(v => v.id === ventilationMaterial).name.includes("Zincalume"))) &&
                    <Row>
                        <Col xs="3">
                            <Label className="col-form-label">
                                <FormattedMessage id="app.quotes.Colour" defaultMessage="Colour"/>
                            </Label>
                        </Col>
                        <Col xs="3">
                            <Label className="col-form-label">
                                <Field name="ventilationIsColorCopied" id="ventilationIsColorCopied"
                                       component="input" type="checkbox" />
                                {' '}
                                <FormattedMessage id="app.quotes.The_same_as_roof" defaultMessage="The same as roof" />
                            </Label>
                        </Col>
                        <Col xs="6">
                            <Field name="ventilationColor" component={WallsColourDropDown} disabled={ventilationIsColorCopied} />
                        </Col>
                    </Row>
                }
            </CardBody>
        </Card>
    );
};

export default Ventilation;