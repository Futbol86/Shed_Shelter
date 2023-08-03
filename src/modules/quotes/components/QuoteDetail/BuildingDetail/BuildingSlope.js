import React from 'react';
import {Card, CardHeader, CardBody, Row, Col, Label, Button} from 'reactstrap';
import {Field} from 'redux-form';
import {FormattedMessage} from 'react-intl';

import {getBuildingSlopesListFromProduct} from "../../../selectors";

const BuildingSlope = ({ productId }) => {
    const slopeList = getBuildingSlopesListFromProduct(productId);
    return (
        <Card>
            <CardHeader className="p-2">
                <strong><FormattedMessage id="app.quotes.Building_Slope" defaultMessage="Building Slope" /></strong>
            </CardHeader>
            <CardBody className="p-2">
                <Row>
                    <Col xs="12" className="d-flex flex-row justify-content-between">
                        <Label>
                            <FormattedMessage id="app.quotes.Building_Slope" defaultMessage="Building Slope"/>: {' '}
                        </Label>
                        <div className="form-group d-flex flex-row mb-0">
                            <Field component="select" name="buildingSlope" id="buildingSlope"
                                   className="form-control form-control-sm text-left ml-1">
                                <option value="0"></option>
                                {slopeList.map((item, idx) =>
                                    <option key={idx} value={item}>{item}°</option>
                                )}
                            </Field>
                        </div>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}

export default BuildingSlope;