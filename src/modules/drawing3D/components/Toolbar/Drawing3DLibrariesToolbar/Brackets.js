import React, {Component, useState} from 'react';
import Modal from "react-modal";
import { Field } from 'redux-form';
import {FormattedMessage} from 'react-intl';
import { Row, Col, Card, CardHeader, CardBody, CardFooter, Button, Label } from 'reactstrap';
import {FieldDropdownList} from "../../../../../components/common/Form/index";
import {
    BRACKET_SAMPLES, APEX_PLATE_SAMPLES, KNEE_PLATE_CARPORT_GABLE_SAMPLES, KNEE_PLATE_CARPORT_SKILLION_SAMPLES,
    KNEE_PLATE_FRAME_TOPHAT_SAMPLES, KNEE_PLATE_FRAME_ZSECTION_SAMPLES, KNEE_PLATE_ROLLER_DOOR_TOPHAT_SAMPLES,
    KNEE_PLATE_ROLLER_DOOR_ZSECTION_SAMPLES, LATERAL_KNEE_BRACE_SAMPLES, OTHER_BRACKET_SAMPLES
} from "../../../constants2";
import BracketDrawingsComponent from "./BracketDrawings";

const Brackets = ({ bracketFormData, bracketDrawing, currentModalId, handleShowBracketDrawing, handleModalChange }) => {
    const listBracketSample = BRACKET_SAMPLES.map(item => { 
        return {
            name: item.name,
            code: item.code 
        }
    });

    const listApexPlateSample = Object.keys(APEX_PLATE_SAMPLES).map(key => {
        return {
            code: key
        }
    });

    const listKneePlateCarportGableSample = Object.keys(KNEE_PLATE_CARPORT_GABLE_SAMPLES).map(key => {
        return {
            code: key
        }
    });

    const listKneePlateCarportSkillionSample = Object.keys(KNEE_PLATE_CARPORT_SKILLION_SAMPLES).map(key => {
        return {
            code: key
        }
    });

    const listKneePlateFrameTophatSample = Object.keys(KNEE_PLATE_FRAME_TOPHAT_SAMPLES).map(key => {
        return {
            code: key
        }
    });

    const listKneePlateFrameZSectionSample = Object.keys(KNEE_PLATE_FRAME_ZSECTION_SAMPLES).map(key => {
        return {
            code: key
        }
    });

    const listKneePlateRollerDoorTophatSample = Object.keys(KNEE_PLATE_ROLLER_DOOR_TOPHAT_SAMPLES).map(key => {
        return {
            code: key
        }
    });

    const listKneePlateRollerDoorZSectionSample = Object.keys(KNEE_PLATE_ROLLER_DOOR_ZSECTION_SAMPLES).map(key => {
        return {
            code: key
        }
    });

    const listLateralKneeBraceSample = Object.keys(LATERAL_KNEE_BRACE_SAMPLES).map(key => {
        return {
            code: key
        }
    });

    const listOtherBracketSample = Object.keys(OTHER_BRACKET_SAMPLES).map(key => {
        return {
            code: key
        }
    });

    return (
        <div className="animated fadeIn">
            <Card>
                <CardHeader>
                    <h4>Brackets</h4>
                </CardHeader>
                <CardBody>
                    <Row className="mb-2">
                        <Col xs="12">
                            <Label className="col-form-label">
                                <b>Select Bracket Type:</b>
                            </Label>
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col xs="12">
                            <Field name="bracket" className="mb-4"
                                   textField="name" valueField="code" titleOption="-- Select Bracket Type --"
                                   data={listBracketSample}
                                   component={FieldDropdownList} />
                        </Col>
                    </Row>
                    {
                        bracketFormData &&
                        <Row className="mb-2">
                            <Col xs="12">
                                <Label className="col-form-label">
                                    <b>Select Bracket:</b>
                                </Label>
                            </Col>
                        </Row>
                    }
                    {
                        bracketFormData === "APEX-PLATE" && 
                        <Row className="mb-2">
                            <Col xs="12">
                                <Field name="apexPlateBracketSelected" className="mb-4"
                                       textField="code" titleOption="-- Select Bracket --"
                                       data={listApexPlateSample}
                                       component={FieldDropdownList} />
                            </Col>
                        </Row>
                    }
                    {
                        bracketFormData === "KNEE-PLATE-CARPORT-GABLE" && 
                        <Row className="mb-2">
                            <Col xs="12">
                                <Field name="kneePlateCarportGableSelected" className="mb-4"
                                       textField="code" titleOption="-- Select Bracket --"
                                       data={listKneePlateCarportGableSample}
                                       component={FieldDropdownList} />
                            </Col>
                        </Row>
                    }
                    {
                        bracketFormData === "KNEE-PLATE-CARPORT-SKILLION" && 
                        <Row className="mb-2">
                            <Col xs="12">
                                <Field name="kneePlateCarportSkillionSelected" className="mb-4"
                                       textField="code" titleOption="-- Select Bracket --"
                                       data={listKneePlateCarportSkillionSample}
                                       component={FieldDropdownList} />
                            </Col>
                        </Row>
                    }
                    {
                        bracketFormData === "KNEE-PLATE-FRAME-TOPHAT" && 
                        <Row className="mb-2">
                            <Col xs="12">
                                <Field name="kneePlateFrameTophatSelected" className="mb-4"
                                       textField="code" titleOption="-- Select Bracket --"
                                       data={listKneePlateFrameTophatSample}
                                       component={FieldDropdownList} />
                            </Col>
                        </Row>
                    }
                    {
                        bracketFormData === "KNEE-PLATE-FRAME-ZSECTION" && 
                        <Row className="mb-2">
                            <Col xs="12">
                                <Field name="kneePlateFrameZSectionSelected" className="mb-4"
                                       textField="code" titleOption="-- Select Bracket --"
                                       data={listKneePlateFrameZSectionSample}
                                       component={FieldDropdownList} />
                            </Col>
                        </Row>
                    }
                    {
                        bracketFormData === "KNEE-PLATE-ROLLER-DOOR-TOPHAT" && 
                        <Row className="mb-2">
                            <Col xs="12">
                                <Field name="kneePlateRollerDoorTophatSelected" className="mb-4"
                                       textField="code" titleOption="-- Select Bracket --"
                                       data={listKneePlateRollerDoorTophatSample}
                                       component={FieldDropdownList} />
                            </Col>
                        </Row>
                    }
                    {
                        bracketFormData === "KNEE-PLATE-ROLLER-DOOR-ZSECTION" && 
                        <Row className="mb-2">
                            <Col xs="12">
                                <Field name="kneePlateRollerDoorZSectionSelected" className="mb-4"
                                       textField="code" titleOption="-- Select Bracket --"
                                       data={listKneePlateRollerDoorZSectionSample}
                                       component={FieldDropdownList} />
                            </Col>
                        </Row>
                    }
                    {
                        bracketFormData === "LATERAL-KNEE-BRACE" && 
                        <Row className="mb-2">
                            <Col xs="12">
                                <Field name="lateralKneeBraceSelected" className="mb-4"
                                       textField="code" titleOption="-- Select Bracket --"
                                       data={listLateralKneeBraceSample}
                                       component={FieldDropdownList} />
                            </Col>
                        </Row>
                    }
                    {
                        bracketFormData === "OTHER-BRACKET" && 
                        <Row className="mb-2">
                            <Col xs="12">
                                <Field name="otherBracketSelected" className="mb-4"
                                       textField="code" titleOption="-- Select Bracket --"
                                       data={listOtherBracketSample}
                                       component={FieldDropdownList} />
                            </Col>
                        </Row>
                    }
                </CardBody>
                {
                    bracketDrawing && bracketDrawing.type &&
                    <CardFooter>
                        <Button color="secondary" onClick={handleShowBracketDrawing}>
                            <i className="fa fa-file" />{` `}
                            <FormattedMessage id="app.docs.Show_Drawing" defaultMessage="Show Drawing"/> {`(${bracketDrawing.type})`}
                        </Button>
                    </CardFooter>
                }
            </Card>
            <Modal className="Modal__Bootstrap modal-dialog modal-lg"
                    isOpen={(currentModalId > 0)}
                    onRequestClose={() => handleModalChange(0)}
                    contentLabel="Show Bracket Drawing"
                    style={{content: {outline: 0}}}
            >
                <BracketDrawingsComponent bracketDrawing={bracketDrawing} handleModalChange={handleModalChange}/>
            </Modal>
        </div>
    );
}

export default Brackets;