import React, {Component} from 'react';
import { Field, FieldArray } from "redux-form";
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import { Col, Row, Button, Label, Card, CardHeader, CardBody, CardFooter, Table, Form } from 'reactstrap';
import { FieldInputPure, FieldDropdownList, FieldLevelValidation } from "../../../../../components/common/Form";

class GetOneCustomer extends Component {
    render() {
        const {
            CustomerId, quickBooksCustomer, doQuickBooksGetACustomer,
        } = this.props;

        return (
            <div>
                <Row>
                    <Col xs="12" className='d-flex justify-content-start'>
                        <h4>Get One Customer</h4>                   
                    </Col>
                    <Col xs={4}>                     
                        <Label>Please press 'Customer Id' before press button</Label>
                    </Col>
                    <Col xs={4}>                     
                        <Field name="CustomerId" type="number" component={FieldInputPure} 
                                parse={(value) => value && parseFloat(value)} />
                    </Col>
                    <Col xs={4}>
                        <Button color="secondary" className="ml-4" 
                                onClick={() => doQuickBooksGetACustomer({DataType: "customer", DataId: CustomerId})}
                                disabled={!CustomerId || CustomerId === 0}>
                        Get One Customer
                        </Button>
                    </Col>
                </Row>
                {
                    quickBooksCustomer && quickBooksCustomer.Customer &&
                    <div className="mt-4">
                        <Row className="bg-secondary">
                            <Col xs="4" className='bg-secondary pd-4'>
                                <b>Sync Token</b>
                            </Col>
                            <Col xs="4" className='bg-secondary pd-4'>
                                { quickBooksCustomer && quickBooksCustomer.Customer.SyncToken }
                            </Col>
                        </Row>
                        <Row className="bg-secondary">
                            <Col xs="4" className='bg-secondary pd-4'>
                                <b>Display Name</b>
                            </Col>
                            <Col xs="4" className='bg-secondary pd-4'>
                                { quickBooksCustomer && quickBooksCustomer.Customer.DisplayName }
                            </Col>
                        </Row>
                        <Row className="bg-secondary">
                            <Col xs="4">
                                <b>Suffix</b>
                            </Col>
                            <Col xs="4">
                                { quickBooksCustomer && quickBooksCustomer.Customer.Suffix }
                            </Col>
                        </Row>
                        <Row className="bg-secondary">
                            <Col xs="4">
                                <b>Title</b>
                            </Col>
                            <Col xs="4">
                                { quickBooksCustomer && quickBooksCustomer.Customer.Title }
                            </Col>
                        </Row>
                        <Row className="bg-secondary">
                            <Col xs="4">
                                <b>Middle Name</b>
                            </Col>
                            <Col xs="4">
                                { quickBooksCustomer && quickBooksCustomer.Customer.MiddleName }
                            </Col>
                        </Row>
                        <Row className="bg-secondary">
                            <Col xs="4">
                                <b>Family Name</b>
                            </Col>
                            <Col xs="4">
                                { quickBooksCustomer && quickBooksCustomer.Customer.FamilyName }
                            </Col>
                        </Row>
                        <Row className="bg-secondary">
                            <Col xs="4">
                                <b>Given Name</b>
                            </Col>
                            <Col xs="4">
                                { quickBooksCustomer && quickBooksCustomer.Customer.GivenName }
                            </Col>
                        </Row>
                    </div>
                }
            </div>
        )
    }
}

export default GetOneCustomer;