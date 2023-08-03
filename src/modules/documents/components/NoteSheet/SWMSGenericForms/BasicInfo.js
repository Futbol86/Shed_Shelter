import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field, FieldArray} from "redux-form";
import {FormattedMessage} from "react-intl";
import {Form, Row, Col, Table, Label, Button} from 'reactstrap';
import {FieldInputPure} from "../../../../../components/common/Form";
import FieldDatePicker from "../../../../../components/common/Form/FieldDatePicker";

class BasicInfo extends Component {
    render(){
        return (
            <React.Fragment>
                <Row className="mb-2">
                    <Col md="4">
                        <strong><FormattedMessage id="app.docs.Project_No" defaultMessage="Project No"/>:</strong>
                        <Field name="projectNo" type="text" component={FieldInputPure} className="form-control"/>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col md="6">
                        <strong><FormattedMessage id="app.docs.Job_Task" defaultMessage="Job Task"/>:</strong>
                        <Field name="jobTask" component="textarea" className="form-control font-md" rows="4"/>
                    </Col>
                    <Col md="6">
                        <Row className="mb-1">
                            <Col md="4"> 
                                <strong><FormattedMessage id="app.docs.Work_Locations_Areas" defaultMessage="Work locations / areas:"/></strong>
                            </Col>
                            <Col md="8"> 
                                <Field name="workLocationsAreas" type="text" component={FieldInputPure} className="form-control"/>
                            </Col>
                        </Row>
                        <Row className="mb-1">
                            <Col md="8">
                                <strong><FormattedMessage id="app.docs.Initiated_And_Approved" defaultMessage="Initiated and Approved"/></strong>
                                {`  `}<FormattedMessage id="app.docs.Print_Sign" defaultMessage="(Print/sign):"/>
                                <Field name="initiatedAndApproved" type="text" component={FieldInputPure} className="form-control"/>
                            </Col>
                            <Col md="4">
                                <strong><FormattedMessage id="app.contruction.Date" defaultMessage="Date"/>:</strong>
                                <Field  name="initiatedAndApprovedDate" type="date" component={FieldDatePicker}
                                        className="form-control form-control-sm"
                                        placeholderText="DD/MM/YYYY" dateFormat="dd/MM/yyyy"/>
                            </Col>
                        </Row>
                        <Row className="mb-1">
                            <Col md="12"> 
                                <strong><FormattedMessage id="app.docs.All_Involved_In_The_Task_Must_Review_And_Sign_This_SWMS" defaultMessage="All involved in the task must review and sign this SWMS"/></strong>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col md="4">
                        <strong><FormattedMessage id="app.docs.Key_Safety_Issues_To_Be_Managed" defaultMessage="Key safety issues to be managed:"/></strong>
                        <Field name="keySafetyIssues" component="textarea" className="form-control" rows="4"/>
                    </Col>
                    <Col md="8">
                        <strong><FormattedMessage id="app.docs.Key_PPE" defaultMessage="Key PPE:"/></strong>
                        <Field name="keyPPE" component="textarea" className="form-control" rows="4"/>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col md="4">
                        <strong><FormattedMessage id="app.docs.Reference_Documents" defaultMessage="Reference Documents:"/></strong>
                        <Field name="referenceDocuments" component="textarea" className="form-control" rows="5"/>
                    </Col>
                    <Col md="8">
                        <Row>
                            <Col md="4">
                                <strong><FormattedMessage id="app.docs.Warning_Signs" defaultMessage="Warning Signs:"/></strong>
                                <Field name="warningSigns" component="textarea" className="form-control" rows="5"/>
                            </Col>
                            <Col md="4">
                                <strong><FormattedMessage id="app.docs.Permits_Required" defaultMessage="Permits Required:"/></strong>
                                <Field name="permitsRequired" component="textarea" className="form-control" rows="5"/>
                            </Col>
                            <Col md="4">
                                <strong><FormattedMessage id="app.docs.Engineering_Certificates" defaultMessage="Engineering certificates/ approvals:"/></strong>
                                <Field name="engineeringCertificates" component="textarea" className="form-control" rows="5"/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col md="4">
                        <strong><FormattedMessage id="app.docs.Key_Individuals" defaultMessage="Key individuals:"/></strong>
                        <Field name="keyIndividuals" component="textarea" className="form-control" rows="5"/>
                    </Col>
                    <Col md="4">
                        <strong><FormattedMessage id="app.docs.Key_Safety_Duties" defaultMessage="Key safety duties/responsibilities:"/></strong>
                        <Field name="keySafetyDuties" component="textarea" className="form-control" rows="5"/>
                    </Col>
                    <Col md="4">
                        <strong><FormattedMessage id="app.docs.Detail_Training_Required_To_Complete_Work" defaultMessage="Detail training required to complete work:"/></strong>
                        <Field name="detailTrainingRequired" component="textarea" className="form-control" rows="5"/>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col md="6">
                        <strong><FormattedMessage id="app.docs.Plant_And_Equipment" defaultMessage="Plant and Equipment:"/></strong>
                        <Field name="plantAndEquipment" component="textarea" className="form-control" rows="3"/>
                    </Col>
                    <Col md="6">
                        <strong><FormattedMessage id="app.docs.Hazardous_Substances" defaultMessage="Hazardous substances:"/></strong>
                        <Field name="hazardousSubstances" component="textarea" className="form-control" rows="3"/>
                    </Col>
                </Row>
                <Row className="mt-2 mb-4">
                    <Col md="12">
                        <Table responsive striped>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th colSpan={4} className="text-center"><FormattedMessage id="app.docs.Consequence" defaultMessage="Consequence" /></th>
                                </tr>
                                <tr>
                                    <th></th>
                                    <th className="text-center">
                                        <FormattedMessage id="app.docs.Death" defaultMessage="Death" /> <br/>
                                        <FormattedMessage id="app.docs.Catastrophic_Illness" defaultMessage="Catastrophic Illness/Injury" />
                                    </th>
                                    <th className="text-center">
                                        <FormattedMessage id="app.docs.Major" defaultMessage="Major" /> <br/>
                                        <FormattedMessage id="app.docs.Extensive_Injuries" defaultMessage="Extensive Injuries" />
                                    </th>
                                    <th className="text-center">
                                        <FormattedMessage id="app.docs.Moderate" defaultMessage="Moderate" /> <br/>
                                        <FormattedMessage id="app.docs.Medical_Treatment_Required" defaultMessage="Medical treatment required" />
                                    </th>
                                    <th className="text-center">
                                        <FormattedMessage id="app.docs.Minor" defaultMessage="Minor" /> <br/>
                                        <FormattedMessage id="app.docs.No_Injuries" defaultMessage="No injuries" />
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <FormattedMessage id="app.docs.Almost_Certain" defaultMessage="Almost certain" /> <br/>
                                        <FormattedMessage id="app.docs.Occurred_Before" defaultMessage="Occurred before/expected" />
                                    </td>
                                    <td className="text-center">H</td>
                                    <td className="text-center">H</td>
                                    <td className="text-center">S</td>
                                    <td className="text-center">S</td>
                                </tr>
                                <tr>
                                    <td>
                                        <FormattedMessage id="app.docs.Likely" defaultMessage="Likely" /> <br/>
                                        <FormattedMessage id="app.docs.Probably_Will_Occur" defaultMessage="Probably will occur" />
                                    </td>
                                    <td className="text-center">H</td>
                                    <td className="text-center">S</td>
                                    <td className="text-center">S</td>
                                    <td className="text-center">S</td>
                                </tr>
                                <tr>
                                    <td>
                                        <FormattedMessage id="app.docs.Moderate" defaultMessage="Moderate" /> <br/>
                                        <FormattedMessage id="app.docs.May_Occur_At_Some_Time" defaultMessage="May occur at some time" />
                                    </td>
                                    <td className="text-center">H</td>
                                    <td className="text-center">S</td>
                                    <td className="text-center">L</td>
                                    <td className="text-center">L</td>
                                </tr>
                                <tr>
                                    <td>
                                        <FormattedMessage id="app.docs.Unlikely" defaultMessage="Unlikely" /> <br/>
                                        <FormattedMessage id="app.docs.Unusual_Or_Rare_Situation" defaultMessage="Unusual or rare situation" />
                                    </td>
                                    <td className="text-center">S</td>
                                    <td className="text-center">L</td>
                                    <td className="text-center">L</td>
                                    <td className="text-center">L</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td colSpan={4}>
                                        High (H) – cease exposure immediately until protection, approved at senior management level, implemented.
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td colSpan={4}>
                                        Significant (S) – procedures alone may not be enough, senior management attention required.
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td colSpan={4}>
                                        Low (L) – may be managed by routine procedures, some risks in this category may be acceptable.
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default BasicInfo;