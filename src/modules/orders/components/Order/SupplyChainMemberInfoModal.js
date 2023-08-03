import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import {Row, Col, Label, Table} from 'reactstrap';
import {Field} from 'redux-form';

class SupplyChainMemberInfoModal extends Component {
    render() {
        const { allSupplyDataEntries, selectedRollFormSupplierId, handleModalClose } = this.props;    
        let selectedSupplier = {};

        if (allSupplyDataEntries && allSupplyDataEntries.length) {
            selectedSupplier = allSupplyDataEntries.find(item => item.id + '' === selectedRollFormSupplierId + '');
            if (!selectedSupplier) {
                selectedSupplier = allSupplyDataEntries[0];
            }
        }

        const { vendorNumber, branchName, daysOfOperation, australianBusinessNumber,
            physicalAddress, postalAddress, primaryContactDetails, contact
        } = selectedSupplier;

        return (
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">
                        <FormattedMessage id="app.order.Supplier_Info" defaultMessage="Supplier Info" />
                    </h4>
                    <button type="button" className="close" onClick={handleModalClose}>
                        <span aria-hidden="true">&times;</span>
                            <span className="sr-only">
                            <FormattedMessage id="app.Close" defaultMessage="Close" />
                        </span>
                    </button>
                </div>
                <div className="modal-body">
                    <Row>
                        <Col xs="4" className="pl-2">
                            <Label>
                                <FormattedMessage id="app.order.Company" defaultMessage="Company" />:
                            </Label>
                        </Col>
                        <Col xs="4" className="pr-1 pl-1">
                            <Field component="select" name="selectedRollFormSupplierId" id="selectedRollFormSupplierId"
                                    className="form-control form-control-sm">
                                {allSupplyDataEntries && allSupplyDataEntries.map((item, idx) =>
                                    <option key={idx} value={item.id}>{item.company}</option>
                                )}
                            </Field>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="4" className="pl-2">
                            <Label>
                                <FormattedMessage id="app.order.Vendor_Number" defaultMessage="Vendor Number" />:
                            </Label>
                        </Col>
                        <Col xs="8" className="pr-1 pl-1">
                            {vendorNumber}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="4" className="pl-2">
                            <Label>
                                <FormattedMessage id="app.order.Branch_Name" defaultMessage="Branch Name" />:
                            </Label>
                        </Col>
                        <Col xs="8" className="pr-1 pl-1">
                            {branchName}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="4" className="pl-2">
                            <Label>
                                <FormattedMessage id="app.order.Days_Of_Operation" defaultMessage="Days Of Operation" />:
                            </Label>
                        </Col>
                        <Col xs="8" className="pr-1 pl-1">
                            {daysOfOperation}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="4" className="pl-2">
                            <Label>
                                <FormattedMessage id="app.order.Australian_Business_Number" defaultMessage="Australian Business Number" />:
                            </Label>
                        </Col>
                        <Col xs="8" className="pr-1 pl-1">
                            {australianBusinessNumber}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="4" className="pl-2">
                            <Label>
                                <FormattedMessage id="app.order.Physical_Address" defaultMessage="Physical Address" />:
                            </Label>
                        </Col>
                        <Col xs="8" className="pr-1 pl-1">
                            {physicalAddress}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="4" className="pl-2">
                            <Label>
                                <FormattedMessage id="app.order.Postal_Address" defaultMessage="Postal Address" />:
                            </Label>
                        </Col>
                        <Col xs="8" className="pr-1 pl-1">
                            {postalAddress}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="4" className="pl-2">
                            <Label>
                                <FormattedMessage id="app.order.Primary_Contact_Details" defaultMessage="Primary Contact Details" />:
                            </Label>
                        </Col>
                        <Col xs="8" className="pr-1 pl-1">
                            {primaryContactDetails}
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col md={12} className="pl-2">
                            <Table responsive striped>
                                <thead>
                                    <tr>
                                        <th><FormattedMessage id="app.order.Staff_Name" defaultMessage="Staff Name" /></th>
                                        <th><FormattedMessage id="app.order.Position" defaultMessage="Position" /></th>
                                        <th><FormattedMessage id="app.order.Contact" defaultMessage="Contact" /></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedSupplier.staffs && selectedSupplier.staffs.length > 0 ?
                                        selectedSupplier.staffs.map((doc, idx) => (
                                            <tr key={idx}>
                                                <td><b>{doc && doc.name}</b></td>
                                                <td>{doc && doc.position}</td>
                                                <td>{doc && doc.contact}</td>
                                            </tr>
                                        ))
                                        :  <tr><td colSpan={3}><FormattedMessage id="app.order.No_Staff_Found" defaultMessage="No Staff Found" /></td></tr>
                                    }
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </div>
                <div className="modal-footer d-flex justify-content-between">
                    <button type="button" className="btn btn-secondary" onClick={handleModalClose}>
                        <i className="fa fa-times fa-lg" /> {' '}
                        <FormattedMessage id="app.Close" defaultMessage="Close" />
                    </button>
                </div>
            </div>
        )
    }
}

export default SupplyChainMemberInfoModal;