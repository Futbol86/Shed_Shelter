import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import Insulation from "./OtherAccessories/Insulation";
import Ventilation from "../../containers/QuoteDetail/OtherAccessories/Ventilation";
import Skylights from  "../../containers/QuoteDetail/OtherAccessories/Skylights";
import Vermin from "../../containers/QuoteDetail/OtherAccessories/Vermin";
import {PRODUCT_CATEGORY_SKILLION_CARPORTS, PRODUCT_CATEGORY_GABLE_CARPORTS} from "../../../../constants";

const OtherAccessories = ({productCategoryId, buildingLength, changeFieldValue, skylightGarageRoofs, buildingInsulations}) => (
    <React.Fragment>
        <Row>
            <Col xs="12" lg="6">
                <Insulation buildingInsulations = {buildingInsulations}/>
            </Col>

            <Col xs="12" lg="6">
                <Skylights buildingLength={buildingLength} changeFieldValue={changeFieldValue}
                           skylightGarageRoofs={skylightGarageRoofs}
                           productCategoryId={productCategoryId}
                />
            </Col>

            {(productCategoryId === PRODUCT_CATEGORY_SKILLION_CARPORTS ||
                productCategoryId === PRODUCT_CATEGORY_GABLE_CARPORTS) ? null
                :
            <Col xs="12" lg="6">
                <Ventilation changeFieldValue={changeFieldValue}/>
            </Col>
            }

            <Col xs="12" lg="6">
                <Vermin changeFieldValue={changeFieldValue} />

            </Col>
        </Row>
    </React.Fragment>
);

OtherAccessories.propTypes = {
    changeFieldValue: PropTypes.func,
    handleGoTab: PropTypes.func
};

export default OtherAccessories;