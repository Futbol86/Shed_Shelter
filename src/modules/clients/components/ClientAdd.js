import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field, change} from 'redux-form';
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import {NavLink} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

import { Row, Col, Card, CardHeader, CardBody, CardFooter } from 'reactstrap';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';

import ClientContactForm from "./ClientAdd/ClientContactForm";
import {FieldInputPure, FieldLevelValidation} from "../../../components/common/Form";
import ContactAddressForm from "./ClientAdd/ContactAddressForm";
import {CLIENTS_ADD_FORM_NAME, CLIENTS_EDIT_FORM_NAME} from "../constants";

class ClientAdd extends Component {
    handleCopyAddress = (e) => {
        if (e.target.checked){
            const {id, contact1AddressNumber, contact1AddressStreet, contact1AddressCity,
                contact1AddressState, contact1AddressPostcode, dispatch} = this.props;
            let formName;
            if (id)
                formName= CLIENTS_EDIT_FORM_NAME;
            else
                formName= CLIENTS_ADD_FORM_NAME;

            if (e.target.name === 'addressCopy'){
                dispatch(change(formName, 'addressNumber', contact1AddressNumber));
                dispatch(change(formName, 'addressStreet', contact1AddressStreet));
                dispatch(change(formName, 'addressCity', contact1AddressCity));
                dispatch(change(formName, 'addressState', contact1AddressState));
                dispatch(change(formName, 'addressPostcode', contact1AddressPostcode));
            }
            else if (e.target.name === 'contact2AddressCopy'){
                dispatch(change(formName, 'contact2.addressNumber', contact1AddressNumber));
                dispatch(change(formName, 'contact2.addressStreet', contact1AddressStreet));
                dispatch(change(formName, 'contact2.addressCity', contact1AddressCity));
                dispatch(change(formName, 'contact2.addressState', contact1AddressState));
                dispatch(change(formName, 'contact2.addressPostcode', contact1AddressPostcode));
            }
        }
    };

