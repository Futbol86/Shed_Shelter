import React from 'react';
import { Row, Col, Card, CardHeader, CardBody, Table, Badge } from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import FindUsBasicResult from './FindUsBasicResult';
import FindUsDetailResult from './FindUsDetailResult';

const FindUs = ({ countFindUs, findUsData }) => {
    return (
        <Card>
            <CardHeader className="p-2">
                <strong><FormattedMessage id="app.reporting.Find_Us" defaultMessage="Find Us" /></strong>
            </CardHeader>
            <CardBody>
                <Row className="pb-2">
                    <Col xs="12">
                        <strong>
                            <FormattedMessage id="app.reporting.Total_number_of_Find_Us_entries_recorded_in_search_period" 
                                defaultMessage="Total number of Find Us entries recorded in search period:"
                            />
                            {' '}
                            {countFindUs ? countFindUs : 0}
                        </strong> 
                    </Col>
                </Row>
                <Row className="pb-2">
                    <Col xs="12">
                        <u><b><FormattedMessage id="app.reporting.Basic_Result" defaultMessage="Basic Result" /></b></u>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <FindUsBasicResult countFindUs={countFindUs} findUsData={findUsData}/>
                    </Col>
                </Row>
                {countFindUs && findUsData ?
                    <React.Fragment>
                        <Row className="pb-2">
                            <Col xs="12">
                                <u><b><FormattedMessage id="app.reporting.Detail_Result" defaultMessage="Detail Result" /></b></u>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12">
                                <FindUsDetailResult countFindUs={countFindUs} findUsData={findUsData}/>
                            </Col>
                        </Row>
                    </React.Fragment>
                    : null
                }
            </CardBody>
        </Card>
    )
};

export default FindUs;