import React from 'react';
import { Row, Col } from 'reactstrap';

import DrawLeftButtonGroup from "../../components/QuoteDetail/DrawingMode/DrawLeftButtonGroup";
import DrawModeView from "../../containers/QuoteDetail/DrawingMode/DrawModeView";

const DrawingMode = ({currentButtonId, handleDrawingButtonClick, currentModalId, handleModalChange, handleBayComponentEditClick,
                         handleGoTab, submitting, invalid, pristine, error, submitSucceeded,
                         changeFieldValue, bays, buildingDetails, bayPartionWall, partitionWalls, sideWalls, isSkillionRoof,
                         setStageRef
                    }) => (
        <React.Fragment>
            <Row>
                <Col xs="2" lg="2">
                    <DrawLeftButtonGroup bays={bays} 
                        partitionWalls={partitionWalls} sideWalls={sideWalls} isSkillionRoof={isSkillionRoof}
                        bayPartionWall = {bayPartionWall} handleDrawingButtonClick={handleDrawingButtonClick}
                    />
                </Col>
                <Col xs="10" lg="10">
                    <Row>
                        <Col xs="12" lg="12">
                            <DrawModeView currentButtonId={currentButtonId} currentModalId={currentModalId}
                                          handleModalChange={handleModalChange}
                                          handleBayComponentEditClick={handleBayComponentEditClick}
                                          changeFieldValue={changeFieldValue} buildingDetails={buildingDetails}
                                          setStageRef={setStageRef}
                                          buildingDetails={buildingDetails}
                                          partitionWalls = {partitionWalls}
                                          isSkillionRoof={isSkillionRoof}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </React.Fragment>

);

export default DrawingMode;