import React, {Component} from 'react';
import { Field, FieldArray } from "redux-form";
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import { Col, Row, Button, Label, Card, CardHeader, CardBody, CardFooter, Table, Form } from 'reactstrap';
import { FieldInputPure, FieldDropdownList, FieldLevelValidation } from "../../../../../components/common/Form";

class GetListItem extends Component {
    render() {
        const {
            quickBooksItems, doQuickBooksGetItems,
            handleUpdateItem
        } = this.props;

        return (
            <div>
                <Row>
                    <Col xs="12" className='d-flex justify-content-start'>
                        <h4>Get Items</h4>
                        <Button color="secondary" className="ml-4" 
                                onClick={() => doQuickBooksGetItems({
                                    querySQL: "select * from Item where MetaData.CreateTime > '2023-07-22' order by Id DESC",
                                })}>
                            Get Items
                        </Button>
                    </Col>
                </Row>
                <Row className="mt-4 pd-4">
                    {
                        quickBooksItems && quickBooksItems.QueryResponse && 
                        quickBooksItems.QueryResponse.Item.length > 0 &&
                        <Col xs="12" className='bg-secondary pd-4'>
                            <Table responsive striped>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>SYNC TOKEN</th>
                                        <th>NAME</th>
                                        <th>TYPE</th>
                                        <th>QTY ON HAND</th>
                                        <th>PURCHASE COST</th>
                                        <th>INCOME ACCOUNT REF</th>
                                        <th>EXPENSE ACCOUNT REF</th>
                                        <th>DESCRIPTION</th>
                                        <th>CREATE TIME</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    quickBooksItems.QueryResponse.Item.map(item => {
                                        return (
                                            <tr key={item.Id}>
                                                <td>{item.Id}</td>
                                                <td>{item.SyncToken}</td>
                                                <td>{item.Name}</td>
                                                <td>{item.Type}</td>
                                                <td>{item.QtyOnHand}</td>
                                                <td>{item.PurchaseCost}</td>
                                                <td>{JSON.stringify(item.IncomeAccountRef)}</td>
                                                <td>{JSON.stringify(item.ExpenseAccountRef)}</td>
                                                <td>{item.Description}</td>
                                                <td>{item.MetaData.CreateTime}</td>
                                                <td>
                                                    <Button onClick={() => handleUpdateItem(item)} color="primary">
                                                        <i className="icon-pencil" /> {` Update Item`}
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

export default GetListItem;