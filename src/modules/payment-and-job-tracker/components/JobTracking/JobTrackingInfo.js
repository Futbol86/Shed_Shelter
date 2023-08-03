import React from 'react';
import { Card, CardHeader, CardBody, Row, Col, Label } from 'reactstrap';
import {NavLink} from 'react-router-dom';
import {FormattedMessage, FormattedDate, FormattedTime} from 'react-intl';

const JobTrackingInfo = ({ quoteDetails }) => {
    return (
        <Card>
            <CardHeader className="pl-3">
                <strong><FormattedMessage id="app.payment-and-job-tracker.Job_Tracking_Info" defaultMessage="Job Tracking Info" /></strong>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col md="2" className="pl-2">
                        <Label>
                            <strong>
                                <FormattedMessage id="app.payment-and-job-tracker.Job_Number" defaultMessage="Job Number" />:                    
                            </strong>
                        </Label>
                    </Col>
                    <Col md="4" className="pr-1 pl-1">
                        <NavLink to={`/quotes/edit/${quoteDetails.id}`}>
                            {quoteDetails.jobNumber}
                        </NavLink>
                    </Col>
                </Row>
                <Row>
                    <Col md="2" className="pl-2">
                        <Label>
                            <strong>
                                <FormattedMessage id="app.payment-and-job-tracker.Created_Date" defaultMessage="Created Date" />:                 
                            </strong>
                        </Label>
                    </Col>
                    <Col md="4" className="pr-1 pl-1">
                        <Label>
                            <FormattedDate value={quoteDetails.quoteDate} />
                            {`  `}
                            <FormattedTime value={quoteDetails.quoteDate}/>
                        </Label>
                    </Col>
                </Row>
                <Row>
                    <Col md="2" className="pl-2">
                        <Label>
                            <strong>
                                <FormattedMessage id="app.payment-and-job-tracker.Updated_Date" defaultMessage="Updated Date" />:                      
                            </strong>
                        </Label>
                    </Col>
                    <Col md="4" className="pr-1 pl-1">
                        <Label>
                            <FormattedDate value={quoteDetails.updatedDate} />
                            {`  `}
                            <FormattedTime value={quoteDetails.updatedDate} />
                        </Label>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}

export default JobTrackingInfo;