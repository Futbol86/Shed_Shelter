import React, {Component} from 'react';
import {FormSection} from 'redux-form';
import {CardBody, Card, CardHeader, Label, Input} from 'reactstrap';
import {FormattedMessage} from 'react-intl';

import ClientContactCorpForm from './ClientContactCorpForm';
import ClientContactIndividualForm from './ClientContactIndividualForm';


class ClientContactForm extends Component {
    render() {
        const {section, isCorp, isRequired, label, handleCopyAddress, contact1PhoneHome, contact1PhoneMobile} = this.props;
        return (
            <FormSection name={section}>
                <Card>
                    <CardHeader className="pl-3">
                        <strong>{label}</strong> Info
                        {(!isCorp && section === "contact2") &&
                        <div className="float-right">
                            <Label>
                                <FormattedMessage id="app.clients.Copy_from_Contact_1" defaultMessage="Copy from Contact 1" />
                            </Label>
                            <Label
                                className="switch switch-sm switch-text switch-info float-right ml-1 mb-0">
                                <Input name="contact2AddressCopy" type="checkbox" className="switch-input" onChange={handleCopyAddress} />
                                <span className="switch-label" data-on="Yes" data-off="No"></span>
                                <span className="switch-handle"></span>
                            </Label>
                        </div>
                        }
                    </CardHeader>
                    <CardBody className="pb-0">
                        {isCorp ?
                            <ClientContactCorpForm isRequired={isRequired} />
                            :   
                            <ClientContactIndividualForm isRequired={isRequired}
                                contact1PhoneHome = {contact1PhoneHome} contact1PhoneMobile = {contact1PhoneMobile}
                            />
                        }
                    </CardBody>
                </Card>
            </FormSection>
        )
    }
}

export default ClientContactForm;