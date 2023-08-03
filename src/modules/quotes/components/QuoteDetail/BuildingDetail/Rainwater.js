import React from 'react';
import {Card, CardHeader, CardBody, Row, Col, Label, Button} from 'reactstrap';
import {Field} from 'redux-form';
import LightBox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import {PREDEFINED_RAINFALL_INTENSITY} from "../../../../../constants";
import RainwaterMapImg from '../../../assets/img/AU-Rainwater-Map.png';
import {FormattedMessage} from "react-intl";

const Rainwater = ({lightBoxIndex, handleLightBoxClick}) => (
    <Card className="mb-3">
        <CardHeader className="p-2">
            <strong><FormattedMessage id="app.quotes.Rainwater" defaultMessage="Rainwater" /></strong>
        </CardHeader>
        <CardBody className="p-2">
            <Row>
                <Col xs="12" className="d-flex flex-row justify-content-between">
                    <Label>
                        <FormattedMessage id="app.quotes.Rainfall_intensity" defaultMessage="Rainfall intensity" />
                    </Label>
                    <div className="form-group d-flex flex-row mb-0">
                        <Field component="select" name="rainfallIntensity" id="rainfallIntensity"
                               className="form-control form-control-sm text-right">
                            <option value="0"></option>
                            {PREDEFINED_RAINFALL_INTENSITY.map((item, idx) =>
                                <option key={idx} value={item}>{item}</option>
                            )}
                        </Field>{' '}
                        <Label for="rainfallIntensity">
                            mm/h
                        </Label>
                    </div>
                    <div className="text-right">
                        <Button type="button" color="outline-info" className="btn-sm"
                                onClick={()=> handleLightBoxClick(1)}>
                            <FormattedMessage id="app.quotes.Rainfall_Guide" defaultMessage="Rainfall Guide" />
                        </Button>

                        {(lightBoxIndex === 1) && (
                            <LightBox
                                reactModalStyle={{overlay: {zIndex: 9999}}}
                                mainSrc={RainwaterMapImg}
                                onCloseRequest={() => handleLightBoxClick(0)}
                            />
                        )}
                    </div>
                </Col>
            </Row>
        </CardBody>
    </Card>
);

export default Rainwater;