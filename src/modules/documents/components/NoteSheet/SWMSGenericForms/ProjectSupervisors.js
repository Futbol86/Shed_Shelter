import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field, FieldArray} from "redux-form";
import {FormattedMessage} from "react-intl";
import {Form, Row, Col, Table, Label, Button} from 'reactstrap';
import {FieldInputPure} from "../../../../../components/common/Form";
import FieldDatePicker from "../../../../../components/common/Form/FieldDatePicker";

const renderProjectSupervisors = ({fields, handleRemove}) => {
    return (
        <React.Fragment>
            <Row className="mb-2">
                <Col md="11">
                    <h4><FormattedMessage id="app.docs.Project_Supervisors" defaultMessage="Project Supervisors" />:</h4>
                </Col>
                <Col md="1">
                    <Button color="primary" onClick={() => fields.push({})}>
                        <i className="icon-plus" />{` `}
                        <FormattedMessage id="app.Add" defaultMessage="Add" />
                    </Button>
                </Col>
            </Row>
            <Row className="mb-2">
                <Col md="4" className="text-center">
                    <strong><FormattedMessage id="app.Name" defaultMessage="Name"/></strong>
                </Col>
                <Col md="4" className="text-center">
                    <strong><FormattedMessage id="app.docs.Signature" defaultMessage="Signature"/></strong>
                </Col>
                <Col md="3" className="text-center">
                    <strong><FormattedMessage id="app.contruction.Date" defaultMessage="Date"/></strong>
                </Col>
            </Row>
            {
                fields.map((member, idx) => {
                    return (
                        <Row key={idx} className="mb-2">
                            <Col md="4" className="text-center">
                                <Field name={`${member}.name`} type="text" component={FieldInputPure} className="text-center"/>
                            </Col>
                            <Col md="4" className="text-center">
                                Signature
                            </Col>
                            <Col md="3" className="text-center">
                                <Field  name={`${member}.date`} type="date" component={FieldDatePicker}
                                        className="form-control form-control-sm text-center"
                                        placeholderText="DD/MM/YYYY" dateFormat="dd/MM/yyyy"/>
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

class ProjectSupervisors extends Component {
    render(){
        return (
            <Row className="mb-2">
                <Col md="12">
                    <FieldArray name="projectSupervisors" component={renderProjectSupervisors} handleRemove={this.props.handleProjectSupervisorsRemove}/>
                </Col>
            </Row>
        );
    }
}

export default ProjectSupervisors;