import React, {Component, useState} from 'react';
import Modal from "react-modal";
import { Field } from 'redux-form';
import {FormattedMessage} from 'react-intl';
import { Row, Col, Card, CardHeader, CardBody, CardFooter, Button, Label } from 'reactstrap';
import {FieldDropdownList} from "../../../../../components/common/Form/index";
import { AWNING_DAB_SAMPLES, AWNING_IAB_SAMPLES } from "../../../constants3";
import AwningDrawingsComponent from "./AwningDrawings";

const Awnings = ({awningDrawing, currentModalId, handleShowAwningDrawing, handleModalChange }) => {
    const listAwningDABSample = Object.keys(AWNING_DAB_SAMPLES).map(key => {
        return {
            code: key
        }
    });

    const listAwningIABSample = Object.keys(AWNING_IAB_SAMPLES).map(key => {
        return {
            code: key
        }
    });

    return (
        <div className="animated fadeIn">
            <Card>
                <CardHeader>
                    <h4>Awnings</h4>
                </CardHeader>
                <CardBody>
                    <Row className="mb-2">
                        <Col xs="12">
                            <Label className="col-form-label">
                                <b>Select Awaning (DAB):</b>
                            </Label>
                        </Col>
                        <Col xs="12">
                            <Field name="awningDABSelected" className="mb-4"
                                   textField="code" titleOption="-- Select Awning (DAB) --"
                                   data={listAwningDABSample}
                                   component={FieldDropdownList} />
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col xs="12">
                            <Label className="col-form-label">
                                <b>Select Awaning (IAB):</b>
                            </Label>
                        </Col>
                        <Col xs="12">
                            <Field name="awningIABSelected" className="mb-4"
                                   textField="code" titleOption="-- Select Awning (IAB) --"
                                   data={listAwningIABSample}
                                   component={FieldDropdownList} />
                        </Col>
                    </Row>
                </CardBody>
                {
                   awningDrawing && awningDrawing.type &&
                    <CardFooter>
                        <Button color="secondary" onClick={handleShowAwningDrawing}>
                            <i className="fa fa-file" />{` `}
                            <FormattedMessage id="app.docs.Show_Awning_Drawings" defaultMessage="Show Awning Drawings"/> {`(${awningDrawing.type})`}
                        </Button>
                    </CardFooter>
                }
            </Card>
            <Modal className="Modal__Bootstrap modal-dialog modal-lg"
                    isOpen={(currentModalId === 2)}
                    onRequestClose={() => handleModalChange(0)}
                    contentLabel="Show Awning Drawing"
                    style={{content: {outline: 0}}}
            >
                <AwningDrawingsComponent awningDrawing={awningDrawing} handleModalChange={handleModalChange}/>
            </Modal>
        </div>
    );
}

export default Awnings;