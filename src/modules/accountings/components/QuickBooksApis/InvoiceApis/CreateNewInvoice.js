import React, {Component} from 'react';
import { Field, FieldArray } from "redux-form";
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import { Col, Row, Button, Label, Card, CardHeader, CardBody, CardFooter, Table, Form } from 'reactstrap';
import { FieldInputPure, FieldDropdownList, FieldLevelValidation } from "../../../../../components/common/Form";
import { INVOICE_LINE_DETAIL_TYPE  } from "../../../constants";

const renderAddLines = ({ fields, meta: { touched, error, submitFailed } }) => {
    let invoiceLineDetailTypeList = [];

    INVOICE_LINE_DETAIL_TYPE.map(item => {
        invoiceLineDetailTypeList.push({ code: item.code, name: item.name, });
    });

    return (
        <div className='container'>
            <Row>
                <Col xs="12" className='d-flex flex-wrap justify-content-start'>
                    <button type="button" className="btn btn-secondary" 
                            onClick={
                                () => {
                                    fields.push();
                                }
                            }>
                        <i className="icon-plus" /> Add Line <span className="text-red">(*)</span>
                    </button>
                    <br />
                </Col>
            </Row>
            {
                fields && fields.map((member, index) => {
                    let _detailType = fields.get(index)?.["DetailType"];
                    return (
                        <div key={index} className='mt-2 mb-2'>
                            <Row>
                                <Col xs={12}>
                                    <Label>
                                        <u>Line{` ${index + 1}`}:</u>
                                    </Label>
                                    <button type="button" className="btn btn-link pl-3 pt-0" title="Remove" 
                                            onClick={() => {
                                                    fields.remove(index);
                                                }
                                            }>
                                        <i className="icon-minus" />
                                    </button>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={6}>
                                    <Label>
                                        <strong>Detail Type:</strong><span className="text-red">(*)</span>
                                    </Label>
                                    <Field name={`${member}.DetailType`} className="mb-2" 
                                           textField="name" valueField="code" titleOption="-- Select --"
                                           data={invoiceLineDetailTypeList} component={FieldDropdownList} 
                                           validate={FieldLevelValidation.validateRequired}/>   
                                </Col>
                                <Col xs={6}>
                                    <Label>
                                        <strong>Amount:</strong><span className="text-red">(*)</span>
                                    </Label>
                                    <Field name={`${member}.Amount`} type="number" component={FieldInputPure} 
                                        parse={(value) => value && parseFloat(value)} />
                                </Col>
                            </Row>
                            {
                                _detailType &&
                                <>
                                    <Row>
                                        <Col xs={6}>
                                            <Label>
                                                <strong>{fields.get(index)?.["DetailType"]}:</strong>
                                            </Label>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <span className='text-danger'> <br />
                                                Fill 'value' is Id of Item
                                            </span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={6}>
                                            <Label>
                                                <strong>ItemRef.Name</strong>
                                            </Label>
                                            <Field name={`${member}.${_detailType}.ItemRef.name`} type="text" component={FieldInputPure} />
                                        </Col>
                                        <Col xs={6}>
                                            <Label>
                                                <strong>ItemRef.Value</strong><span className="text-red">(*)</span>
                                            </Label>
                                            <Field name={`${member}.${_detailType}.ItemRef.value`} type="number" component={FieldInputPure} 
                                                parse={(value) => value && parseFloat(value)} />
                                        </Col>
                                    </Row>
                                </>
                            }
                        </div>
                    )
                })
            }
            <Row className="mt-2">
                <Col xs="12" className='text-center'>
                    {submitFailed && error && <i className='text-danger'>{error}</i>}
                </Col>
            </Row>
        </div>
    )
}

class CreateNewInvoice extends Component {
    render() {
        const { handleSubmit, error, submitting, pristine, invalid, reset, meta } = this.props;

        return (
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col xs="12" className='d-flex justify-content-start'>
                        <h4>Create New Invoice</h4>                   
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
                <Row className="mt-2">
                    <Col xs={12}>                     
                        <Label>Customer Ref</Label> <span className="text-red">(*)</span>
                    </Col>
                    <Col xs={12}>
                        <span className='text-danger'> <br />
                            Fill 'value' is Id of Customer
                        </span> 
                    </Col>
                    <Col xs={{size: 4, offset: 4}}>      
                        <Label>Name</Label>               
                        <Field name="CustomerRef.name" type="text" component={FieldInputPure} />
                    </Col>
                    <Col xs={{size: 4}}>     
                        <Label>Value</Label> <span className="text-red">(*)</span>       
                        <Field name="CustomerRef.value" type="text" component={FieldInputPure} />
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col xs={12} className="mt-1">
                        <FieldArray name="Line" component={renderAddLines} />
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col xs={12} className="d-flex justify-content-end">
                        <LaddaButton data-size={L} data-style={EXPAND_LEFT} data-color="green"
                                    data-spinner-lines={12} className="btn btn-dark" type="submit"
                                    loading={submitting} disabled={submitting || invalid}>
                            Create New Invoice
                        </LaddaButton>
                    </Col>
                </Row>
            </Form>
        )
    }
}

export default CreateNewInvoice;