import React, {Component} from 'react';
import { Field, FieldArray } from "redux-form";
import { Col, Row, Button, Label, Card, CardHeader, CardBody, CardFooter, Table } from 'reactstrap';
import { FieldInputPure, FieldDropdownList, FieldLevelValidation } from "../../../../components/common/Form";

import CreateNewAccountComponent from './AccountApis/CreateNewAccount';
import GetListAccountComponent from './AccountApis/GetListAccount';
import GetOneAccountComponent from './AccountApis/GetOneAccount';

class AccountApis extends Component {
    render() {
        const {
            AccountId,
            quickBooksAccounts, quickBooksAccount,
            quickBooksAccountError,
            doQuickBooksGetAccounts, doQuickBooksGetAnAccount, 
        } = this.props;

        return (
            <div className="animated fadeIn">
                <Card>
                    <CardHeader>
                        <h2>
                            Account APIs
                        </h2>
                    </CardHeader>
                    <CardBody>
                        <CreateNewAccountComponent {...this.props}/>
                        <hr />
                        <GetListAccountComponent quickBooksAccounts={quickBooksAccounts}
                                                 doQuickBooksGetAccounts={doQuickBooksGetAccounts}/>
                        <hr/>
                        <GetOneAccountComponent AccountId={AccountId}
                                                quickBooksAccount={quickBooksAccount} 
                                                doQuickBooksGetAnAccount={doQuickBooksGetAnAccount}/>
                    </CardBody>
                    <CardFooter>
                        <span className='text-danger'>{quickBooksAccountError}</span>
                    </CardFooter>
                </Card>
            </div>
        )
    }
}

export default AccountApis;