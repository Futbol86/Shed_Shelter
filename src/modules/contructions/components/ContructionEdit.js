import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import { Row, Col, Card, CardHeader, CardBody, Alert } from 'reactstrap';

import ContructionInfo from './Contruction/ContructionInfo';
import ContructionChainMember from '../containers/Contruction/ContructionChainMember';
import ContructionNote from '../containers/Contruction/ContructionNote';

class ContructionEdit extends Component {
    render() {
        const { contructionDetails, quoteId, quoteDetails, userId, error, uploadRootURL } = this.props;
        const isLocked = contructionDetails && contructionDetails.status !== 'processing';
        return (
            <div className="animated fadeIn">
                <fieldset disabled={isLocked}>
                    <Card>
                        <CardHeader>
                            <h2><FormattedMessage id="app.contruction.Edit_Contruction" defaultMessage="Edit Contruction" /></h2>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col xs="12">
                                    <ContructionInfo contructionDetails={contructionDetails} quoteDetails={quoteDetails}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12">
                                    <ContructionChainMember quoteId={quoteId} contructionDetails={contructionDetails} uploadRootURL={uploadRootURL}/>
                                </Col>
                            </Row>
                            {contructionDetails && contructionDetails.id ?
                                <Row>
                                    <Col xs="12">
                                        <ContructionNote contructionDetails={contructionDetails} userId={userId} isLocked={isLocked}/>
                                    </Col>
                                </Row>
                                : null
                            }
                            <Row>
                                <Col xs="12">
                                    {error && <Alert color="danger"><FormattedMessage id="app.Error" defaultMessage="Error" />: {error}</Alert>}
                                </Col>
                            </Row>
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

export default ContructionEdit;