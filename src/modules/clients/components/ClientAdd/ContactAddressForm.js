import React from 'react';
import {Row, Col, FormGroup, Label} from 'reactstrap';
import {Field} from 'redux-form';
import {FormattedMessage} from 'react-intl';

import {FieldDropdownList, FieldInputPure, FieldLevelValidation, FieldAutoSuggest} from '../../../../components/common/Form/index';
import {PREDEFINED_AUSTRALIAN_STATES} from '../../../../constants';
import {getPredefinedCitiesForACField} from '../../selectors';

const citiesForAC = getPredefinedCitiesForACField();

const ContactAddressForm = ({isRequired}) => (
    <FormGroup>
        <Row>
            <Col xs="12" md="6">
                <FormGroup row>
                    <Col md="4">
                        <Label className="col-form-label">
                            <FormattedMessage id="app.clients.Number" defaultMessage="Number" />
                            {isRequired && <span className="text-red">(*)</span>}
                        </Label>
                    </Col>
                    <Col xs="12" md="8">
                        <Field name="addressNumber" type="text" component={FieldInputPure}
                               validate={isRequired && FieldLevelValidation.validateRequired}
                        />
                    </Col>
                </FormGroup>
            </Col>
            <Col xs="12" md="6">
                <FormGroup row>
                    <Col md="2">
                        <Label className="col-form-label">
                            <FormattedMessage id="app.clients.Street" defaultMessage="Street" />
                            {isRequired && <span className="text-red">(*)</span>}
                        </Label>
                    </Col>
                    <Col xs="12" md="10">
                        <Field name="addressStreet" type="text" component={FieldInputPure}
                               validate={isRequired && FieldLevelValidation.validateRequired}
                        />
                    </Col>
                </FormGroup>
            </Col>
        </Row>
        <Row>
            <Col>
                <FormGroup row>
                    <Col md="2">
                        <Label className="col-form-label">
                            <FormattedMessage id="app.clients.City_or_Town" defaultMessage="City or Town" />
                            {isRequired && <span className="text-red">(*)</span>}
                        </Label>
                    </Col>
                    <Col xs="12" md="10">
                        <Field
                            name="addressCity"
                            suggestions={citiesForAC}
                            component={FieldAutoSuggest}
                            validate={isRequired && FieldLevelValidation.validateRequired}
                            className = "form-control"
                        />
                    </Col>
                </FormGroup>
            </Col>
        </Row>
        <Row>
            <Col xs="12" md="2">
                <Label className="col-form-label">
                    <FormattedMessage id="app.clients.State" defaultMessage="State" />
                    {isRequired && <span className="text-red">(*)</span>}
                </Label>
            </Col>
            <Col xs="12" md="5">
                <Field
                    name="addressState"
                    component={FieldDropdownList}
                    data={PREDEFINED_AUSTRALIAN_STATES}
                    valueField="abbreviation"
                    textField="name"
                    titleOption="Select State"
                    validate={isRequired && FieldLevelValidation.validateRequired}
                />
            </Col>
            <Col xs="12" md="5">
                <FormGroup row>
                    <Col md="6">
                        <Label className="col-form-label">
                            <FormattedMessage id="app.clients.Post_Code" defaultMessage="Post Code" />
                            {isRequired && <span className="text-red">(*)</span>}
                        </Label>
                    </Col>
                    <Col xs="12" md="6">
                        <Field name="addressPostcode" type="text" component={FieldInputPure}
                               validate={isRequired && FieldLevelValidation.validateRequired}
                        />
                    </Col>
                </FormGroup>
            </Col>
        </Row>
    </FormGroup>
);

export default ContactAddressForm;