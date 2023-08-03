import React from 'react';
import {Row, Col, Label} from 'reactstrap';
import {Field, Form} from 'redux-form';
import {FormattedMessage} from 'react-intl';
import { BRACE_ADDING_MODES, BRACE_ADDING_MODE_IDS } from "../../../constants";
import {FieldInputPure} from "../../../../../components/common/Form";
import WallType from "./WallType";
import WallBrace from "./WallBrace";
import RoofBrace from "./RoofBrace";
class DrawFloorPlanBraceModal extends React.Component {
    render(){
        const { wallTypesArr, selectedBayWall, activeWallBrace, activeRoofBrace, 
                isEndWall, isLeftAwningEndWall, isRightAwningEndWall, isRoofOnly, endWallOffsetArr, hasLeftAnnexe, isEditing,
                handleBraceSubmit, handleModalClose, handleBayWallChange, handleOffsetChange,
                handleWallBraceTypeChange, handleRoofBraceTypeChange, handleWallBraceLocationChange,
                braceAddingMode, pristine, invalid, rollFormSupply} = this.props;
        
        return(
            <Form onSubmit = {handleBraceSubmit}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">
                            <FormattedMessage id="app.quotes.Cross_Brace_Specifications" defaultMessage="Cross Brace Specifications" />
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
                            <Col xs={12} md={6}>
                                <FormattedMessage id="app.quotes.Bracing_Required" defaultMessage="Bracing Required"/>
                            </Col>
                        </Row>
                        <Row className = "ml-2">
                            <Col xs={4}>
                                <Label className="col-form-label d-flex flex-row justify-content-between">
                                    <span>
                                        <FormattedMessage id="app.quotes.End_Wall" defaultMessage="End Wall"/>
                                    </span>
                                    <Field type="text" component={FieldInputPure} readOnly={true}
                                        name='ewBraceRequired' style={{width: '100px'}}
                                        className="form-control form-control-sm text-right ml-1"
                                    />
                                </Label>
                            </Col>
                            <Col xs={4}>
                                <Label className="col-form-label d-flex flex-row justify-content-between">
                                    <span>
                                        <FormattedMessage id="app.quotes.Side_Wall" defaultMessage="Side Wall"/>
                                    </span>
                                    <Field type="text" component={FieldInputPure} readOnly={true}
                                        name='swBraceRequired' style={{width: '100px'}}
                                        className="form-control form-control-sm text-right ml-1"
                                    />
                                </Label>
                            </Col>
                            <Col xs={4}>
                                <Label className="col-form-label d-flex flex-row justify-content-between">
                                    <span>
                                        <FormattedMessage id="app.quotes.Roof" defaultMessage="Roof"/>
                                    </span>
                                    <Field type="text" component={FieldInputPure} readOnly={true}
                                        name='rBraceRequired' style={{width: '100px'}}
                                        className="form-control form-control-sm text-right ml-1"
                                    />
                                </Label>
                            </Col>
                        </Row>                         
                        <Row className="border-top pt-2">
                            <Col xs={12} md={6}>
                                <FormattedMessage id="app.quotes.Brace_Adding_Mode" defaultMessage="Brace Adding Mode" />
                            </Col>
                        </Row>
                        <Row className="ml-2">
                            <Col xs={8} md={4}>
                                <Label className="col-form-label d-flex flex-row justify-content-between">
                                    <span>
                                        <FormattedMessage id="app.quotes.Mode" defaultMessage="Mode"/>
                                    </span>
                                    <Field component="select" name="braceAddingMode" style={{width: '150px'}}
                                        parse={(value) => value && parseInt(value, 10)}
                                        disabled = {true} /* TO DO: change to disabled = {activeWallBrace || activeRoofBrace} */
                                        className="form-control form-control-sm text-left ml-0">
                                        {BRACE_ADDING_MODES.map((item, idx) =>
                                            <option key={idx} value={item.id}>{item.mode}</option>
                                        )}
                                    </Field>
                                </Label>
                            </Col>
                        </Row>
                        {braceAddingMode === BRACE_ADDING_MODE_IDS.MANUAL &&
                            <React.Fragment>
                                <Row className="border-top pt-2">
                                    <Col xs={12} md={6}>
                                        <FormattedMessage id="app.quotes.Bay_Select" defaultMessage="Bay Select"/>
                                    </Col>
                                </Row>
                                <Row className="ml-2">
                                    <Col>
                                        <WallType   wallTypesArr = {wallTypesArr} selectedBayWall = {selectedBayWall} braceUse = {true}
                                                    isEditing = {isEditing && (activeWallBrace || activeRoofBrace)}
                                                    isEndWall = {isEndWall} isLeftAwningEndWall = {isLeftAwningEndWall} isRightAwningEndWall = {isRightAwningEndWall}
                                                    endWallOffsetArr = {endWallOffsetArr} hasLeftAnnexe = {hasLeftAnnexe}
                                                    handleBayWallChange = {handleBayWallChange} handleOffsetChange = {handleOffsetChange}
                                        />
                                    </Col>
                                </Row>
                                <Row className="border-top pt-2">
                                    <Col xs={12} md={6}>
                                        <FormattedMessage id="app.quotes.Brace_Select" defaultMessage="Brace Select"/>
                                    </Col>
                                </Row>
                                <Row className="ml-2">
                                    {!isRoofOnly &&
                                        <Col xs={8} md={4}>
                                            <WallBrace isEndWall = {isEndWall}
                                                    isLeftAwningEndWall = {isLeftAwningEndWall} isRightAwningEndWall = {isRightAwningEndWall}
                                                    handleWallBraceTypeChange = {handleWallBraceTypeChange}
                                                    handleWallBraceLocationChange = {handleWallBraceLocationChange}
                                                    rollFormSupply={rollFormSupply}
                                           />
                                        </Col>
                                    }
                                    {!isRoofOnly && <Col xs={8} md={4}/>}
                                    {!isEndWall && !isLeftAwningEndWall && !isRightAwningEndWall &&
                                        <Col xs={8} md={4}>
                                            <RoofBrace handleRoofBraceTypeChange = {handleRoofBraceTypeChange} rollFormSupply={rollFormSupply}/>
                                        </Col>
                                    }
                                </Row>
                            </React.Fragment>
                        }
                    </div>
                    <div className="modal-footer d-flex justify-content-between">
                        <button type="button" className="btn btn-secondary" onClick={handleModalClose}>
                            <FormattedMessage id="app.Close" defaultMessage="Close" />
                        </button>
                        <button type="submit" className="btn btn-primary" 
                            disabled = {(pristine || invalid) && (braceAddingMode === BRACE_ADDING_MODE_IDS.MANUAL)} 
                        >
                            {!isEditing || (braceAddingMode === BRACE_ADDING_MODE_IDS.AUTO) ?
                                <FormattedMessage id="app.Add" defaultMessage="Add" /> 
                                :<FormattedMessage id="app.Update" defaultMessage="Update" />
                            }
                        </button>
                    </div>
                </div>
            </Form>
        );
    }
}

export default DrawFloorPlanBraceModal;