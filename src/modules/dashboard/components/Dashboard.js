import React, { Component } from 'react';
import {Card, CardHeader, CardBody, Row, Col} from 'reactstrap';
import {FormattedMessage} from 'react-intl';

import DashboardActions from './DashboardActions';
import DashboardClientList from '../containers/DashboardClientList';
import DashboardQuoteList from '../containers/DashboardQuoteList';

class DashboardComponent extends Component {

    render() {
        return (
            <div className="animated fadeIn">
                <Card>
                    <CardHeader>
                        <h2>
                            <FormattedMessage id="app.Dashboard" defaultMessage="Dashboard" />
                        </h2>
                    </CardHeader>
                    <CardBody>
                        <Row className="mb-3">
                            <Col xs="12">
                                <DashboardActions />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12">
                                <DashboardQuoteList displayClient = {true}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12">
                                <DashboardClientList />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default DashboardComponent;
