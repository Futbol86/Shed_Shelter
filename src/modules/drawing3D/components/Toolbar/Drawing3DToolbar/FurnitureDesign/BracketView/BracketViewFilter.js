import React, {Component} from 'react';
import {Field} from 'redux-form';
import {Form, FormGroup, InputGroup, InputGroupAddon} from 'reactstrap';
import {FieldPrepend} from '../../../../../../../components/common/Form';

class BracketViewFilter extends Component {
    render() {
        const {handleSubmit} = this.props;

        return (
            <Form onSubmit={handleSubmit} className="form-inline">
                <FormGroup>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <Field name="searchBracket" type="text" label="Search Brackets" 
                                   iconClassName="icon-magnifier" className='width-150'
                                   component={FieldPrepend} />
                        </InputGroupAddon>
                    </InputGroup>
                </FormGroup>
            </Form>
        );
    }
}

export default BracketViewFilter;