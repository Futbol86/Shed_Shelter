import React from 'react';
import { Card, CardHeader, CardBody, Row, Col, Label } from 'reactstrap';
import {NavLink} from 'react-router-dom';
import {FormattedMessage, FormattedDate, FormattedTime} from 'react-intl';

const ContructionInfo = ({ contructionDetails, quoteDetails }) => {
    const {id, jobNumber, clientDetail} = quoteDetails || {};
    return (
        <Card>
            <CardHeader className="pl-3">
                <strong><FormattedMessage id="app.contruction.Contruction_Info" defaultMessage="Contruction Info" /></strong>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col md="2" className="pl-2">
                        <Label>
                            <strong>
                                <FormattedMessage id="app.contruction.Job_Number" defaultMessage="Job Number" />:                    
                            </strong>
                        </Label>
                    </Col>
                    <Col md="4" className="pr-1 pl-1">
                        <NavLink to={`/quotes/edit/${id}`}>
                            {jobNumber}
                        </NavLink>
                    </Col>
                </Row>
                <Row>
                    <Col md="2" className="pl-2">
                        <Label>
                            <strong>
                                <FormattedMessage id="app.contruction.Client_Name" defaultMessage="Client Name" />:                    
                            </strong>
                        </Label>
                    </Col>
                    <Col md="4" className="pr-1 pl-1">
                        <NavLink to={`/clients/${clientDetail && clientDetail.id}`}>
                            {clientDetail && clientDetail.agentName}
                        </NavLink>
                    </Col>
                </Row>
                <Row>
                    <Col md="2" className="pl-2">
                        <Label>
                            <strong>
                                <FormattedMessage id="app.contruction.Created_Date" defaultMessage="Created Date" />:
                            </strong>
                        </Label>
                    </Col>
                    <Col md="4" className="pr-1 pl-1">
                        <Label>
                            <FormattedDate value={contructionDetails && contructionDetails.createdAt} />
                            {`  `}
                            <FormattedTime value={contructionDetails && contructionDetails.createdAt}/>
                        </Label>
                    </Col>
                </Row>
                <Row>
                    <Col md="2" className="pl-2">
                        <Label>
                            <strong>
                                <FormattedMessage id="app.contruction.Updated_Date" defaultMessage="Updated Date" />:
                            </strong>
                        </Label>
                    </Col>
                    <Col md="4" className="pr-1 pl-1">
                        <Label>
                            <FormattedDate value={contructionDetails && contructionDetails.updatedAt} />
                            {`  `}
                            <FormattedTime value={contructionDetails && contructionDetails.updatedAt} />
                        </Label>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}

export default ContructionInfo;