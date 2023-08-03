import React, {Component} from 'react';
import { Field, FieldArray } from "redux-form";
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import { Col, Row, Button, Label, Card, CardHeader, CardBody, CardFooter, Table, Form } from 'reactstrap';
import { FieldInputPure, FieldDropdownList, FieldLevelValidation } from "../../../../../components/common/Form";
import { ACCOUNT_TYPE } from "../../../constants";

class CreateNewAccount extends Component {
    render() {
        const {
            quickBooksNewAccount
        } = this.props;
        const { handleSubmit, error, submitting, pristine, invalid, reset, meta } = this.props;

        let accountTypeList = [];

        ACCOUNT_TYPE.map(item => {
            accountTypeList.push({ code: item.code, name: item.name, });
        });

        return (
            <div>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col xs="12" className='d-flex justify-content-start'>
                            <h4>Create New Account</h4>                   
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={4}>                     
                            <Label>Name</Label>
                        </Col>
                        <Col xs={4}>                     
                            <Field name="Name" type="text" component={FieldInputPure} />
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col xs={4}>                     
                            <Label>Account Type</Label>
                        </Col>
                        <Col xs={4}>                     
                            <Field name="AccountType" className="mb-2" 
                                textField="name" valueField="code" titleOption="-- Select --"
                                data={accountTypeList} component={FieldDropdownList} 
                                validate={FieldLevelValidation.validateRequired}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} className="d-flex justify-content-end">
                            <LaddaButton data-size={L} data-style={EXPAND_LEFT} data-color="green"
                                        data-spinner-lines={12} className="btn btn-dark" type="submit"
                                        loading={submitting} disabled={submitting || invalid}>
                                Create New Customer
                            </LaddaButton>
                        </Col>
                    </Row>
                    {
                        quickBooksNewAccount && quickBooksNewAccount.Account &&
                        <React.Fragment className="mt-4">
                            <Row className="bg-secondary">
                                <Col xs="12" className='bg-secondary pd-4'>
                                    <b>QuickBooks New Account created success!</b>
                                </Col>
                            </Row>
                            <Row className="bg-secondary">
                                <Col xs="4" className='bg-secondary pd-4'>
                                    <b>Name</b>
                                </Col>
                                <Col xs="4" className='bg-secondary pd-4'>
                                    { quickBooksNewAccount && quickBooksNewAccount.Account.Name }
                                </Col>
                            </Row>
                            <Row className="bg-secondary">
                                <Col xs="4">
                                    <b>Account Type</b>
                                </Col>
                                <Col xs="4">
                                    { quickBooksNewAccount && quickBooksNewAccount.Account.AccountType }
                                </Col>
                            </Row>
                            <Row className="bg-secondary">
                                <Col xs="4">
                                    <b>Classification</b>
                                </Col>
                                <Col xs="4">
                                    { quickBooksNewAccount && quickBooksNewAccount.Account.Classification }
                                </Col>
                            </Row>
                            <Row className="bg-secondary">
                                <Col xs="4">
                                    <b>CreateTime</b>
                                </Col>
                                <Col xs="4">
                                    { quickBooksNewAccount && quickBooksNewAccount.Account.MetaData.CreateTime }
                                </Col>
                            </Row>
                        </React.Fragment>
                    }
                </Form>
            </div>
        )
    }
}

export default CreateNewAccount;