import React, {Component} from 'react';
import {Field} from "redux-form";
import {FormattedMessage} from "react-intl";
import {Row, Col, Table, Label} from 'reactstrap';
import {FieldInputPure} from "../../../../../components/common/Form";

class HazzardPresentSafetyForm extends Component {
    render(){
        return (
            <React.Fragment>
                <Row className="mb-2">
                    <Col md={{size: 2, offset: 10}}>
                        <strong><Label className="text-danger">STEP 2</Label></strong>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col md="4">
                        <strong><FormattedMessage id="app.docs.Hazard_Present" defaultMessage="Hazard Present"/></strong>
                    </Col>
                    <Col md="8">
                        <strong><FormattedMessage id="app.docs.Comment" defaultMessage="Comment"/></strong>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col md="4">
                        <FormattedMessage id="app.docs.Falls_Falling_Objects" defaultMessage="Falls/Falling Objects"/>
                    </Col>
                    <Col md="8">
                        <Field name="fallsFallingObjects" component="textarea" className="form-control font-xs" rows="2"/>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col md="4">
                        <FormattedMessage id="app.docs.Plant_Traffic_Interaction" defaultMessage="Plant/Traffic Interaction"/>
                    </Col>
                    <Col md="8">
                        <Field name="plantTrafficInteraction" component="textarea" className="form-control font-xs" rows="2"/>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col md="4">
                        <FormattedMessage id="app.docs.Electrical" defaultMessage="Electrical"/>
                    </Col>
                    <Col md="8">
                        <Field name="electrical" component="textarea" className="form-control font-xs" rows="2"/>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col md="4">
                        <FormattedMessage id="app.docs.Confined_Space" defaultMessage="Confined Space"/>
                    </Col>
                    <Col md="8">
                        <Field name="confinedSpace" component="textarea" className="form-control font-xs" rows="2"/>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col md="4">
                        <FormattedMessage id="app.docs.Hazardous_Chemicals" defaultMessage="Hazardous Chemicals"/>
                    </Col>
                    <Col md="8">
                        <Field name="hazardousChemicals" component="textarea" className="form-control font-xs" rows="2"/>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col md="4">
                        <FormattedMessage id="app.docs.Fires_Explosions" defaultMessage="Fires/Explosions"/>
                    </Col>
                    <Col md="8">
                        <Field name="firesExplosions" component="textarea" className="form-control font-xs" rows="2"/>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col md="4">
                        <FormattedMessage id="app.docs.Hot_Work" defaultMessage="Hot Work"/>
                    </Col>
                    <Col md="8">
                        <Field name="hotWork" component="textarea" className="form-control font-xs" rows="2"/>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col md="4">
                        <FormattedMessage id="app.docs.Environment" defaultMessage="Environment"/>
                    </Col>
                    <Col md="8">
                        <Field name="environment" component="textarea" className="form-control font-xs" rows="2"/>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col md="4">
                        <FormattedMessage id="app.docs.Services" defaultMessage="Services (O/head/U/ground)"/>
                    </Col>
                    <Col md="8">
                        <Field name="services" component="textarea" className="form-control font-xs" rows="2"/>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col md="4">
                        <FormattedMessage id="app.docs.Crush_Injuries" defaultMessage="Crush Injuries"/>
                    </Col>
                    <Col md="8">
                        <Field name="crushInjuries" component="textarea" className="form-control font-xs" rows="2"/>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col md="4">
                        <FormattedMessage id="app.docs.Pressure_Projectiles" defaultMessage="Pressure/Projectiles"/>
                    </Col>
                    <Col md="8">
                        <Field name="pressureProjectiles" component="textarea" className="form-control font-xs" rows="2"/>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col md="4">
                        <FormattedMessage id="app.docs.Water_Hazards" defaultMessage="Water Hazards"/>
                    </Col>
                    <Col md="8">
                        <Field name="waterHazards" component="textarea" className="form-control font-xs" rows="2"/>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col md="4">
                        <FormattedMessage id="app.docs.Access_Hazards" defaultMessage="Access Hazards"/>
                    </Col>
                    <Col md="8">
                        <Field name="accessHazards" component="textarea" className="form-control font-xs" rows="2"/>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col md="4">
                        <FormattedMessage id="app.docs.Unstable_Ground" defaultMessage="Unstable Ground"/>
                    </Col>
                    <Col md="8">
                        <Field name="unstableGround" component="textarea" className="form-control font-xs" rows="2"/>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col md="4">
                        <FormattedMessage id="app.docs.Other" defaultMessage="Other"/>
                    </Col>
                    <Col md="8">
                        <Field name="other" component="textarea" className="form-control font-xs" rows="4"/>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default HazzardPresentSafetyForm;