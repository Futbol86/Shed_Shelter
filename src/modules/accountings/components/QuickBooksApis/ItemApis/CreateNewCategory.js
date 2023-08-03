import React, {Component} from 'react';
import { Field, FieldArray } from "redux-form";
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import { Col, Row, Button, Label, Card, CardHeader, CardBody, CardFooter, Table, Form } from 'reactstrap';
import { FieldInputPure, FieldDropdownList, FieldLevelValidation } from "../../../../../components/common/Form";
import { ITEM_TYPE  } from "../../../constants";

class CreateNewCategory extends Component {
    render() {
        const { SubItem, handleSubmit, error, submitting, pristine, invalid, reset, meta } = this.props;
        let itemTypeList = [];

        ITEM_TYPE.map(item => {
            itemTypeList.push({ code: item.code, name: item.name, });
        });

        return (
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col xs="12" className='d-flex justify-content-start'>
                        <h4>Create New Category</h4>                   
                    </Col>
                </Row>
                <hr />
                {/* <Row>
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
                </Row> */}
                <hr />
                <Row className="mt-2">
                    <Col xs={4}>                     
                        <Label>Name</Label>
                    </Col>
                    <Col xs={4}>                     
                        <Field name="Name" type="text" component={FieldInputPure} />
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col xs={4}>                     
                        <Label>Type</Label>
                    </Col>
                    <Col xs={4}> 
                        <Field name="Type" className="mb-2" 
                               textField="name" valueField="code" titleOption="-- Select --"
                               data={itemTypeList} component={FieldDropdownList} 
                               validate={FieldLevelValidation.validateRequired}/>
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col xs={4}>                     
                        <Label>Sub Item</Label>
                    </Col>
                    <Col xs={4}>  
                        <Field name="SubItem" component="input" type="checkbox" />
                    </Col>
                </Row>
                {
                    SubItem &&
                    <Row className="mt-2">
                        <Col xs={12}>                     
                            <Label>Parent Ref</Label>
                            <span className='text-danger'> <br />
                                Fill 'value' is Id of Item 
                            </span>
                        </Col>
                        <Col xs={{size: 4, offset: 4}}>      
                            <Label>Name</Label>               
                            <Field name="ParentRef.name" type="text" component={FieldInputPure} />
                        </Col>
                        <Col xs={{size: 4}}>           
                            <Label>Value</Label>          
                            <Field name="ParentRef.value" type="text" component={FieldInputPure} />
                        </Col>
                    </Row>
                }
                <Row className="mt-4">
                    <Col xs={12} className="d-flex justify-content-end">
                        <LaddaButton data-size={L} data-style={EXPAND_LEFT} data-color="green"
                                    data-spinner-lines={12} className="btn btn-dark" type="submit"
                                    loading={submitting} disabled={submitting || invalid}>
                            Create New Category
                        </LaddaButton>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col xs={12}>
                        <span className='text-danger'>{error}</span>
                    </Col>
                </Row>
            </Form>
        )
    }
}

export default CreateNewCategory;