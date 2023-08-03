import React, {Component} from 'react';
import { Field, FieldArray } from "redux-form";
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import { Col, Row, Button, Label, Card, CardHeader, CardBody, CardFooter, Table, Form } from 'reactstrap';
import { FieldInputPure, FieldDropdownList, FieldLevelValidation } from "../../../../../components/common/Form";

class GetOneInvoice extends Component {
    render() {
        const {
            InvoiceId, quickBooksInvoice, doQuickBooksGetAInvoice
        } = this.props;

        return (
            <div>
                <Row>
                    <Col xs="12" className='d-flex justify-content-start'>
                        <h4>Get One Invoice</h4>                   
                    </Col>
                    <Col xs={4}>                     
                        <Label>Please press 'Invoice Id' before press button</Label>
                    </Col>
                    <Col xs={4}>                     
                        <Field name="InvoiceId" type="number" component={FieldInputPure} 
                                parse={(value) => value && parseFloat(value)} />
                    </Col>
                    <Col xs={4}>
                        <Button color="secondary" className="ml-4" 
                                onClick={() => doQuickBooksGetAInvoice({DataType: "invoice", DataId: InvoiceId, MinorVersion: 65})}
                                disabled={!InvoiceId || InvoiceId === 0}>
                        Get One Invoice
                        </Button>
                    </Col>
                </Row>
                {
                    quickBooksInvoice && quickBooksInvoice.Invoice &&
                    <div className="mt-4">
                        <Row className="bg-secondary">
                            <Col xs="4" className='bg-secondary pd-4'>
                                <b>Sync Token</b>
                            </Col>
                            <Col xs="4" className='bg-secondary pd-4'>
                                { quickBooksInvoice && quickBooksInvoice.Invoice.SyncToken }
                            </Col>
                        </Row>
                        <Row className="bg-secondary">
                            <Col xs="4" className='bg-secondary pd-4'>
                                <b>DocNumber</b>
                            </Col>
                            <Col xs="4" className='bg-secondary pd-4'>
                                { quickBooksInvoice && quickBooksInvoice.Invoice.DocNumber }
                            </Col>
                        </Row>
                        <Row className="bg-secondary">
                            <Col xs="4">
                                <b>Customer Ref</b>
                            </Col>
                            <Col xs="4">
                                { JSON.stringify(quickBooksInvoice && quickBooksInvoice.Invoice.CustomerRef) }
                            </Col>
                        </Row>
                        <Row className="bg-secondary">
                            <Col xs="4">
                                <b>Line</b>
                            </Col>
                            <Col xs="4">
                                { JSON.stringify(quickBooksInvoice && quickBooksInvoice.Invoice.Line) }
                            </Col>
                        </Row>
                        <Row className="bg-secondary">
                            <Col xs="4">
                                <b>Balance</b>
                            </Col>
                            <Col xs="4">
                                { quickBooksInvoice && quickBooksInvoice.Invoice.Balance }
                            </Col>
                        </Row>
                        <Row className="bg-secondary">
                            <Col xs="4">
                                <b>Due Date</b>
                            </Col>
                            <Col xs="4">
                                { quickBooksInvoice && quickBooksInvoice.Invoice.DueDate }
                            </Col>
                        </Row>
                        <Row className="bg-secondary">
                            <Col xs="4">
                                <b>Create Time</b>
                            </Col>
                            <Col xs="4">
                                { quickBooksInvoice && quickBooksInvoice.Invoice.MetaData.CreateTime }
                            </Col>
                        </Row>
                    </div>
                }
            </div>
        )
    }
}

export default GetOneInvoice;