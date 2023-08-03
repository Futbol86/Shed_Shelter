import React, {Component} from 'react';
import {Field, FieldArray} from "redux-form";
import {FormattedMessage} from "react-intl";
import {Form, Row, Col, Label, Button} from 'reactstrap';
import {FieldInputPure} from "../../../../../components/common/Form";

const renderPrintNameTables = ({fields, handleRemove}) => {
    return (
        <React.Fragment>
            <Row className="mb-2">
                <Col md="12">
                    <Button color="primary" onClick={() => fields.push({})}>
                        <i className="icon-plus" />{` `}
                        <FormattedMessage id="app.Add" defaultMessage="Add" />
                    </Button>
                </Col>
            </Row>
            <Row className="mb-2">
                <Col md="1">
                    <strong><FormattedMessage id="app.docs.#" defaultMessage="#"/></strong>
                </Col>
                <Col md="6"> 
                    <strong><FormattedMessage id="app.docs.Print_Name" defaultMessage="Print Name"/></strong>
                </Col>
                <Col md="3"> 
                    <strong><FormattedMessage id="app.docs.Signature" defaultMessage="Signature"/></strong>
                </Col>
            </Row>
            {
                fields.map((member, idx) => {
                    return (
                        <Row key={idx} className="mb-2">
                            <Col md="1">
                                {idx + 1}
                            </Col>
                            <Col md="5">
                                <Field name={`${member}.printName`} type="text" component={FieldInputPure}/>
                            </Col>
                            <Col md="3">Signature</Col>
                            <Col md="3">
                                <button type="button" className="btn btn-link" title="Remove" 
                                        onClick={() => handleRemove(fields, idx)}>
                                    <i className="icon-minus" />
                                </button>
                            </Col>
                        </Row>
                    );
                })
            }
        </React.Fragment>
    )
};

class PrintNameSafetyForm extends Component {
    render(){
        return (
            <React.Fragment>
                <Row className="mb-2">
                    <Col md={{size: 6, offset: 6}}>
                        <strong><Label className="text-danger">STEP 4</Label></strong>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col md="12">
                        <FieldArray name="signatureNames" component={renderPrintNameTables} handleRemove={this.props.handlePrintNameRemove}/>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default PrintNameSafetyForm;