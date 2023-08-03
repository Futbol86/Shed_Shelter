import React from 'react';
import {CardBody, Card, CardHeader, Row, Col, Label, Input, Button} from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import {Field} from "redux-form";

import {FieldInputPure} from "../../../../../components/common/Form";
import Modal from "react-modal";

const DefaultDelivery  = ({handleModalChange, activeModal}) => {
    return (
        <Card>
            <CardHeader className="pl-3">
                <strong>
                    <FormattedMessage id="app.quotes.Default_Delivery" defaultMessage="Default Delivery" />
                </strong>
                <div className="float-right">
                    <Button type="button" color="outline-dark" className="btn-sm"  onClick={() => handleModalChange(2)}>
                        <FormattedMessage id="app.Update" defaultMessage="Update" />
                    </Button>
                    <Modal className="Modal__Bootstrap modal-dialog modal-lg"
                           isOpen={(activeModal === 2)}
                           onRequestClose={() => handleModalChange(0)}
                           contentLabel="Edit Notes"
                    >
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">
                                    <FormattedMessage id="app.quotes.Default_Delivery" defaultMessage="Default Delivery" />
                                </h4>
                                <button type="button" className="close" onClick={() => handleModalChange(0)}>
                                    <span aria-hidden="true">&times;</span>
                                    <span className="sr-only">
                                            <FormattedMessage id="app.Close" defaultMessage="Close" />
                                        </span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <Row className="mb-1">
                                    <Col xs="3" className="pl-1">
                                        <Label className="d-flex flex-row justify-content-between">
                                            <FormattedMessage id="app.quotes.Kit_Margin" defaultMessage="Kit Margin" /> (%)

                                            <Field name="dealerKitMargin" type="number" component={FieldInputPure}
                                                   className="form-control form-control-sm ml-1 mr-1"
                                                   style={{maxWidth: '70px', textAlign: 'right'}}
                                            />
                                        </Label>
                                    </Col>
                                    <Col xs="5" className="d-flex flex-column align-items-end pr-2">
                                        <Label className="d-flex flex-row justify-content-right">
                                            <FormattedMessage id="app.quotes.Dealer_Cost_including_GST" defaultMessage="Dealer Cost inc. GST" />

                                            <Field name="dealerCost" type="text" component={FieldInputPure}
                                                   className="form-control form-control-sm ml-1 mr-1"
                                                   style={{maxWidth: '100px', textAlign: 'right'}}
                                                   readOnly={true}
                                            />
                                        </Label>

                                        <Label className="d-flex flex-row justify-content-right">
                                            <FormattedMessage id="app.quotes.Sale_Price_including_GST" defaultMessage="Sale Price inc. GST" />

                                            <Field name="dealerSalePrice" type="text" component={FieldInputPure}
                                                   className="form-control form-control-sm ml-1 mr-1"
                                                   style={{maxWidth: '100px', textAlign: 'right'}}
                                                   readOnly={true}
                                            />
                                        </Label>

                                        <Label className="d-flex flex-row justify-content-right">
                                            <FormattedMessage id="app.quotes.Dealer_Profit" defaultMessage="Dealer Profit" />

                                            <Field name="dealerProfit" type="text" component={FieldInputPure}
                                                   className="form-control form-control-sm ml-1 mr-1"
                                                   style={{maxWidth: '100px', textAlign: 'right'}}
                                                   readOnly={true}
                                            />
                                        </Label>
                                    </Col>
                                </Row>
                            </div>
                            <div className="modal-footer d-flex justify-content-between">
                                <button type="button" className="btn btn-secondary" onClick={() => handleModalChange(0)}>
                                    <FormattedMessage id="app.Close" defaultMessage="Close" />
                                </button>
                            </div>
                        </div>
                    </Modal>
                </div>
            </CardHeader>
        </Card>
    );
};

export default DefaultDelivery;