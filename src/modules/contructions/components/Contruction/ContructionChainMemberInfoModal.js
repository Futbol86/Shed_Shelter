import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import {Row, Col, Label, Table} from 'reactstrap';
import {Field} from 'redux-form';
import {API_SUB_URL} from "../../constants";

class ContructionChainMemberInfoModal extends Component {
    render() {
        const { allContructionDataEntries, selectedContructionMemberId, uploadRootURL, handleModalClose } = this.props;    
        let selectedContruction = {};

        if (allContructionDataEntries && allContructionDataEntries.length) {
            selectedContruction = allContructionDataEntries.find(item => item.id + '' === selectedContructionMemberId + '');
            if (!selectedContruction) {
                selectedContruction = allContructionDataEntries[0];
            }
        }

        const { tradingAs, contructionField, category,
            tradeNumber, contractorsLicenceNumber, contractorsLicenceExpiryDate, 
            insurancePolicyDetails, insurancePolicyFileRelPaths, insurancePolicyExpiryDate, australianBusinessNumber
         } = selectedContruction;

        return (
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">
                        <FormattedMessage id="app.contruction.Contruction_Info" defaultMessage="Contruction Info" />
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
                                <FormattedMessage id="app.contruction.Trades_Registered_Name" defaultMessage="Trades Registered Name" />:
                            </Label>
                        </Col>
                        <Col xs="4" className="pr-1 pl-1">
                            <Field component="select" name="selectedContructionMemberId" id="selectedContructionMemberId"
                                    className="form-control form-control-sm">
                                {allContructionDataEntries && allContructionDataEntries.map((item, idx) =>
                                    <option key={idx} value={item.id}>{item.tradesRegisteredName}</option>
                                )}
                            </Field>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="4" className="pl-2">
                            <Label>
                                <FormattedMessage id="app.contruction.Trading_As" defaultMessage="Trading As" />:
                            </Label>
                        </Col>
                        <Col xs="8" className="pr-1 pl-1">
                            {tradingAs}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="4" className="pl-2">
                            <Label>
                                <FormattedMessage id="app.contruction.Contruction_Field" defaultMessage="Contruction Field" />:
                            </Label>
                        </Col>
                        <Col xs="8" className="pr-1 pl-1">
                            {contructionField}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="4" className="pl-2">
                            <Label>
                                <FormattedMessage id="app.contruction.Category" defaultMessage="Category" />:
                            </Label>
                        </Col>
                        <Col xs="8" className="pr-1 pl-1">
                            {category}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="4" className="pl-2">
                            <Label>
                                <FormattedMessage id="app.contruction.Trade_Number" defaultMessage="Trade Number" />:
                            </Label>
                        </Col>
                        <Col xs="8" className="pr-1 pl-1">
                            {tradeNumber}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="4" className="pl-2">
                            <Label>
                                <FormattedMessage id="app.contruction.Contractors_Licence_Number" defaultMessage="Contractors Licence Number" />:
                            </Label>
                        </Col>
                        <Col xs="8" className="pr-1 pl-1">
                            {contractorsLicenceNumber}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="4" className="pl-2">
                            <Label>
                                <FormattedMessage id="app.contruction.Contractors_Licence_Expiry_Date" defaultMessage="Contractors Licence Expiry Date" />:
                            </Label>
                        </Col>
                        <Col xs="8" className="pr-1 pl-1">
                            {contractorsLicenceExpiryDate}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="4" className="pl-2">
                            <Label>
                                <FormattedMessage id="app.contruction.Insurance_Policy_Details" defaultMessage="Insurance Policy Details" />:
                            </Label>
                        </Col>
                        <Col xs="8" className="pr-1 pl-1">
                            {insurancePolicyDetails}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="4" className="pl-2">
                            <Label>
                                <FormattedMessage id="app.contruction.Insurance_Policy_File" defaultMessage="Insurance Policy Details" />:
                            </Label>
                        </Col>
                        {
                            insurancePolicyFileRelPaths && insurancePolicyFileRelPaths.length > 0 &&
                            <Col xs="8" className="pr-1 pl-1">
                                <a href={`${uploadRootURL}${API_SUB_URL}/${insurancePolicyFileRelPaths}`} className="pl-1 pt-0" title="Download Insurance Policy File" target="_blank">
                                    <i className="icon-cloud-download" />
                                </a> {insurancePolicyFileRelPaths.substring(10)}
                            </Col>
                        }
                    </Row> 
                    <Row>
                        <Col xs="4" className="pl-2">
                            <Label>
                                <FormattedMessage id="app.contruction.Insurance_Policy_Expiry_Date" defaultMessage="Insurance Policy Expiry Date" />:
                            </Label>
                        </Col>
                        <Col xs="8" className="pr-1 pl-1">
                            {insurancePolicyExpiryDate}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="4" className="pl-2">
                            <Label>
                                <FormattedMessage id="app.contruction.Australian_Business_Number" defaultMessage="Australian Business Number" />:
                            </Label>
                        </Col>
                        <Col xs="8" className="pr-1 pl-1">
                            {australianBusinessNumber}
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col md={12} className="pl-2">
                            <Table responsive striped>
                                <thead>
                                    <tr>
                                        <th><FormattedMessage id="app.contruction.Staff_Name" defaultMessage="Staff Name" /></th>
                                        <th><FormattedMessage id="app.contruction.Position" defaultMessage="Position" /></th>
                                        <th><FormattedMessage id="app.contruction.Contact" defaultMessage="Contact" /></th>
                                        <th><FormattedMessage id="app.contruction.Next_Of_Kin" defaultMessage="Next Of Kin" /></th>
                                        <th><FormattedMessage id="app.contruction.Relationship" defaultMessage="Relationship" /></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedContruction.staffs && selectedContruction.staffs.length > 0 ?
                                        selectedContruction.staffs.map((doc, idx) => (
                                            <tr key={idx}>
                                                <td><b>{doc && doc.name}</b></td>
                                                <td>{doc && doc.position}</td>
                                                <td>{doc && doc.contact}</td>
                                                <td>{doc.nextOfKin}</td>
                                                <td>{doc.relationship}</td>
                                            </tr>
                                        ))
                                        :  <tr><td colSpan={5}><FormattedMessage id="app.contruction.No_Staff_Found" defaultMessage="No Staff Found" /></td></tr>
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

export default ContructionChainMemberInfoModal;