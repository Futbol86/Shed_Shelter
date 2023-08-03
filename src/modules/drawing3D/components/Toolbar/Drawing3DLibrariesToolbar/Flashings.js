import React, {Component, useState} from 'react';
import Modal from "react-modal";
import { Field } from 'redux-form';
import {FormattedMessage} from 'react-intl';
import { Row, Col, Card, CardHeader, CardBody, CardFooter, Button, Label } from 'reactstrap';
import {FieldDropdownList} from "../../../../../components/common/Form/index";
import { FLASHING_SAMPLES } from "../../../constants2";
import FlashingDrawingsComponent from "./FlashingDrawings";

const Flashings = ({ flashingDrawing, currentModalId, handleShowFlashingDrawing, handleModalChange }) => {
    const listFlashingSample = Object.keys(FLASHING_SAMPLES).map(key => {
        return {
            code: key
        }
    });

    return (
        <div className="animated fadeIn">
            <Card>
                <CardHeader>
                    <h4>Flashings</h4>
                </CardHeader>
                <CardBody>
                    <Row className="mb-2">
                        <Col xs="12">
                            <Label className="col-form-label">
                                <b>Select Flashing:</b>
                            </Label>
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col xs="12">
                            <Field name="flashingSelected" className="mb-4"
                                    textField="code" titleOption="-- Select Flashing --"
                                    data={listFlashingSample}
                                    component={FieldDropdownList} />
                        </Col>
                    </Row>
                </CardBody>
                {
                    flashingDrawing && flashingDrawing.type &&
                    <CardFooter>
                        <Button color="secondary" onClick={handleShowFlashingDrawing}>
                            <i className="fa fa-file" />{` `}
                            <FormattedMessage id="app.docs.Show_Drawing" defaultMessage="Show Drawing"/> {`(${flashingDrawing.type})`}
                        </Button>
                    </CardFooter>
                }
            </Card>
            <Modal className="Modal__Bootstrap modal-dialog modal-lg"
                    isOpen={(currentModalId === 2)}
                    onRequestClose={() => handleModalChange(0)}
                    contentLabel="Show Flashing Drawing"
                    style={{content: {outline: 0}}}
            >
                <FlashingDrawingsComponent flashingDrawing={flashingDrawing} handleModalChange={handleModalChange}/>
            </Modal>
        </div>
    );
}

export default Flashings;