import React, {Component, useState} from 'react';
import Modal from "react-modal";
import { Field } from 'redux-form';
import {FormattedMessage} from 'react-intl';
import { Row, Col, Card, CardHeader, CardBody, CardFooter, Button, Label } from 'reactstrap';
import {FieldDropdownList} from "../../../../../components/common/Form/index";
import { 
    BRIGING_APEX_PLATE_SINGLE_SECTIONS_TOP_HAT_SAMPLES, BRIGING_APEX_PLATE_SINGLE_SECTIONS_Z_SECTION_SAMPLES,
    BRIGING_APEX_PLATE_DOUBLE_SECTIONS_TOP_HAT_SAMPLES, BRIGING_APEX_PLATE_DOUBLE_SECTIONS_Z_SECTION_SAMPLES
} from "../../../constants2";
import BrigingApexPlateDrawingsComponent from "./BrigingApexPlateDrawings";

const BrigingApexPlates = ({ brigingApexPlateDrawing, currentModalId, handleShowBrigingApexPlateDrawing, handleModalChange }) => {
    const listBrigingApexPlateSSTopHatSample = Object.keys(BRIGING_APEX_PLATE_SINGLE_SECTIONS_TOP_HAT_SAMPLES).map(key => {
        return {
            code: key
        }
    });

    const listBrigingApexPlateSSZSectionSample = Object.keys(BRIGING_APEX_PLATE_SINGLE_SECTIONS_Z_SECTION_SAMPLES).map(key => {
        return {
            code: key
        }
    });

    const listBrigingApexPlateDSTopHatSample = Object.keys(BRIGING_APEX_PLATE_DOUBLE_SECTIONS_TOP_HAT_SAMPLES).map(key => {
        return {
            code: key
        }
    });

    const listBrigingApexPlateDSZSectionSample = Object.keys(BRIGING_APEX_PLATE_DOUBLE_SECTIONS_Z_SECTION_SAMPLES).map(key => {
        return {
            code: key
        }
    });

    return (
        <div className="animated fadeIn">
            <Card>
                <CardHeader>
                    <h4>Briging Apex Plates</h4>
                </CardHeader>
                <CardBody>
                    <Row className="mb-2">
                        <Col xs="12">
                            <Label className="col-form-label">
                                <b>Select Briging Apex Plate (Single Sections/Top Hat):</b>
                            </Label>
                        </Col>
                        <Col xs="12">
                            <Field name="brigingApexPlateSSTopHatSelected" className="mb-4"
                                   textField="code" titleOption="-- Select Briging Apex Plate (Single Sections/Top Hat) --"
                                   data={listBrigingApexPlateSSTopHatSample}
                                   component={FieldDropdownList} />
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col xs="12">
                            <Label className="col-form-label">
                                <b>Select Briging Apex Plate (Single Sections/Z Section):</b>
                            </Label>
                        </Col>
                        <Col xs="12">
                            <Field name="brigingApexPlateSSZSectionSelected" className="mb-4"
                                   textField="code" titleOption="-- Select Briging Apex Plate (Single Sections/Z Section) --"
                                   data={listBrigingApexPlateSSZSectionSample}
                                   component={FieldDropdownList} />
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col xs="12">
                            <Label className="col-form-label">
                                <b>Select Briging Apex Plate (Double Sections/Top Hat):</b>
                            </Label>
                        </Col>
                        <Col xs="12">
                            <Field name="brigingApexPlateDSTopHatSelected" className="mb-4"
                                   textField="code" titleOption="-- Select Briging Apex Plate (Double Sections/Top Hat) --"
                                   data={listBrigingApexPlateDSTopHatSample}
                                   component={FieldDropdownList} />
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col xs="12">
                            <Label className="col-form-label">
                                <b>Select Briging Apex Plate (Double Sections/Z Section):</b>
                            </Label>
                        </Col>
                        <Col xs="12">
                            <Field name="brigingApexPlateDSZSectionSelected" className="mb-4"
                                   textField="code" titleOption="-- Select Briging Apex Plate (Double Sections/Z Section) --"
                                   data={listBrigingApexPlateDSZSectionSample}
                                   component={FieldDropdownList} />
                        </Col>
                    </Row>
                </CardBody>
                {
                    brigingApexPlateDrawing && brigingApexPlateDrawing.type &&
                    <CardFooter>
                        <Button color="secondary" onClick={handleShowBrigingApexPlateDrawing}>
                            <i className="fa fa-file" />{` `}
                            <FormattedMessage id="app.docs.Show_Drawing" defaultMessage="Show Drawing"/> {`(${brigingApexPlateDrawing.type})`}
                        </Button>
                    </CardFooter>
                }
            </Card>
            <Modal className="Modal__Bootstrap modal-dialog modal-lg"
                    isOpen={(currentModalId === 2)}
                    onRequestClose={() => handleModalChange(0)}
                    contentLabel="Show Base Plate Drawing"
                    style={{content: {outline: 0}}}
            >
                <BrigingApexPlateDrawingsComponent brigingApexPlateDrawing={brigingApexPlateDrawing} handleModalChange={handleModalChange}/>
            </Modal>
        </div>
    );
}

export default BrigingApexPlates;