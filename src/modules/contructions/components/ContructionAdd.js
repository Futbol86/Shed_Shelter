import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import {FormattedMessage} from 'react-intl';
import {Row, Col, Form, Button, Card, CardHeader, CardBody, CardFooter, Alert} from 'reactstrap';

import ContructionInfo from './Contruction/ContructionInfo';
import ContructionChainMember from '../containers/Contruction/ContructionChainMember';
import AttachFileInvitation from '../containers/Contruction/AttachFileInvitation';

class ContructionAdd extends Component {
    render() {
        const { contructionDetails, quoteId, quoteDetails, uploadRootURL, handleSubmit, touched, error, submitting, pristine, invalid, reset} = this.props;

        return (
            <div className="animated fadeIn">
                <Form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <h2><FormattedMessage id="app.contruction.Add_New_Contruction" defaultMessage="Add New Contruction" /></h2>
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
                            <Row>
                                <Col xs="12">
                                    <AttachFileInvitation contructionDetails={contructionDetails} />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12">
                                    {error && <Alert color="danger"><FormattedMessage id="app.Error" defaultMessage="Error" />: {error}</Alert>}
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter className="d-flex justify-content-between">
                            <Button color="secondary" disabled={pristine || submitting || pristine} onClick={reset}>
                                <FormattedMessage id="app.Cancel" defaultMessage="Cancel" />
                            </Button>
                            <LaddaButton data-size={L} data-style={EXPAND_LEFT} data-color="green"
                                        data-spinner-lines={12} className="btn btn-dark" type="submit"
                                        loading={submitting}  disabled={submitting || invalid || pristine}>
                                <FormattedMessage id="app.Create" defaultMessage="Create" />
                            </LaddaButton>
                        </CardFooter>
                    </Card>
                </Form>
            </div>
        );
    }
}

ContructionAdd.propTypes = {
    handleSubmit: PropTypes.func
};

export default ContructionAdd;