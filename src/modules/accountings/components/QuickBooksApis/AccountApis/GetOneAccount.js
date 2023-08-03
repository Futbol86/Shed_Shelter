import React, {Component} from 'react';
import { Field, FieldArray } from "redux-form";
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import { Col, Row, Button, Label, Card, CardHeader, CardBody, CardFooter, Table, Form } from 'reactstrap';
import { FieldInputPure, FieldDropdownList, FieldLevelValidation } from "../../../../../components/common/Form";

class GetOneAccount extends Component {
    render() {
        const {
            AccountId, quickBooksAccount, doQuickBooksGetAnAccount
        } = this.props;

        return (
            <div>
                <Row>
                    <Col xs="12" className='d-flex justify-content-start'>
                        <h4>Get One Account</h4>                   
                    </Col>
                    <Col xs={4}>                     
                        <Label>Please press 'Account Id' before press button</Label>
                    </Col>
                    <Col xs={4}>                     
                        <Field name="AccountId" type="number" component={FieldInputPure} 
                                parse={(value) => value && parseFloat(value)} />
                    </Col>
                    <Col xs={4}>
                        <Button color="secondary" className="ml-4" 
                                onClick={() => doQuickBooksGetAnAccount({DataType: "account", DataId: AccountId})}
                                disabled={!AccountId || AccountId === 0}>
                        Get One Account
                        </Button>
                    </Col>
                </Row>
                {
                    quickBooksAccount && quickBooksAccount.Account &&
                    <div className="mt-4">
                        <Row className="bg-secondary">
                            <Col xs="4" className='bg-secondary pd-4'>
                                <b>Name</b>
                            </Col>
                            <Col xs="4" className='bg-secondary pd-4'>
                                { quickBooksAccount && quickBooksAccount.Account.Name }
                            </Col>
                        </Row>
                        <Row className="bg-secondary">
                            <Col xs="4">
                                <b>Account Type</b>
                            </Col>
                            <Col xs="4">
                                { quickBooksAccount && quickBooksAccount.Account.AccountType }
                            </Col>
                        </Row>
                        <Row className="bg-secondary">
                            <Col xs="4">
                                <b>Classification</b>
                            </Col>
                            <Col xs="4">
                                { quickBooksAccount && quickBooksAccount.Account.Classification }
                            </Col>
                        </Row>
                        <Row className="bg-secondary">
                            <Col xs="4">
                                <b>CreateTime</b>
                            </Col>
                            <Col xs="4">
                                { quickBooksAccount && quickBooksAccount.Account.MetaData.CreateTime }
                            </Col>
                        </Row>
                    </div>
                }
            </div>
        )
    }
}

export default GetOneAccount;