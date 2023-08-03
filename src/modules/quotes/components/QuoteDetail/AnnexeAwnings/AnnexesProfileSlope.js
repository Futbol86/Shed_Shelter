import React from 'react';
import {PREDEFINED_ANNEXE_SLOPE} from "../../../../../constants";
import {Row, Col, Label} from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import {Field} from 'redux-form';
import {getBuildingSlopesListFromProduct} from "../../../selectors";


const AnnexesProfileSlope = ({productId}) => {
    const slopeList = getBuildingSlopesListFromProduct(productId);
    return (
        <React.Fragment>
            <Row>
                <Col className="form-inline">
                    <Label className="col-form-label">
                        <FormattedMessage id="app.quotes.Building_Slope" defaultMessage="Building Slope"/>: {' '}

                        <Field component="select" name="buildingSlope" id="buildingSlope"
                               className="form-control form-control-sm text-left ml-1">
                            <option value="0"></option>
                            {slopeList.map((item, idx) =>
                                <option key={idx} value={item}>{item}°</option>
                            )}
                        </Field>
                    </Label>
                </Col>
            </Row>
            <Row>
                <Col className="form-inline">
                    <Label className="col-form-label">
                        <FormattedMessage id="app.quotes.Annexe_Slope" defaultMessage="Annexe Slope"/>: {' '}
                        <Field component="select" name="annexeSlope" id="annexeSlope"
                               className="form-control form-control-sm text-left ml-2">
                            <option value="0"></option>
                            {PREDEFINED_ANNEXE_SLOPE.map((item, idx) =>
                                <option key={idx} value={item}>{item}°</option>
                            )}
                        </Field>
                    </Label>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default AnnexesProfileSlope;