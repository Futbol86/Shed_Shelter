import React, {Component} from 'react';
import { Field, FieldArray } from "redux-form";
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import { Col, Row, Button, Label, Card, CardHeader, CardBody, CardFooter, Table, Form } from 'reactstrap';
import { FieldInputPure, FieldDropdownList, FieldLevelValidation } from "../../../../../components/common/Form";

class CreateNewItem extends Component {
    render() {
        const { handleSubmit, error, submitting, pristine, invalid, reset, meta } = this.props;

        return (
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col xs="12" className='d-flex justify-content-start'>
                        <h4>Create New Item</h4>                   
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col xs={4}>                     
                        <Label>ID</Label>
                    </Col>
                    <Col xs={4}>                     
                        <Field name="Id" type="text" component={FieldInputPure} readOnly={true}/>
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col xs={4}>                     
                        <Label>SyncToken</Label>
                    </Col>
                    <Col xs={4}>                     
                        <Field name="SyncToken" type="text" component={FieldInputPure} readOnly={true}/>
                    </Col>
                </Row>
                <hr />
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
                        <Label>Qty On Hand</Label>
                    </Col>
                    <Col xs={4}>                     
                        <Field name="QtyOnHand" type="number" component={FieldInputPure} 
                                parse={(value) => value && parseFloat(value)} />
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col xs={12}>                     
                        <Label>Income Account Ref</Label> <br />
                        <span className='text-danger'>
                            Fill 'value' is Id of Account have `AccountType is 'Income'`, example: <br />
                            { JSON.stringify({
                                "IncomeAccountRef": {
                                        "name": "Income Account 1",
                                        "value": 94
                                    }
                                })
                            }   
                        </span>
                    </Col>
                    <Col xs={{size: 4, offset: 4}}>      
                        <Label>Name</Label>               
                        <Field name="IncomeAccountRef.name" type="text" component={FieldInputPure} />
                    </Col>
                    <Col xs={{size: 4}}>           
                        <Label>Value</Label>          
                        <Field name="IncomeAccountRef.value" type="text" component={FieldInputPure} />
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col xs={12}>                     
                        <Label>Expense Account Ref</Label>
                        <span className='text-danger'> <br />
                            Fill 'value' is Id of Account have `AccountType is 'Cost of Goods Sold'`, example: <br />
                            { JSON.stringify({
                                "ExpenseAccountRef": {
                                        "name": "Expense Account 1",
                                        "value": 96
                                    }
                                })
                            } 
                        </span>
                    </Col>
                    <Col xs={{size: 4, offset: 4}}>      
                        <Label>Name</Label>               
                        <Field name="ExpenseAccountRef.name" type="text" component={FieldInputPure} />
                    </Col>
                    <Col xs={{size: 4}}>           
                        <Label>Value</Label>          
                        <Field name="ExpenseAccountRef.value" type="text" component={FieldInputPure} />
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col xs={4}>                     
                        <Label>Description</Label>
                    </Col>
                    <Col xs={4}>                     
                        <Field name="Description" type="text" component={FieldInputPure} />
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col xs={12} className="d-flex justify-content-end">
                        <LaddaButton data-size={L} data-style={EXPAND_LEFT} data-color="green"
                                    data-spinner-lines={12} className="btn btn-dark" type="submit"
                                    loading={submitting} disabled={submitting || invalid}>
                            Create New Item
                        </LaddaButton>
                    </Col>
                </Row>
            </Form>
        )
    }
}

export default CreateNewItem;