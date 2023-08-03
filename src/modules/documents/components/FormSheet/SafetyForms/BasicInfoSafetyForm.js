import React, {Component} from 'react';
import {Field} from "redux-form";
import {FormattedMessage} from "react-intl";
import {Row, Col, Table, Label} from 'reactstrap';
import {FieldInputPure} from "../../../../../components/common/Form";
import FieldDatePicker from "../../../../../components/common/Form/FieldDatePicker";

class BasicInfoSafetyForm extends Component {
    render(){
        const {quoteDetail} = this.props;

        return (
            <React.Fragment>
                <Row className="mb-2">
                    <Col md={{size: 2, offset: 10}}>
                        <strong><Label className="text-danger">STEP 1</Label></strong>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col md="6">
                        <FormattedMessage id="app.quotes.Date" defaultMessage="Date"/>
                    </Col>
                    <Col md="6">
                        <Field  name="jHAdate" type="date" component={FieldDatePicker}
                                className="form-control form-control-sm"
                                placeholderText="DD/MM/YYYY" dateFormat="dd/MM/yyyy"/>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col md="6">
                        <FormattedMessage id="app.docs.Name_Of_Person_Completing_JHA" defaultMessage="Name of person completing JHA"/>
                    </Col>
                    <Col md="6">
                        <Field name="jHANameOfPersonCompleting" type="text" component={FieldInputPure}/>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col md="6">
                        <FormattedMessage id="app.docs.Job_Task" defaultMessage="Job Task"/>
                    </Col>
                    <Col md="6">
                        <Field name="jobTask" type="text" component={FieldInputPure}/>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col md="6">
                        <FormattedMessage id="app.docs.Location_Of_Works" defaultMessage="Location of Works"/>
                    </Col>
                    <Col md="6">
                        <strong>{quoteDetail && quoteDetail.clientDetail && quoteDetail.clientDetail.address}</strong>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col md="6">
                        <FormattedMessage id="app.docs.Is_SWMS_For_This_Task" defaultMessage="Is there a SWMS for this task?"/>
                    </Col>
                    <Col xs="2" md="2">
                        <Field name="sWMSForThisTaskYes" component="input" type="checkbox" />
                        <FormattedMessage id="app.docs.Yes" defaultMessage="  Yes  " />
                    </Col>
                    <Col xs="2" md="2">
                        <Field name="sWMSForThisTaskNo" component="input" type="checkbox" />
                        <FormattedMessage id="app.docs.No" defaultMessage="  No  " />
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col md="6">
                        <FormattedMessage id="app.docs.Has_Your_Crew_Toolboxed_In_The_SWS" defaultMessage="If yes, has your crew been toolboxed in the SWMS?"/>
                    </Col>
                    <Col xs="2" md="2">
                        <Field name="toolboxedForCrewYes" component="input" type="checkbox" />
                        <FormattedMessage id="app.docs.Yes" defaultMessage="  Yes  " />
                    </Col>
                    <Col xs="2" md="2">
                        <Field name="toolboxedForCrewNo" component="input" type="checkbox" />
                        <FormattedMessage id="app.docs.No" defaultMessage="  No  " />
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col md="6">
                        <FormattedMessage id="app.docs.Are_Other_Trades_Affected_By_Your_Work" defaultMessage="Are other trades affected by your work? (If yes, involve them in discussion)"/>
                    </Col>
                    <Col xs="2" md="2">
                        <Field name="otherTradesAffectedYes" component="input" type="checkbox" />
                        <FormattedMessage id="app.docs.Yes" defaultMessage="  Yes  " />
                    </Col>
                    <Col xs="2" md="2">
                        <Field name="otherTradesAffectedNo" component="input" type="checkbox" />
                        <FormattedMessage id="app.docs.No" defaultMessage="  No  " />
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col md="6">
                        <FormattedMessage id="app.docs.Does_The_Work_Of_Other_Impact_On_You" defaultMessage="Does the work of others impact on you? (If yes, formulate controls in Step 3)"/>
                    </Col>
                    <Col xs="2" md="2">
                        <Field name="theWorkOfOtherImpactYes" component="input" type="checkbox" />
                        <FormattedMessage id="app.docs.Yes" defaultMessage="  Yes  " />
                    </Col>
                    <Col xs="2" md="2">
                        <Field name="theWorkOfOtherImpactNo" component="input" type="checkbox" />
                        <FormattedMessage id="app.docs.No" defaultMessage="  No  " />
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col md="6">
                        <FormattedMessage id="app.docs.Are_Adequate_PPE_Supplies_Available_For_The_Task" defaultMessage="Are adequate PPE supplies available for the task? (If no, obtain more)"/>
                    </Col>
                    <Col xs="2" md="2">
                        <Field name="adequatePPESuppliersYes" component="input" type="checkbox" />
                        <FormattedMessage id="app.docs.Yes" defaultMessage="  Yes  " />
                    </Col>
                    <Col xs="2" md="2">
                        <Field name="adequatePPESuppliersNo" component="input" type="checkbox" />
                        <FormattedMessage id="app.docs.No" defaultMessage="  No  " />
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default BasicInfoSafetyForm;