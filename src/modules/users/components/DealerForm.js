import React from 'react';
import {CardHeader, CardFooter, Card, CardBody, Button, Form, Alert, Row, Col, Label} from 'reactstrap';
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import {FormattedMessage} from 'react-intl';
import {Field} from "redux-form";
import {FieldDropZone, FieldInputPure} from "../../../components/common/Form";

const DealerInformation  = ({dealerInfo, isDealer, companyLogo, handleFileDrops, handleSubmit,
                                submitting, pristine, invalid, reset, error, submitSucceeded}) =>
    (
        <Form onSubmit={(isDealer) ? handleSubmit : null}>
            <Card>
                <CardHeader>
                    <i className="icon-info"></i>
                    <strong>
                        <FormattedMessage id="app.users.Dealer_Information" defaultMessage="Dealer Information" />
                    </strong>
                </CardHeader>
                <CardBody>
                    {error &&
                    <Row>
                        <Col xs="12">
                            <Alert color="danger">
                                <p><FormattedMessage id="app.Error" defaultMessage="Error" />: {error}</p>
                            </Alert>
                        </Col>
                    </Row>
                    }

                    {(submitSucceeded) &&
                    <Row>
                        <Col xs="12">
                            <Alert color="success">
                                <FormattedMessage id="app.Data_was_saved_successfully" defaultMessage="Data was saved successfully!" />
                            </Alert>
                        </Col>
                    </Row>
                    }

                    <Row>
                        <Col xs="12" md="4" className="pb-2 d-flex flex-row">
                            <div className="d-flex flex-row justify-content-center"
                                 style={
                                     companyLogo ? {
                                             backgroundImage:  `url(${companyLogo})`,
                                             backgroundSize: "cover",
                                             WebkitBackgroundSize: "cover",
                                             MozBackgroundSize: "cover",
                                             OBackgroundSize: "cover",
                                             width: "100%",
                                             maxHeight: "140px"
                                         }
                                         : {width: "100%"}
                                 }
                            >
                                <Field
                                    name="logoFileField"
                                    component={FieldDropZone}
                                    handleFileDrops={handleFileDrops}
                                    label="LOGO"
                                    className="btn btn-outline-primary btn-sm btn-block"
                                    accept="image/jpeg,image/jpg,image/tiff,image/gif,image/png"
                                    multiple={ false }
                                    disabled={!isDealer}
                                />
                            </div>
                        </Col>

                        <Col xs="12" md="8" className="pb-2">
                            <Row className="pb-1">
                                <Col xs={4}>
                                    <Label className="col-form-label pb-0 pl-1">
                                        <FormattedMessage id="app.users.Company_Name" defaultMessage="Company Name" />
                                    </Label>
                                </Col>
                                <Col xs={8}>
                                    <Field name="companyName" type="text" component={FieldInputPure}
                                           className="form-control form-control-sm pl-1 pr-1"
                                           readOnly={!isDealer}
                                    />
                                </Col>
                            </Row>
                            <Row className="pb-1">
                                <Col xs={4}>
                                    <Label className="col-form-label pb-0 pl-1">
                                        <FormattedMessage id="app.users.Trading_Name" defaultMessage="Trading Name" />
                                    </Label>
                                </Col>
                                <Col xs={8}>
                                    <Field name="tradingName" type="text" component={FieldInputPure}
                                           className="form-control form-control-sm pl-1 pr-1"
                                           readOnly={!isDealer}
                                    />
                                </Col>
                            </Row>
                            <Row className="pb-1">
                                <Col xs={12} md={6} className="d-flex flex-row justify-content-between">
                                    <Label className="col-form-label pb-0 pl-1 pr-1">
                                        <FormattedMessage id="app.users.Business_License_Number" defaultMessage="Business License Number" />:
                                    </Label>
                                    <Field name="bln" type="text" component={FieldInputPure}
                                           className="form-control form-control-sm ml-1"
                                           style={{width: '100px'}}
                                           readOnly={!isDealer}
                                    />
                                </Col>
                                <Col xs={12} md={6} className="d-flex flex-row justify-content-between">
                                    <Label className="col-form-label pb-0 pl-1 pr-1">
                                        <FormattedMessage id="app.users.Australian_Business_Number" defaultMessage="Australian Business Number" />:
                                    </Label>
                                    <Field name="abn" type="text" component={FieldInputPure}
                                           className="form-control form-control-sm ml-1"
                                           style={{width: '100px'}}
                                           readOnly={!isDealer}
                                    />
                                </Col>
                            </Row>
                            <Row className="pb-1">
                                <Col xs={12} md={6} className="d-flex flex-column">
                                    <Label className="col-form-label pb-0 pl-1 pr-1">
                                        <FormattedMessage id="app.users.Office_Address" defaultMessage="Office Address" />:
                                    </Label>
                                    <Field name="officeAddress" type="text" component="textarea"
                                           className="form-control pl-1 pr-1" rows="2"
                                           readOnly={!isDealer}
                                    />
                                </Col>
                                <Col xs={12} md={6} className="d-flex flex-column">
                                    <Label className="col-form-label pb-0 pl-1 pr-1">
                                        <FormattedMessage id="app.users.Mailing_Address" defaultMessage="Mailing Address" />:
                                    </Label>
                                    <Field name="mailingAddress" type="text" component="textarea"
                                           className="form-control pl-1 pr-1" rows="2"
                                           readOnly={!isDealer}
                                    />
                                </Col>
                            </Row>
                            <Row className="pb-1">
                                <Col xs={12} md={6} className="d-flex flex-row justify-content-between">
                                    <Label className="col-form-label pb-0 pl-1 pr-1">
                                        <FormattedMessage id="app.users.Office_Phone" defaultMessage="Office Phone" />:
                                    </Label>
                                    <Field name="officePhone" type="text" component={FieldInputPure}
                                           className="form-control form-control-sm ml-1"
                                           style={{width: '150px'}}
                                           readOnly={!isDealer}
                                    />
                                </Col>
                                <Col xs={12} md={6} className="d-flex flex-row justify-content-between">
                                    <Label className="col-form-label pb-0 pl-1 pr-1">
                                        <FormattedMessage id="app.users.Office_Fax" defaultMessage="Office Fax" />:
                                    </Label>
                                    <Field name="officeFax" type="text" component={FieldInputPure}
                                           className="form-control form-control-sm ml-1"
                                           style={{width: '150px'}}
                                           readOnly={!isDealer}
                                    />
                                </Col>
                            </Row>
                            <Row className="pb-1">
                                <Col xs={4}>
                                    <Label className="col-form-label pb-0 pl-1">
                                        <FormattedMessage id="app.users.Admin_Email" defaultMessage="Admin Email" />
                                    </Label>
                                </Col>
                                <Col xs={8}>
                                    <Field name="adminEmail" type="text" component={FieldInputPure}
                                           className="form-control form-control-sm pl-1 pr-1"
                                           readOnly={!isDealer}
                                    />
                                </Col>
                            </Row>

                            <Row className="pb-1">
                                <Col xs={4}>
                                    <Label className="col-form-label pb-0 pl-1">
                                        <FormattedMessage id="app.users.Account_Name" defaultMessage="Account Name" />
                                    </Label>
                                </Col>
                                <Col xs={8}>
                                    <Field name="paymentAccName" type="text" component={FieldInputPure}
                                           className="form-control form-control-sm pl-1 pr-1"
                                           readOnly={!isDealer}
                                    />
                                </Col>
                            </Row>
                            <Row className="pb-1">
                                <Col xs={12} md={6} className="d-flex flex-row justify-content-between">
                                    <Label className="col-form-label pb-0 pl-1 pr-1">
                                        <FormattedMessage id="app.users.BSB" defaultMessage="BSB" />:
                                    </Label>
                                    <Field name="paymentBsb" type="text" component={FieldInputPure}
                                           className="form-control form-control-sm ml-1"
                                           style={{width: '200px'}}
                                           readOnly={!isDealer}
                                    />
                                </Col>
                                <Col xs={12} md={6} className="d-flex flex-row justify-content-between">
                                    <Label className="col-form-label pb-0 pl-1 pr-1">
                                        <FormattedMessage id="app.users.Account_No" defaultMessage="Account Number" />:
                                    </Label>
                                    <Field name="paymentAccNumber" type="text" component={FieldInputPure}
                                           className="form-control form-control-sm ml-1"
                                           style={{width: '200px'}}
                                           readOnly={!isDealer}
                                    />
                                </Col>
                            </Row>
                            <Row className="pb-1">
                                <Col xs={24} md={12}>
                                    <Label className="col-form-label pb-0 pl-1">
                                        <FormattedMessage id="app.users.Special_Conditions" defaultMessage="Special Conditions" />:
                                    </Label>
                                    <Field name="specialConditions" id="specialConditions" component="textarea"
                                        className="form-control" rows="5"
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                </CardBody>
                {isDealer &&
                <CardFooter>
                    <LaddaButton
                        loading={submitting}
                        disabled={pristine || submitting || invalid}
                        data-size={L}
                        data-style={EXPAND_LEFT}
                        data-color="green"
                        data-spinner-lines={12}
                        className="btn btn-dark px-4"
                        type="submit"
                    >
                        <FormattedMessage id="app.Save_Changes" defaultMessage="Save Changes"/>
                    </LaddaButton>
                    <Button color="secondary" disabled={pristine || submitting} onClick={reset}>
                        <FormattedMessage id="app.Cancel" defaultMessage="Cancel"/>
                    </Button>
                </CardFooter>
                }
            </Card>
        </Form>
    );


export default DealerInformation;