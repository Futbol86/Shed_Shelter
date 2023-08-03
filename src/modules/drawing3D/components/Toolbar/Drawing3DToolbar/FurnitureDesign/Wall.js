import React, {Component} from 'react';
// import { Field } from "redux-form";
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import { Form, Row, Col, Button} from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { FURNITURE_NORMAL_OPTION, FURNITURE_DRAW_WALL_OPTION, } from '../../../../constants';

import WallInfoComponent from './WallInfo';
import WallSettingContainer from '../../../../containers/Toolbar/Drawing3DToolbar/FurnitureDesign/Wall/WallSetting';
import AddDoorsContainer from '../../../../containers/Toolbar/Drawing3DToolbar/FurnitureDesign/Wall/AddDoors';

class WallComponent extends Component {
    render() {
        const {
            furnitureDrawingType, selectedWall, isEnableUndoButton, isViewDetail,
            wallTypeFormData, wallHeightTypeFormData, wallHeightFormData, studSizeFormData, studDistanceFormData, 
            wallCladdingTypeFormData, wallCladdingMaterialFormData, externWallCladdingFormData,
            doSetFurnitureDrawingType, undoDrawWall, removeFurnitureWall, duplicateFurnitureWall, 
            deSelectedWall, addWallDoor, 
        } = this.props;
        
        const isDisabledDrawWallButton = 
            !wallTypeFormData || !wallHeightTypeFormData || !wallHeightFormData ||
            !studSizeFormData || !studDistanceFormData || !wallCladdingTypeFormData || 
            !wallCladdingMaterialFormData || !externWallCladdingFormData;

        return (
            <React.Fragment>
                {
                    //!(selectedWall && isViewDetail) &&
                    !selectedWall &&
                    <div>
                        <Row>
                            <Col md={12} xs={12} className="d-flex flex-wrap justify-content-center">
                                {
                                    furnitureDrawingType === FURNITURE_NORMAL_OPTION &&
                                    <Button color={furnitureDrawingType === FURNITURE_DRAW_WALL_OPTION ? "primary" : ""} 
                                            disabled={isDisabledDrawWallButton}
                                            onClick={() => doSetFurnitureDrawingType(FURNITURE_DRAW_WALL_OPTION)}>
                                        <img src={`/assets/furnitures/icons/toolbars/wall.png`} style={{zIndex: -100}} 
                                            className="img-fluid" title="Draw Wall (short key: D)"/> 
                                        <br /> <FormattedMessage id="app.drawing3D.Draw" defaultMessage="Draw"/>
                                    </Button>
                                }
                                {
                                    furnitureDrawingType === FURNITURE_DRAW_WALL_OPTION &&
                                    <Button color="" onClick={() => doSetFurnitureDrawingType(FURNITURE_NORMAL_OPTION)}>
                                        <img src={`/assets/furnitures/icons/toolbars/logout.png`} style={{zIndex: -100}} 
                                            className="img-fluid" title="Exit Draw (short key: Esc or N)"/> 
                                        <br /> <FormattedMessage id="app.drawing3D.Exit" defaultMessage="Exit"/>
                                    </Button>
                                }
                                {
                                    furnitureDrawingType === FURNITURE_DRAW_WALL_OPTION && isEnableUndoButton &&
                                    <Button color="" onClick={() => undoDrawWall()}>
                                        <img src={`/assets/furnitures/icons/toolbars/undo.png`} style={{zIndex: -100}} 
                                            className="img-fluid" title="Undo (Ctrl+Z)"/> 
                                        <br /> <FormattedMessage id="app.drawing3D.Undo" defaultMessage="Undo"/>
                                    </Button>
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12} xs={12}>
                                <WallSettingContainer />
                            </Col>
                        </Row>
                    </div>
                }
                {
                    // selectedWall && isViewDetail &&
                    selectedWall &&
                    <React.Fragment>
                        <Row className="mt-2">
                            <Col md={12} className="d-flex justify-content-center">
                                <Button color="" onClick={deSelectedWall}>
                                    <img src={`/assets/furnitures/icons/toolbars/back.png`} 
                                        style={{zIndex: -100}} className="img-fluid" title='Back'/> 
                                    <br /> <FormattedMessage id="app.drawing3D.Back" defaultMessage="Back"/>
                                </Button>

                                <Button color="" onClick={duplicateFurnitureWall}>
                                    <img src={`/assets/furnitures/icons/toolbars/duplicate.png`} 
                                        style={{zIndex: -100}} className="img-fluid" title='Duplicate'/> 
                                    <br /> <FormattedMessage id="app.drawing3D.Duplicate" defaultMessage="Duplicate"/>
                                </Button>
                                <Button color="" onClick={removeFurnitureWall} className="ml-2">
                                    <img src={`/assets/furnitures/icons/toolbars/remove.png`} 
                                        style={{zIndex: -100}} className="img-fluid" title='Remove'/> 
                                    <br /> <FormattedMessage id="app.drawing3D.Remove" defaultMessage="Remove"/>
                                </Button>
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col md={12} xs={12}>
                                <AddDoorsContainer addWallDoor={addWallDoor} />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12} xs={12}>
                                <WallInfoComponent selectedWall={selectedWall} />
                            </Col>
                        </Row>
                    </React.Fragment>
                }
            </React.Fragment>
        )
    }
};

export default WallComponent;