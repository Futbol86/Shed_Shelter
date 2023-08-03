import React from 'react';
import {Card, CardHeader, CardBody, Row, Col, Label} from 'reactstrap';
import {Field} from 'redux-form';
import {FormattedMessage} from 'react-intl';

import WallsColourDropDown from './WallsColourDropDown';
import BuildingProfileDropDown from './BuildingProfileDropDown';
import {PREDEFINED_WALL_LIST, PREDEFINED_BUILDING_COLORS} from "../../../../../constants";
import WallsPreview from "./WallsPreview";

const Walls = (props) => {
    const {isSingleWall, selectedWall, wallColors0, wallColors1, wallColors2, wallColors3, handleWallPreviewClick,
        wallProfiles0, wallProfiles1, wallProfiles2, wallProfiles3, isSingleWallDisabled, wallColorOptions,
        buildingProfiles
    } = props;
    return (
        <Card>
            <CardHeader className="p-2">
                <strong><FormattedMessage id="app.quotes.Walls" defaultMessage="Walls" /></strong>
            </CardHeader>
            <CardBody className="p-2">
                <Row>
                    <Col xs="12" lg="5" className="mt-1">
                        <WallsPreview wallColors0={wallColors0} wallColors1={wallColors1} wallColors2={wallColors2}
                                      wallColors3={wallColors3} handleWallPreviewClick={handleWallPreviewClick} />
                    </Col>

                    <Col xs="12" lg="7" className="mt-1">
                        <div className="row d-flex justify-content-start pr-3">
                            <Label className="ml-1">
                                <Field name="isSingleWall" component="input" type="radio" value="0"
                                       disabled={isSingleWallDisabled} />{' '}
                                <FormattedMessage id="app.quotes.All_Walls" defaultMessage="All Walls" />
                            </Label>
                            {' '}
                            <Label className="ml-2">
                                <Field name="isSingleWall" component="input" type="radio" value="1"
                                       disabled={isSingleWallDisabled} />{' '}
                                <FormattedMessage id="app.quotes.Selected_Wall" defaultMessage="Selected Wall" />
                            </Label>
                            {' '}
                            {(isSingleWall > 0) &&
                            <Field component="select" name="selectedWall" id="selectedWall"
                                   className="ml-1 form-control form-control-sm" style={{width: '100px', display: 'inline'}} >
                                {PREDEFINED_WALL_LIST.map((item, idx) =>
                                    <option key={idx} value={item.value}>{item.label}</option>
                                )}
                            </Field>
                            }
                        </div>

                        {(!isSingleWall || selectedWall === 0) &&
                        <React.Fragment>
                            <Row className="pt-1">
                                <Col xs="3">
                                    <Label className="col-form-label">
                                        <FormattedMessage id="app.quotes.Profile" defaultMessage="Profile" />
                                    </Label>
                                </Col>
                                <Col>
                                    <Field name="walls[0].profileId" component={BuildingProfileDropDown}
                                           options={buildingProfiles.walls}
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
                                        <Field name="walls[0].color" component={WallsColourDropDown}
                                               disabled={!wallProfiles0} options={wallColorOptions} />
                                    </div>
                                </Col>
                            </Row>
                        </React.Fragment>
                        }

                        {(isSingleWall > 0 && selectedWall === 1) &&
                        <React.Fragment>
                            <Row className="pt-1">
                                <Col xs="3">
                                    <Label className="col-form-label">
                                        <FormattedMessage id="app.quotes.Profile" defaultMessage="Profile" />
                                    </Label>
                                </Col>
                                <Col>
                                    <Field name="walls[1].profileId" component={BuildingProfileDropDown}
                                           options={buildingProfiles.walls}
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
                                        <Field name="walls[1].color" component={WallsColourDropDown}
                                               disabled={!wallProfiles1} options={wallColorOptions} />
                                    </div>
                                </Col>
                            </Row>
                        </React.Fragment>
                        }

                        {(isSingleWall > 0 && selectedWall === 2) &&
                        <React.Fragment>
                            <Row className="pt-1">
                                <Col xs="3">
                                    <Label className="col-form-label">
                                        <FormattedMessage id="app.quotes.Profile" defaultMessage="Profile" />
                                    </Label>
                                </Col>
                                <Col>
                                    <Field name="walls[2].profileId" component={BuildingProfileDropDown}
                                           options={buildingProfiles.walls}
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
                                        <Field name="walls[2].color" component={WallsColourDropDown}
                                               disabled={!wallProfiles2} options={wallColorOptions} />
                                    </div>
                                </Col>
                            </Row>
                        </React.Fragment>
                        }

                        {(isSingleWall > 0 && selectedWall === 3) &&
                        <React.Fragment>
                            <Row className="pt-1">
                                <Col xs="3">
                                    <Label className="col-form-label">
                                        <FormattedMessage id="app.quotes.Profile" defaultMessage="Profile" />
                                    </Label>
                                </Col>
                                <Col>
                                    <Field name="walls[3].profileId" component={BuildingProfileDropDown}
                                           options={buildingProfiles.walls}
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
                                        <Field name="walls[3].color" component={WallsColourDropDown}
                                               disabled={!wallProfiles3} options={wallColorOptions} />
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
                                <Field name="wallColouredTeks" id="wallColouredTeks" component="input" type="checkbox" />
                                {' '}
                                <Label className="col-form-label">
                                    <FormattedMessage id="app.quotes.Wall" defaultMessage="Wall" />
                                </Label>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <hr/>
                <Row className="d-flex justify-content-center">
                    {PREDEFINED_WALL_LIST.map((wall, idx) => (
                        <Col key={idx} xs="6">
                            {props['wallColors' + wall.value] &&
                                <span>
                                    {wall.label} = {PREDEFINED_BUILDING_COLORS.find(item => item.color === props['wallColors' + wall.value]).name}
                                </span>
                            }
                        </Col>
                    ))}
                </Row>
            </CardBody>
        </Card>
    );
};

export default Walls;