import React, {Component} from 'react';
import { Field, FieldArray } from "redux-form";
import { Col, Row, Button, Label, Card, CardHeader, CardBody, CardFooter, Table } from 'reactstrap';
import { FieldInputPure, FieldDropdownList, FieldLevelValidation } from "../../../../components/common/Form";

class CompanyInfoApis extends Component {
    render() {
        const {
            CompanyId,
            quickBooksCompanyInfo, doQuickBooksGetCompanyInfo
        } = this.props;

        return (
            <div className="animated fadeIn">
                <Card>
                    <CardHeader>
                        <h2>
                            Company Info APIs
                        </h2>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col xs="12" className='d-flex justify-content-start'>
                                <h4>Get Company Info</h4>                   
                            </Col>
                            <Col xs={4}>                     
                                <Label>Please press 'Company Id' before press button</Label>
                            </Col>
                            <Col xs={4}>                     
                                <Field name="CompanyInfo_CompanyId" type="number" component={FieldInputPure} 
                                       parse={(value) => value && parseFloat(value)} />
                            </Col>
                            <Col xs={4}>
                              <Button color="secondary" className="ml-4" 
                                      onClick={() => doQuickBooksGetCompanyInfo({CompanyId})}
                                      disabled={!CompanyId || CompanyId === 0}>
                                Get Company Info
                              </Button>
                          </Col>
                        </Row>
                        {
                            quickBooksCompanyInfo && quickBooksCompanyInfo.CompanyInfo &&
                            <div className="mt-4">
                                <Row className="bg-secondary">
                                    <Col xs="4" className='bg-secondary pd-4'>
                                        <b>Company Name</b>
                                    </Col>
                                    <Col xs="4" className='bg-secondary pd-4'>
                                        { quickBooksCompanyInfo && quickBooksCompanyInfo.CompanyInfo.CompanyName }
                                    </Col>
                                </Row>
                                <Row className="bg-secondary">
                                    <Col xs="4">
                                        <b>Company Addr</b>
                                    </Col>
                                    <Col xs="4">
                                        { JSON.stringify(quickBooksCompanyInfo && quickBooksCompanyInfo.CompanyInfo.CompanyAddr) }
                                    </Col>
                                </Row>
                                <Row className="bg-secondary">
                                    <Col xs="4">
                                        <b>Customer Communication Email Addr</b>
                                    </Col>
                                    <Col xs="4">
                                        { JSON.stringify(quickBooksCompanyInfo && quickBooksCompanyInfo.CompanyInfo.CustomerCommunicationEmailAddr) }
                                    </Col>
                                </Row>
                                <Row className="bg-secondary">
                                    <Col xs="4">
                                        <b>Company Start Date</b>
                                    </Col>
                                    <Col xs="4">
                                        { quickBooksCompanyInfo && quickBooksCompanyInfo.CompanyInfo.CompanyStartDate }
                                    </Col>
                                </Row>
                            </div>
                        }
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default CompanyInfoApis;