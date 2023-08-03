import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import { FormattedMessage } from 'react-intl';

import CombinationBayPartition from "../../containers/QuoteDetail/BuildingDetail/CombinationBayPartition";
import EngineeringRange from "../../containers/QuoteDetail/BuildingDetail/EngineeringRange";
import BayConfig from "../../components/QuoteDetail/BuildingDetail/BayConfig";
import RollFormSupply from "../../components/QuoteDetail/BuildingDetail/RollFormSupply";
import Rainwater from "../../components/QuoteDetail/BuildingDetail/Rainwater";
import Region from "../../components/QuoteDetail/BuildingDetail/Region";
import Footings from "../../containers/QuoteDetail/BuildingDetail/Footings";
import HoldDownSystem from "../../containers/QuoteDetail/BuildingDetail/HoldDownSystem";
import BuildingSlope from "./BuildingDetail/BuildingSlope";
import PurlinAndGirtSelection from "../../containers/QuoteDetail/BuildingDetail/PurlinAndGirtSelection";
import KneeBraceAndCollarTie from "../../components/QuoteDetail/BuildingDetail/KneeBraceAndCollarTie";

import { getKneeBraceAndCollarTieOptionsFromProduct } from "../../selectors";

const BuildingDetail = ({bays, product, quoteDetails, productCategoryId, numberOfBays, buildingLength, regionWind,
                            selectedFrame, kneeBraceAndCollarTie, changeFieldValue, handleRollFormSupplyChange,
                            handleLengthChange, handleHeightChange, handleNumberOfBaysChange, handleBayChangeClick,
                            handleSaveDataOnFocus, handleRegionWindChange, handlePurlinAndGirtTypeChange,
                            lightBoxIndex, handleLightBoxClick, initNewRoofSkylightItems,
                            submitting, invalid, pristine, error, submitSucceeded,
                            isAdmin, isRollFormSelected, isPurlinAndGirtSelected, purlinAndGirtType
}) => {
    if (!isPurlinAndGirtSelected || !isRollFormSelected)
        return (
            <Row>
                {(isAdmin) &&
                    <Col xs="12" md="5" lg="4">
                        <RollFormSupply handleRollFormSupplyChange = {handleRollFormSupplyChange} />
                    </Col>
                }
                <Col xs="12" md="7" lg="8">
                    <PurlinAndGirtSelection productId={product && product.id}
                        changeFieldValue={changeFieldValue}
                        handlePurlinAndGirtTypeChange={handlePurlinAndGirtTypeChange}
                    />
                </Col>
            </Row>
    );

    const kneeBraceAndCollarTieOptions = getKneeBraceAndCollarTieOptionsFromProduct(product && product.id);
    return (
        <React.Fragment>
            <Row>
                <Col xs={12} lg={6}>
                    {(!kneeBraceAndCollarTieOptions || kneeBraceAndCollarTieOptions.length === 0) &&
                        <Row>
                            {(isAdmin) &&
                                <Col xs="12" md="5" lg="4">
                                    <RollFormSupply handleRollFormSupplyChange = {handleRollFormSupplyChange} />
                                </Col>
                            }
                            {(isAdmin) ?
                                <Col xs="12" md="7" lg="8">
                                    <PurlinAndGirtSelection productId={product && product.id}
                                                    changeFieldValue={changeFieldValue}
                                                    handlePurlinAndGirtTypeChange={handlePurlinAndGirtTypeChange}
                                    />
                                </Col>
                                :
                                <Col xs="12">
                                    <PurlinAndGirtSelection productId={product && product.id}
                                                    changeFieldValue={changeFieldValue}
                                                    handlePurlinAndGirtTypeChange={handlePurlinAndGirtTypeChange}
                                    />
                                </Col>
                            }
                        </Row>
                    }
                    {kneeBraceAndCollarTieOptions && kneeBraceAndCollarTieOptions.length > 0 && isAdmin &&
                        <Row>
                            <Col xs="12">
                                <RollFormSupply handleRollFormSupplyChange = {handleRollFormSupplyChange} />
                            </Col>
                        </Row>
                    }
                    {kneeBraceAndCollarTieOptions && kneeBraceAndCollarTieOptions.length > 0 &&
                        <Row>
                            <Col xs="12" md="6">
                                <PurlinAndGirtSelection productId={product && product.id}
                                                changeFieldValue={changeFieldValue}
                                                handlePurlinAndGirtTypeChange={handlePurlinAndGirtTypeChange}
                                />
                            </Col>
                            <Col xs="12" md="6">
                                <KneeBraceAndCollarTie kneeBraceAndCollarTieOptions = {kneeBraceAndCollarTieOptions}
                                    kneeBraceAndCollarTie = {kneeBraceAndCollarTie}
                                    productCategoryId = {productCategoryId}
                                />
                            </Col>
                        </Row>
                    }
                    <Row>
                        <Col xs="12">
                            <EngineeringRange product={product} purlinAndGirtType={purlinAndGirtType}
                                              productCategoryId={productCategoryId}
                                              handleLengthChange={handleLengthChange}
                                              handleHeightChange={handleHeightChange}
                                              handleSaveDataOnFocus={handleSaveDataOnFocus}
                                              changeFieldValue={changeFieldValue}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12">
                            <BayConfig productParams={product && product.params} productId={product && product.id}
                                       purlinAndGirtType={purlinAndGirtType}
                                       changeFieldValue={changeFieldValue}
                                       handleNumberOfBaysChange={handleNumberOfBaysChange}
                                       handleBayChangeClick={handleBayChangeClick}
                                       handleSaveDataOnFocus={handleSaveDataOnFocus}
                                       numberOfBays={numberOfBays} buildingLength={buildingLength}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12">
                            <Card>
                                <CardHeader className="p-2">
                                    <strong><FormattedMessage id="app.quotes.Combination" defaultMessage="Combination" /></strong>
                                </CardHeader>
                                <CardBody style={{backgroundColor: 'lightgray'}}>
                                    <Row>
                                        <Col xs="12">
                                            <CombinationBayPartition productCategoryId={productCategoryId}
                                                                     bays={bays} changeFieldValue={changeFieldValue}
                                                                     initNewRoofSkylightItems={initNewRoofSkylightItems}
                                                                     selectedFrame={selectedFrame}
                                                                     purlinAndGirtType={purlinAndGirtType}
                                                                     editableAnnexe={true}/>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Col>

                <Col xs={12} lg={6}>
                    <Row>
                        <Col xs="12" md="7" className="pr-1">
                            <Rainwater lightBoxIndex={lightBoxIndex} handleLightBoxClick={handleLightBoxClick}/>
                        </Col>

                        <Col xs="12" md="5">
                            <BuildingSlope productId={product && product.id} />
                        </Col>

                    </Row>
                    <Row>
                        <Col xs="12">
                            <Region lightBoxIndex={lightBoxIndex} handleLightBoxClick={handleLightBoxClick}
                                    handleRegionWindChange = {handleRegionWindChange} regionWind = {regionWind}
                                    productCategoryId={productCategoryId}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12">
                            <Footings changeFieldValue={changeFieldValue}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12">
                            <HoldDownSystem productCategoryId={productCategoryId}
                                            lightBoxIndex={lightBoxIndex} handleLightBoxClick={handleLightBoxClick}
                                            selectedFrame = {selectedFrame}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </React.Fragment>
    );
};

BuildingDetail.propTypes = {
    product: PropTypes.object,
    buildingDetail: PropTypes.object,
    isRollFormSelected: PropTypes.bool,
    changeFieldValue: PropTypes.func
};

export default BuildingDetail;