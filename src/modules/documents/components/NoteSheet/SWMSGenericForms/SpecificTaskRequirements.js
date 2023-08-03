import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field, FieldArray} from "redux-form";
import {FormattedMessage} from "react-intl";
import {Form, Row, Col, Table, Label, Button} from 'reactstrap';

const renderSpecificTaskRequirements = ({fields, handleRemove}) => {
    return (
        <React.Fragment>
            <Row className="mb-2">
                <Col md="11">
                    <h4><FormattedMessage id="app.docs.Specific_Task_Requirements" defaultMessage="Specific Task Requirements" />:</h4>
                </Col>
                <Col md="1">
                    <Button color="primary" onClick={() => fields.push({})}>
                        <i className="icon-plus" />{` `}
                        <FormattedMessage id="app.Add" defaultMessage="Add" />
                    </Button>
                </Col>
            </Row>
            {
                fields.map((member, idx) => {
                    return (
                        <Row key={idx} className="mb-2">
                            <Col md="11">
                                <Field name={`${member}.specificTaskRequirement`} component="textarea" className="form-control font-xs" rows="5"/>
                            </Col>
                            <Col md="1">
                                <button type="button" className="btn btn-link" title="Remove" 
                                        onClick={() => handleRemove(fields, idx)}>
                                    <i className="icon-minus" />
                                </button>
                            </Col>
                        </Row>
                    )
                })                 
            }
        </React.Fragment>
    )
};

class SpecificTaskRequirements extends Component {
    render(){
        return (
            <Row className="mb-2">
                <Col md="12">
                    <FieldArray name="specificTaskRequirements" component={renderSpecificTaskRequirements} handleRemove={this.props.handleSpecificTaskRequirementsRemove}/>
                </Col>
            </Row>
        );
    }
}

export default SpecificTaskRequirements;