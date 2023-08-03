import React, {Component, useState} from 'react';
import { Field } from 'redux-form';
import { Row, Col, Collapse, Card, CardHeader, CardBody, Label } from 'reactstrap';
import {FieldDropdownList} from "../../../../../components/common/Form/index";
import {WALL_CLADDING_SAMPLES} from "../../../constants";

const WallCladdings = ({}) => {
    const listWallCladdingSample = WALL_CLADDING_SAMPLES.map(item => { 
        return {
            name: item.name,
            code: item.code 
        }
    });

    return (
        <div className="animated fadeIn">
            <Card>
                <CardHeader>
                    <h4>Wall Claddings</h4>
                </CardHeader>
                <CardBody>
                    <Row className="mb-2">
                        <Col xs="12">
                            <Label className="col-form-label">
                                <b>Select Wall Cladding:</b>
                            </Label>
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col xs="12">
                            <Field name="wallCladding" className="mb-4"
                                   textField="name" valueField="code" titleOption="-- Select Wall Cladding--"
                                   data={listWallCladdingSample}
                                //    parse={(value) => value && parseFloat(value, 10)}
                                   component={FieldDropdownList} />
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    );
}

export default WallCladdings;