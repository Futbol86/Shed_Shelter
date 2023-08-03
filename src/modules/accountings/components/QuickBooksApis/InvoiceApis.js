import React, {Component} from 'react';
import { Field, FieldArray } from "redux-form";
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import { Col, Row, Button, Label, Card, CardHeader, CardBody, CardFooter, Table, Form } from 'reactstrap';
import { FieldInputPure, FieldDropdownList, FieldLevelValidation } from "../../../../components/common/Form";

import CreateNewInvoiceComponent from './InvoiceApis/CreateNewInvoice';
import GetListInvoiceComponent from './InvoiceApis/GetListInvoice';
import GetOneInvoiceComponent from './InvoiceApis/GetOneInvoice';

class InvoiceApis extends Component {
    render() {
        const {
            InvoiceId,
            quickBooksInvoices, quickBooksInvoice,
            quickBooksInvoiceError,
            doQuickBooksGetInvoices, doQuickBooksGetAInvoice,
            handleUpdateInvoice
        } = this.props;
        
        return (
            <div className="animated fadeIn">         
                <Card>
                    <CardHeader>
                        <h2>
                            Invoice APIs
                        </h2>
                    </CardHeader>
                    <CardBody>
                        <CreateNewInvoiceComponent {...this.props}/>
                        <hr />
                        <GetListInvoiceComponent quickBooksInvoices={quickBooksInvoices}
                                                 doQuickBooksGetInvoices={doQuickBooksGetInvoices}
                                                 handleUpdateInvoice={handleUpdateInvoice} />                  
                        <hr/>
                        <GetOneInvoiceComponent InvoiceId={InvoiceId}
                                                quickBooksInvoice={quickBooksInvoice} 
                                                doQuickBooksGetAInvoice={doQuickBooksGetAInvoice} />
                    </CardBody>
                    <CardFooter>
                        <span className='text-danger'>{quickBooksInvoiceError}</span>
                    </CardFooter>
                </Card>
            </div>
        )
    }
}

export default InvoiceApis;