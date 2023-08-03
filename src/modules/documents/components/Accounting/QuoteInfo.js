import React from 'react';
import { Card, CardHeader, CardBody, Row, Col, Label, Badge } from 'reactstrap';
import {NavLink} from 'react-router-dom';
import {FormattedMessage, FormattedDate, FormattedTime} from 'react-intl';

const QuoteInfo = ({quoteInfo}) => {
    const {jobNumber, jobStatus, status, clientDetail, shedInformation, createdAt} = quoteInfo || {};
    
    return (
        <Card>
            <CardHeader className="pl-3">
                <strong><FormattedMessage id="app.docs.Quote_Info" defaultMessage="Quote Info" /></strong>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col md="1" className="pl-2">
                        <Label>
                            <strong>
                                <FormattedMessage id="app.order.Job_Number" defaultMessage="Job Number" />:                    
                            </strong>
                        </Label>
                    </Col>
                    <Col md="3" className="pr-1 pl-1">
                        {jobNumber}
                    </Col>
                    <Col md="1" className="pl-2">
                        <Label>
                            <strong>
                                <FormattedMessage id="app.order.Job_Status" defaultMessage="Job Status" />:                    
                            </strong>
                        </Label>
                    </Col>
                    <Col md="3" className="pr-1 pl-1">
                        {jobStatus !== 'sold' ?
                            <Badge color={(jobStatus === 'active') ? 'success' : ((jobStatus === 'dormant') ? 'warning' : 'dark')}
                                className={(jobStatus === 'dead') ? 'text-red' : ''}
                            >
                                {jobStatus && jobStatus.length && (jobStatus.charAt(0).toUpperCase() + jobStatus.slice(1))}
                            </Badge>
                            :
                            <div>
                                <img src={require('../../../quotes/assets/img/firework.png')} style={{height: '45px', width: '45px' }} />
                            </div>
                        }
                    </Col>
                    <Col md="1" className="pl-2">
                        <Label>
                            <strong>
                                <FormattedMessage id="app.order.Status" defaultMessage="Status" />:                    
                            </strong>
                        </Label>
                    </Col>
                    <Col md="3" className="pr-1 pl-1">
                        {status}
                    </Col>
                </Row>
                <Row>
                    <Col md="1" className="pl-2">
                        <Label>
                            <strong>
                                <FormattedMessage id="app.order.Client_Name" defaultMessage="Client Name" />:                    
                            </strong>
                        </Label>
                    </Col>
                    <Col md="3" className="pr-1 pl-1">
                        {clientDetail && clientDetail.agentName}
                    </Col>
                    <Col md="1" className="pl-2">
                        <Label>
                            <strong>
                                <FormattedMessage id="app.reporting.Delivery_Date" defaultMessage="Delivery Date" />:                    
                            </strong>
                        </Label>
                    </Col>
                    <Col md="3" className="pr-1 pl-1">
                        <FormattedDate value={shedInformation && shedInformation.deliveryDate}>
                            {
                                parts => (<>{parts.split('/')[1]}/{parts.split('/')[0]}/{parts.split('/')[2]}</>)
                            }
                        </FormattedDate>
                    </Col>
                    <Col md="1" className="pl-2">
                        <Label>
                            <strong>
                                <FormattedMessage id="app.order.Created_At" defaultMessage="Created At" />:                    
                            </strong>
                        </Label>
                    </Col>
                    <Col md="3" className="pr-1 pl-1">
                        <FormattedDate value={createdAt}>
                            {
                                parts => (<>{parts.split('/')[1]}/{parts.split('/')[0]}/{parts.split('/')[2]}</>)
                            }
                        </FormattedDate>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}

export default QuoteInfo;