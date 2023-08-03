import React, {Component} from 'react';
import {Field} from 'redux-form';
import {FormattedMessage} from 'react-intl';
import Modal from 'react-modal';
import {FieldAutoComplete, FieldLevelValidation} from "../../../../components/common/Form/index";
import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap';

import SupplyChainMemberInfoModal from "./SupplyChainMemberInfoModal";

class SupplyChainMember extends Component {
    render() {
        const {orderDetails, selectedRollFormSupplierId, currentModalId, handleModalChange, handleModalClose} = this.props;

        const allRollForms = this.props.allRollForms && this.props.allRollForms.length ?
            this.props.allRollForms.map(rollForm => {
                return {
                    label: rollForm.company,
                    value: rollForm.id + ''
                }
            }) : [];

        const allSuppliers = this.props.allSuppliers && this.props.allSuppliers.length ?
            this.props.allSuppliers.map(supplier => {
            return {
                label: supplier.company,
                value: supplier.id + ''
            }
        }) : [];

        const allSupplyDataEntries = [
            ...this.props.allRollForms,
            ...this.props.allSuppliers
        ];

        return (
            <Card>
                <CardHeader>
                    <b><FormattedMessage id="app.order.Supply_Chain_Members" defaultMessage="Supply Chain Members" /></b>
                    <div className="card-actions">
                    <a href="#" onClick={() => handleModalChange(1-currentModalId)}>
                        <i className="icon-info" title="View supply chain member info" />
                    </a>

                    <Modal className="Modal__Bootstrap modal-dialog modal-lg"
                        isOpen={currentModalId > 0}
                        contentLabel="Supply chain member info"
                        style={{content: {outline: 0}}}
                    >
                        <SupplyChainMemberInfoModal allSupplyDataEntries={allSupplyDataEntries}
                            selectedRollFormSupplierId={selectedRollFormSupplierId}
                            handleModalClose={handleModalClose}
                        />
                    </Modal>
                </div>
                </CardHeader>
                <CardBody>
                    <Row style={{pointerEvents: `${orderDetails && orderDetails.id ? 'none' : ''}`}}>
                        <Col xs="12" md="6">
                            <Row>
                                <Col xs="3">
                                    <FormattedMessage id="app.order.Roll_Forms" defaultMessage="Roll Forms"/>
                                    {' '}<span className="text-red">(*)</span>
                                </Col>
                                <Col xs="9">
                                    <Field
                                        multi={true}
                                        name="rollForms"
                                        options={allRollForms}
                                        component={FieldAutoComplete}
                                        validate={FieldLevelValidation.validateRequired}
                                    />
                                </Col>
                            </Row>
                            <Row className="pt-2" style={{pointerEvents: `${orderDetails && orderDetails.id ? 'none' : ''}`}}>
                                <Col xs="3">
                                    <FormattedMessage id="app.order.Suppliers" defaultMessage="Suppliers"/>
                                    {' '}<span className="text-red">(*)</span>
                                </Col>
                                <Col xs="9">
                                    <Field
                                        multi={true}
                                        name="suppliers"
                                        options={allSuppliers}
                                        component={FieldAutoComplete}
                                        validate={FieldLevelValidation.validateRequired}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        );                      
    }
}

export default SupplyChainMember;