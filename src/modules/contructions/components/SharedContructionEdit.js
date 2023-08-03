import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import { Row, Col, Card, CardHeader, CardBody, Alert } from 'reactstrap';

import ContructionInfo from './Contruction/ContructionInfo';
import EstimatedContructionDate from '../containers/SharedContruction/EstimatedContructionDate';
import ContructionNote from '../containers/Contruction/ContructionNote';

class SharedContructionEdit extends Component {
    render() {
        const { contructionDetails, contructionPlannerDetails, userId } = this.props;
        const isLocked = contructionDetails && contructionDetails.status !== 'processing';
        return (
            <div className="animated fadeIn">
                <fieldset disabled={isLocked}>
                    <Card>
                        <CardHeader>
                            <h2><FormattedMessage id="app.contruction.Edit_Shared_Contruction" defaultMessage="Edit Shared Contruction" /></h2>
                        </CardHeader>
                        <CardBody>
                            {contructionDetails ?
                                <Row>
                                    <Col xs="12">
                                        <ContructionInfo contructionDetails={contructionDetails} />
                                    </Col>
                                </Row>
                                : null
                            }
                            {contructionDetails ?
                                <Row>
                                    <Col xs="12">
                                        <EstimatedContructionDate userId={userId} contructionDetails={contructionDetails} contructionPlannerDetails={contructionPlannerDetails}/>
                                    </Col>
                                </Row>
                                : null
                            }
                            {contructionDetails && contructionDetails.id ?
                                <Row>
                                    <Col xs="12">
                                        <ContructionNote contructionDetails={contructionDetails} userId={userId} isLocked={isLocked}/>
                                    </Col>
                                </Row>
                                : null
                            }
                        </CardBody>
                    </Card>
                </fieldset>
                {isLocked &&
                    <Alert color="info" className="text-center">
                        <FormattedMessage id="app.contruction.This_Contruction_is_Closed_and_READ_ONLY" defaultMessage="This Contruction is Closed and READ ONLY!" />
                    </Alert>
                }
            </div>
        );
    }
}

export default SharedContructionEdit;