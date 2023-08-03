import React, {Component} from 'react';
import {Row, Col, Button} from 'reactstrap';

import PurlinAndGirtComponent from './Drawing3DLibrariesToolbar/PurlinAndGirts';
import WallCladdingsComponent from './Drawing3DLibrariesToolbar/WallCladdings';
import BracketsComponent from './Drawing3DLibrariesToolbar/Brackets';
import FlashingsComponent from './Drawing3DLibrariesToolbar/Flashings';
import BasePlatesComponent from './Drawing3DLibrariesToolbar/BasePlates';
import BrigingApexPlatesComponent from './Drawing3DLibrariesToolbar/BrigingApexPlate';
import AwningsComponent from './Drawing3DLibrariesToolbar/Awnings';
import RandomBracketsComponent from './Drawing3DToolbar/RandomBrackets';
import RandomBracketFiltersComponent from './Drawing3DToolbar/RandomBracketFilters';
import BoltAndNutSettingComponent from './Drawing3DLibrariesToolbar/BoltAndNutSetting';

const Drawing3DLibrariesToolBar = ({
    purlinAndGirt, bracketFormData, bracketDrawing, flashingDrawing, 
    basePlateDrawing, brigingApexPlateDrawing, awningDrawing, currentModalId, 
    handleShowBracketDrawing, handleShowFlashingDrawing, handleShowBasePlateDrawing, handleShowBrigingApexPlateDrawing, handleShowAwningDrawing,
    handleGenerateRandomBrackets, handleModalChange,
    generateBoltAndNut
}) => {
    return (
        <React.Fragment>
            {/* <Row className="mb-2">
                <Col xs={12}>
                    <PurlinAndGirtComponent purlinAndGirt={purlinAndGirt}/>
                </Col>
            </Row>
            <Row className="mb-2">
                <Col xs={12}>
                    <WallCladdingsComponent />
                </Col>
            </Row> */}
            {/* <Row className="mb-2">
                <Col xs={12}>
                    <BracketsComponent currentModalId={currentModalId} bracketFormData={bracketFormData} bracketDrawing={bracketDrawing}
                                       handleShowBracketDrawing={handleShowBracketDrawing}
                                       handleModalChange={handleModalChange}/>
                </Col>
            </Row>
            <Row className="mb-2">
                <Col xs={12}>
                    <FlashingsComponent currentModalId={currentModalId} flashingDrawing={flashingDrawing}
                                       handleShowFlashingDrawing={handleShowFlashingDrawing}
                                       handleModalChange={handleModalChange}/>
                </Col>
            </Row> */}
            {/* <Row className="mb-2">
                <Col xs={12}>
                    <BasePlatesComponent currentModalId={currentModalId} basePlateDrawing={basePlateDrawing}
                                         handleShowBasePlateDrawing={handleShowBasePlateDrawing}
                                         handleModalChange={handleModalChange}/>
                </Col>
            </Row> */}
            {/* <Row className="mb-2">
                <Col xs={12}>
                    <BrigingApexPlatesComponent currentModalId={currentModalId} brigingApexPlateDrawing={brigingApexPlateDrawing}
                                                handleShowBrigingApexPlateDrawing={handleShowBrigingApexPlateDrawing}
                                                handleModalChange={handleModalChange}/>
                </Col>
            </Row> */}
            {/* <Row className="mb-2">
                <Col xs={12}>
                    <AwningsComponent currentModalId={currentModalId} awningDrawing={awningDrawing}
                                      handleShowAwningDrawing={handleShowAwningDrawing} handleModalChange={handleModalChange}/>
                </Col>
            </Row>
            <Row className="mb-2">
                <Col xs={12}>
                    <RandomBracketsComponent handleGenerateRandomBrackets={handleGenerateRandomBrackets} />
                </Col>
            </Row> */}
            <Row className="mb-2">
                <Col xs={12}>
                    <BoltAndNutSettingComponent generateBoltAndNut={generateBoltAndNut} />
                </Col>
            </Row>
        </React.Fragment>
    );
}

export default Drawing3DLibrariesToolBar;