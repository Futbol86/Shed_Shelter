import React, {Component, useState} from 'react';
import Modal from "react-modal";
import { Field } from 'redux-form';
import {FormattedMessage} from 'react-intl';
import { Row, Col, Card, CardHeader, CardBody, CardFooter, Button, Label } from 'reactstrap';
import {FieldDropdownList} from "../../../../../components/common/Form/index";
import { BASE_PLATE_SAMPLES } from "../../../constants2";
import BasePlateDrawingsComponent from "./BasePlateDrawings";

const BasePlates = ({ basePlateDrawing, currentModalId, handleShowBasePlateDrawing, handleModalChange }) => {
    const listBasePlateSample = Object.keys(BASE_PLATE_SAMPLES).map(key => {
        return {
            code: key
        }
    });

    return (
        <div className="animated fadeIn">
            <Card>
                <CardHeader>
                    <h4>Base Plates</h4>
                </CardHeader>
                <CardBody>
                    <Row className="mb-2">
                        <Col xs="12">
                            <Label className="col-form-label">
                                <b>Select Base Plate:</b>
                            </Label>
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col xs="12">
                            <Field name="basePlateSelected" className="mb-4"
                                    textField="code" titleOption="-- Select Base Plate --"
                                    data={listBasePlateSample}
                                    component={FieldDropdownList} />
                        </Col>
                    </Row>
                </CardBody>
                {
                    basePlateDrawing && basePlateDrawing.type &&
                    <CardFooter>
                        <Button color="secondary" onClick={handleShowBasePlateDrawing}>
                            <i className="fa fa-file" />{` `}
                            <FormattedMessage id="app.docs.Show_Drawing" defaultMessage="Show Drawing"/> {`(${basePlateDrawing.type})`}
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
                <BasePlateDrawingsComponent basePlateDrawing={basePlateDrawing} handleModalChange={handleModalChange}/>
            </Modal>
        </div>
    );
}

export default BasePlates;