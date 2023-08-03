import React from 'react';
import {Card, CardHeader, CardBody, Row, Col, Label, Button} from 'reactstrap';
import {Field} from 'redux-form';
import LightBox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import {
    PREDEFINED_REGION_HILL_SLOPES,
    PREDEFINED_REGION_IMPORTANCE_LEVELS,
    PREDEFINED_REGION_INTERNAL_PRESSURES_COEFICIENT,
    PREDEFINED_REGION_TERRAIN_CATEGORIES,
    PREDEFINED_REGION_TOPOGRAPHY_REGIONS,
    PREDEFINED_REGION_WIND,
    PRODUCT_CATEGORY_SKILLION_CARPORTS,
    PRODUCT_CATEGORY_GABLE_CARPORTS
} from "../../../../../constants";

import WindRegionImg from '../../../assets/img/AU-Wind-Map_Optimized.jpg';
import {FormattedMessage} from "react-intl";
import {FieldInputPure} from "../../../../../components/common/Form";

const Region = ({lightBoxIndex, handleLightBoxClick, handleRegionWindChange, regionWind, productCategoryId}) => (
    <Card>
        <CardHeader className="p-2">
            <strong><FormattedMessage id="app.quotes.Region" defaultMessage="Region" /></strong>
        </CardHeader>
        <CardBody className="p-2">
            <Row>
                <Col xs={12} md={6} className="pr-md-3" style={{borderRight: "1px solid #e2e2e2"}}>
                    <Row>
                        <Col xs="4">
                            <Label className="col-form-label">
                                <FormattedMessage id="app.quotes.Region" defaultMessage="Region" />
                            </Label>
                        </Col>
                        <Col xs="3" className="d-flex flex-row">
                            <Field component="select" name="regionWind" id="regionWind"
                                   className="form-control form-control-sm text-right"
                                   onChange = {handleRegionWindChange}>
                                <option value="0"></option>
                                {PREDEFINED_REGION_WIND.map((item, idx) =>
                                    <option key={idx} value={item}>{item}</option>
                                )}
                            </Field>
                        </Col>
                        <Col xs="5">
                            <Button type="button" color="outline-info" className="btn-sm"
                                    onClick={()=> handleLightBoxClick(2)}>
                                <FormattedMessage id="app.quotes.Region_Map" defaultMessage="Region Map" />
                            </Button>

                            {(lightBoxIndex === 2) && (
                                <LightBox
                                    reactModalStyle={{overlay: {zIndex: 9999}}}
                                    mainSrc={WindRegionImg}
                                    onCloseRequest={() => handleLightBoxClick(0)}
                                />
                            )}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="7">
                            <Label className="col-form-label">
                                <FormattedMessage id="app.quotes.Terrain_Category" defaultMessage="Terrain Category" />
                            </Label>
                        </Col>
                        <Col xs="5" className="d-flex flex-row">
                            <Field component="select" name="regionTerrainCategory" id="regionTerrainCategory"
                                   className="form-control form-control-sm text-right">
                                <option value="0"></option>
                                {PREDEFINED_REGION_TERRAIN_CATEGORIES.map((item, idx) =>
                                    <option key={idx} value={item}>{item}</option>
                                )}
                            </Field>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="7">
                            <Label className="col-form-label">
                                <FormattedMessage id="app.quotes.Importance_Level" defaultMessage="Importance Level" />
                            </Label>
                        </Col>
                        <Col xs="5" className="d-flex flex-row">
                            <Field component="select" name="regionImportanceLevel" id="regionImportanceLevel"
                                   className="form-control form-control-sm text-right" disabled={true}>
                                <option value="0"></option>
                                {PREDEFINED_REGION_IMPORTANCE_LEVELS.map((item, idx) =>
                                    <option key={idx} value={item}>{item}</option>
                                )}
                            </Field>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="7">
                            <Label className="col-form-label">
                                <FormattedMessage id="app.quotes.Internal_Pressure_Coeficient_Cpi" defaultMessage="Internal Pressure Coeficient (Cpi)" />
                            </Label>
                        </Col>
                        <Col xs="5" className="d-flex flex-row">
                            <Field component="select" name="regionInternalPressure" id="regionInternalPressure"
                                   className="form-control form-control-sm text-right" 
                                   disabled = {(regionWind === "C" || regionWind === "D" ||
                                                productCategoryId === PRODUCT_CATEGORY_SKILLION_CARPORTS) ||
                                                productCategoryId === PRODUCT_CATEGORY_GABLE_CARPORTS
                                              }>
                                <option value="-1"></option>
                                {PREDEFINED_REGION_INTERNAL_PRESSURES_COEFICIENT.map((item, idx) =>
                                    <option key = {idx} value = {item.value}>{item.name}</option>
                                )}
                            </Field>
                        </Col>
                    </Row>
                </Col>
                <Col xs={12} md={6} className="pl-md-1">
                    <Row>
                        <Col xs="7">
                            <Label className="col-form-label">
                                <FormattedMessage id="app.quotes.Topography_Region" defaultMessage="Topography Region" />
                            </Label>
                        </Col>
                        <Col xs="5" className="d-flex flex-row align-content-center">
                            <Field component="select" name="regionTopography" id="regionTopography"
                                   className="form-control form-control-sm text-right">
                                <option value="0"></option>
                                {PREDEFINED_REGION_TOPOGRAPHY_REGIONS.map(({id, name}, idx) =>
                                    <option key={idx} value={id}>{name}</option>
                                )}
                            </Field>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="7">
                            <Label className="col-form-label">
                                <FormattedMessage id="app.quotes.Hill_Slope" defaultMessage="Hill Slope" />
                            </Label>
                        </Col>
                        <Col xs="5" className="d-flex flex-row align-content-center">
                            <Field component="select" name="regionHillSlope" id="regionHillSlope"
                                   className="form-control form-control-sm text-right">
                                <option value="0"></option>
                                {PREDEFINED_REGION_HILL_SLOPES.map(({id, name}, idx) =>
                                    <option key={idx} value={id}>{name}</option>
                                )}
                            </Field>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" className="d-flex flex-row justify-content-between">
                            <Label className="col-form-label">
                                <FormattedMessage id="app.quotes.Hill_Height" defaultMessage="Hill Height" />
                            </Label>
                            <div className="d-flex flex-row">
                                <Field name="regionHillHeight" type="number" component={FieldInputPure}
                                       className="form-control form-control-sm ml-1 mr-1"
                                       label="Hill Height" style={{width: '80px'}}
                                       parse={(value) => value && Math.max(1, parseInt(value, 10))}
                                />
                                <Label className="col-form-label" for="regionHillHeight">m</Label>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </CardBody>
    </Card>
);

export default Region;