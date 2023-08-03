import React, {Component} from 'react';
import { Field, FieldArray } from "redux-form";
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import { Col, Row, Button, Label, Card, CardHeader, CardBody, CardFooter, Table, Form } from 'reactstrap';
import { FieldInputPure, FieldDropdownList, FieldLevelValidation } from "../../../../../components/common/Form";

class GetOneItem extends Component {
    render() {
        const {
            ItemId, quickBooksItem, doQuickBooksGetAItem,
            handleUpdateItem
        } = this.props;

        return (
            <div>
                <Row>
                    <Col xs="12" className='d-flex justify-content-start'>
                        <h4>Get One Item</h4>                   
                    </Col>
                    <Col xs={4}>                     
                        <Label>Please press 'Item Id' before press button</Label>
                    </Col>
                    <Col xs={4}>                     
                        <Field name="ItemId" type="number" component={FieldInputPure} 
                                parse={(value) => value && parseFloat(value)} />
                    </Col>
                    <Col xs={4}>
                        <Button color="secondary" className="ml-4" 
                                onClick={() => doQuickBooksGetAItem({DataType: "item", DataId: ItemId, MinorVersion: 4})}
                                disabled={!ItemId || ItemId === 0}>
                        Get One Item
                        </Button>
                    </Col>
                </Row>
                {
                    quickBooksItem && quickBooksItem.Item &&
                    <div className="mt-4">
                        <Row className="bg-secondary">
                            <Col xs="4" className='bg-secondary pd-4'>
                                <b>Sync Token</b>
                            </Col>
                            <Col xs="4" className='bg-secondary pd-4'>
                                { quickBooksItem && quickBooksItem.Item.SyncToken }
                            </Col>
                        </Row>
                        <Row className="bg-secondary">
                            <Col xs="4" className='bg-secondary pd-4'>
                                <b>Name</b>
                            </Col>
                            <Col xs="4" className='bg-secondary pd-4'>
                                { quickBooksItem && quickBooksItem.Item.Name }
                            </Col>
                        </Row>
                        <Row className="bg-secondary">
                            <Col xs="4">
                                <b>Type</b>
                            </Col>
                            <Col xs="4">
                                { quickBooksItem && quickBooksItem.Item.Type }
                            </Col>
                        </Row>
                        <Row className="bg-secondary">
                            <Col xs="4">
                                <b>Purchase Cost</b>
                            </Col>
                            <Col xs="4">
                                { quickBooksItem && quickBooksItem.Item.PurchaseCost }
                            </Col>
                        </Row>
                        <Row className="bg-secondary">
                            <Col xs="4">
                                <b>Income Account Ref</b>
                            </Col>
                            <Col xs="4">
                                { JSON.stringify(quickBooksItem && quickBooksItem.Item.IncomeAccountRef) }
                            </Col>
                        </Row>
                        <Row className="bg-secondary">
                            <Col xs="4">
                                <b>Expense Account Ref</b>
                            </Col>
                            <Col xs="4">
                                { JSON.stringify(quickBooksItem && quickBooksItem.Item.ExpenseAccountRef) }
                            </Col>
                        </Row>
                        <Row className="bg-secondary">
                            <Col xs="4">
                                <b>Parent Ref</b>
                            </Col>
                            <Col xs="4">
                                { JSON.stringify(quickBooksItem && quickBooksItem.Item.ParentRef) }
                            </Col>
                        </Row>
                        <Row className="bg-secondary">
                            <Col xs="4">
                                <b>Description</b>
                            </Col>
                            <Col xs="4">
                                { quickBooksItem && quickBooksItem.Item.Description }
                            </Col>
                        </Row>
                    </div>
                }
            </div>
        )
    }
}

export default GetOneItem;