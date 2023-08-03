import React, {Component} from 'react';
import {Field} from 'redux-form';
import {CardHeader, CardFooter, Card, CardBody, Button, Form, Alert} from 'reactstrap';
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import {defineMessages, FormattedMessage, injectIntl} from 'react-intl';

import {FieldStandard} from '../../../components/common/Form';

class ProfilePasswordComponent extends Component {
    render() {
        const {handleSubmit, submitSucceeded, submitting, pristine, invalid, error, reset, initialValues, intl} = this.props;
        const {id} = initialValues ? initialValues : {id: -1};

        const intlStrings = defineMessages({
            Current_Password: {
                id: 'app.users.Current_Password',
                defaultMessage: 'Current Password'
            },
            New_Password: {
                id: 'app.users.New_Password',
                defaultMessage: 'New Password'
            },
            New_Password_again: {
                id: 'app.users.New_Password_again',
                defaultMessage: 'New Password (again)'
            }
        });

        const transStrings = {
            Current_Password: intl.formatMessage(intlStrings.Current_Password),
            New_Password: intl.formatMessage(intlStrings.New_Password),
            New_Password_again: intl.formatMessage(intlStrings.New_Password_again)
        };
        return (
            <Form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <i className="icon-lock"></i>
                        <strong>
                            <FormattedMessage id="app.users.Change_Password" defaultMessage="Change Password" />
                        </strong>
                    </CardHeader>
                    <CardBody>
                        <input type="hidden" name="id" value={id} />
                        {error && <Alert color="danger"><FormattedMessage id="app.Error" defaultMessage="Error" />: {error}</Alert>}
                        {submitSucceeded && <Alert color="success"><FormattedMessage id="app.users.Password_was_changed_successfully" defaultMessage="Password was changed successfully!" /></Alert>}
                        <Field name="currentPassword" type="password" label={transStrings.Current_Password} iconClassName="icon-user" className="mb-3"
                               component={FieldStandard} />
                        <Field name="password" type="password" label={transStrings.New_Password} iconClassName="icon-lock" className="mb-4"
                               component={FieldStandard} />
                        <Field name="passwordAgain" type="password" label={transStrings.New_Password_again} iconClassName="icon-lock" className="mb-4"
                               component={FieldStandard} />
                    </CardBody>
                    <CardFooter>
                        <LaddaButton
                            loading={submitting}
                            disabled={submitting || invalid}
                            data-size={L}
                            data-style={EXPAND_LEFT}
                            data-color="green"
                            data-spinner-lines={12}
                            className="btn btn-dark"
                            type="submit"
                        >
                            <FormattedMessage id="app.users.Change_Password" defaultMessage="Change Password" />
                        </LaddaButton>
                        <Button color="secondary" disabled={pristine || submitting} onClick={reset}>
                            <FormattedMessage id="app.Cancel" defaultMessage="Cancel" />
                        </Button>
                    </CardFooter>
                </Card>
            </Form>
        )
    }
}

export default injectIntl(ProfilePasswordComponent);