    render(){
        const {currentType, id} = this.props;
        const {handleSubmit, submitting, pristine, invalid, reset} = this.props;
        const {contact1PhoneHome, contact1PhoneMobile} = this.props;
        return (
            <div className="animated fadeIn">
                <Form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <h2>
                                {id ?
                                    <FormattedMessage id="app.clients.Edit_Client_Information" defaultMessage="Edit Client Information" />
                                    : <FormattedMessage id="app.clients.Add_New_Client" defaultMessage="Add New Client" />
                                }
                            </h2>
                        </CardHeader>
                        <CardBody>
                            <Row className="mb-3">
                                <Col xs="6" md="2">
                                    <strong><FormattedMessage id="app.clients.Customer_Type" defaultMessage="Customer Type" /></strong>
                                </Col>
                                <Col xs="6" md="4">
                                    <Label check>
                                        <Field name="type" component="input" disabled={(id && id > 0)} type="radio" value="corp" />{' '}
                                        <FormattedMessage id="app.clients.Corporate_or_Government_agency" defaultMessage="Corporate or Government agency" />
                                    </Label>
                                </Col>
                                <Col xs="6" md="3">
                                    <Label check>
                                        <Field name="type" component="input" disabled={(id && id > 0)} type="radio" value="dual" />{' '}
                                        <FormattedMessage id="app.clients.Dual_Individuals" defaultMessage="Dual Individuals" />
                                    </Label>
                                </Col>
                                <Col xs="6" md="3">
                                    <Label check>
                                        <Field name="type" component="input" disabled={(id && id > 0)} type="radio" value="sing" />{' '}
                                        <FormattedMessage id="app.clients.Single_Individual" defaultMessage="Single Individual" />
                                    </Label>
                                </Col>
                            </Row>

                            {(currentType === "corp") &&
                            <React.Fragment>
                                <Row>
                                    <Col xs="12" md="6">
                                        <FormGroup row>
                                            <Col md="4">
                                                <Label className="col-form-label">
                                                    <FormattedMessage id="app.clients.Agent_Name" defaultMessage="Agent Name" /> <span className="text-red">(*)</span>
                                                </Label>
                                            </Col>
                                            <Col xs="12" md="8">
                                                <Field name="agentName" type="text" component={FieldInputPure} validate={FieldLevelValidation.validateRequired} />
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12" md="6">
                                        <FormGroup row>
                                            <Col md="4">
                                                <Label className="col-form-label">
                                                    <FormattedMessage id="app.clients.Business_Number" defaultMessage="Business Number" />
                                                </Label>
                                            </Col>
                                            <Col xs="12" md="8">
                                                <Field name="businessNumber" type="text" component={FieldInputPure} />
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="12" md="6">
                                        <FormGroup row>
                                            <Col md="4">
                                                <Label className="col-form-label">
                                                    <FormattedMessage id="app.clients.Company_Number" defaultMessage="Company Number" />
                                                </Label>
                                            </Col>
                                            <Col xs="12" md="8">
                                                <Field name="companyNumber" type="text" component={FieldInputPure} />
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs="12" lg="6">
                                        <ClientContactForm section="contact1" label="Contact 1" isCorp isRequired />
                                    </Col>
                                    <Col xs="12" lg="6">
                                        <ClientContactForm section="contact2" label="Contact 2" isCorp />
                                    </Col>
                                    <Col xs="12" lg="6">
                                        <ClientContactForm section="contact3" label="Contact 3" isCorp />
                                    </Col>
                                    <Col xs="12" lg="6">
                                        <ClientContactForm section="contact4" label="Contact 4" isCorp />
                                    </Col>
                                </Row>
                            </React.Fragment>
                            }

                            {(currentType === "dual") &&
                            <React.Fragment>
                                <Row>
                                    <Col xs="12">
                                        <ClientContactForm section="contact1" label="Contact 1" isRequired 
                                            contact1PhoneHome = {contact1PhoneHome} contact1PhoneMobile = {contact1PhoneMobile}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12">
                                        <ClientContactForm section="contact2" label="Contact 2" handleCopyAddress={this.handleCopyAddress} />
                                    </Col>
                                </Row>
                            </React.Fragment>
                            }

                            {(currentType === "sing") &&
                            <Row>
                                <Col xs="12">
                                    <ClientContactForm section="contact1" label="Contact 1" isRequired
                                        contact1PhoneHome = {contact1PhoneHome} contact1PhoneMobile = {contact1PhoneMobile}
                                    />
                                </Col>
                            </Row>
                            }

                            <Row>
                                <Col xs="12">
                                    <Card>
                                        <CardHeader>
                                            <strong>Site Address</strong> Info
                                            {(currentType === "sing" || currentType === "dual") &&
                                            <div className="float-right">
                                                <Label>
                                                    <FormattedMessage id="app.clients.Copy_from_Contact_1" defaultMessage="Copy from Contact 1" />
                                                </Label>
                                                <Label
                                                    className="switch switch-sm switch-text switch-info float-right ml-1 mb-0">
                                                    <Input name="addressCopy" type="checkbox" className="switch-input" onChange={this.handleCopyAddress} />
                                                    <span className="switch-label" data-on="Yes" data-off="No"></span>
                                                    <span className="switch-handle"></span>
                                                </Label>
                                            </div>
                                            }
                                        </CardHeader>
                                        <CardBody className="pb-0">
                                            <ContactAddressForm isRequired />
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </CardBody>

                        <CardFooter className="d-flex justify-content-between">
                            {id?
                                <Button outline color="secondary">
                                    <NavLink to={`/clients/`} className="text-dark">
                                        <FormattedMessage id="app.clients.Return_Client_List" defaultMessage="Return Client List" />
                                    </NavLink>
                                </Button>
                                :
                                <Button color="secondary" disabled={pristine || submitting} onClick={reset}>
                                    Cancel
                                </Button>
                            }

                            <LaddaButton data-size={L} data-style={EXPAND_LEFT} data-color="green"
                                         data-spinner-lines={12} className="btn btn-dark" type="submit"
                                         loading={submitting} disabled={submitting || invalid || pristine}>
                                {id ?
                                    <FormattedMessage id="app.clients.Update_This_Client" defaultMessage="Update This Client" />
                                    : <FormattedMessage id="app.clients.Add_New_Client" defaultMessage="Add New Client" />
                                }
                            </LaddaButton>
                        </CardFooter>
                    </Card>
                </Form>
            </div>
        );
    }
}

ClientAdd.propTypes = {
    handleSubmit: PropTypes.func
};

export default ClientAdd;