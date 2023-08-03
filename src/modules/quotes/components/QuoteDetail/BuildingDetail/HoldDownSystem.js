import React from 'react';
import {Card, CardHeader, CardBody, Row, Col, Label, Button} from 'reactstrap';
import {Field} from 'redux-form';
import {FormattedMessage} from 'react-intl';

import {
    PREDEFINED_BD_HOLD_DOWN_BRACKETS,
    PRODUCT_CATEGORY_SKILLION_CARPORTS,
    PRODUCT_CATEGORY_GABLE_CARPORTS
} from "../../../../../constants";
import { BASE_PLATE_TYPE } from "../../../constants";
import LightBox from "react-image-lightbox";

const HoldDownSystem = ({lightBoxIndex, handleLightBoxClick, selectedFrameSizeImage, productCategoryId}) => (
    <Card>
        <CardHeader className="p-2">
            <strong><FormattedMessage id="app.quotes.Hold_Down_System" defaultMessage="Hold Down System" /></strong>
        </CardHeader>
        <CardBody className="p-2">
            <Row>
                <Col xs="12" md={4} className="d-flex flex-row">
                    <Field component="select" name="bdHoldDown" id="bdHoldDown"
                           className="form-control form-control-sm text-right"
                    >
                        <option value="">
                            --- Bracket ---
                        </option>
                        {PREDEFINED_BD_HOLD_DOWN_BRACKETS.map((item, idx) => {
                            if (productCategoryId === PRODUCT_CATEGORY_SKILLION_CARPORTS ||
                                productCategoryId === PRODUCT_CATEGORY_GABLE_CARPORTS ||
                                (Number(item.id) !== BASE_PLATE_TYPE.CAST_IN_TUBE &&
                                Number(item.id) !== BASE_PLATE_TYPE.POST_IN_GROUND)
                            ) {
                                return <option key={idx} value={item.id}>{item.name}</option>
                            } else {
                                return null;
                            }
                        })}
                    </Field>
                </Col>
                <Col xs="12" md={8} className="d-flex flex-column justify-content-center">
                    <Label className="col-form-label text-center">
                        <FormattedMessage id="app.quotes.Typical_Design" defaultMessage="Typical Design" />
                    </Label>
                    <div className="text-center">
                        <img className="img-fluid" src={selectedFrameSizeImage}
                             onClick={()=> handleLightBoxClick(3)} style={{cursor: "pointer"}}
                        />
                        {(lightBoxIndex === 3) && (
                            <LightBox
                                reactModalStyle={{overlay: {zIndex: 9999}}}
                                mainSrc={selectedFrameSizeImage}
                                onCloseRequest={() => handleLightBoxClick(0)}
                            />
                        )}
                    </div>
                </Col>
            </Row>
        </CardBody>
    </Card>
);

export default HoldDownSystem;
