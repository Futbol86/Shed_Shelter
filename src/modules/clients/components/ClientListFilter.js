import React, {Component} from 'react';
import {Field} from 'redux-form';
import {Form, FormGroup, InputGroup, InputGroupAddon} from 'reactstrap';
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import {FormattedMessage} from 'react-intl';

import {FieldPrepend, FieldDropdownList} from '../../../components/common/Form';
import {PREDEFINED_AUSTRALIAN_STATES} from '../../../constants';

class ClientListFilter extends Component {
    render() {
        const {handleSubmit, submitting, pristine, invalid} = this.props;

        const states = PREDEFINED_AUSTRALIAN_STATES;

        return (
            <Form onSubmit={handleSubmit} className="form-inline">
                <FormGroup>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <Field name="search" type="text" label="Client Name" iconClassName="icon-magnifier"
                                   component={FieldPrepend} />
                        </InputGroupAddon>

                        <Field
                            name="state"
                            component={FieldDropdownList}
                            data={states}
                            valueField="abbreviation"
                            textField="name"
                            titleOption="Select State"
                        />

                        <InputGroupAddon addonType="append">
                            <LaddaButton data-size={L} data-style={EXPAND_LEFT} data-color="green"
                                         data-spinner-lines={12} className="btn btn-dark" type="submit"
                                         loading={submitting} disabled={submitting || invalid || pristine}>
                                <FormattedMessage id="app.Search" defaultMessage="Search" />
                            </LaddaButton>
                        </InputGroupAddon>
                    </InputGroup>
                </FormGroup>
            </Form>
        );
    }
}

export default ClientListFilter;