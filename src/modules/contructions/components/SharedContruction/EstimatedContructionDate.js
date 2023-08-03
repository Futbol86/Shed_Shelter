import React from 'react';
import {Field} from 'redux-form';
import moment from 'moment';
import {Row, Col, Card, CardHeader, CardBody, Badge, Form, FormGroup, Label, Button} from 'reactstrap';
import FieldDatePicker from "../../../../components/common/Form/FieldDatePicker";
import { FormattedMessage, FormattedDate, FormattedTime } from 'react-intl';
import { FieldAutoComplete, FieldLevelValidation } from "../../../../components/common/Form/index";

const EstimatedContructionDate = ({ contructionDetails, contructionPlannerDetails, userId, handleSubmit, submitting, invalid, pristine }) => {
    let toUserList = [];
    let contructionMembers = contructionDetails && contructionDetails.acceptedContructionDetails.filter(item => item.userId !== userId);
    
    if(contructionMembers) {
        contructionMembers.map(item => {
            toUserList.push({
                value: item.userId,
                label: item.tradesRegisteredName
            });
        });
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader className="pl-3">
                        <strong><FormattedMessage id= "app.contruction.Estimated_Contruction_Date" defaultMessage= "Estimated Contruction Date" /></strong>
                    </CardHeader>
                    <CardBody className="pb-2 pt-2">
                        {contructionDetails && contructionDetails.acceptedContructionDetails.map((item, idx) => {
                            const cPDetail =  contructionPlannerDetails && contructionPlannerDetails.filter(p => p.userId === item.userId || p.userId === item.id);
                            return  (
                                    <fieldset key={idx}>
                                        <Row>
                                            <Col xs="2">
                                                <Row className="mb-3">
                                                    <Col xs="12" md="12">
                                                        {item && item.tradesRegisteredName}
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col xs="5">
                                                <Row className="mb-3">
                                                    <Col xs="6" md="6" className="pl-2">
                                                        <Label className="col-form-label">
                                                            <FormattedMessage id= "app.contruction.Estimated_Start_Date" defaultMessage= "Estimated Start Date" />
                                                        </Label>
                                                    </Col>
                                                    <Col xs="6" md="6" className="pr-1 pl-1">
                                                        {
                                                            (userId === item.userId || userId === item.id) ?
                                                                <Field name="estimatedStartDate" type="date" component={FieldDatePicker}
                                                                    className="form-control form-control-sm"
                                                                    placeholderText="DD/MM/YYYY" dateFormat="dd/MM/yyyy"
                                                                    style={{width: '400px'}}
                                                                /> :
                                                                <div>
                                                                    <FormattedDate value={`${moment(cPDetail[0] && cPDetail[0].estimatedStartDate)}`} />
                                                                    {' '}
                                                                    <FormattedTime value={`${moment(cPDetail[0] && cPDetail[0].estimatedStartDate)}`} />
                                                                </div>
                                                        }
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col xs="5">
                                                <Row className="mb-3">
                                                    <Col xs="6" md="6" className="pl-2">
                                                        <Label className="col-form-label">
                                                            <FormattedMessage id= "app.contruction.Estimated_Completion_Date" defaultMessage= "Estimated Completion Date" />
                                                        </Label>
                                                    </Col>
                                                    <Col xs="6" md="6" className="pr-1 pl-1">
                                                        {
                                                            (userId === item.userId || userId === item.id) ?
                                                                <Field name="estimatedCompletionDate" type="date" component={FieldDatePicker}
                                                                    className="form-control form-control-sm"
                                                                    placeholderText="DD/MM/YYYY" dateFormat="dd/MM/yyyy"
                                                                    style={{width: '400px'}}
                                                                /> :
                                                                <div>
                                                                    <FormattedDate value={`${moment(cPDetail[0] && cPDetail[0].estimatedCompletionDate)}`} />
                                                                    {' '}
                                                                    <FormattedTime value={`${moment(cPDetail[0] && cPDetail[0].estimatedCompletionDate)}`} />
                                                                </div>
                                                        }
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </fieldset>
                                )
                            })
                        }
                        <Row className="mb-3">
                            <Col xs="6" md="6">
                                <FormGroup>
                                    <Label>
                                        <FormattedMessage id="app.contruction.Notify_To" defaultMessage="Notify To" />
                                    </Label>
                                    <Field multi={true}
                                           name="notifyChangeEstimatedContructionDates"
                                           options={toUserList}
                                           component={FieldAutoComplete}
                                           //validate={FieldLevelValidation.validateRequired}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xs="6" md="6" className="d-flex justify-content-center">
                                <Button type="submit" className="btn btn-dark" disabled={pristine || submitting || invalid}> 
                                    <FormattedMessage id="app.Save" defaultMessage="Save" />
                                </Button>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Form>
        </div>
    )
};

export default EstimatedContructionDate;