import React from 'react';
import { Field, FieldArray } from "redux-form";
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { Form, Row, Col, Button, Label } from 'reactstrap';
import { FURNITURE_DOOR_TYPES } from '../../../../../constants';
import { FieldInputPure, FieldDropdownList, FieldLevelValidation } from "../../../../../../../components/common/Form";

const renderAddDoors = ({ fields, meta: { touched, error, submitFailed } }) => {
    let doorTypeList = [];

    Object.keys(FURNITURE_DOOR_TYPES).map(key => {
       doorTypeList.push({ code: key, name: FURNITURE_DOOR_TYPES[key].name, });
    });

    return (
        <div className='container'>
            <Row>
                <Col xs="12" className='d-flex flex-wrap justify-content-center'>
                    <button type="button" className="btn btn-secondary" 
                            onClick={
                                () => {
                                    fields.push();
                                }
                            }>
                        <i className="icon-plus" /> <FormattedMessage id="app.drawing3D.Add_Door" defaultMessage="Add Door" />
                    </button>
                    <br />
                </Col>
            </Row>
            {
                fields && fields.map((member, index) => (
                    <div key={index} className='mt-2 mb-2'>
                        <Row>
                            <Col xs={12}>
                                <Label>
                                    <u><FormattedMessage id="app.drawing3D.Door" defaultMessage="Door"/>{`  ${index + 1}`}:</u>
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
                            <Col xs={12}>
                                <Label>
                                    <strong><FormattedMessage id="app.drawing3D.From_Door_To_Left_Wall" defaultMessage="From Door To Left Wall (m)"/>:</strong>
                                </Label>
                                <Field name={`${member}.doorLeft`} type="number" component={FieldInputPure} 
                                       parse={(value) => value && parseFloat(value)} />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <Label>
                                    <strong><FormattedMessage id="app.drawing3D.Door_Type" defaultMessage="Door Type"/>:</strong>
                                </Label>
                                <Field name={`${member}.doorType`} className="mb-2" 
                                       textField="name" valueField="code" titleOption="-- Select --"
                                       data={doorTypeList} component={FieldDropdownList} 
                                       validate={FieldLevelValidation.validateRequired}/>
                            </Col>
                        </Row>
                    </div>   
                ))
            }
            <Row className="mt-2">
                <Col xs="12" className='text-center'>
                    {submitFailed && error && <i className='text-danger'>{error}</i>}
                </Col>
            </Row>
        </div>
    )
}

const AddDoorsComponent = ({ handleSubmit }) => {
    return (
        <Form onSubmit={handleSubmit}>
            <Row className="mt-2">
                <Col md={12} className="mt-1">
                    <FieldArray name="addDoors" component={renderAddDoors} />
                </Col>
            </Row>
            <hr />
            <Row className="mt-2">
                <Col md={12} className="d-flex justify-content-center">
                    <Button type="submit" color="secondary" disabled={false}>
                        <i className="fa fa-plus-square" />{` `}
                        <FormattedMessage id="app.drawing3D.Attach_Doors_Into_Wall" defaultMessage="Attach Doors Into Wall" />
                    </Button>
                </Col>
            </Row>
        </Form>
    )
};

export default AddDoorsComponent;