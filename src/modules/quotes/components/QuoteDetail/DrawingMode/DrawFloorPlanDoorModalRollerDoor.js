import React from 'react';
import {FormattedMessage} from 'react-intl';
import {Field} from 'redux-form';
import {Row, Col, Label, FormGroup} from 'reactstrap';
import {FieldInputPure} from "../../../../../components/common/Form";
import ColourDropDown from "../../QuoteDetail/BuildingColour/WallsColourDropDown";
import {
    QUOTES_DOOR_RD_STEELS,
    QUOTES_DOOR_RD_SERIES,
    QUOTES_DOOR_TYPES_SUB_OPTIONS,
    QUOTES_DOOR_TYPES_IN_DETAILS,
    QUOTES_DOOR_TYPE_IDS,
    ROLLER_DOOR_PORTAL_FRAME_IDS,
    ADD_ROLLER_DOOR_OPTIONS,
    WALL_LEFT_INDEX,
    WALL_RIGHT_INDEX,
    ANNEXE_WALL_LEFT_INDEX,
    ANNEXE_WALL_RIGHT_INDEX,
    ANNEXE_LEFT_ID,
    ANNEXE_RIGHT_ID
} from "../../../constants";

class DrawFloorPlanDoorModal extends React.Component {
    render(){
        const {
            selectedBayWall, currentDoorData, activeBayDoor, doorTypes, doorKits, doorSubTypes, doorColours, mullionOptionDisabled,
            bayDoorColourIsWallCopied, hasLeftAnnexe, isOpeningOnly, disabledColourIsWallCopied,
            handleBayDoorTypeChange, handleBayDoorKitChange, handleBayDoorSubTypeChange,
            handlePortalFrameChange, handleDoorWidthChange, handleDoorHeightChange, handleIsCentreRollerDoorChange,
            handleBayDoorSteelChange, handleBayDoorColourChange, handleIsSmallMullionChange, handleNoOfDoorChange
        } = this.props;
        const isEditing = (activeBayDoor && (activeBayDoor.bayIndex>=0) && (activeBayDoor.doorIndex>=0));
        const isEndWall = selectedBayWall && !selectedBayWall.annexeIndex && (selectedBayWall.wallIndex === WALL_LEFT_INDEX || selectedBayWall.wallIndex === WALL_RIGHT_INDEX);
        const isLeftAwningEndWall = selectedBayWall && selectedBayWall.annexeIndex === ANNEXE_LEFT_ID &&
            (selectedBayWall.wallIndex === ANNEXE_WALL_LEFT_INDEX || selectedBayWall.wallIndex === ANNEXE_WALL_RIGHT_INDEX);
        const isRightAwningEndWall = selectedBayWall && selectedBayWall.annexeIndex === ANNEXE_RIGHT_ID &&
            (selectedBayWall.wallIndex === ANNEXE_WALL_LEFT_INDEX || selectedBayWall.wallIndex === ANNEXE_WALL_RIGHT_INDEX);
        const isPortalFrameUsing =  ((isEndWall || isLeftAwningEndWall || isRightAwningEndWall) &&
            currentDoorData && currentDoorData.portalFrame && currentDoorData.portalFrame !== "0");
        let isOffsetReadOnly = isPortalFrameUsing || (currentDoorData.isCentreRollerDoor &&
                                                      (isEditing || !isEndWall || 
                                                      (currentDoorData.addRollerDoorOptions === ADD_ROLLER_DOOR_OPTIONS.SINGLE_DOOR) ||
                                                      (currentDoorData.noOfIdenticalDoors === 1)));
        isOffsetReadOnly = isNaN(isOffsetReadOnly) || !isOffsetReadOnly ? false : true;

        return (
            <React.Fragment>
                {isOpeningOnly ?
                    <Row className="border-top pt-2">
                        <Col xs="4" md="2">
                            <Label className="col-form-label d-flex flex-row">
                                <FormattedMessage id="app.quotes.Type" defaultMessage="Type" />
                            </Label>
                        </Col>
                        <Col xs="20" md="10">
                            <Label className="col-form-label d-flex flex-row">
                                <Field component="select" name="bayDoorOpeningType"
                                        className="form-control form-control-sm"
                                >
                                    {QUOTES_DOOR_TYPES_IN_DETAILS.map((item, idx) => {
                                        if (item.id === QUOTES_DOOR_TYPE_IDS.OPENING_ONLY) {
                                            return <option key={idx} value={item.id}>{item.name}</option>;
                                        } else {
                                            return null;
                                        }
                                    })}
                                </Field>
                            </Label>
                        </Col>
                    </Row> :
                    null
                }
                <Row className={isOpeningOnly ? "pt-2" : "border-top pt-2"}>
                    <Col xs="4" md="2">
                        <Label className="col-form-label">
                            {isOpeningOnly ? 
                                <FormattedMessage id="app.quotes.Door_Type" defaultMessage="Door Type" /> :
                                <FormattedMessage id="app.quotes.Type" defaultMessage="Type" />
                            }
                        </Label>
                    </Col>
                    <Col xs="8" md="4">
                        <Label className="col-form-label d-flex flex-row">
                            <Field component="select" name="bayDoorDoorType"
                                    className="form-control form-control-sm"
                                    //onChange={handleBayDoorTypeChange}
                            >
                                {doorTypes.map((item, idx) =>
                                    <option key={idx} value={item.id}>{item.name}</option>
                                )}
                            </Field>
                        </Label>
                    </Col>
                    <Col xs="4" md="2">
                        <Label className="col-form-label">
                            <FormattedMessage id="app.quotes.Steel" defaultMessage="Steel" />
                        </Label>
                    </Col>
                    <Col xs="8" md="4">
                        <Label className="col-form-label d-flex flex-row">
                            <Field component="select" name="bayDoorSteel"
                                className="form-control form-control-sm"
                                onChange={handleBayDoorSteelChange}
                            >
                                <option value = "0"></option>
                                {QUOTES_DOOR_RD_STEELS.map((item, idx) =>
                                    <option key = {idx} value = {item.id}>{item.name}</option>
                                )}
                            </Field>
                        </Label>
                    </Col>
                </Row>
                
                <Row className="pb-2">
                    <Col xs="4" md="2">
                        <Label className="col-form-label">
                            <FormattedMessage id="app.quotes.Series" defaultMessage="Series" />
                        </Label>
                    </Col>
                    <Col xs="8" md="4">
                        <Label className="col-form-label d-flex flex-row">
                            <Field component="select" name="bayDoorSeries"
                                className="form-control form-control-sm" >
                                <option value="0"></option>
                                {QUOTES_DOOR_RD_SERIES.map((item, idx) => 
                                    <option key = {idx} value = {item.id}>{item.name}</option>
                                )}
                            </Field>
                        </Label>
                    </Col>
                    <Col xs="4" md="2">
                        <Label className="col-form-label">
                            <FormattedMessage id="app.quotes.Chain_Required" defaultMessage="Chain Required" />
                        </Label>
                    </Col>
                    <Col xs="8" md="4">
                        <Label className="col-form-label d-flex flex-row">
                            <Field component="select" name="bayDoorChainRequired"
                                className="form-control form-control-sm" >
                                <option value="-1"></option>
                                <option value={false}>No</option>
                                <option value={true}>Yes</option>
                            </Field>
                        </Label>
                    </Col>
                </Row>
                                       
                <Row className="pb-2">
                    <Col xs="4" md="2">
                        <Label className="col-form-label">
                            <FormattedMessage id="app.quotes.Colour" defaultMessage="Colour" />
                        </Label>
                    </Col>
                    <Col xs="12" md="6">
                        {disabledColourIsWallCopied ? null :
                        <Label className="col-form-label">
                            <Field name="bayDoorColourIsWallCopied" id="bayDoorColourIsWallCopied"
                                   component="input" type="checkbox"
                            />
                            {' '}
                            <FormattedMessage id="app.quotes.The_same_as_wall" defaultMessage="The same as wall" />
                        </Label>
                        }
                    </Col>
                    <Col xs="8" md="4">
                        <Field name="bayDoorColour" component={ColourDropDown}
                            options = {doorColours} disabled = {bayDoorColourIsWallCopied}
                        />
                    </Col>
                </Row>

                {(currentDoorData && currentDoorData.doorType && QUOTES_DOOR_TYPES_SUB_OPTIONS[currentDoorData.doorType]) &&
                    <Row className="pb-2">
                        <Col xs="4" md="2">
                            <Label className="col-form-label">
                                <FormattedMessage id="app.quotes.Sub_Type" defaultMessage="Sub Type" />
                            </Label>
                        </Col>
                        <Col xs="20" md="10">
                            <Label className="col-form-label d-flex flex-row">
                                <Field component="select" name="bayDoorDoorSubType"
                                    className="form-control form-control-sm"
                                    onChange={handleBayDoorSubTypeChange}
                                >
                                    <option value="0"></option>;
                                    {doorSubTypes.map((item, idx) => {
                                        return <option key={idx} value={item.id}>{item.name}</option>;
                                    })}
                                </Field>
                            </Label>
                        </Col>
                    </Row>
                }                    
                
                {doorKits && doorKits.length > 0 &&
                    <Row className = "pb-2">
                        <Col xs="4" md="2">
                            <Label className="col-form-label">
                                <FormattedMessage id="app.quotes.Kit" defaultMessage="Kit" />
                            </Label>
                        </Col>
                        <Col xs="20" md="10">
                            <Label className="col-form-label d-flex flex-row">
                                <Field component="select" name="bayDoorKit"
                                    className="form-control form-control-sm"
                                    onChange={handleBayDoorKitChange}
                                >
                                    <option value="0"></option>
                                    {doorKits.map((item, idx) => {
                                        return <option key={idx} value={item.id}>{item.name}</option>;
                                    })}
                                </Field>
                            </Label>
                        </Col>
                    </Row>
                }

                {(!selectedBayWall) ? null :
                    <Row className="border-top pt-2 pb-2">
                        <Col xs="14" md="7">
                            <Row>
                                <Col xs="12">
                                    <Label className="col-form-label">
                                        <FormattedMessage id="app.quotes.Space_required_mm" defaultMessage="Space required (mm)"/>
                                    </Label>
                                </Col>
                            </Row>
                            <Row className="ml-2">
                                <Col xs="5">
                                    <Label className="col-form-label d-flex">
                                        <FormattedMessage id="app.quotes.Height" defaultMessage="Height"/>
                                        <Field name="bayDoorHeight" type="number" component={FieldInputPure}
                                            parse={(value) => value && parseInt(value, 10)}
                                            className="form-control form-control-sm text-right ml-1" style={{width: '80px'}}
                                            onChange = {handleDoorHeightChange}
                                        />
                                    </Label>
                                </Col>
                                <Col xs="5">
                                    <Label className="col-form-label d-flex justify-content-end">
                                        <FormattedMessage id="app.quotes.Width" defaultMessage="Width"/>
                                        <Field name="bayDoorWidth" type="number" component={FieldInputPure}
                                            parse={(value) => value && parseInt(value, 10)}
                                            className="form-control form-control-sm text-right ml-1" style={{width: '80px'}}
                                            readOnly = {currentDoorData.portalFrame === ROLLER_DOOR_PORTAL_FRAME_IDS.BOTH_COLUMNS && 
                                                        (!currentDoorData.noOfIdenticalDoors || currentDoorData.noOfIdenticalDoors < 2)}
                                            onChange = {handleDoorWidthChange}
                                        />
                                    </Label>
                                </Col>
                            </Row>
                        </Col>
                        {(!isPortalFrameUsing && 
                            (isEditing || !isEndWall || currentDoorData.addRollerDoorOptions === ADD_ROLLER_DOOR_OPTIONS.SINGLE_DOOR || currentDoorData.noOfIdenticalDoors === 1)) &&
                            <Col xs="10" md="5">
                                <Row>
                                    <Label className="col-form-label">
                                        <Field name="isCentreRollerDoor" id="isCentreRollerDoor" component="input" type="checkbox" 
                                            onChange = {handleIsCentreRollerDoorChange}/>
                                        {' '}
                                        <FormattedMessage id="app.quotes.Centre_Of_Bay_Placement" defaultMessage="Centre of bay placement" />
                                    </Label>
                                </Row>
                                <Row className="ml-2">
                                    <Col xs="11">
                                        <Label className="col-form-label d-flex">
                                            <FormattedMessage id="app.quotes.Offset_from_grid"
                                                            values={{grid: (!isEndWall && selectedBayWall && (selectedBayWall.bayIndex + 1)) || (isEndWall && "A")}}
                                                            defaultMessage="Offset from grid {grid}"
                                            />
                                            {' '}
                                            <Field name="bayDoorOffset" type="number" component={FieldInputPure}
                                                parse={(value) => value && parseInt(value, 10)}
                                                className="form-control form-control-sm text-right ml-1" style={{width: '80px'}}
                                                readOnly = {isOffsetReadOnly}
                                            />
                                        </Label>
                                    </Col>
                                </Row>
                            </Col>
                        }
                    </Row>
                }
                
                {!mullionOptionDisabled ? 
                    <FormGroup>
                        <Row className="border-top pt-2">
                            <Col xs="12" md="7">
                                <FormattedMessage id="app.quotes.Mullion_Option" defaultMessage="Mullion Option"/>
                            </Col>
                        </Row>

                        <Row className="ml-2">
                            <Col xs="3">
                                <Label>
                                    <Field name="isDoorSmallMullion" component="input" type="radio" value="1" onChange = {handleIsSmallMullionChange}/>
                                    {' '}
                                    <FormattedMessage id="app.quotes.Small_Mullion" defaultMessage="Small Mullion" />
                                </Label>
                            </Col>
                            <Col xs="3">
                                <Label>
                                    <Field name="isDoorSmallMullion" component="input" type="radio" value="0" onChange = {handleIsSmallMullionChange}/>
                                    {' '}
                                    <FormattedMessage id="app.quotes.Large_Mullion" defaultMessage="Large Mullion" />
                                </Label>
                            </Col>
                            {currentDoorData.frameType !== "" &&
                                <Col xs="6">
                                    <Label>
                                        <FormattedMessage id="app.quotes.Mullion_Type" defaultMessage="Mullion Type" />
                                        :{' '}{currentDoorData.frameType}
                                    </Label>
                                </Col>
                            }
                        </Row>
                    </FormGroup>
                    :
                    <Row className="border-top pt-2">
                        {currentDoorData.frameType !== "" &&
                            <Col xs="6">
                                <Label>
                                    <FormattedMessage id="app.quotes.Mullion_Type" defaultMessage="Mullion Type" />
                                    :{' '}{currentDoorData.frameType}
                                </Label>
                            </Col>
                        }
                    </Row>
                }
                
                {isEndWall &&
                    <Row className="pt-2">
                        <Col xs="6" md="3">
                            <Label className="col-form-label">
                                <FormattedMessage id = "app.quotes.Portal_Frame_Using" defaultMessage = "Portal Frame Using" />
                            </Label>
                        </Col>
                        <Col xs="6" md="3">
                            <Label className="col-form-label d-flex flex-row">
                                <Field component = "select" name = "portalFrame"
                                    className="form-control form-control-sm"
                                    onChange = {handlePortalFrameChange}
                                >
                                    <option value = {0}></option>
                                    <FormattedMessage id = "app.quotes.Grid_Column"
                                            defaultMessage = "Grid {grid} Column"
                                            values={{grid: hasLeftAnnexe ? "B" : "A"}}
                                    >
                                        {message => <option value = {1}>{message}</option>}
                                    </FormattedMessage>
                                    <FormattedMessage id = "app.quotes.Grid_Column"
                                            defaultMessage = "Grid {grid} Column"
                                            values={{grid: hasLeftAnnexe ? "C" : "B"}}
                                    >
                                        {message => <option value = {2}>{message}</option>}
                                    </FormattedMessage>
                                    <FormattedMessage id = "app.quotes.Both_Columns" defaultMessage = "Both Columns">
                                        {message => <option value = {3}>{message}</option>}
                                    </FormattedMessage>
                                </Field>
                            </Label>
                        </Col>
                    </Row>
                }

                {isLeftAwningEndWall &&
                    <Row className="pt-2">
                        <Col xs="6" md="3">
                            <Label className="col-form-label">
                                <FormattedMessage id = "app.quotes.Portal_Frame_Using" defaultMessage = "Portal Frame Using" />
                            </Label>
                        </Col>
                        <Col xs="6" md="3">
                            <Label className="col-form-label d-flex flex-row">
                                <Field component = "select" name = "portalFrame"
                                    className="form-control form-control-sm"
                                    onChange = {handlePortalFrameChange}
                                >
                                    <option value = {0}></option>
                                    <FormattedMessage id = "app.quotes.Grid_Column"
                                            defaultMessage = "Grid {grid} Column"
                                            values={{grid: "A"}}
                                    >
                                        {message => <option value = {1}>{message}</option>}
                                    </FormattedMessage>
                                    {/* <FormattedMessage id = "app.quotes.Grid_Column"
                                            defaultMessage = "Grid {grid} Column"
                                            values={{grid: "B"}}
                                    >
                                        {message => <option value = {2}>{message}</option>}
                                    </FormattedMessage>
                                    <FormattedMessage id = "app.quotes.Both_Columns" defaultMessage = "Both Columns">
                                        {message => <option value = {3}>{message}</option>}
                                    </FormattedMessage> */}
                                </Field>
                            </Label>
                        </Col>
                    </Row>
                }

                {isRightAwningEndWall &&
                    <Row className="pt-2">
                        <Col xs="6" md="3">
                            <Label className="col-form-label">
                                <FormattedMessage id = "app.quotes.Portal_Frame_Using" defaultMessage = "Portal Frame Using" />
                            </Label>
                        </Col>
                        <Col xs="6" md="3">
                            <Label className="col-form-label d-flex flex-row">
                                <Field component = "select" name = "portalFrame"
                                    className="form-control form-control-sm"
                                    onChange = {handlePortalFrameChange}
                                >
                                    <option value = {0}></option>
                                    {/* <FormattedMessage id = "app.quotes.Grid_Column"
                                            defaultMessage = "Grid {grid} Column"
                                            values={{grid: hasLeftAnnexe ? "C" : "B"}}
                                    >
                                        {message => <option value = {1}>{message}</option>}
                                    </FormattedMessage> */}
                                    <FormattedMessage id = "app.quotes.Grid_Column"
                                            defaultMessage = "Grid {grid} Column"
                                            values={{grid: hasLeftAnnexe ? "D" : "C"}}
                                    >
                                        {message => <option value = {2}>{message}</option>}
                                    </FormattedMessage>
                                    {/* <FormattedMessage id = "app.quotes.Both_Columns" defaultMessage = "Both Columns">
                                        {message => <option value = {3}>{message}</option>}
                                    </FormattedMessage> */}
                                </Field>
                            </Label>
                        </Col>
                    </Row>
                }

                {isEndWall && !isEditing &&
                    <Row className = "border-top pt-2">
                        <Col xs="12" md="7">
                            <Row className = "ml-2">
                                <Label className="col-form-label">
                                    <Field name="addRollerDoorOptions" component="input" type="radio"
                                        value={1} parse={value => Number(value)} />{' '}
                                    <FormattedMessage id="app.quotes.Add_Identical_Roller_Door" defaultMessage="Add number of identical roller doors" />
                                </Label>
                            </Row>
                            <Row className = "ml-2">
                                <Label className="col-form-label">
                                    <Field name="addRollerDoorOptions" component="input" type="radio"
                                        value={2} parse={value => Number(value)} />{' '}
                                    <FormattedMessage id="app.quotes.Add_Single_Roller_Door" defaultMessage="Add single roller door" />
                                </Label>
                            </Row>
                        </Col>
                        {currentDoorData.addRollerDoorOptions === ADD_ROLLER_DOOR_OPTIONS.IDENTICAL_DOORS &&
                            <Col xs="11" md="5">
                                <Row className = "ml-2">
                                    <Label className = "col-form-label d-flex">
                                        <FormattedMessage id = "app.quotes.No_Of_Doors" defaultMessage = "No of doors" />
                                        <Field name="noOfIdenticalDoors" type="number" component={FieldInputPure}
                                                    parse={(value) => value && parseInt(value, 10)}
                                                    onChange = {handleNoOfDoorChange}
                                                    className="form-control form-control-sm text-right ml-1" style={{width: '80px'}}
                                        />
                                    </Label>
                                </Row>
                            </Col>
                        }
                    </Row>
                }
            </React.Fragment>
    
        );
    }
}

export default DrawFloorPlanDoorModal;