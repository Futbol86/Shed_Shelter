import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import {NavLink} from 'react-router-dom';
import {Field} from "redux-form";
import {FormattedMessage} from "react-intl";
import {Form, Row, Col, Card, CardHeader, CardBody, CardFooter, Button} from 'reactstrap';
import {FieldInputPure} from "../../../../components/common/Form";
import FieldDatePicker from "../../../../components/common/Form/FieldDatePicker";

class OfficeFormSheet extends Component {
    render(){
        const { officeFormDetail, quoteDetail, submitting, pristine, invalid, handleSubmit, handleExportPDFFile } = this.props;
        
        return (
            <Form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}>
                <Card>
                    <CardHeader>
                        <h2>
                            <FormattedMessage id="app.docs.Office_Forms" defaultMessage="Office Forms"/>
                        </h2>
                    </CardHeader>
                    <CardBody className="office-form font-20">
                        <Row className="mb-2">
                            <Col md="2"> 
                                <strong><FormattedMessage id="app.docs.Client" defaultMessage="CLIENT"/>:</strong>
                            </Col>
                            <Col md="10" className="text-center">
                                <strong>
                                    <mark style={{backgroundColor: "yellow", fontSize: '30px'}}>
                                        {quoteDetail && quoteDetail.clientDetail && quoteDetail.clientDetail.agentName || "???"}
                                    </mark>
                                </strong>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col md="2"> 
                                <strong><FormattedMessage id="app.docs.Address" defaultMessage="ADDRESS"/>:</strong>
                            </Col>
                            <Col md="10" className="text-center"> 
                                <strong>
                                    <mark style={{backgroundColor: "yellow", fontSize: '30px'}}>
                                        {quoteDetail && quoteDetail.clientDetail && quoteDetail.clientDetail.address || "???"}
                                    </mark>
                                </strong>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col md="2"> 
                                <strong><FormattedMessage id="app.docs.Contact" defaultMessage="CONTACT #"/>:</strong>
                            </Col>
                            <Col md="10" className="text-center">
                                <strong>
                                    <mark style={{backgroundColor: "yellow", fontSize: '30px'}}>
                                        {quoteDetail && quoteDetail.clientDetail && quoteDetail.clientDetail.contact || "???"}
                                    </mark>
                                </strong>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col md="2"> 
                                <strong><FormattedMessage id="app.docs.Email" defaultMessage="EMAIL"/>:</strong>
                            </Col>
                            <Col md="10" className="text-center"> 
                                <strong>
                                    <mark style={{backgroundColor: "yellow", fontSize: '30px'}}>
                                        {quoteDetail && quoteDetail.clientDetail && quoteDetail.clientDetail.email || "???"}
                                    </mark>
                                </strong>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col md="2"> 
                                <strong><FormattedMessage id="app.docs.Job_Ref" defaultMessage="JOB REF #"/>:</strong>
                            </Col>
                            <Col md="10" className="text-center"> 
                                <strong>
                                    <mark style={{backgroundColor: "yellow", fontSize: '30px'}}>
                                        {quoteDetail && quoteDetail.jobNumber || "???"}
                                    </mark>
                                </strong>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col md="2"> 
                                <strong><FormattedMessage id="app.docs.Contract_Signed" defaultMessage="CONTRACT SIGNED"/>:</strong>
                            </Col>
                            <Col md="4"> 
                                <Field  name="contractSigned" type="date" component={FieldDatePicker}
                                        className="form-control form-control-sm font-20"
                                        placeholderText="DD/MM/YYYY" dateFormat="dd/MM/yyyy"/>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col md="2"> 
                                <strong><FormattedMessage id="app.docs.Deposit_Invoiced" defaultMessage="DEPOSIT INVOICED"/>:</strong>
                            </Col>
                            <Col md="4"> 
                                <Field  name="depositInvoiced" type="date" component={FieldDatePicker}
                                        className="form-control form-control-sm font-20"
                                        placeholderText="DD/MM/YYYY" dateFormat="dd/MM/yyyy"/>
                            </Col>
                            <Col md="2"> 
                                <strong><FormattedMessage id="app.docs.Deposit_Paid" defaultMessage="DEPOSIT PAID"/>:</strong>
                            </Col>
                            <Col md="4"> 
                                <Field name="depositPaid" type="text" component={FieldInputPure}/>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col md="2"> 
                                <strong><FormattedMessage id="app.docs.Council_Invoiced" defaultMessage="COUNCIL INVOICED"/>:</strong>
                            </Col>
                            <Col md="4"> 
                                <Field name="councilInvoiced" type="text" component={FieldInputPure}/>
                            </Col>
                            <Col md="2"> 
                                <strong><FormattedMessage id="app.docs.Council_Paid" defaultMessage="COUNCIL PAID"/>:</strong>
                            </Col>
                            <Col md="4"> 
                                <Field name="councilPaid" type="text" component={FieldInputPure}/>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col md="2"> 
                                <strong><FormattedMessage id="app.docs.HOW_Submitted" defaultMessage="H.O.W SUBMITTED"/>:</strong>
                            </Col>
                            <Col md="4"> 
                                <Field name="hOWSubmitted" type="text" component={FieldInputPure}/>
                            </Col>
                            <Col md="2"> 
                                <strong><FormattedMessage id="app.docs.HOW_Cert_Recd" defaultMessage="H.O.W CERT REC'D"/>:</strong>
                            </Col>
                            <Col md="4"> 
                                <Field name="hOWCertRecd" type="text" component={FieldInputPure}/>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col md="2"> 
                                <strong><FormattedMessage id="app.docs.HOW_Invoiced" defaultMessage="H.O.W INVOICED"/>:</strong>
                            </Col>
                            <Col md="4"> 
                                <Field name="hOWInvoiced" type="text" component={FieldInputPure}/>
                            </Col>
                            <Col md="2"> 
                                <strong><FormattedMessage id="app.docs.HOW_Invoice_Paid" defaultMessage="H.O.W INVOICE PAID"/>:</strong>
                            </Col>
                            <Col md="4"> 
                                <Field name="hOWInvoicePaid" type="text" component={FieldInputPure}/>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col md="2"> 
                                <strong><FormattedMessage id="app.docs.Manufacture_Invoiced" defaultMessage="MANUFACTURE INVOICED"/>:</strong>
                            </Col>
                            <Col md="4" className="text-center"> 
                                <Field name="manufactureInvoiced" type="text" component={FieldInputPure}/>
                            </Col>
                            <Col md="2"> 
                                <strong><FormattedMessage id="app.docs.Manufacture_Paid" defaultMessage="MANUFACTURE PAID"/>:</strong>
                            </Col>
                            <Col md="4" className="text-center"> 
                                <Field name="manufacturePaid" type="text" component={FieldInputPure}/>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col md="2"> 
                                <strong><FormattedMessage id="app.docs.Colours_Confirmed" defaultMessage="COLOURS CONFIRMED"/>:</strong>
                            </Col>
                            <Col md="4" className="text-center"> 
                                <Field name="coloursConfirmed" type="text" component={FieldInputPure}/>
                            </Col>
                            <Col md="2"> 
                                <strong><FormattedMessage id="app.docs.Delivery_Instructions_Received" defaultMessage="DELIVERY INSTRUCTIONS RECEIVED"/>:</strong>
                            </Col>
                            <Col md="4" className="text-center"> 
                                <Field name="deliveryInstructionsReceived" type="text" component={FieldInputPure}/>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col md="2"> 
                                <strong><FormattedMessage id="app.docs.Kit_Ordered" defaultMessage="KIT ORDERED"/>:</strong>
                            </Col>
                            <Col md="4" className="text-center"> 
                                <Field name="kitOrdered" type="text" component={FieldInputPure}/>
                            </Col>
                            <Col md="2"> 
                                <strong><FormattedMessage id="app.docs.Cof" defaultMessage="COF #"/>:</strong>
                            </Col>
                            <Col md="4" className="text-center"> 
                                <Field name="cof" type="text" component={FieldInputPure}/>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col md="2"> 
                                <strong><FormattedMessage id="app.docs.Kit_Delivery_Date" defaultMessage="KIT DELIVERY DATE"/>:</strong>
                            </Col>
                            <Col md="4" className="text-center"> 
                                <Field name="kitDeliveryDate" type="text" component={FieldInputPure}/>
                            </Col>
                            <Col md="2"> 
                                <strong><FormattedMessage id="app.docs.Any_Variations_To_Invoice" defaultMessage="ANY VARIATIONS TO INVOICE"/>:</strong>
                            </Col>
                            <Col md="4"> 
                                <Field name="anyVariationsToInvoice" type="text" component={FieldInputPure}/>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col md="2"> 
                                <strong><FormattedMessage id="app.docs.Final_Kit_Invoiced" defaultMessage="FINAL KIT INVOICED"/>:</strong>
                            </Col>
                            <Col md="4"> 
                                <Field name="finalKitInvoiced" type="text" component={FieldInputPure}/>
                            </Col>
                            <Col md="2"> 
                                <strong><FormattedMessage id="app.docs.Final_Kit_Paid" defaultMessage="FINAL KIT PAID"/>:</strong>
                            </Col>
                            <Col md="4"> 
                                <Field name="finalKitPaid" type="text" component={FieldInputPure}/>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col md="2"> 
                                <strong><FormattedMessage id="app.docs.Final_Construct_Invoiced" defaultMessage="FINAL CONSTRUCT INVOICED"/>:</strong>
                            </Col>
                            <Col md="4"> 
                                <Field name="finalConstructInvoiced" type="text" component={FieldInputPure}/>
                            </Col>
                            <Col md="2"> 
                                <strong><FormattedMessage id="app.docs.Final_Construction_Paid" defaultMessage="FINAL CONSTRUCTION PAID"/>:</strong>
                            </Col>
                            <Col md="4"> 
                                <Field name="finalConstructionPaid" type="text" component={FieldInputPure}/>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col md="12" className="text-center"> 
                                <strong><FormattedMessage id="app.docs.Council" defaultMessage="COUNCIL"/>:</strong>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col md="2"> 
                                <strong><FormattedMessage id="app.docs.DA_Submitted" defaultMessage="D/A SUBMITTED"/>:</strong>
                            </Col>
                            <Col md="4">
                                <Field  name="dASubmitted" type="date" component={FieldDatePicker}
                                        className="form-control form-control-sm font-20"
                                        placeholderText="DD/MM/YYYY" dateFormat="dd/MM/yyyy"/>
                            </Col>
                            <Col md="2"> 
                                <strong><FormattedMessage id="app.docs.DA" defaultMessage="D/A #"/>:</strong>
                            </Col>
                            <Col md="4"> 
                                <Field name="dA" type="text" component={FieldInputPure}/>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col md="2"> 
                                <strong><FormattedMessage id="app.docs.DA_Approved" defaultMessage="D/A APPROVED"/>:</strong>
                            </Col>
                            <Col md="4">
                                <Field  name="dAApproved" type="date" component={FieldDatePicker}
                                        className="form-control form-control-sm font-20"
                                        placeholderText="DD/MM/YYYY" dateFormat="dd/MM/yyyy"/>
                            </Col>
                            <Col md="2"> 
                                <strong><FormattedMessage id="app.docs.Construction_Cert" defaultMessage="CONSTRUCTION CERT #"/>:</strong>
                            </Col>
                            <Col md="4"> 
                                <Field name="constructionCert" type="text" component={FieldInputPure}/>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col className="6">
                                <Row>
                                    <Col md="4"> 
                                    <strong><FormattedMessage id="app.docs.Builders_Pack_Printed" defaultMessage="BUILDERS PACK PRINTED"/>:</strong>
                                    </Col>
                                    <Col md="8"> 
                                        <Field name="buildersPackPrinted" type="text" component={FieldInputPure}/>
                                    </Col>
                                    <Col md="4"> 
                                        <strong><FormattedMessage id="app.docs.Build_Start_Date" defaultMessage="BUILD START DATE"/>:</strong>:
                                    </Col>
                                    <Col md="8"> 
                                        <Field  name="buildStartDate" type="date" component={FieldDatePicker}
                                                className="form-control form-control-sm font-20"
                                                placeholderText="DD/MM/YYYY" dateFormat="dd/MM/yyyy"/>
                                    </Col>
                                </Row>
                            </Col>
                            <Col className="6">
                                <Row>
                                    <Col md="4"> 
                                    <strong><FormattedMessage id="app.docs.Concreter_Pack_Printed" defaultMessage="CONCRETER PACK PRINTED"/>:</strong>
                                    </Col>
                                    <Col md="8"> 
                                        <Field name="concreterPackPrinted" type="text" component={FieldInputPure}/>
                                    </Col>
                                    <Col md="4"> 
                                        <strong><FormattedMessage id="app.docs.Concrete_Start_Date" defaultMessage="CONCRETE START DATE"/>:</strong>
                                    </Col>
                                    <Col md="8"> 
                                        <Field  name="concreteStartDate" type="date" component={FieldDatePicker}
                                                className="form-control form-control-sm font-20"
                                                placeholderText="DD/MM/YYYY" dateFormat="dd/MM/yyyy"/>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </CardBody>
                    <CardFooter>
                        <div className='d-flex justify-content-between'>
                            <NavLink to={`/quotes/list`} className="btn-secondary p-2 text-dark">
                                <FormattedMessage id="app.docs.Return_Quote_List" defaultMessage="Return Quote List" />
                            </NavLink>

                            <Button color="secondary" onClick={handleExportPDFFile}>
                                <i className="fa fa-file-excel-o" /> <FormattedMessage id="app.docs.Export_PDF" defaultMessage="Export PDF"/>
                            </Button>

                            <LaddaButton data-size={L} data-style={EXPAND_LEFT} data-color="green"
                                         data-spinner-lines={12} className="btn btn-dark" type="submit"
                                         loading={submitting}  disabled={submitting || invalid || pristine}>
                                {
                                    officeFormDetail && officeFormDetail.id ? <FormattedMessage id="app.Update" defaultMessage="Update" />
                                                                            : <FormattedMessage id="app.Save" defaultMessage="Save" />
                                }
                            </LaddaButton>
                        </div>
                    </CardFooter>
                </Card>
            </Form>
        );
    }
}

OfficeFormSheet.propTypes = {
    quoteDetail: PropTypes.object
};

export default OfficeFormSheet;