import React from 'react';
import {FormGroup, Row, Col, Label} from 'reactstrap';
import {Field} from 'redux-form';
import {FormattedMessage} from 'react-intl';
import {FieldInputPure, FieldLevelValidation} from "../../../../components/common/Form";

const ClientContactCorpForm = ({isRequired}) => (
    <React.Fragment>
        <Row>
            <Col xs="12" md="6">
                <FormGroup row>
                    <Col md="4" className="pl-2">
                        <Label className="col-form-label">
                            <FormattedMessage id="app.Name" defaultMessage="Name" />
                            {isRequired && <span className="text-red">(*)</span>}
                        </Label>
                    </Col>
                    <Col xs="12" md="8" className="pr-1 pl-1">
                        <Field name="name" type="text" component={FieldInputPure}
                               validate={isRequired && FieldLevelValidation.validateRequired}
                        />
                    </Col>
                </FormGroup>
            </Col>
            <Col xs="12" md="6">
                <FormGroup row>
                    <Col md="4" className="pl-2">
                        <Label className="col-form-label">
                            <FormattedMessage id="app.clients.Position" defaultMessage="Position" />
                        </Label>
                    </Col>
                    <Col xs="12" md="8" className="pr-1 pl-1">
                        <Field name="position" type="text" component={FieldInputPure} />
                    </Col>
                </FormGroup>
            </Col>
        </Row>
        <Row>
            <Col xs="12" md="6">
                <FormGroup row>
                    <Col md="4" className="pl-2">
                        <Label className="col-form-label">
                            <FormattedMessage id="app.clients.Landline" defaultMessage="Landline" />
                            {isRequired && <span className="text-red">(*)</span>}
                        </Label>
                    </Col>
                    <Col xs="12" md="8" className="pr-1 pl-1">
                        <Field name="phoneHome" type="text" component={FieldInputPure}
                               validate={isRequired && FieldLevelValidation.validateRequired}
                        />
                    </Col>
                </FormGroup>
            </Col>
            <Col xs="12" md="6">
                <FormGroup row>
                    <Col md="4" className="pl-2">
                        <Label className="col-form-label">
                            <FormattedMessage id="app.clients.Mobile" defaultMessage="Mobile" />
                        </Label>
                    </Col>
                    <Col xs="12" md="8" className="pr-1 pl-1">
                        <Field name="phoneMobile" type="text" component={FieldInputPure} />
                    </Col>
                </FormGroup>
            </Col>
        </Row>
        <Row>
            <Col xs="12" md="6">
                <FormGroup row>
                    <Col md="4" className="pl-2">
                        <Label className="col-form-label">
                            <FormattedMessage id="app.Email" defaultMessage="Email" />
                            {isRequired && <span className="text-red">(*)</span>}
                        </Label>
                    </Col>
                    <Col xs="12" md="8" className="pr-1 pl-1">
                        <Field name="email" type="text" component={FieldInputPure}
                               validate={isRequired && [FieldLevelValidation.validateRequired, FieldLevelValidation.validateEmail]}
                        />
                    </Col>
                </FormGroup>
            </Col>
            <Col xs="12" md="6">
                <FormGroup row>
                    <Col md="4" className="pl-2">
                        <Label className="col-form-label">
                            <FormattedMessage id="app.clients.Fax" defaultMessage="Fax" />
                        </Label>
                    </Col>
                    <Col xs="12" md="8" className="pr-1 pl-1">
                        <Field name="fax" type="text" component={FieldInputPure} />
                    </Col>
                </FormGroup>
            </Col>
        </Row>
    </React.Fragment>
);

export default ClientContactCorpForm;