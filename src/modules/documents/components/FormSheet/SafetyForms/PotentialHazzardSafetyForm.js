import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field, FieldArray} from "redux-form";
import {FormattedMessage} from "react-intl";
import {Form, Row, Col, Table, Label, Button} from 'reactstrap';
import {FieldInputPure} from "../../../../../components/common/Form";

const renderPotentialHazzard = ({fields, handleRemove}) => {
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
                <Col md="2">
                    <strong><FormattedMessage id="app.docs.What_Are_The_Basic_Steps" defaultMessage="What are the Basic Steps?"/></strong>
                </Col>
                <Col md="3">
                    <strong><FormattedMessage id="app.docs.Potential_Hazards" defaultMessage="Potential Hazards?"/></strong>
                </Col>
                <Col md="1">
                    <strong><FormattedMessage id="app.docs.Risk_Ranking" defaultMessage="Risk Ranking"/></strong>
                </Col>
                <Col md="2">
                    <strong><FormattedMessage id="app.docs.Hazard Controls" defaultMessage="Hazard Controls"/></strong>
                </Col>
                <Col md="2">
                    <strong><FormattedMessage id="app.docs.Who_Will_Ensure_That_This_Is_Done" defaultMessage="Who will ensure that this is done?"/></strong>
                </Col>
            </Row>
            {
                fields.map((member, idx) => {
                    return (
                        <Row key={idx} className="mb-2">
                            <Col md="1">
                                {idx + 1}
                            </Col>
                            <Col md="2">
                                <Field name={`${member}.basicSteps`} type="number" component={FieldInputPure}/>
                            </Col>
                            <Col md="3">
                                <Field name={`${member}.potentialHazzards`} type="text" component={FieldInputPure}/>
                            </Col>
                            <Col md="1">
                                <Field name={`${member}.riskRankings`} type="text" component={FieldInputPure}/>
                            </Col>
                            <Col md="2">
                                <Field name={`${member}.hazzardControls`} type="text" component={FieldInputPure}/>
                            </Col>
                            <Col md="2">
                                <Field name={`${member}.whoWillEnsures`} type="text" component={FieldInputPure}/>
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

class PotentialHazzardSafetyForm extends Component {
    render(){
        return (
            <React.Fragment>
                <Row className="mb-2">
                    <Col md={{size: 2, offset: 10}}>
                        <strong><Label className="text-danger">STEP 3</Label></strong>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col md="12">
                        <FieldArray name="jHABasicSteps" component={renderPotentialHazzard} handleRemove={this.props.handlePotentialHazzardRemove}/>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default PotentialHazzardSafetyForm;