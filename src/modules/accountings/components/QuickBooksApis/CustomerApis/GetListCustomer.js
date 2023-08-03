import React, {Component} from 'react';
import { Field, FieldArray } from "redux-form";
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import { Col, Row, Button, Label, Card, CardHeader, CardBody, CardFooter, Table, Form } from 'reactstrap';
import { FieldInputPure, FieldDropdownList, FieldLevelValidation } from "../../../../../components/common/Form";

class GetListCustomer extends Component {
    render() {
        const {
            quickBooksCustomers, doQuickBooksGetCustomers, handleUpdateCustomer
        } = this.props;

        return (
            <div>
                <Row>
                    <Col xs="12" className='d-flex justify-content-start'>
                        <h4>Get Customers</h4>
                        <Button color="secondary" className="ml-4" 
                                onClick={() => doQuickBooksGetCustomers({
                                    querySQL: "select * from Customer where MetaData.CreateTime > '2023-07-22' order by Id DESC"
                                })}>
                            Get Customers
                        </Button>
                    </Col>
                </Row>
                <Row className="mt-4 pd-4">
                    {
                        quickBooksCustomers && quickBooksCustomers.QueryResponse && 
                        quickBooksCustomers.QueryResponse.Customer.length > 0 &&
                        <Col xs="12" className='bg-secondary pd-4'>
                            <Table responsive striped>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>SYNC TOKEN</th>
                                        <th>DISPLAY NAME</th>
                                        <th>SUFFIX</th>
                                        <th>TITLE</th>
                                        <th>MIDDLE NAME</th>
                                        <th>FAMILY NAME</th>
                                        <th>GIVEN NAME</th>
                                        <th>PRIMARY PHONE</th>
                                        <th>PRIMARY EMAIL ADDR</th>
                                        <th>CREATE TIME</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    quickBooksCustomers.QueryResponse.Customer.map(item => {
                                        return (
                                            <tr key={item.Id}>
                                                <td>{item.Id}</td>
                                                <td>{item.SyncToken}</td>
                                                <td>{item.DisplayName}</td>
                                                <td>{item.Suffix}</td>
                                                <td>{item.Title}</td>
                                                <td>{item.MiddleName}</td>
                                                <td>{item.FamilyName}</td>
                                                <td>{item.GivenName}</td>
                                                <td>{JSON.stringify(item.PrimaryPhone)}</td>
                                                <td>{JSON.stringify(item.PrimaryEmailAddr)}</td>
                                                <td>{item.MetaData.CreateTime}</td>
                                                <td>
                                                    <Button onClick={() => handleUpdateCustomer(item)} color="primary">
                                                        <i className="icon-pencil" /> {` Update Customer`}
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

export default GetListCustomer;