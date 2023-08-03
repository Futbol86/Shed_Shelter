import React, {Component} from 'react';
import {Field} from 'redux-form';
import {Form, FormGroup, InputGroup, InputGroupAddon} from 'reactstrap';
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import {FormattedMessage} from 'react-intl';

import {FieldPrepend} from '../../../../../components/common/Form';

class RandomBracketFilters extends Component {
    render() {
        const {handleSubmit, submitting, invalid} = this.props;
        return (
            <Form onSubmit={handleSubmit} className="form-inline">
                <FormGroup>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <Field name="searchBracketSample" type="text" label="Bracket Sample" iconClassName="icon-magnifier"
                                   component={FieldPrepend} />
                        </InputGroupAddon>

                        <InputGroupAddon addonType="append">
                            <LaddaButton data-size={L} data-style={EXPAND_LEFT} data-color="green"
                                         data-spinner-lines={12} className="btn btn-dark" type="submit"
                                         loading={submitting} disabled={submitting || invalid}>
                                <FormattedMessage id="app.Search" defaultMessage="Search" />
                            </LaddaButton>
                        </InputGroupAddon>
                    </InputGroup>
                </FormGroup>
            </Form>
        );
    }
}

export default RandomBracketFilters;