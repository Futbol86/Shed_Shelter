import React, {Component} from 'react';
import {Field} from 'redux-form';
import {NavLink} from 'react-router-dom';
import {Container, Row, Col, CardGroup, Card, CardBody, Button, Form, Alert} from 'reactstrap';
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import {FormattedMessage} from 'react-intl';

import AuthRightCardComponent from './AuthRightCardComponent';
import {FieldStandard} from '../../../components/common/Form';

class PasswordResetComponent extends Component {
    componentDidMount() {
        const {token} = this.props.match.params;
        this.props.changeFieldValue('token', token);
    }
    render() {
        const {handleSubmit, submitSucceeded, submitting, pristine, invalid, error, reset} = this.props;
        const {token} = this.props.match.params;
        let inValidTokenFormat = true;
        if (token) {
            if (/^\d+___[a-f0-9]+/i.test(token))
                inValidTokenFormat = false;
        }

        return (
            <Container>
                <Row className="justify-content-center">
                    <Col md="8">
                        {submitSucceeded ?
                            <Alert color="success">
                                <FormattedMessage id="app.auth.Password_was_changed_successfully" defaultMessage="Password was changed successfully!" />
                                <NavLink to={`/auth/login`}><FormattedMessage id="app.auth.Please_LOGIN_again" defaultMessage="Please LOGIN again!" /></NavLink>
                            </Alert>
                            : <CardGroup>
                                <Card className="p-4">
                                    <CardBody>
                                        <Form onSubmit={handleSubmit}>
                                            <h1>
                                                <FormattedMessage id="app.auth.Create_a_Password" defaultMessage="Create a Password" />
                                            </h1>
                                            <p className="text-muted">
                                                <FormattedMessage id="app.auth.You_can_create_a_new_password_now" defaultMessage="You can create a new password now." />
                                            </p>

                                            <input type="hidden" name="token" value={token} />
                                            {error && <Alert color="danger"><FormattedMessage id="app.Error" defaultMessage="Error" />: {error}</Alert>}
                                            {inValidTokenFormat && <Alert color="danger"><FormattedMessage id="app.auth.Please_use_the_correct_link_to_reset_Password" defaultMessage="Please use the correct link to reset Password!" /></Alert>}
                                            {submitSucceeded && <Alert color="success"><FormattedMessage id="app.auth.Password_was_changed_successfully_Please_LOGIN_again" defaultMessage="Password was changed successfully! Please LOGIN again!" /></Alert>}
                                            <Field name="password" type="password" label="New Password" iconClassName="icon-lock" className="mb-4"
                                                   component={FieldStandard} />
                                            <Field name="passwordAgain" type="password" label="New Password (again)" iconClassName="icon-lock" className="mb-4"
                                                   component={FieldStandard} />

                                            <Row>
                                                <Col>
                                                    <LaddaButton
                                                        loading={submitting}
                                                        disabled={submitting || invalid || inValidTokenFormat}
                                                        data-size={L}
                                                        data-style={EXPAND_LEFT}
                                                        data-color="green"
                                                        data-spinner-lines={12}
                                                        className="btn btn-dark"
                                                        type="submit"
                                                    >
                                                        <FormattedMessage id="app.auth.Change_Password" defaultMessage="Change Password" />
                                                    </LaddaButton>
                                                    <Button color="secondary" disabled={pristine || submitting} onClick={reset}>
                                                        <FormattedMessage id="app.Cancel" defaultMessage="Cancel" />
                                                    </Button>
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
        );
    }
}

export default PasswordResetComponent;