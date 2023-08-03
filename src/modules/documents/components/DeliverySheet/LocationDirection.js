import React from 'react';
import { Row, Col } from 'reactstrap';
import {FormattedMessage} from "react-intl";
import {FieldInputPure} from "../../../../components/common/Form";
import utils from "../../../../services/utils";

import {Field} from "redux-form";

const LocationDirection = ({}) => {
   
    return (
        <React.Fragment>
            <Row>
                <Col xs={12} md={12}>
                    <Row className="pb-1 pl-1 pt-5">
                        <Col xs={4} md={4}>
                            <FormattedMessage id="app.docs.Kilometers_From_Nearest_Town" defaultMessage="Kilometers from nearest Town" />:
                        </Col>
                        <Col xs={1} md={1}>
                            <Field name="nearestTown" id="nearestTown" type="text" component={FieldInputPure} className="form-control"/>
                        </Col>
                        <Col xs={1} md={1}>
                            <FormattedMessage id="app.docs.Km_from" defaultMessage="  Km from  " />
                        </Col>
                        <Col xs={5} md={5}>
                            <Field name="nearestTownFrom" id="nearestTownFrom" type="text" component={FieldInputPure} className="form-control"/>
                        </Col>
                    </Row>

                    <Row className="pb-1 pl-1 pt-2">
                        <Col xs={4} md={4}>
                            <FormattedMessage id="app.docs.Kilometers_From_Nearest_Highway" defaultMessage="Kilometers from nearest highway" />:
                        </Col>
                        <Col xs={1} md={1}>
                            <Field name="nearestHighway" id="nearestHighway" type="text" component={FieldInputPure} className="form-control"/>
                        </Col>
                        <Col xs={1} md={1}>
                            <FormattedMessage id="app.docs.Km_from"  defaultMessage="  Km from  " />
                        </Col>
                        <Col xs={5} md={5}>
                            <Field name="nearestHighwayFrom" id="nearestHighwayFrom" type="text" component={FieldInputPure} className="form-control"/>
                        </Col>
                    </Row>

                    <Row className="pb-1 pl-1 pt-2">
                        <Col xs={4} md={4}>
                            <FormattedMessage id="app.docs.Does_your_site_have_mobile_phone_service" defaultMessage="Does your site have mobile phone service" />:
                        </Col>
                        <Col xs={8} md={8}>
                            <Field name="haveMobilePhoneService" id="haveMobilePhoneService" type="text" component={FieldInputPure} className="form-control"/>
                        </Col>
                    </Row>

                    <Row className="pb-1 pl-1 pt-2">
                        <Col xs={4} md={4}>
                            <FormattedMessage id="app.docs.Is_the_site_capable_of_accepting" defaultMessage="Is the site capable of accepting a delivery by semmi-tralier 20m long x 2.4m wide with a mass of up to 40 tones" />:
                        </Col>
                        <Col xs={2} md={2}>
                            <Field name="siteCapableAcceptingYes" id="siteCapableAcceptingYes" component="input" type="checkbox" />
                            <FormattedMessage id="app.docs.Yes" defaultMessage="  Yes  " />
                        </Col>
                        <Col xs={2} md={2}>
                            <Field name="siteCapableAcceptingNo" id="siteCapableAcceptingNo" component="input" type="checkbox" />
                            <FormattedMessage id="app.docs.No" defaultMessage="  No  " />
                        </Col>
                    </Row>

                    <Row className="pb-1 pl-1 pt-2">
                        <Col xs={4} md={4}>
                            <FormattedMessage id="app.docs.Is_your_property" defaultMessage="Is your property" />:
                        </Col>
                        <Col xs={2} md={2}>
                            <Field name="isYourPropertyHouseblock" id="isYourPropertyHouseblock" component="input" type="checkbox" />
                            <FormattedMessage id="app.docs.House_block" defaultMessage="  House block  " />
                        </Col>
                        <Col xs={2} md={2}>
                            <Field name="isYourPropertyAcreage" id="isYourPropertyAcreage" component="input" type="checkbox" />
                            <FormattedMessage id="app.docs.Acreage" defaultMessage="  Acreage  " />
                            
                        </Col>
                        <Col xs={2} md={2}>
                            <Field name="isYourPropertyRuralProperty" id="isYourPropertyRuralProperty" component="input" type="checkbox" />
                            <FormattedMessage id="app.docs.Rural_Property" defaultMessage="  Rural Property  " />
                        </Col>
                    </Row>
                    <Row className="pb-1 pl-1">
                        <Col xs={4} md={4}>
                            <FormattedMessage id="app.docs.Are_there_any_existing_buildings" defaultMessage="Are there any existing buildings on the site?" />
                        </Col>
                        <Col xs={2} md={2}>
                            <Field name="existingBuildingYes" id="existingBuildingYes" component="input" type="checkbox" />
                            <FormattedMessage id="app.docs.Yes" defaultMessage="  Yes  " />
                        </Col>
                        <Col xs={2} md={2}>
                            <Field name="existingBuildingNo" id="existingBuildingNo" component="input" type="checkbox" />
                            <FormattedMessage id="app.docs.No" defaultMessage="  No  " />
                        </Col>
                    </Row>
                    <Row className="pb-1 pl-1 pt-2">
                        <Col xs={4} md={4}>
                            <FormattedMessage id="app.docs.Is_there_any_one_living_on_the_site" defaultMessage="Is anyone living on the site ?" />
                        </Col>
                        <Col xs={2} md={2}>
                            <Field name="livingOnSiteYes" id="livingOnSiteYes" component="input" type="checkbox" />
                            <FormattedMessage id="app.docs.Yes" defaultMessage="  Yes  " />
                        </Col>
                        <Col xs={2} md={2}>
                            <Field name="livingOnSiteNo" id="livingOnSiteNo" component="input" type="checkbox" />
                            <FormattedMessage id="app.docs.No" defaultMessage="  No  " />
                        </Col>
                    </Row>
                    <Row className="pb-1 pl-1 pt-2">
                        <Col xs={4} md={4}>
                            <FormattedMessage id="app.docs.Is_your_street" defaultMessage="Is your Street / Road?" />:
                        </Col>
                        <Col xs={2} md={2}>
                            <Field name="streetDeadEnd" id="streetDeadEnd" component="input" type="checkbox" />
                            <FormattedMessage id="app.docs.Dead_End" defaultMessage="  Dead End  " />
                        </Col>
                        <Col xs={2} md={2}>
                            <Field name="streetThroughRoad" id="streetThroughRoad" component="input" type="checkbox" />
                            <FormattedMessage id="app.docs.Through_Road" defaultMessage="  Through Road  " />
                        </Col>
                    </Row>
                    <Row className="pb-1 pl-1 pt-2">
                        <Col xs={4} md={4}>
                            <FormattedMessage id="app.docs.Is_your_street" defaultMessage="Is your Street / Road?" />:
                        </Col>
                        <Col xs={2} md={2}>
                            <Field name="streetSingleLane" id="streetSingleLane" component="input" type="checkbox" />
                            <FormattedMessage id="app.docs.Single_Lane" defaultMessage="  Single Lane  " />
                        </Col>
                        <Col xs={2} md={2}>
                            <Field name="streetDualLane" id="streetDualLane" component="input" type="checkbox" />
                            <FormattedMessage id="app.docs.Dual_Lane" defaultMessage="  Dual Lane  " />
                        </Col>
                    </Row>
                    <Row className="pb-1 pl-1 pt-2">
                        <Col xs={4} md={4}>
                            <FormattedMessage id="app.docs.Is_their_suitable_turning_area" defaultMessage="Is their suitable turning area on the property or roadway?" />:
                        </Col>
                        <Col xs={2} md={2}>
                            <Field name="turningAreaYes" id="turningAreaYes" component="input" type="checkbox" />
                            <FormattedMessage id="app.docs.Yes" defaultMessage="  Yes  " />
                        </Col>
                        <Col xs={2} md={2}>
                            <Field name="turningAreaNo" id="turningAreaNo" component="input" type="checkbox" />
                            <FormattedMessage id="app.docs.No" defaultMessage="  No  " />
                        </Col>
                    </Row>
                    <Row className="pb-1 pl-1 pt-2">
                        <Col xs={4} md={4}>
                            <FormattedMessage id="app.docs.Are_their_low_power_or_phone_lines" defaultMessage="Are their low power or phone lines leading up to or on the property?" />:
                        </Col>
                        <Col xs={2} md={2}>
                            <Field name="lowPowerYes" id="lowPowerYes" component="input" type="checkbox" />
                            <FormattedMessage id="app.docs.Yes" defaultMessage="  Yes  " />
                        </Col>
                        <Col xs={2} md={2}>
                            <Field name="lowPowerNo" id="lowPowerNo" component="input" type="checkbox" />
                            <FormattedMessage id="app.docs.No" defaultMessage="  No  " />
                        </Col>
                    </Row>
                    <Row className="pb-1 pl-1 pt-2">
                        <Col xs={4} md={4}>
                            <FormattedMessage id="app.docs.Entry_Path_Hazards" defaultMessage="Entry Path Hazards" />:
                        </Col>
                        <Col xs={2} md={2}>
                            <Field name="entryPathSoftground" id="entryPathSoftground" component="input" type="checkbox" />
                            <FormattedMessage id="app.docs.Soft_ground" defaultMessage="  Soft ground  " />
                        </Col>
                        <Col xs={2} md={2}>
                            <Field name="entryPathSepticTrench" id="entryPathSepticTrench" component="input" type="checkbox" />
                            <FormattedMessage id="app.docs.Septic_Trench" defaultMessage="  Septic Trench  " />
                        </Col>
                        <Col xs={2} md={2}>
                            <Field name="entryPathOther" id="entryPathOther" component="input" type="checkbox" />
                            <FormattedMessage id="app.docs.Other" defaultMessage="  Other  " />
                        </Col>
                    </Row>
                    <Row className="pb-1 pl-1 pt-2">
                        <Col xs={4} md={4}>
                            <FormattedMessage id="app.docs.Access_Surface" defaultMessage="Access Surface" />:
                        </Col>
                        <Col xs={1} md={1}>
                            <Field name="accessSurfaceConcrete" id="accessSurfaceConcrete" component="input" type="checkbox" />
                            <FormattedMessage id="app.docs.Concrete" defaultMessage="  Concrete  " />
                        </Col>
                        <Col xs={1} md={1}>
                            <Field name="accessSurfaceBitumen" id="accessSurfaceBitumen" component="input" type="checkbox" />
                            <FormattedMessage id="app.docs.Bitumen" defaultMessage="  Bitumen  " />
                        </Col>
                        <Col xs={1} md={1}>
                            <Field name="accessSurfaceDirt" id="accessSurfaceDirt" component="input" type="checkbox" />
                            <FormattedMessage id="app.docs.Dirt" defaultMessage="  Concrete  " />
                        </Col>
                        <Col xs={1} md={1}>
                            <Field name="accessSurfaceSand" id="accessSurfaceSand" component="input" type="checkbox" />
                            <FormattedMessage id="app.docs.Sand" defaultMessage="  Bitumen  " />
                        </Col>
                        <Col xs={1} md={1}>
                            <Field name="accessSurfaceGrass" id="accessSurfaceGrass" component="input" type="checkbox" />
                            <FormattedMessage id="app.docs.Grass" defaultMessage="  Bitumen  " />
                        </Col>
                    </Row>
                    <Row className="pb-1 pl-1 pt-2">
                        <Col xs={4} md={4}>
                            <FormattedMessage id="app.docs.Will_rain_affect_truck_access" defaultMessage="Will rain affect truck access to your site in any way" />:
                        </Col>
                        <Col xs={2} md={2}>
                            <Field name="rainAffectTruckYes" id="rainAffectTruckYes" component="input" type="checkbox" />
                            <FormattedMessage id="app.docs.Yes" defaultMessage="  Yes  " />
                        </Col>
                        <Col xs={2} md={2}>
                            <Field name="rainAffectTruckNo" id="rainAffectTruckNo" component="input" type="checkbox" />
                            <FormattedMessage id="app.docs.No" defaultMessage="  No  " />
                        </Col>
                    </Row>
                    <Row className="pb-1 pl-1 pt-2">
                        <Col xs={12} md={12}>
                            <FormattedMessage id="app.docs.Special_notes_for_the_delivery_driver" defaultMessage="Special notes for the delivery driver, that may assist with delivery and unloading" />:
                        </Col>
                    </Row>
                    <Row className="pb-1 pl-1">
                        <Col xs={12} md={12}>
                            <Field name="specialNote" id="specialNote" type="textarea" component={FieldInputPure} className="form-control"/>
                        </Col>
                    </Row>
                </Col>

            </Row>
        </React.Fragment>
    );
};

export default LocationDirection;