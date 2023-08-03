import React from 'react';
import {Card, CardHeader, CardBody, Row, Col, Label} from 'reactstrap';
import {Field} from 'redux-form';
import {FormattedMessage} from 'react-intl';

import {
    PREDEFINED_FOOTINGS_FULLSLAB_1,
    PREDEFINED_FOOTINGS_FULLSLAB_2,
    PREDEFINED_FOOTINGS_FULLSLAB_3,
    PREDEFINED_FOOTINGS_WARNING_SOIL_TYPES,
    PREDEFINED_FOOTINGS_SOIL_TYPES
} from "../../../../../constants";
import FootingsSoilTypeDropDown from "./FootingsSoilTypeDropDown";

const Footings = ({footingsSoilType, isPierOnly, handleFootingTypeChange}) => (
    <Card>
        <CardHeader className="p-2">
            <strong>Footings</strong>
        </CardHeader>
        <CardBody className="p-2">
            <Row>
                <Col xs="3">
                    <Label className="col-form-label">
                        <FormattedMessage id="app.quotes.Slab_Detail" defaultMessage="Slab Detail" />
                    </Label>
                </Col>
                <Col xs="3">
                    <Field component="select" name="footingsFullSlab1" id="footingsFullSlab1"
                           disabled = {isPierOnly}
                           className="form-control form-control-sm text-right">
                        <option value="">Thickness</option>
                        {isPierOnly ? 
                            <option value="0">0mm</option>
                            : null
                        }
                        {PREDEFINED_FOOTINGS_FULLSLAB_1.map((item, idx) =>
                            <option key={idx} value={item}>{item}</option>
                        )}
                    </Field>
                </Col>
                <Col xs="3">
                    <Field component="select" name="footingsFullSlab2" id="footingsFullSlab2"
                           disabled = {isPierOnly}
                           className="form-control form-control-sm text-right">
                        <option value="">Reinforcement</option>
                        {isPierOnly ? 
                            <option value="0">0</option>
                            : null
                        }
                        {PREDEFINED_FOOTINGS_FULLSLAB_2.map((item, idx) =>
                            <option key={idx} value={item}>{item}</option>
                        )}
                    </Field>
                </Col>
                <Col xs="3">
                    <Field component="select" name="footingsFullSlab3" id="footingsFullSlab3"
                           className="form-control form-control-sm text-right">
                        <option value="">Strength</option>
                        {PREDEFINED_FOOTINGS_FULLSLAB_3.map((item, idx) =>
                            <option key={idx} value={item}>{item}</option>
                        )}
                    </Field>
                </Col>
            </Row>
            <Row className="d-flex justify-content-between">
                <div className="col-auto">
                    <Label className="col-form-label">
                        <Field name="footingsPiers" component="input" type="radio"
                               value={0} parse={value => Number(value)} 
                               onChange={handleFootingTypeChange}
                        />
                        {' '}
                        <FormattedMessage id="app.quotes.Piers_Only" defaultMessage="Piers Only" />
                    </Label>
                </div>
                <div className="col-auto">
                    <Label className="col-form-label">
                        <Field name="footingsPiers" component="input" type="radio"
                               value={1} parse={value => Number(value)}
                               onChange={handleFootingTypeChange}
                        />
                        {' '}
                        <FormattedMessage id="app.quotes.Full_Slab" defaultMessage="Full Slab" />
                    </Label>
                </div>
                <div className="col-auto">
                    <Label className="col-form-label">
                        <Field name="footingsPiers" component="input" type="radio"
                               value={2} parse={value => Number(value)}
                               onChange={handleFootingTypeChange}
                        />
                        {' '}
                        <FormattedMessage id="app.quotes.Slab_n_Piers" defaultMessage="Slab & Piers" />
                    </Label>
                </div>
            </Row>
            <Row>
                <Col xs="4" md="3">
                    <Label className="col-form-label">
                        <FormattedMessage id="app.quotes.Soil_Type" defaultMessage="Soil Type" />
                    </Label>
                </Col>
                <Col xs="8" md="9">
                    <Field name="footingsSoilType" component={FootingsSoilTypeDropDown}
                           options={PREDEFINED_FOOTINGS_SOIL_TYPES}
                    />
                    {PREDEFINED_FOOTINGS_WARNING_SOIL_TYPES.includes(footingsSoilType) &&
                        <p className="text-danger mt-1 mb-1">
                            <FormattedMessage id="app.quotes.Soil_Type_Warning" defaultMessage="The concrete foundation will need to be manually assessed by our engineers!" />
                        </p>
                    }
                </Col>
            </Row>
        </CardBody>
    </Card>
);

export default Footings;