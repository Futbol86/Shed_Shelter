import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field, FieldArray} from "redux-form";
import {FormattedMessage} from "react-intl";
import {Form, Row, Col, Table, Label, Button} from 'reactstrap';
import {RISK_CONTROL_TYPES} from "../../../constants";
import {FieldDropdownList} from "../../../../../components/common/Form";

const renderPossibleHazards = ({fields, handleRemove}) => {
    const listRiskControlType = RISK_CONTROL_TYPES.map(item => { 
        return {
            name: item.name,
            code: item.code 
        }
    });

    return (
        <React.Fragment>
            <Row className="mb-2">
                <Col md="11">
                    <h4><FormattedMessage id="app.docs.Possible_Hazards" defaultMessage="Possible Hazards" />:</h4>
                </Col>
                <Col md={{size: 1, offset: 11}}>
                    <Button color="primary" onClick={() => fields.push({})}>
                        <i className="icon-plus" />{` `}
                        <FormattedMessage id="app.Add" defaultMessage="Add" />
                    </Button>
                </Col>
            </Row>
            <Row className="mb-2">
                <Col md="1" className="text-center">
                    <strong><FormattedMessage id="app.docs.Procedural_Step" defaultMessage="Procedural step(s)"/></strong>
                </Col>
                <Col md="3" className="text-center">
                    <strong><FormattedMessage id="app.docs.Possible_Hazard" defaultMessage="Possible hazard(s)"/></strong>
                </Col>
                <Col md="1" className="text-center">
                    <strong><FormattedMessage id="app.docs.R1" defaultMessage="R1"/></strong>
                </Col>
                <Col md="4" className="text-center">
                    <strong><FormattedMessage id="app.docs.Safety_Control" defaultMessage="Safety control(s)"/></strong>
                </Col>
                <Col md="1" className="text-center">
                    <strong><FormattedMessage id="app.docs.R2" defaultMessage="R2"/></strong>
                </Col>
                <Col md="1" className="text-center">
                    <strong><FormattedMessage id="app.docs.Who_Is_Responsible" defaultMessage="Who is Responsible"/></strong>
                </Col>
            </Row>
            {
                fields.map((member, idx) => {
                    return (
                        <Row key={idx} className="mb-2">
                            <Col md="1">
                                <Field name={`${member}.proceduralStep`} component="textarea" className="form-control font-xs" rows="6"/>
                            </Col>
                            <Col md="3">
                                <Field name={`${member}.possibleHazard`} component="textarea" className="form-control font-xs" rows="6"/>
                            </Col>
                            <Col md="1">
                                <Field name={`${member}.r1`} className="form-control text-center"
                                       textField="name" valueField="code" titleOption="-- Select --"
                                       data={listRiskControlType} component={FieldDropdownList} />
                            </Col>
                            <Col md="4">
                                <Field name={`${member}.safetyControl`} component="textarea" className="form-control font-xs" rows="6"/>
                            </Col>
                            <Col md="1">
                                <Field name={`${member}.r2`} className="form-control text-center"
                                       textField="name" valueField="code" titleOption="-- Select --"
                                       data={listRiskControlType} component={FieldDropdownList} />
                            </Col>
                            <Col md="1">
                                <Field name={`${member}.whoIsResponsible`} component="textarea" className="form-control font-xs" rows="6"/>
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

class PossibleHazards extends Component {
    render(){
        return (
            <Row className="mb-2">
                <Col md="12">
                    <FieldArray name="possibleHazards" component={renderPossibleHazards} handleRemove={this.props.handlePossibleHazardRemove}/>
                </Col>
            </Row>
        );
    }
}

export default PossibleHazards;