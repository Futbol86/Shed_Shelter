import React from 'react';
import {Row, Col, FormGroup, Label} from 'reactstrap';
import {Field} from 'redux-form';
import {FormattedMessage} from 'react-intl';

import {FieldInputPure, FieldLevelValidation} from "../../../../components/common/Form";
import ContactAddressForm from './ContactAddressForm';

const ClientContactIndividualForm = ({isRequired, contact1PhoneHome, contact1PhoneMobile}) => (
    <Row>
        <Col xs="12" lg="6">
            <Row>
                <Col xs="12">
                    <FormGroup row>
                        <Col md="2" className="pl-2">
                            <Label className="col-form-label">
                                <FormattedMessage id="app.Name" defaultMessage="Name" />
                                {isRequired && <span className="text-red">(*)</span>}
                            </Label>
                        </Col>
                        <Col xs="12" md="10" className="pr-1 pl-1">
                            <Field name="name" type="text" component={FieldInputPure}
                                   validate={isRequired && FieldLevelValidation.validateRequired}
                            />
                        </Col>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col xs="12" md="6">
                    <FormGroup row>
                        <Col md="4" className="pl-2">
                            <Label className="col-form-label">
                                <FormattedMessage id="app.clients.Home" defaultMessage="Home" />
                                {(isRequired && (!contact1PhoneMobile || contact1PhoneMobile.length === 0)) &&
                                    <span className="text-red">(*)</span>
                                }
                            </Label>
                        </Col>
                        <Col xs="12" md="8" className="pr-1 pl-1">
                            <Field name="phoneHome" type="text" component={FieldInputPure}
                                   validate={(isRequired && (!contact1PhoneMobile || contact1PhoneMobile.length === 0)) &&
                                        FieldLevelValidation.validateRequired}
                            />
                        </Col>
                    </FormGroup>
                </Col>
                <Col xs="12" md="6">
                    <FormGroup row>
                        <Col md="4" className="pl-2">
                            <Label className="col-form-label">
                                <FormattedMessage id="app.clients.Work" defaultMessage="Work" />
                            </Label>
                        </Col>
                        <Col xs="12" md="8" className="pr-1 pl-1">
                            <Field name="phoneWork" type="text" component={FieldInputPure} />
                        </Col>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col xs="12" md="6">
                    <FormGroup row>
                        <Col md="4" className="pl-2">
                            <Label className="col-form-label">
                                <FormattedMessage id="app.clients.Mobile" defaultMessage="Mobile" />
                                {(isRequired && (!contact1PhoneHome || contact1PhoneHome.length === 0)) &&
                                    <span className="text-red">(*)</span>
                                }
                            </Label>
                        </Col>
                        <Col xs="12" md="8" className="pr-1 pl-1">
                            <Field name="phoneMobile" type="text" component={FieldInputPure} 
                                validate={(isRequired && (!contact1PhoneHome || contact1PhoneHome.length === 0)) &&
                                    FieldLevelValidation.validateRequired}
                            />
                        </Col>
                    </FormGroup>
                </Col>
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
            </Row>
            <Row>
                <Col xs = "12" className="pl-2">
                    <Label className = "col-form-label text-danger">
                        <FormattedMessage id = "app.clients.Home_or_Mobile_message" defaultMessage = "Either Home or Mobile is required to progress"/>
                    </Label>
                </Col>
            </Row>
        </Col>

        <Col xs="12" lg="6">
            <ContactAddressForm />
        </Col>
    </Row>
);

export default ClientContactIndividualForm;