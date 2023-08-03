import React, {Component} from 'react';
import {Field} from 'redux-form';
import {NavLink} from 'react-router-dom';
import {Container, Row, Col, CardGroup, Card, CardBody, Button, Form, Alert} from 'reactstrap';
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import {FormattedMessage} from 'react-intl';

import {FieldPrepend} from '../../../components/common/Form';
import AuthRightCardComponent from './AuthRightCardComponent';

class AuthSigninComponent extends Component {
    render() {
        const {handleSubmit, submitting, error, invalid} = this.props;
        return (
            <Container>
                <Row className="justify-content-center">
                    <Col md="8">
                        <CardGroup>
                            <Card className="p-4">
                                <CardBody>
                                    <Form onSubmit={handleSubmit}>
                                        <h1><FormattedMessage id="app.auth.Login" defaultMessage="Login" /></h1>
                                        <p className="text-muted">
                                            <FormattedMessage id="app.auth.Sign_In_to_your_account" defaultMessage="Sign In to your account" />
                                        </p>
                                        {error && <Alert color="danger"><p><FormattedMessage id="app.Error" defaultMessage="Error" />: {error}</p></Alert>}
                                        <Field name="email" type="text" label="Email" iconClassName="icon-user" className="mb-3"
                                               component={FieldPrepend} />
                                        <Field name="password" type="password" label="Password" iconClassName="icon-lock" className="mb-4"
                                               component={FieldPrepend} />
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
                                                    <FormattedMessage id="app.auth.Login" defaultMessage="Login" />
                                                    {/*</span>*/}
                                                </LaddaButton>
                                            </Col>
                                            <Col xs="6" className="text-right">
                                                <Button color="link" className="px-0" type="button">
                                                    <NavLink to={`/auth/forgot-password`}>
                                                        <FormattedMessage id="app.auth.Forgot_Password" defaultMessage="Forgot password" />?
                                                    </NavLink>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </CardBody>
                            </Card>
                            <AuthRightCardComponent />
                        </CardGroup>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default AuthSigninComponent;