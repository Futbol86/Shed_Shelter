import React, {Component} from 'react';
import {Field} from "redux-form";
import {FormattedMessage} from "react-intl";
import {NavLink} from 'react-router-dom';
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import {Form, Row, Col, Card, CardHeader, CardBody, CardFooter, Button, Table} from 'reactstrap';
import {FieldInputPure} from "../../../components/common/Form";
import FieldDatePicker from "../../../components/common/Form/FieldDatePicker";
import BasicInfoComponent from "./NoteSheet/SWMSGenericForms/BasicInfo";
import PossibleHazardsComponent from "./NoteSheet/SWMSGenericForms/PossibleHazards";
import SpecificTaskRequirementsComponent from "./NoteSheet/SWMSGenericForms/SpecificTaskRequirements";
import ContractorsComponent from "./NoteSheet/SWMSGenericForms/Contractors";
import ProjectSupervisorsComponent from "./NoteSheet/SWMSGenericForms/ProjectSupervisors";
import ApprovalsComponent from "./NoteSheet/SWMSGenericForms/Approvals";
import SignaturesComponent from "./NoteSheet/SWMSGenericForms/Signatures";

class NoteSheet extends Component {
    render(){
        const {
            quoteDetail, sWMSGenericFormDetail, submitting, pristine, invalid, 
            handlePossibleHazardRemove, handleSpecificTaskRequirementsRemove, handleContractorsRemove, handleProjectSupervisorsRemove,
            handleApprovalsRemove, handleSignaturesRemove, handleSubmit, handleExportPDFFile
        } = this.props;

        let userDetail = quoteDetail && quoteDetail.userDetail || {};
        let logoFilePath = process.env.REACT_APP_STATIC_FILE_URL2 + "images/logos/"+ (userDetail && userDetail.logoFilePath);
   
        return (
            <div className="animated fadeIn">
                <Form onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}>
                    <Card>
                        <CardHeader>
                            <h2>
                                <FormattedMessage id="app.docs.Swms_Generic" defaultMessage="SWMS GENERIC – Steel Fixing"/>
                            </h2>
                        </CardHeader>
                        <CardBody>
                            {
                                quoteDetail && quoteDetail.userDetail && quoteDetail.userDetail.logoFilePath &&
                                <Row className="mb-2">
                                    <Col md={6}>
                                        <img src={logoFilePath}/>
                                    </Col>
                                    <Col md={6}>
                                        <div className='dealer-info'>
                                            <div>{userDetail.firstName + ' ' + userDetail.lastName}</div>
                                            <div>{userDetail.physicalAddress}</div>
                                            <div>
                                                <FormattedMessage id="app.quotes.ABN" defaultMessage="ABN"/>:
                                                {`  `}{userDetail.australianBusinessNumber}
                                            </div>
                                            <div>
                                                <strong className='text-danger'><FormattedMessage id="app.clients.Phone" defaultMessage="Phone"/>:</strong>
                                                {`  `}{userDetail.mainMobile}
                                            </div>
                                            <div>
                                                <strong className='text-danger'><FormattedMessage id="app.clients.Fax" defaultMessage="Fax"/>:</strong>
                                                {`  `}{userDetail.faxNumber}
                                            </div>
                                        </div>

                                    </Col>
                                </Row>
                            }
                            <Row>
                                <Col md="12">
                                    <BasicInfoComponent />
                                </Col>
                            </Row>
                            <hr />
                            <Row>
                                <Col md="12">
                                    <PossibleHazardsComponent handlePossibleHazardRemove={handlePossibleHazardRemove}/>
                                </Col>
                            </Row>
                            <hr />
                            <Row>
                                <Col md="12">
                                    <SpecificTaskRequirementsComponent handleSpecificTaskRequirementsRemove={handleSpecificTaskRequirementsRemove}/>
                                </Col>
                            </Row>
                            <hr />
                            <Row>
                                <Col md="11">
                                    <h4><FormattedMessage id="app.docs.Additional_Comments" defaultMessage="Additional Comments" />:</h4>
                                    <Field name="additionalComments" component="textarea" className="form-control" rows="5"/>
                                </Col>
                            </Row>
                            <hr />
                            <Row>
                                <Col md="12">
                                    <ContractorsComponent handleContractorsRemove={handleContractorsRemove}/>
                                </Col>
                            </Row>
                            <hr />
                            <Row>
                                <Col md="12">
                                    <ProjectSupervisorsComponent handleProjectSupervisorsRemove={handleProjectSupervisorsRemove}/>
                                </Col>
                            </Row>
                            <hr />
                            <Row>
                                <Col md="12">
                                    <ApprovalsComponent handleApprovalsRemove={handleApprovalsRemove}/>
                                </Col>
                            </Row><hr />
                            <Row>
                                <Col md="12">
                                    <SignaturesComponent handleSignaturesRemove={handleSignaturesRemove}/>
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
                                        sWMSGenericFormDetail && sWMSGenericFormDetail.id 
                                            ? <FormattedMessage id="app.Update" defaultMessage="Update" />
                                            : <FormattedMessage id="app.Save" defaultMessage="Save" />
                                    }
                                </LaddaButton>
                            </div>
                        </CardFooter>
                    </Card>
                </Form>
            </div>
        );
    }
}

export default NoteSheet;