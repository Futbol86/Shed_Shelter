import React, {Component} from 'react';
import { Field, FieldArray } from "redux-form";
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import { Col, Row, Button, Label, Card, CardHeader, CardBody, CardFooter, Table, Form } from 'reactstrap';
import { FieldInputPure, FieldDropdownList, FieldLevelValidation } from "../../../../../components/common/Form";

class CreateNewCustomer extends Component {
    render() {
        const { handleSubmit, error, submitting, pristine, invalid, reset, meta } = this.props;

        return (
            <div>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col xs="12" className='d-flex justify-content-start'>
                            <h4>Create New Customer</h4>                   
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
                            <Label>Display Name</Label>
                        </Col>
                        <Col xs={4}>                     
                            <Field name="DisplayName" type="text" component={FieldInputPure} />
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col xs={4}>                     
                            <Label>Suffix</Label>
                        </Col>
                        <Col xs={4}>                     
                            <Field name="Suffix" type="text" component={FieldInputPure} />
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col xs={4}>                     
                            <Label>Title</Label>
                        </Col>
                        <Col xs={4}>                     
                            <Field name="Title" type="text" component={FieldInputPure} />
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col xs={4}>                     
                            <Label>Middle Name</Label>
                        </Col>
                        <Col xs={4}>                     
                            <Field name="MiddleName" type="text" component={FieldInputPure} />
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col xs={4}>                     
                            <Label>Family Name</Label>
                        </Col>
                        <Col xs={4}>                     
                            <Field name="FamilyName" type="text" component={FieldInputPure} />
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col xs={4}>                     
                            <Label>Given Name</Label>
                        </Col>
                        <Col xs={4}>                     
                            <Field name="GivenName" type="text" component={FieldInputPure} />
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
                </Form>
            </div>
        )
    }
}

export default CreateNewCustomer;