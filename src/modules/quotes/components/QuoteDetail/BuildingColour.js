import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';

import Walls from "../../containers/QuoteDetail/BuildingColour/Walls";
import Roofs from "../../containers/QuoteDetail/BuildingColour/Roofs";
import Flashings from '../../containers/QuoteDetail/BuildingColour/Flashings';
import Rainwater from '../../containers/QuoteDetail/BuildingColour/Rainwater';
import DoorsAndWindows from './BuildingColour/DoorsAndWindows';
import {PRODUCT_CATEGORY_SKILLION_CARPORTS, PRODUCT_CATEGORY_GABLE_CARPORTS} from "../../../../constants";

const BuildingColour = ({product, productCategoryId, changeFieldValue,
                            wallColors0, roofColors0, wallProfiles0, roofProfiles0
}) => (
    <React.Fragment>
        <Row>
            <Col xs="12" lg="6">
                {(productCategoryId === PRODUCT_CATEGORY_SKILLION_CARPORTS
                    ||  productCategoryId === PRODUCT_CATEGORY_GABLE_CARPORTS) ? null :
                    <Row>
                        <Col xs="12">
                            <Walls changeFieldValue={changeFieldValue} />
                        </Col>
                    </Row>
                }

                <Row>
                    <Col xs="12">
                        <Roofs changeFieldValue={changeFieldValue}
                               productCategoryId={productCategoryId}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col xs="12">
                        <Flashings wallColors0={wallColors0} roofColors0={roofColors0}
                                   productCategoryId={productCategoryId}
                                   changeFieldValue={changeFieldValue}
                        />
                    </Col>
                </Row>
            </Col>

            <Col xs="12" lg="6">
                <Row>
                    <Col xs="12">
                        <Rainwater wallColors0={wallColors0} roofColors0={roofColors0}
                                   wallProfiles0={wallProfiles0} roofProfiles0={roofProfiles0}
                                   changeFieldValue={changeFieldValue} />
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <DoorsAndWindows />
                    </Col>
                </Row>
            </Col>
        </Row>
    </React.Fragment>
);

BuildingColour.propTypes = {
    product: PropTypes.object,
    buildingDetail: PropTypes.object,
    isRollFormSelected: PropTypes.bool,
    changeFieldValue: PropTypes.func
};

export default BuildingColour;