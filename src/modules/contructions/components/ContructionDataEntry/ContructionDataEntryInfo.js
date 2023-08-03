import React from "react";
import { Row, Col, Label } from "reactstrap";
import {FormattedMessage} from "react-intl";
import {Field} from "redux-form";
import {FieldInputPure, FieldRadioButtonGroup} from "../../../../components/common/Form";
import FieldDatePicker from "../../../../components/common/Form/FieldDatePicker";
import {FieldDropdownList, FieldDropZone, FieldAutoComplete, FieldLevelValidation} from "../../../../components/common/Form/index";
import {API_SUB_URL, PREDIFINED_CONTRUCTION_FIELDS, INSURANCE_POLICY_TYPES} from "../../constants";

const ContructionDataEntryInfo = ({ userList, uploadRootURL, insurancePolicyType, insurancePolicyFileRelPaths, handleFileDrops, handleDeleteInsuranceFile }) => {
    const list = userList && userList.length ?
        userList.map(user => {
            return {
                label: user.email,
                value: user.id + ''
            }
        })
        : [];
    return (
        <React.Fragment>
            <Row className="mb-2">
                <Col xs="6" md="3">
                    <Label className="col-form-label">
                        <FormattedMessage id="app.contruction.Email" defaultMessage="Email" />
                        {' '}<span className="text-red">(*)</span>
                    </Label>
                </Col>
                <Col xs="6" md="3">
                    <Field
                        multi={false}
                        name="userId"
                        options={list}
                        component={FieldAutoComplete}
                        validate={FieldLevelValidation.validateRequired}
                    />
                </Col>
                <Col xs="6" md="3">
                    <Label className="col-form-label">
                        <FormattedMessage id="app.contruction.Contruction_Field" defaultMessage="Contruction Field" />
                        {' '}<span className="text-red">(*)</span>
                    </Label>
                </Col>
                <Col xs="6" md="3">
                    <Field
                        name="contructionField"
                        component={FieldDropdownList}
                        data={PREDIFINED_CONTRUCTION_FIELDS}
                        valueField="value"
                        textField="name"
                        titleOption="Select Contruction Field"
                        className="form-control-sm pt-1"
                    />
                </Col>
            </Row>
            <Row className="mb-2">
                <Col xs="6" md="3">
                    <Label className="col-form-label">
                        <FormattedMessage id="app.contruction.Trades_Registered_Name" defaultMessage="Trades Registered Name" />
                        {' '}<span className="text-red">(*)</span>
                    </Label>
                </Col>
                <Col xs="6" md="3">
                    <Field name="tradesRegisteredName" type="text" component={FieldInputPure}
                            className="form-control form-control-sm"
                    />
                </Col>
                <Col xs="6" md="3">
                    <Label className="col-form-label">
                        <FormattedMessage id="app.contruction.Trading_As" defaultMessage="Trading As" />
                        {' '}<span className="text-red">(*)</span>
                    </Label>
                </Col>
                <Col xs="6" md="3">
                    <Field name="tradingAs" type="text" component={FieldInputPure}
                            className="form-control form-control-sm"
                    />
                </Col>
            </Row>

            <Row className="mb-2">
                <Col xs="6" md="3">
                    <Label className="col-form-label">
                        <FormattedMessage id="app.contruction.Category" defaultMessage="Category" />
                        {' '}<span className="text-red">(*)</span>
                    </Label>
                </Col>
                <Col xs="6" md="3">
                    <Field name="category" type="text" component={FieldInputPure}
                            className="form-control form-control-sm"
                    />
                </Col>
                <Col xs="6" md="3">
                    <Label className="col-form-label">
                        <FormattedMessage id="app.contruction.Trade_Number" defaultMessage="Trade Number" />
                        {' '}<span className="text-red">(*)</span>
                    </Label>
                </Col>
                <Col xs="6" md="3">
                    <Field name="tradeNumber" type="text" component={FieldInputPure}
                            className="form-control form-control-sm"
                    />
                </Col>
            </Row>

            <Row className="mb-2">
                <Col xs="6" md="3">
                    <Label className="col-form-label">
                        <FormattedMessage id="app.contruction.Contractors_Licence_Number" defaultMessage="Contractors Licence Number" />
                        {' '}<span className="text-red">(*)</span>
                    </Label>
                </Col>
                <Col xs="6" md="3">
                    <Field name="contractorsLicenceNumber" type="text" component={FieldInputPure}
                            className="form-control form-control-sm"
                    />
                </Col>
                <Col xs="6" md="3">
                    <Label className="col-form-label">
                        <FormattedMessage id="app.contruction.Contractors_Licence_Expiry_Date" defaultMessage="Contractors Licence Expiry Date" />
                        {' '}<span className="text-red">(*)</span>
                    </Label>
                </Col>
                <Col xs="6" md="3">
                    <Field  name="contractorsLicenceExpiryDate" type="date" component={FieldDatePicker}
                        className="form-control form-control-sm"
                        placeholderText="DD/MM/YYYY" dateFormat="dd/MM/yyyy"
                        style={{width: '600px'}}
                    />
                </Col>
            </Row>

            <Row className="mb-2">
                <Col xs="6" md="3">
                    <Label className="col-form-label">
                        <FormattedMessage id="app.contruction.Insurance_Policy_Details" defaultMessage="Insurance Policy Details" />
                        {' '}<span className="text-red">(*)</span>
                    </Label>
                </Col>
                <Col xs="6" md="3">
                    <Field name="insurancePolicyType" component={FieldRadioButtonGroup}
                        items={INSURANCE_POLICY_TYPES}
                        groupClassName="d-flex flex-row" className="d-flex justify-content-between mr-2 ml-1"
                    />
                </Col>
                {
                    insurancePolicyType === "Text" &&
                    <React.Fragment>
                        <Col xs="6" md={"3"}>
                            <Label className="col-form-label">
                                <FormattedMessage id="app.contruction.Insurance_Policy_Text" defaultMessage="Insurance Policy Expiry Date" />
                                {' '}<span className="text-red">(*)</span>
                            </Label>
                        </Col>
                        <Col xs="6" md="3">
                            <Field name="insurancePolicyDetails" type="text" component={FieldInputPure}
                                className="form-control form-control-sm"
                            />
                        </Col>
                    </React.Fragment>
                }
            </Row>
            
            <Row className="mb-2">
                {
                    insurancePolicyType === "File" &&
                    <React.Fragment>
                        <Col xs="6" md={"3"}>
                            <Label className="col-form-label">
                                <FormattedMessage id="app.contruction.Insurance_Policy_File" defaultMessage="Insurance Policy Expiry Date" />
                                {' '}<span className="text-red">(*)</span>
                            </Label>
                        </Col>
                        <Col xs="6" md="3">
                            <Field
                                name="insurancePolicyFileInput"
                                component={FieldDropZone}
                                handleFileDrops={handleFileDrops}
                                label="Insurance File ..."
                                checked={true}
                                className="btn btn-outline-primary btn-sm btn-block"
                                listDroppedFiles={false}
                            />
                        </Col>
                        {
                            insurancePolicyFileRelPaths &&
                            <React.Fragment>
                                <Col xs="5" md="5">
                                    <span>
                                        <a href={`${uploadRootURL}${API_SUB_URL}/${insurancePolicyFileRelPaths}`} className="pl-1 pt-0" title="Download Insurance Policy File" target="_blank">
                                            <i className="icon-cloud-download" />
                                        </a> {insurancePolicyFileRelPaths.substring(10)}
                                    </span>
                                </Col>
                                <Col xs="1" md="1">
                                    <button type="button" className="btn btn-link pl-3 pt-0" title="Remove"
                                            onClick={() => handleDeleteInsuranceFile(insurancePolicyFileRelPaths)}>
                                        <i className="icon-minus" />
                                    </button>
                                </Col>
                            </React.Fragment>
                        }
                    </React.Fragment>
                }
            </Row>

            <Row className="mb-2">
                <Col xs="6" md={"3"}>
                    <Label className="col-form-label">
                        <FormattedMessage id="app.contruction.Insurance_Policy_Expiry_Date" defaultMessage="Insurance Policy Expiry Date" />
                        {' '}<span className="text-red">(*)</span>
                    </Label>
                </Col>
                <Col xs="6" md="3">
                    <Field name="insurancePolicyExpiryDate" type="date" component={FieldDatePicker}
                        className="form-control form-control-sm"
                        placeholderText="DD/MM/YYYY" dateFormat="dd/MM/yyyy"
                        //style={{display: 'block'}}
                    />
                </Col>
                <Col xs="6" md="3">
                    <Label className="col-form-label">
                        <FormattedMessage id="app.contruction.Australian_Business_Number" defaultMessage="Australian Business Number" />
                        {' '}<span className="text-red">(*)</span>
                    </Label>
                </Col>
                <Col xs="6" md="3">
                    <Field name="australianBusinessNumber" type="text" component={FieldInputPure}
                            className="form-control form-control-sm"
                    />
                </Col>
            </Row>
        </React.Fragment>
    )
};

export default ContructionDataEntryInfo;