import React, {Component} from 'react';
import { Field, FieldArray } from "redux-form";
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import { Col, Row, Button, Label, Card, CardHeader, CardBody, CardFooter, Table, Form } from 'reactstrap';
import { FieldInputPure, FieldDropdownList, FieldLevelValidation } from "../../../../../components/common/Form";

class GetListInvoice extends Component {
    render() {
        const {
            quickBooksInvoices, doQuickBooksGetInvoices,
            handleUpdateInvoice
        } = this.props;

        return (
            <div>
                <Row>
                    <Col xs="12" className='d-flex justify-content-start'>
                        <h4>Get Invoices</h4>
                        <Button color="secondary" className="ml-4" 
                                onClick={() => doQuickBooksGetInvoices({
                                    querySQL: "select * from Invoice where MetaData.CreateTime > '2023-07-22' order by Id DESC",
                                })}>
                            Get Invoices
                        </Button>
                    </Col>
                </Row>
                <Row className="mt-4 pd-4">
                    {
                        quickBooksInvoices && quickBooksInvoices.QueryResponse && 
                        quickBooksInvoices.QueryResponse.Invoice.length > 0 &&
                        <Col xs="12" className='bg-secondary pd-4'>
                            <Table responsive striped>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>SYNC TOKEN</th>
                                        <th>DOC NUMBER</th>
                                        <th>CUSTOMER REF</th>
                                        <th>LINE</th>
                                        <th>BALANCE</th>
                                        <th>DUE DATE</th>
                                        <th>CREATE TIME</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    quickBooksInvoices.QueryResponse.Invoice.map(item => {
                                        return (
                                            <tr key={item.Id}>
                                                <td>{item.Id}</td>
                                                <td>{item.SyncToken}</td>
                                                <td>{item.DocNumber}</td>
                                                <td>{JSON.stringify(item.CustomerRef)}</td>
                                                <td>{JSON.stringify(item.Line)}</td>
                                                <td>{item.Balance}</td>
                                                <td>{item.DueDate}</td>
                                                <td>{item.MetaData.CreateTime}</td>
                                                <td>
                                                    <Button onClick={() => handleUpdateInvoice(item)} color="primary">
                                                        <i className="icon-pencil" /> {` Update Invoice`}
                                                    </Button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </Table>
                        </Col>
                    }
                </Row>
            </div>
        )
    }
}

export default GetListInvoice;