import React from 'react';
import {FormattedMessage} from 'react-intl';
import {Field, Form} from 'redux-form';
import {Row, Col, Label} from 'reactstrap';
import {FieldInputPure} from "../../../../../components/common/Form";
import WallType from "./WallType";
import WindowPAComponent from "./DrawFloorPlanDoorModalPAWindow";
import RollerDoorComponent from "./DrawFloorPlanDoorModalRollerDoor";
import {QUOTES_DOOR_TYPE_IDS} from "../../../constants";

class DrawFloorPlanDoorModal extends React.Component {
    render(){
        const {
            handleModalClose, wallTypesArr, selectedBayWall, currentDoorData, activeBayDoor, doorTypes, doorKits, isOpeningOnly, disabledColourIsWallCopied,
            bayDoorColourIsWallCopied, doorColours, handleBayWallChange, handleBayDoorDelete, handleBayDoorSubmit, pristine, invalid,
            handleBayDoorTypeChange, handleBayDoorKitChange, handleBayDoorColourChange
        } = this.props;
        const isEditing = (activeBayDoor && (activeBayDoor.bayIndex>=0) && (activeBayDoor.doorIndex>=0));
        const isRollerDoor = (currentDoorData && currentDoorData.doorType && currentDoorData.doorType === QUOTES_DOOR_TYPE_IDS.ROLLER_DOOR);
                
        return (
            <Form onSubmit={handleBayDoorSubmit}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">
                            <FormattedMessage id="app.quotes.Door_Window_Specifications" defaultMessage="Door/Window Specifications" />
                        </h4>
                        <button type="button" className="close" onClick={handleModalClose}>
                            <span aria-hidden="true">&times;</span>
                            <span className="sr-only">
                            <FormattedMessage id="app.Close" defaultMessage="Close" />
                        </span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <Row>
                            <Col xs={6}>
                                <button type="button" className="btn btn-default p-1" disabled={!isEditing}
                                        onClick={() => handleBayDoorDelete({bayIndex: activeBayDoor.bayIndex, doorIndex: activeBayDoor.doorIndex})}>
                                    <i className="fa fa-3x fa-window-close text-red"></i>
                                </button>
                                <button type="submit" className="btn btn-default p-1" disabled={(invalid || pristine)} title="Submit">
                                    <i className="fa fa-3x fa-check-square text-primary"></i>
                                </button>
                            </Col>
                            <Col xs={6}>
                                <Label className="col-form-label d-flex justify-content-end">
                                    <FormattedMessage id="app.quotes.Door_drawing_BOM_reference" defaultMessage="Door drawing/BOM reference" />
                                    <Field name="bayDoorBomRef" type="text" component={FieldInputPure}
                                           className="form-control form-control-sm ml-1" style={{width: '80px'}}
                                    />
                                </Label>
                            </Col>
                        </Row>

                        <WallType wallTypesArr = {wallTypesArr} selectedBayWall = {selectedBayWall} 
                                  handleBayWallChange = {handleBayWallChange} isEditing = {isEditing}
                        />
                        {!isRollerDoor &&
                            <WindowPAComponent selectedBayWall = {selectedBayWall}
                                               currentDoorData = {currentDoorData}
                                               doorTypes = {doorTypes}
                                               doorKits = {doorKits}
                                               bayDoorColourIsWallCopied = {bayDoorColourIsWallCopied}
                                               doorColours = {doorColours}
                                               isOpeningOnly = {isOpeningOnly}
                                               disabledColourIsWallCopied = {disabledColourIsWallCopied}
                                               handleBayDoorTypeChange = {handleBayDoorTypeChange}
                                               handleBayDoorKitChange = {handleBayDoorKitChange}
                                               handleBayDoorColourChange = {handleBayDoorColourChange}
                            />
                        }
                        {isRollerDoor && 
                            <RollerDoorComponent {...this.props} />
                        }
                    </div>
                    <div className="modal-footer d-flex justify-content-between">
                        <button type="button" className="btn btn-secondary" onClick={handleModalClose}>
                            <FormattedMessage id="app.Close" defaultMessage="Close" />
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={invalid || pristine}>
                            {isEditing ?
                                <FormattedMessage id="app.Update" defaultMessage="Update" />
                                :<FormattedMessage id="app.Add" defaultMessage="Add" />
                            }

                        </button>
                    </div>
                </div>
            </Form>
        );
    }
}

export default DrawFloorPlanDoorModal;