import React, {Component} from 'react';
import { Field, FieldArray } from "redux-form";
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import { Col, Row, Button, Label, Card, CardHeader, CardBody, CardFooter, Table, Form } from 'reactstrap';
import { FieldInputPure, FieldDropdownList, FieldLevelValidation } from "../../../../../components/common/Form";

class GetListAccount extends Component {
    render() {
        const {
            quickBooksAccounts, doQuickBooksGetAccounts
        } = this.props;

        return (
            <div>
                <Row>
                    <Col xs="12" className='d-flex justify-content-start'>
                        <h4>Get Accounts</h4>
                        <Button color="secondary" className="ml-4" 
                                onClick={() => doQuickBooksGetAccounts({
                                    querySQL: "select * from Account where MetaData.CreateTime > '2023-07-22' order by Id DESC"
                                })}>
                            Get Accounts
                        </Button>
                    </Col>
                </Row>
                <Row className="mt-4 pd-4">
                    {
                        quickBooksAccounts && quickBooksAccounts.QueryResponse && 
                        quickBooksAccounts.QueryResponse.Account.length > 0 &&
                        <Col xs="12" className='bg-secondary pd-4'>
                            <Table responsive striped>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NAME</th>
                                        <th>ACCOUNT TYPE</th>
                                        <th>CLASSIFICATION</th>
                                        <th>ACTIVE</th>
                                        <th>CREATE TIME</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    quickBooksAccounts.QueryResponse.Account.map(item => {
                                        return (
                                            <tr key={item.Id}>
                                                <td>{item.Id}</td>
                                                <td>{item.Name}</td>
                                                <td>{item.AccountType}</td>
                                                <td>{item.Classification}</td>
                                                <td>{item.Active ? "true" : "false"}</td>
                                                <td>{item.MetaData.CreateTime}</td>
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

export default GetListAccount;