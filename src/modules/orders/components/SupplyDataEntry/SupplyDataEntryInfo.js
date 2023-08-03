import React from "react";
import { Row, Col, Label } from "reactstrap";
import {FormattedMessage} from "react-intl";
import {Field} from "redux-form";
import {FieldInputPure, FieldRadioButtonGroup} from "../../../../components/common/Form";
import {FieldAutoComplete, FieldLevelValidation} from "../../../../components/common/Form/index";
import {PREDIFINED_SUPPLY_TYPES} from "../../constants";

const SupplyDataEntryInfo = ({ userList }) => {
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
                        <FormattedMessage id="app.order.Email" defaultMessage="Email" />
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
                        <FormattedMessage id="app.order.Supply_Type" defaultMessage="Supply Type" />
                        {' '}<span className="text-red">(*)</span>
                    </Label>
                </Col>
                <Col xs="6" md="3">
                    <Field name="supplyType" component={FieldRadioButtonGroup}
                            items={PREDIFINED_SUPPLY_TYPES}
                            checked={true}
                            groupClassName="d-flex flex-row" className="d-flex justify-content-between mr-2 ml-1"
                    />
                </Col>
            </Row>
            <Row className="mb-2">
                <Col xs="6" md="3">
                    <Label className="col-form-label">
                        <FormattedMessage id="app.order.Company" defaultMessage="Company" />
                        {' '}<span className="text-red">(*)</span>
                    </Label>
                </Col>
                <Col xs="6" md="3">
                    <Field name="company" type="text" component={FieldInputPure}
                            className="form-control form-control-sm"
                    />
                </Col>
                <Col xs="6" md="3">
                    <Label className="col-form-label">
                        <FormattedMessage id="app.order.Vendor_Number" defaultMessage="Vendor Number" />
                        {' '}<span className="text-red">(*)</span>
                    </Label>
                </Col>
                <Col xs="6" md="3">
                    <Field name="vendorNumber" type="text" component={FieldInputPure}
                            className="form-control form-control-sm"
                    />
                </Col>
            </Row>

            <Row className="mb-2">
                <Col xs="6" md="3">
                    <Label className="col-form-label">
                        <FormattedMessage id="app.order.Branch_Name" defaultMessage="Branch Name" />
                        {' '}<span className="text-red">(*)</span>
                    </Label>
                </Col>
                <Col xs="6" md="3">
                    <Field name="branchName" type="text" component={FieldInputPure}
                            className="form-control form-control-sm"
                    />
                </Col>
                <Col xs="6" md="3">
                    <Label className="col-form-label">
                        <FormattedMessage id="app.order.Days_Of_Operation" defaultMessage="Days Of Operation" />
                        {' '}<span className="text-red">(*)</span>
                    </Label>
                </Col>
                <Col xs="6" md="3">
                    <Field name="daysOfOperation" type="text" component={FieldInputPure}
                            className="form-control form-control-sm"
                    />
                </Col>
            </Row>

            <Row className="mb-2">
                <Col xs="6" md="3">
                    <Label className="col-form-label">
                        <FormattedMessage id="app.order.Australian_Business_Number" defaultMessage="Australian Business Number" />
                        {' '}<span className="text-red">(*)</span>
                    </Label>
                </Col>
                <Col xs="6" md="3">
                    <Field name="australianBusinessNumber" type="text" component={FieldInputPure}
                            className="form-control form-control-sm"
                    />
                </Col>
                <Col xs="6" md="3">
                    <Label className="col-form-label">
                        <FormattedMessage id="app.order.Physical_Address" defaultMessage="Physical Address" />
                        {' '}<span className="text-red">(*)</span>
                    </Label>
                </Col>
                <Col xs="6" md="3">
                    <Field name="physicalAddress" type="text" component={FieldInputPure}
                            className="form-control form-control-sm"
                    />
                </Col>
            </Row>

            <Row className="mb-2">
                <Col xs="6" md="3">
                    <Label className="col-form-label">
                        <FormattedMessage id="app.order.Postal_Address" defaultMessage="Postal Address" />
                        {' '}<span className="text-red">(*)</span>
                    </Label>
                </Col>
                <Col xs="6" md="3">
                    <Field name="postalAddress" type="text" component={FieldInputPure}
                            className="form-control form-control-sm"
                    />
                </Col>
                <Col xs="6" md="3">
                    <Label className="col-form-label">
                        <FormattedMessage id="app.order.Primary_Contact_Details" defaultMessage="Primary Contact Details" />
                        {' '}<span className="text-red">(*)</span>
                    </Label>
                </Col>
                <Col xs="6" md="3">
                    <Field name="primaryContactDetails" type="text" component={FieldInputPure}
                            className="form-control form-control-sm"
                    />
                </Col>
            </Row>
        </React.Fragment>
    )
};

export default SupplyDataEntryInfo;