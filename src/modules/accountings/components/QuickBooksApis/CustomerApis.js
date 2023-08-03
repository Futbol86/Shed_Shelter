import React, {Component} from 'react';
import { Field, FieldArray } from "redux-form";
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import { Col, Row, Button, Label, Card, CardHeader, CardBody, CardFooter, Table, Form } from 'reactstrap';
import { FieldInputPure, FieldDropdownList, FieldLevelValidation } from "../../../../components/common/Form";

import CreateNewCustomerComponent from './CustomerApis/CreateNewCustomer';
import GetListCustomerComponent from './CustomerApis/GetListCustomer';
import GetOneCustomerComponent from './CustomerApis/GetOneCustomer';

class CustomerApis extends Component {
    render() {
        const {
            CustomerId,
            quickBooksCustomers, quickBooksCustomer,
            quickBooksCustomerError,
            doQuickBooksGetCustomers, doQuickBooksGetACustomer,
            handleUpdateCustomer
        } = this.props;
        
        return (
            <div className="animated fadeIn">
                     
                <Card>
                    <CardHeader>
                        <h2>
                            Customer APIs
                        </h2>
                    </CardHeader>
                    <CardBody>
                        <CreateNewCustomerComponent {...this.props}/>
                        <hr />
                        <GetListCustomerComponent quickBooksCustomers={quickBooksCustomers}
                                                  doQuickBooksGetCustomers={doQuickBooksGetCustomers} 
                                                  handleUpdateCustomer={handleUpdateCustomer}/>
                        <hr/>
                        <GetOneCustomerComponent CustomerId={CustomerId}
                                                 quickBooksCustomer={quickBooksCustomer} 
                                                 doQuickBooksGetACustomer={doQuickBooksGetACustomer}/>
                    </CardBody>
                    <CardFooter>
                        <span className='text-danger'>{quickBooksCustomerError}</span>
                    </CardFooter>
                </Card>
                
            </div>
        )
    }
}

export default CustomerApis;