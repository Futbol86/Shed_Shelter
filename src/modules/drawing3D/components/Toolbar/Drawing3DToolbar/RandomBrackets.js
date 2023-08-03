import React, {Component, useState} from 'react';
import { Field } from 'redux-form';
import { Row, Col, Card, CardHeader, CardBody, Label, Button } from 'reactstrap';
import {FieldDropdownList, FieldInputPure} from "../../../../../components/common/Form/index";

const RandomBrackets = ({handleGenerateRandomBrackets}) => {
    return (
        <div className="animated fadeIn">
            <Card>
                <CardHeader>
                    <h4>Random Brackets</h4>
                </CardHeader>
                <CardBody>
                    <Row className="mb-2">
                        <Col xs="12">
                            <Button color="secondary" onClick={handleGenerateRandomBrackets}>
                                <i className="fa fa-file" />{` `}
                                Generate Random Brackets
                            </Button>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    );
}

export default RandomBrackets;