import React from 'react';
import {CardBody, Card, CardHeader, Row, Col} from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import {Field} from "redux-form";

import {QUOTES_DS_TRACKING_MARKET_SEGMENTS} from "../../../constants";
import {FieldRadioButtonGroup} from "../../../../../components/common/Form";

const Tracking  = ({}) => {
    return (
        <Card>
            <CardHeader className="pl-3">
                <strong><FormattedMessage id="app.quotes.Tracking" defaultMessage="Tracking" /></strong>
            </CardHeader>
            <CardBody className="pb-2 pt-2">
                <Row className="mb-1">
                    <Col xs="12" md="6" className="pl-1">
                        <FormattedMessage id="app.quotes.Market_segment" defaultMessage="Market segment" />
                    </Col>
                    <Col xs="12" md="6" className="pl-1">
                        <Field component="select" name="trackingMarketSegment"
                               className="form-control form-control-sm ml-1"
                        >
                            {QUOTES_DS_TRACKING_MARKET_SEGMENTS.map((item, idx) =>
                                <option key={idx} value={item.id}>{item.name}</option>
                            )}
                        </Field>
                    </Col>
                </Row>

                <Row className="mb-1">
                    <Col xs="12" md="6" className="pl-1">
                        <FormattedMessage id="app.quotes.Is_council_approval_required" defaultMessage="Is council approval required?" />
                    </Col>
                    <Col xs="12" md="6" className="pl-1">
                        <Field name="trackingCoucilApproval" component={FieldRadioButtonGroup}
                               items={[{id: 1, name: "Yes"}, {id: 0, name: "No"}]}
                               parse={(value) => parseInt(value, 10)}
                               groupClassName="d-flex flex-row" className="d-flex justify-content-between mr-2 ml-1"
                        />
                    </Col>
                </Row>


            </CardBody>
        </Card>
    );
};

export default Tracking;