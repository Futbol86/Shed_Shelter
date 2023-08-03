import React from 'react';
import { Row, Col, Label, Button } from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import {Field} from 'redux-form';

import {PREDEFINED_AUSTRALIAN_CITIES, PREDEFINED_AUSTRALIAN_STATES} from "../../../../../constants";
import {
    FieldAutoSuggest,
    FieldDropdownList,
    FieldInputPure,
    FieldLevelValidation
} from "../../../../../components/common/Form";
import SiteDetailAddressMap from "./SiteDetailAddressMap";

const SiteDetail  = ({siteAddress, handleMapDrawing, mapLocked, onLockMapClick, onRotateShedClick,
                         changeFieldValue}) => {
    const citiesForAC = PREDEFINED_AUSTRALIAN_CITIES.map(
        city => ({
            value: city,
            label: city
        })
    );

    return (
        <React.Fragment>
            <Row>
                <Col xs={9}>
                    <Row>
                        <Col xs="3" className="pl-1 pr-1">
                            <Label className="col-form-label">
                                <FormattedMessage id="app.clients.Number" defaultMessage="Number" />
                            </Label>
                        </Col>
                        <Col xs="9">
                            <Field name="siteAddress.addressNumber" type="text" component={FieldInputPure}
                                   validate={FieldLevelValidation.validateRequired} className="form-control-sm pt-1"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="3" className="pl-1 pr-1">
                            <Label className="col-form-label">
                                <FormattedMessage id="app.clients.Street" defaultMessage="Street" />
                            </Label>
                        </Col>
                        <Col xs="9">
                            <Field name="siteAddress.addressStreet" type="text" component={FieldInputPure}
                                   validate={FieldLevelValidation.validateRequired} className="form-control-sm pt-1"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="3" className="pl-1 pr-1">
                            <Label className="col-form-label">
                                <FormattedMessage id="app.clients.City_or_Town" defaultMessage="City or Town" />
                            </Label>
                        </Col>
                        <Col xs="9" className="pb-1">
                            <Field
                                name="siteAddress.addressCity"
                                suggestions={citiesForAC}
                                component={FieldAutoSuggest}
                                validate={FieldLevelValidation.validateRequired}
                                className = "form-control form-control-sm"
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col xs="3" className="pl-1 pr-1">
                            <Label className="col-form-label">
                                <FormattedMessage id="app.clients.State" defaultMessage="State" />
                            </Label>
                        </Col>
                        <Col xs="9">
                            <Field
                                name="siteAddress.addressState"
                                component={FieldDropdownList}
                                data={PREDEFINED_AUSTRALIAN_STATES}
                                valueField="abbreviation"
                                textField="name"
                                titleOption="Select State"
                                validate={FieldLevelValidation.validateRequired} className="form-control-sm pt-1"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="3" className="pl-1 pr-1">
                            <Label className="col-form-label">
                                <FormattedMessage id="app.clients.Post_Code" defaultMessage="Post Code" />
                            </Label>
                        </Col>
                        <Col xs="9">
                            <Field name="siteAddress.addressPostcode" type="text" component={FieldInputPure}
                                   validate={FieldLevelValidation.validateRequired} className="form-control-sm pt-1"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="3" className="pl-1 pr-1">
                            <Label className="col-form-label">
                                <FormattedMessage id="app.quotes.Site_located" defaultMessage="Site located" />
                            </Label>
                        </Col>
                        <Col xs="9">
                            <Label className="col-form-label d-flex flex-row">
                                <Field name="siteAddress.siteLocatedFrom" type="number" component={FieldInputPure}
                                       parse={value => Number(value)}
                                       className="form-control-sm text-right pt-1" style={{width: '70px'}}
                                />
                                {' '}<FormattedMessage id="app.quotes.Site_located_kms_from"
                                                  defaultMessage="kms from {cityName}"
                                                  values={{
                                                      cityName: siteAddress && siteAddress.addressCity
                                                  }}
                                />
                            </Label>
                        </Col>
                    </Row>
                </Col>

                <Col xs={3} className="d-flex flex-column pl-1 pr-1">
                    <Button type="button" color="secondary" className="mt-md-5 btn-sm btn-block ml-auto pl-1 pr-1" 
                        onClick={() => onLockMapClick()}
                    >
                        <FormattedMessage id={mapLocked ? "app.quotes.UnLock_Map" : "app.quotes.Lock_Map"} defaultMessage="Lock Map" />
                    </Button>
                    <Button type="button" color="secondary" className="btn-sm btn-block ml-auto pl-1 pr-1"
                        onClick={() => onRotateShedClick()}
                    >
                        <FormattedMessage id="app.quotes.Rotate_Shed" defaultMessage="Rotate Shed" />
                    </Button>
                    <Button type="button" color="secondary" className="btn-sm btn-block ml-auto pl-1 pr-1"
                            onClick={handleMapDrawing}>
                        <FormattedMessage id="app.quotes.Draw_Map" defaultMessage="Draw Map..." />
                    </Button>
                </Col>
            </Row>
            <Row className="pt-2">
                <Col xs={4}>
                    <Row>
                        <Col xs="6" className="pl-1 pr-1">
                            <Label className="col-form-label">
                                <FormattedMessage id="app.quotes.Longitude" defaultMessage="Longitude" />
                            </Label>
                        </Col>
                        <Col xs="6" className="pl-0">
                            <Field name="siteAddress.lng" type="text" component={FieldInputPure} readOnly={true}
                                   className="form-control-sm pt-1"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="6" className="pl-1 pr-1">
                            <Label className="col-form-label">
                                <FormattedMessage id="app.quotes.Latitude" defaultMessage="Latitude" />
                            </Label>
                        </Col>
                        <Col xs="6" className="pl-0">
                            <Field name="siteAddress.lat" type="text" component={FieldInputPure} readOnly={true}
                                   className="form-control-sm pt-1"
                            />
                        </Col>
                    </Row>
                </Col>
                <Col xs={8} className="pr-1">
                    <div style={{ height: '40vh', width: '100%' }}>
                        <SiteDetailAddressMap changeFieldValue={changeFieldValue} siteAddress={siteAddress} />
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default SiteDetail;