import React, {Component, useState} from 'react';
import { Field } from 'redux-form';
import { Row, Col, Collapse, Card, CardHeader, CardBody, Label } from 'reactstrap';
import {FieldDropdownList} from "../../../../../components/common/Form/index";
import FieldLevelValidation from "../../../../../components/common/Form/FieldLevelValidation";
import {PREDEFINED_ROLL_FORM_SUPPLY} from "../../../../../constants";
import {PURLIN_GIRT_SECTION_TYPE, PURLIN_GIRT_C_SECTIONS, PURLIN_GIRT_Z_SECTIONS, PURLIN_GIRT_TS_SECTIONS} from "../../../constants";

const PurlinAndGirts = ({purlinAndGirt = {}}) => {
    const {purlinGirtSectionType, rollForm, isAddPunching} = purlinAndGirt;
    let purlinGirtSectionList = [];

    switch(purlinGirtSectionType) {
        case 1: 
            purlinGirtSectionList = PURLIN_GIRT_C_SECTIONS[rollForm];
            break;
        
        case 2: 
            purlinGirtSectionList = PURLIN_GIRT_Z_SECTIONS[rollForm];
            break;

        case 3: 
            purlinGirtSectionList = PURLIN_GIRT_TS_SECTIONS[rollForm];
            break;
    }

    return (
        <div className="animated fadeIn">
            <Card>
                <CardHeader>
                    <h4>Purlin And Girts</h4>
                </CardHeader>
                <CardBody>
                <Row className="mb-2">
                    <Col xs="12">
                        <Label className="col-form-label">
                            <strong>Purlin and Girt Section Types:</strong>
                        </Label>
                    </Col>
                    <Col xs="12">
                        <Field
                            name="purlinAndGirt.purlinGirtSectionType"
                            component={FieldDropdownList}
                            data={PURLIN_GIRT_SECTION_TYPE}
                            valueField="id"
                            textField="name"
                            titleOption="--- Select ---"
                            validate={FieldLevelValidation.validateRequired} 
                            parse={(value) => value && parseInt(value, 10)}
                            className="form-control-sm pt-1"
                        />
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col xs="12">
                        <Label className="col-form-label">
                            <strong>Roll Forms:</strong>
                        </Label>
                    </Col>
                    <Col xs="12">
                        <Field
                            name="purlinAndGirt.rollForm"
                            component={FieldDropdownList}
                            data={PREDEFINED_ROLL_FORM_SUPPLY}
                            valueField="id"
                            textField="name"
                            titleOption="--- Select ---"
                            validate={FieldLevelValidation.validateRequired} 
                            className="form-control-sm pt-1"
                        />
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col xs="12">
                        <Label className="col-form-label">
                            <strong>Purlin and Girt Sections:</strong>
                        </Label>
                    </Col>
                    <Col xs="12">
                        <Field
                            name="purlinAndGirt.purlinGirtSection"
                            component={FieldDropdownList}
                            data={purlinGirtSectionList}
                            valueField="purlinGirtCode"
                            textField="purlinGirtCode"
                            titleOption="--- Select ---"
                            validate={FieldLevelValidation.validateRequired}
                            className="form-control-sm pt-1"
                        />
                    </Col>
                </Row>
                </CardBody>
            </Card>
        </div>
    );
}

export default PurlinAndGirts;