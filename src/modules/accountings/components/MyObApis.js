import React, {Component} from 'react';
import { Col, Row, Button, Label } from 'reactstrap';

// import CompanyInfoApisComponent from './MyObApis/CompanyInfoApis';
// import AccountApisContainer from '../containers/MyObApis/AccountApis';
// import CustomerApisContainer from '../containers/MyObApis/CustomerApis';
// import ItemApisContainer from '../containers/MyObApis/ItemApis';
// import InvoiceApisContainer from '../containers/MyObApis/InvoiceApis';

class MyObApis extends Component {
    render() {
        return (
            <div>
                <Row className='mb-2'>
                    <Col xs="12" className="text-center">
                        <h1 className='text-primary'>MyOb API</h1>
                        <Button color="primary" onClick={() => this.props.handleRedirectToMyObServer()}>
                            Authorize Uri
                        </Button>   
                    </Col>
                </Row>
                {/* <Row className='mt-2'>
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
                </Row> */}
            </div>
        )
    }
}

export default MyObApis;