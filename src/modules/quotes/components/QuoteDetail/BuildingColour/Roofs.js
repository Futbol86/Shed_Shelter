import React from 'react';
import {Card, CardHeader, CardBody, Row, Col, Label} from 'reactstrap';
import {Field} from 'redux-form';
import {FormattedMessage} from 'react-intl';

import WallsColourDropDown from './WallsColourDropDown';
import BuildingProfileDropDown from './BuildingProfileDropDown';
import {
    PREDEFINED_ROOF_LIST,
    PREDEFINED_BUILDING_COLORS,
    LYSAGHT,
    PRODUCT_CATEGORY_SKILLION_CARPORTS,
    PRODUCT_CATEGORY_SKILLION_SHEDS
} from "../../../../../constants";
import RoofsPreview from "./RoofsPreview";

const Roofs = (props) => {
    const {isSingleRoof, selectedRoof, roofColors0, roofColors1, roofColors2, handleRoofPreviewClick,
        roofProfiles0, roofProfiles1, roofProfiles2, isSingleRoofDisabled, roofColorOptions, buildingSlope,
        buildingProfiles, rollFormSupply, productCategoryId
    } = props;
    const isSkillionRoof = productCategoryId === PRODUCT_CATEGORY_SKILLION_CARPORTS ||
        productCategoryId === PRODUCT_CATEGORY_SKILLION_SHEDS;

    return (
        <Card>
            <CardHeader className="p-2">
                <strong><FormattedMessage id="app.quotes.Roofs" defaultMessage="Roofs" /></strong>
            </CardHeader>
            <CardBody className="p-2">
                <Row>
                    <Col xs="12" lg="5" className="mt-1">
                        <RoofsPreview roofColors0={roofColors0} roofColors1={roofColors1} roofColors2={roofColors2}
                                      isSkillionRoof={isSkillionRoof}
                                      handleRoofPreviewClick={handleRoofPreviewClick} />
                    </Col>

                    <Col xs="12" lg="7" className="mt-1">
                        {!isSkillionRoof ?
                            <div className="row d-flex justify-content-start pr-3">
                                <Label className="ml-1">
                                    <Field name="isSingleRoof" component="input" type="radio" value="0"
                                        disabled={isSingleRoofDisabled} />{' '}
                                    <FormattedMessage id="app.quotes.All_Roofs" defaultMessage="All" />
                                </Label>
                                {' '}
                                <Label className="ml-2">
                                    <Field name="isSingleRoof" component="input" type="radio" value="1"
                                        disabled={isSingleRoofDisabled} />{' '}
                                    <FormattedMessage id="app.quotes.Selected_Roof" defaultMessage="Selected Roof" />
                                </Label>
                                {' '}
                                {(isSingleRoof > 0) &&
                                <Field component="select" name="selectedRoof" id="selectedRoof"
                                    className="ml-1 form-control form-control-sm" style={{width: '100px', display: 'inline'}} >
                                    {PREDEFINED_ROOF_LIST.map((item, idx) =>
                                        <option key={idx} value={item.value}>{item.label}</option>
                                    )}
                                </Field>
                                }
                            </div>
                            : null
                        }

                        {(!isSingleRoof || selectedRoof === 0) &&
                        <React.Fragment>
                            <Row className="pt-1">
                                <Col xs="3">
                                    <Label className="col-form-label">
                                        <FormattedMessage id="app.quotes.Profile" defaultMessage="Profile" />
                                    </Label>
                                </Col>
                                <Col>
                                    <Field name="roofs[0].profileId" component={BuildingProfileDropDown}
                                           options={buildingProfiles.roofs}
                                    />
                                </Col>
                            </Row>
                            <Row className="pt-1">
                                <Col xs="3">
                                    <Label className="col-form-label">
                                        <FormattedMessage id="app.quotes.Colour" defaultMessage="Colour" />
                                    </Label>
                                </Col>
                                <Col xs="9">
                                    <div>
                                        <Field name="roofs[0].color" component={WallsColourDropDown}
                                               disabled={!roofProfiles0} options={roofColorOptions} />
                                    </div>
                                </Col>
                            </Row>
                        </React.Fragment>
                        }

                        {(isSingleRoof > 0 && selectedRoof === 1) &&
                        <React.Fragment>
                            <Row className="pt-1">
                                <Col xs="3">
                                    <Label className="col-form-label">
                                        <FormattedMessage id="app.quotes.Profile" defaultMessage="Profile" />
                                    </Label>
                                </Col>
                                <Col>
                                    <Field name="roofs[1].profileId" component={BuildingProfileDropDown}
                                           options={buildingProfiles.ridges}
                                    />
                                </Col>
                            </Row>
                            {roofProfiles1 === 202 && buildingSlope !== 22.5 && rollFormSupply === LYSAGHT &&
                                <Row>
                                    <Col xs = "12">
                                        <Label className = "col-form-label text-danger">
                                            <FormattedMessage id = "app.quotes.Ridge_warning_message" defaultMessage = "WARNING: Roll top ridge is ONLY available in 22.5 Deg"/>
                                        </Label>
                                    </Col>
                                </Row>
                            }
                            <Row className="pt-1">
                                <Col xs="3">
                                    <Label className="col-form-label">
                                        <FormattedMessage id="app.quotes.Colour" defaultMessage="Colour" />
                                    </Label>
                                </Col>
                                <Col xs="9">
                                    <div>
                                        <Field name="roofs[1].color" component={WallsColourDropDown}
                                               disabled={!roofProfiles1} />
                                    </div>
                                </Col>
                            </Row>
                        </React.Fragment>
                        }

                        {(isSingleRoof > 0 && selectedRoof === 2) &&
                        <React.Fragment>
                            <Row className="pt-1">
                                <Col xs="3">
                                    <Label className="col-form-label">
                                        <FormattedMessage id="app.quotes.Profile" defaultMessage="Profile" />
                                    </Label>
                                </Col>
                                <Col>
                                    <Field name="roofs[2].profileId" component={BuildingProfileDropDown}
                                           options={buildingProfiles.roofs}
                                    />
                                </Col>
                            </Row>
                            <Row className="pt-1">
                                <Col xs="3">
                                    <Label className="col-form-label">
                                        <FormattedMessage id="app.quotes.Colour" defaultMessage="Colour" />
                                    </Label>
                                </Col>
                                <Col xs="9">
                                    <div>
                                        <Field name="roofs[2].color" component={WallsColourDropDown}
                                               disabled={!roofProfiles2} options={roofColorOptions} />
                                    </div>
                                </Col>
                            </Row>
                        </React.Fragment>
                        }

                        <Row className="pt-1">
                            <Col xs="6">
                                <Label className="col-form-label">
                                    <FormattedMessage id="app.quotes.Coloured_TEKs" defaultMessage="Coloured TEKs" />
                                </Label>
                            </Col>
                            <Col xs="6" className="text-right">
                                <Field name="roofColouredTeks" id="roofColouredTeks" component="input" type="checkbox" />
                                {' '}
                                <Label className="col-form-label">
                                    <FormattedMessage id="app.quotes.Roof" defaultMessage="Roof" />
                                </Label>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                {!isSkillionRoof ?
                    <React.Fragment>
                        <hr/>
                        <Row className="d-flex justify-content-center">
                            {PREDEFINED_ROOF_LIST.map((roof, idx) => (
                                <Col key={idx} xs="4">
                                    {props['roofColors' + roof.value] &&
                                        <span>
                                            {roof.label} = {PREDEFINED_BUILDING_COLORS.find(item => item.color === props['roofColors' + roof.value]).name}
                                        </span>
                                    }
                                </Col>
                            ))}
                        </Row>
                    </React.Fragment>
                    : null
                }
            </CardBody>
        </Card>
    );
};

export default Roofs;