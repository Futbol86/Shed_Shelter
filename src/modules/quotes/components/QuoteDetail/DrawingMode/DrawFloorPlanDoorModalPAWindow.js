import React from 'react';
import {FormattedMessage} from 'react-intl';
import {Field} from 'redux-form';
import {Row, Col, Label} from 'reactstrap';
import {FieldInputPure} from "../../../../../components/common/Form";
import ColourDropDown from "../../QuoteDetail/BuildingColour/WallsColourDropDown";
import {
    QUOTES_DOOR_TYPE_IDS,
    QUOTES_WALL_TYPES_NAME,
    QUOTES_DOOR_TYPES_IN_DETAILS
} from "../../../constants";

class DrawFloorPlanDoorModalPAWindow extends React.Component {
    render(){
        const {
            selectedBayWall, currentDoorData, doorTypes, doorKits, doorColours, bayDoorColourIsWallCopied, isOpeningOnly, disabledColourIsWallCopied,
            handleBayDoorTypeChange, handleBayDoorKitChange, handleBayDoorColourChange,
        } = this.props;
        const isEndWall = (selectedBayWall && selectedBayWall.name && 
                          (selectedBayWall.name.includes(QUOTES_WALL_TYPES_NAME.left) || selectedBayWall.name.includes(QUOTES_WALL_TYPES_NAME.right)));        
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
                        <Label className="col-form-label d-flex flex-row">
                            {isOpeningOnly ? 
                                <FormattedMessage id="app.quotes.Door_Type" defaultMessage="Door Type" /> :
                                <FormattedMessage id="app.quotes.Type" defaultMessage="Type" />
                            }
                        </Label>
                    </Col>
                    <Col xs="20" md="10">
                        <Label className="col-form-label d-flex flex-row">
                            <Field component="select" name="bayDoorDoorType"
                                    className="form-control form-control-sm"
                                    //onChange={handleBayDoorTypeChange}
                            >
                                {doorTypes.map((item, idx) => {
                                    return <option key={idx} value={item.id}>{item.name}</option>;
                                })}
                            </Field>
                        </Label>
                    </Col>
                </Row>
                {doorKits && doorKits.length > 0 &&
                    <Row className = "pt-2">
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
                <Row className="pt-2 pb-2">
                    <Col xs="4" md="2">
                        <Label className="col-form-label d-flex flex-row">
                            <FormattedMessage id="app.quotes.Colour" defaultMessage="Colour" />
                        </Label>
                    </Col>
                    <Col xs="8" md="4">
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
                    <Col xs="12" md="6">
                        <Field name="bayDoorColour" component={ColourDropDown}
                            options = {doorColours} disabled = {bayDoorColourIsWallCopied}
                        />
                    </Col>
                </Row>
                {(!selectedBayWall) ? null :
                    <React.Fragment>
                        <Row className="border-top pt-2">
                            <Col xs="12" md="7">
                                <FormattedMessage id="app.quotes.Space_required_mm"
                                                defaultMessage="Space required (mm)"/>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" md="7">
                                <Row>
                                    <Col xs="5" className="ml-2">
                                        <Label className="col-form-label d-flex">
                                            <FormattedMessage id="app.quotes.Height" defaultMessage="Height"/>
                                            <Field name="bayDoorHeight" type="number" component={FieldInputPure}
                                                parse={(value) => value && parseInt(value, 10)}
                                                className="form-control form-control-sm text-right ml-1" style={{width: '80px'}}
                                                readOnly = {!isOpeningOnly &&
                                                    (currentDoorData.doorType === QUOTES_DOOR_TYPE_IDS.ACCESS_DOOR || 
                                                    currentDoorData.doorType === QUOTES_DOOR_TYPE_IDS.WINDOW)}
                                            />
                                        </Label>
                                    </Col>
                                    <Col xs="5" className="ml-2">
                                        <Label className="col-form-label d-flex">
                                            <FormattedMessage id="app.quotes.Width" defaultMessage="Width"/>
                                            <Field name="bayDoorWidth" type="number" component={FieldInputPure}
                                                parse={(value) => value && parseInt(value, 10)}
                                                className="form-control form-control-sm text-right ml-1" style={{width: '80px'}}
                                                readOnly = {!isOpeningOnly &&
                                                    (currentDoorData.doorType === QUOTES_DOOR_TYPE_IDS.ACCESS_DOOR || 
                                                    currentDoorData.doorType === QUOTES_DOOR_TYPE_IDS.WINDOW)}
                                            />
                                        </Label>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs="12" md="5">
                                <Row>
                                    <Col xs="11" className="ml-2">
                                        <Label className="col-form-label d-flex">
                                            <FormattedMessage id="app.quotes.Offset_from_grid"
                                                            values={{grid: (!isEndWall && selectedBayWall && (selectedBayWall.bayIndex + 1)) || (isEndWall && "A")}}
                                                            defaultMessage="Offset from grid {grid}"
                                            />
                                            <Field name="bayDoorOffset" type="number" component={FieldInputPure}
                                                parse={(value) => value && parseInt(value, 10)}
                                                className="form-control form-control-sm text-right ml-1" style={{width: '80px'}}
                                            />
                                        </Label>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        
                        {currentDoorData.doorType === QUOTES_DOOR_TYPE_IDS.WINDOW && currentDoorData.height < 2000 ?
                            <React.Fragment>
                                <Row className="border-top pt-2">
                                    <Col xs="12" md="7">
                                        <FormattedMessage id="app.quotes.Height_above_slab_mm"
                                                        defaultMessage="Height above slab (mm)"/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="5" className="ml-2">
                                        <Label className="col-form-label d-flex">
                                            <FormattedMessage id="app.quotes.Height" defaultMessage="Height"/>
                                            <Field name="bayDoorHeightAboveSlab" type="number" component={FieldInputPure}
                                                parse={(value) => value && parseInt(value, 10)}
                                                className="form-control form-control-sm text-right ml-1" style={{width: '80px'}}
                                            />
                                        </Label>
                                    </Col>
                                </Row>
                            </React.Fragment> :
                            null
                        }
                    </React.Fragment>
                }
            </React.Fragment>
        );
    }
}

export default DrawFloorPlanDoorModalPAWindow;