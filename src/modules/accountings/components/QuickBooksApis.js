import React, {Component} from 'react';
import { Col, Row, Button, Label } from 'reactstrap';

import CompanyInfoApisComponent from './QuickBooksApis/CompanyInfoApis';
import AccountApisContainer from '../containers/QuickBooksApis/AccountApis';
import CustomerApisContainer from '../containers/QuickBooksApis/CustomerApis';
import ItemApisContainer from '../containers/QuickBooksApis/ItemApis';
import InvoiceApisContainer from '../containers/QuickBooksApis/InvoiceApis';

class QuickBooksApis extends Component {
    render() {
        return (
            <div>
                <Row className='mb-2'>
                    <Col xs="12" className="text-center">
                        <h1 className='text-primary'>QuickBooks API</h1>
                        <Button color="primary" onClick={() => this.props.doQuickBooksAuthorizeUri()}>
                            Authorize Uri
                        </Button>   
                    </Col>
                </Row>
                <Row className='mt-2'>
                    <Col xs="12">
                        <AccountApisContainer />
                    </Col>
                </Row>
                <Row className='mt-2'>
                    <Col xs="12">
                        <CompanyInfoApisComponent CompanyId={this.props.CompanyId}
                                                  quickBooksCompanyInfo={this.props.quickBooksCompanyInfo} 
                                                  doQuickBooksGetCompanyInfo={this.props.doQuickBooksGetCompanyInfo}
                        />
                    </Col>
                </Row>
                <Row className='mt-2'>
                    <Col xs="12">
                        <CustomerApisContainer />
                    </Col>
                </Row>
                <Row className='mt-2'>
                    <Col xs="12">
                        <ItemApisContainer />
                    </Col>
                </Row>
                <Row className='mt-2'>
                    <Col xs="12">
                        <InvoiceApisContainer />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default QuickBooksApis;