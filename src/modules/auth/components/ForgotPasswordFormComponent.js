import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Container, Row, Col, CardGroup, Card, CardBody, Form, Alert} from 'reactstrap';
import {Field} from 'redux-form';
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import {FormattedMessage} from 'react-intl';

import AuthRightCardComponent from './AuthRightCardComponent';
import {ReCaptcha} from "../../../components/common/Form";
import {FieldStandard} from "../../../components/common/Form";

class ForgotPasswordFormComponent extends Component {
    render() {
        const {handleSubmit, submitSucceeded, submitting, error, invalid} = this.props;
        return (
            <Container>
                <Row className="justify-content-center">
                    <Col md="8">
                        {submitSucceeded ?
                            <Alert color="success">
                                <FormattedMessage id="app.auth.Please_Check_your_email_and_follow_instruction" defaultMessage="Please Check your email and follow resetting instruction." />
                                <br /><NavLink to={`/auth/login`}><FormattedMessage id="app.auth.Return_to_LOGIN" defaultMessage="Return to LOGIN" /></NavLink>.
                            </Alert>
                            : <CardGroup>
                                <Card className="p-4">
                                    <CardBody>
                                        <Form onSubmit={handleSubmit}>
                                            <h1><FormattedMessage id="app.auth.Forgot_Password" defaultMessage="Forgot Password" /></h1>
                                            <p className="text-muted">
                                                <FormattedMessage id="app.auth.Provide_your_email_to_continue" defaultMessage="Provide your email to continue" />
                                            </p>
                                            {error && <Alert color="danger"><FormattedMessage id="app.Error" defaultMessage="Error" />: {error}</Alert>}
                                            <Field name="email" type="text" label="Your Email Address"
                                                   iconClassName="icon-user" className="mb-3"
                                                   component={FieldStandard}/>
                                            <Field name='captcharesponse' component={ReCaptcha}/>
                                            <Row>
                                                <Col xs="6">
                                                    <LaddaButton
                                                        loading={submitting}
                                                        disabled={submitting || invalid}
                                                        data-size={L}
                                                        data-style={EXPAND_LEFT}
                                                        data-color="green"
                                                        data-spinner-lines={12}
                                                        className="btn btn-dark px-4"
                                                        type="submit"
                                                    >
                                                        {/*<span className="ladda-label">*/}
                                                        <FormattedMessage id="app.auth.Request_Password" defaultMessage="Request Password" />
                                                        {/*</span>*/}
                                                    </LaddaButton>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </CardBody>
                                </Card>
                                <AuthRightCardComponent />
                            </CardGroup>
                        }
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default ForgotPasswordFormComponent;