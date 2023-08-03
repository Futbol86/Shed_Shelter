import React, {Component} from 'react';
import {Field} from 'redux-form';
import {CardHeader, CardFooter, Card, CardBody, Button, Form, Alert} from 'reactstrap';
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import {FormattedMessage, defineMessages, injectIntl} from 'react-intl';

import {FieldStandard} from '../../../components/common/Form';

class ProfileFormComponent extends Component {
    render() {
        const {handleSubmit, submitSucceeded, pristine, submitting, invalid, error, reset, initialValues, intl} = this.props;
        const {id} = initialValues;

        const intlStrings = defineMessages({
            Your_Email: {
                id: 'app.users.Your_Email',
                defaultMessage: 'Your Email'
            },
            First_Name: {
                id: 'app.users.First_Name',
                defaultMessage: 'First Name'
            },
            Last_Name: {
                id: 'app.users.Last_Name',
                defaultMessage: 'Last Name'
            },
            Your_Avatar: {
                id: 'app.users.Your_Avatar',
                defaultMessage: 'Your Avatar'
            },
            Your_Phone: {
                id: 'app.users.Your_Phone',
                defaultMessage: 'Your Phone'
            }
        });

        const transStrings = {
            Your_Email: intl.formatMessage(intlStrings.Your_Email),
            First_Name: intl.formatMessage(intlStrings.First_Name),
            Last_Name:  intl.formatMessage(intlStrings.Last_Name),
            Your_Avatar: intl.formatMessage(intlStrings.Your_Avatar),
            Your_Phone: intl.formatMessage(intlStrings.Your_Phone)
        };

        return (
            <Form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <i className="icon-info"></i>
                        <strong>
                            <FormattedMessage id="app.users.Change_Profile_Information" defaultMessage="Change Profile Information" />
                        </strong>
                    </CardHeader>
                    <CardBody>
                        <input type="hidden" name="id" value={id} />
                        {error && <Alert color="danger"><FormattedMessage id="app.Error" defaultMessage="Error" />: {error}</Alert>}
                        {submitSucceeded && <Alert color="success"><FormattedMessage id="app.users.Profile_Information_was_changed_successfully" defaultMessage="Profile Information was changed successfully!" /></Alert>}
                        <Field name="email" type="text" label={transStrings.Your_Email} iconClassName="icon-user" className="mb-3"
                               readOnly component={FieldStandard} />
                        <div className="d-flex flex-row justify-content-between">
                            <Field name="firstName" type="text" label={transStrings.First_Name} iconClassName="icon-user" className="mb-3"
                                   component={FieldStandard} />
                            <Field name="lastName" type="text" label={transStrings.Last_Name} iconClassName="icon-user" className="mb-3"
                                   component={FieldStandard} />
                        </div>
                        <Field name="phone" type="text" label={transStrings.Your_Phone} iconClassName="icon-user" className="mb-3"
                               component={FieldStandard} />
                        <Field name="avatar" type="text" label={transStrings.Your_Avatar} iconClassName="icon-lock" className="mb-4"
                               component={FieldStandard} />
                    </CardBody>
                    <CardFooter>
                        <LaddaButton
                            loading={submitting}
                            disabled={pristine || submitting || invalid}
                            data-size={L}
                            data-style={EXPAND_LEFT}
                            data-color="green"
                            data-spinner-lines={12}
                            className="btn btn-dark px-4"
                            type="submit"
                        >
                            <FormattedMessage id="app.Save_Changes" defaultMessage="Save Changes" />
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

export default injectIntl(ProfileFormComponent);