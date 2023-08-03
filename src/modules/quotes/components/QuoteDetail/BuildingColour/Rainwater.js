import React from 'react';
import {Card, CardHeader, CardBody, Row, Col, Label} from 'reactstrap';
import {Field} from 'redux-form';
import {FormattedMessage} from 'react-intl';
import WallsColourDropDown from "./WallsColourDropDown";
import {
    PREDEFINED_DOWNPIPE_LIST,
    PREDEFINED_BUILDING_PROFILES_IDS
} from "../../../../../constants";
import {FieldInputPure} from "../../../../../components/common/Form";

const Rainwater = ({rwIsGutters, rwIsDownpipes, rwIsGuttersCopied, rwIsDownpipesCopied, rwDownpipeId,
                       handleDownpipeTypeChange,
                       wallProfiles0, roofProfiles0, gutterList, downpipeList}) => {
    return (
        <Card>
            <CardHeader className="p-2">
                <strong><FormattedMessage id="app.quotes.Rainwater" defaultMessage="Rainwater" /></strong>
            </CardHeader>
            <CardBody className="p-2">
                <Row>
                    <Col xs="12" className="form-inline">
                        <Field name="rwIsGutters" id="rwIsGutters" component="input" type="checkbox" />
                        <Label className="col-form-label font-weight-bold pl-1 pr-1">
                            <FormattedMessage id="app.quotes.Gutters" defaultMessage="Gutters" />
                        </Label>
                        <Field component="select" name="rwGutterId" id="rwGutterId"
                               className="form-control form-control-sm" disabled={!rwIsGutters} >
                            <option value="0"></option>
                            {gutterList.map((item, idx) =>
                                <option key={idx} value={item.id}>{item.name}</option>
                            )}
                        </Field>
                    </Col>
                </Row>

                {rwIsGutters && (PREDEFINED_BUILDING_PROFILES_IDS.Ultra.includes(wallProfiles0)
                    || PREDEFINED_BUILDING_PROFILES_IDS.Ultra.includes(roofProfiles0)) ?
                    <Row>
                        <Col xs="12" className="offset-1">
                            <p className="text-danger mt-1 mb-1">
                                <FormattedMessage id="app.quotes.Gutters_Ultra_Product_Warning"
                                                defaultMessage="Warning: Gutters will be standard Color-bond material"/>
                            </p>
                        </Col>
                    </Row>
                    : null
                }

                <Row>
                    <Col md="2" xs="4" className="offset-1">
                        <Label className="col-form-label">
                            <FormattedMessage id="app.quotes.Colour" defaultMessage="Colour" />
                        </Label>
                    </Col>
                    <Col md="4" xs="7">
                        <Label className="col-form-label">
                            <Field name="rwIsGuttersCopied" id="rwIsGuttersCopied"
                                   disabled={!rwIsGutters} component="input" type="checkbox" />
                            {' '}
                            <FormattedMessage id="app.quotes.The_same_as_roof" defaultMessage="The same as roof" />
                        </Label>
                    </Col>
                    <Col md="5" xs="12">
                        <Field name="rwGuttersColor" component={WallsColourDropDown}
                               disabled={!rwIsGutters || rwIsGuttersCopied} />
                    </Col>
                </Row>


                <Row className="pt-2">
                    <Col xs="12" className="form-inline">
                        <Field name="rwIsDownpipes" id="rwIsDownpipes" component="input" type="checkbox" />
                        <Label className="col-form-label font-weight-bold pl-1 pr-1">
                            <FormattedMessage id="app.quotes.Downpipes" defaultMessage="Downpipes" />
                        </Label>
                        <Field component="select" name="rwDownpipeId" id="rwDownpipeId"
                               className="form-control form-control-sm" disabled={!rwIsDownpipes}
                               onChange={handleDownpipeTypeChange}
                        >
                            <option value="0"></option>
                            {downpipeList.map((item, idx) =>
                                <option key={idx} value={item.id}>{item.name}</option>
                            )}
                        </Field>
                    </Col>
                </Row>

                {rwIsDownpipes && (PREDEFINED_BUILDING_PROFILES_IDS.Ultra.includes(wallProfiles0)
                    || PREDEFINED_BUILDING_PROFILES_IDS.Ultra.includes(roofProfiles0)) ?
                    <Row>
                        <Col xs="12" className="offset-1">
                            <p className="text-danger mt-1 mb-1">
                                <FormattedMessage id="app.quotes.Downpipes_Ultra_Product_Warning"
                                                defaultMessage="Warning: Downpipes will be standard Color-bond material or PVC."/>
                            </p>
                        </Col>
                    </Row>
                    : null
                }

                <Row className="d-flex justify-content-between">
                    <Col className="col-5 offset-1 justify-content-start form-inline">
                        <div className="col-form-label pr-1">
                            <FormattedMessage id="app.quotes.Qty" defaultMessage="Qty" />
                            {' '}
                            <Field name="rwQty" type="number" component={FieldInputPure} readOnly={!rwIsDownpipes}
                                   className="form-control form-control-sm text-right" style={{width: '80px'}}
                                   parse={value => Number(value)}
                            />
                        </div>
                        {/*
                        {' '}
                        <div className="col-form-label">
                            <FormattedMessage id="app.quotes.Default" defaultMessage="Default" />
                            {' '}
                            <Field name="rwDefault" type="text" component="input" disabled={!rwIsDownpipes}
                                   className="form-control form-control-sm" style={{width: '40px'}}
                            />
                        </div>
                        */}

                    </Col>

                    {/* <Col className="col-6 justify-content-end form-inline">
                        <div className="col-form-label pr-1">
                            <FormattedMessage id="app.quotes.Side_A" defaultMessage="Side A" />
                            {' '}
                            <Field name="rwSideA" type="number" component={FieldInputPure} readOnly={!rwIsDownpipes}
                                   className="form-control form-control-sm text-right" style={{width: '60px'}}
                                   parse={value => Number(value)}
                            />
                        </div>
                        {' '}
                        <div className="col-form-label">
                            <FormattedMessage id="app.quotes.Side_B" defaultMessage="Side B" />
                            {' '}
                            <Field name="rwSideB" type="number" component={FieldInputPure} readOnly={!rwIsDownpipes}
                                   className="form-control form-control-sm text-right" style={{width: '60px'}}
                                   parse={value => Number(value)}
                            />
                        </div>
                    </Col>*/}
                </Row>
                {rwDownpipeId < 3 &&
                    <Row>
                        <Col md="2" xs="4" className="offset-1">
                            <Label className="col-form-label">
                                <FormattedMessage id="app.quotes.Colour" defaultMessage="Colour" />
                            </Label>
                        </Col>
                        <Col md="4" xs="7">
                            <Label className="col-form-label">
                                <Field name="rwIsDownpipesCopied" id="rwIsDownpipesCopied"
                                       disabled={!rwIsDownpipes} component="input" type="checkbox" />
                                {' '}
                                <FormattedMessage id="app.quotes.The_same_as_wall" defaultMessage="The same as wall" />
                            </Label>
                        </Col>
                        <Col md="5" xs="12">
                            <Field name="rwDownpipesColor" component={WallsColourDropDown}
                                   disabled={!rwIsDownpipes || rwIsDownpipesCopied} />
                        </Col>
                    </Row>
                }
            </CardBody>
        </Card>
    );
};

export default Rainwater;