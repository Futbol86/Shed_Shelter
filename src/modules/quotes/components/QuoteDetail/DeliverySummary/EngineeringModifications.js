import React from 'react';
import {CardBody, Card, CardHeader, Row, Col, Label, Button} from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import {Field} from "redux-form";
import Modal from 'react-modal';

import {FieldInputPure} from "../../../../../components/common/Form";

const EngineeringModifications  = ({handleModalChange, activeModal}) => {
    return (
        <Card>
            <CardHeader className="pl-3">
                <strong><FormattedMessage id="app.quotes.Engineering_Modifications" defaultMessage="Engineering Modifications" /></strong>
            </CardHeader>
            <CardBody className="pb-2 pt-2">
                <Row className="mb-1">
                    <Col xs="8" md="5" className="pl-1">
                        <FormattedMessage id="app.quotes.Snow_certificate_required" defaultMessage="Snow certificate required?" />
                    </Col>
                    <Col xs="4" md="1" className="pl-1">
                        <Field name="emSnowCertRequired" id="emSnowCertRequired" component="input" type="checkbox" />
                    </Col>
                    <Col xs="12" md="6" className="pl-1 d-flex justify-content-end">
                        <Label className="d-flex flex-row">
                            <FormattedMessage id="app.quotes.Ground_snow_load" defaultMessage="Ground snow load" />

                            <Field name="emGroundSnowLoad" type="text" component={FieldInputPure}
                                   className="form-control form-control-sm ml-1 mr-1" style={{width: '60px'}}
                            />
                            kPa
                        </Label>
                    </Col>
                </Row>

                <Row className="mb-1">
                    <Col xs="8" md="5" className="pl-1">
                        <FormattedMessage id="app.quotes.Flood_certificate_required" defaultMessage="Flood certificate required?" />
                    </Col>
                    <Col xs="4" md="1" className="pl-1">
                        <Field name="emFloodCertRequired" id="emFloodCertRequired" component="input" type="checkbox" />
                    </Col>
                    <Col xs="12" md="6" className="pl-1 d-flex justify-content-end">
                        <a type="button" color="outline-info" className="btn-sm btn btn-outline-info"
                           href="https://www.yakima.com.au/australian-snow-guide"  target="_blank">
                            <FormattedMessage id="app.quotes.Snow_load_guide" defaultMessage="Snow load guide" />
                        </a>
                    </Col>
                </Row>

                <Row className="mb-1">
                    <Col xs="8" md="5" className="pl-1">
                        <FormattedMessage id="app.quotes.Modification_required" defaultMessage="Modification required?" />
                    </Col>
                    <Col xs="4" md="1" className="pl-1">
                        <Field name="emModRequired" id="emModRequired" component="input" type="checkbox" />
                    </Col>
                    <Col xs="12" md="6" className="pl-1 d-flex justify-content-end">
                        <Button type="button" color="outline-info" className="btn-sm"  onClick={() => handleModalChange(1)}>
                            <FormattedMessage id="app.quotes.Edit_Notes" defaultMessage="Edit Notes ..." />
                        </Button>

                        <Modal className="Modal__Bootstrap modal-dialog modal-lg"
                               isOpen={(activeModal === 1)}
                               onRequestClose={() => handleModalChange(0)}
                               contentLabel="Edit Notes"
                        >
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">
                                        <FormattedMessage id="app.quotes.Edit_Notes" defaultMessage="Edit Notes" />
                                    </h4>
                                    <button type="button" className="close" onClick={() => handleModalChange(0)}>
                                        <span aria-hidden="true">&times;</span>
                                        <span className="sr-only">
                                            <FormattedMessage id="app.Close" defaultMessage="Close" />
                                        </span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <Field name="emNotes" id="emNotes" component="textarea" className="form-control"  rows="3" />
                                </div>
                                <div className="modal-footer d-flex justify-content-between">
                                    <button type="button" className="btn btn-secondary" onClick={() => handleModalChange(0)}>
                                        <FormattedMessage id="app.Close" defaultMessage="Close" />
                                    </button>
                                </div>
                            </div>
                        </Modal>
                    </Col>
                </Row>


            </CardBody>
        </Card>
    );
};

export default EngineeringModifications;