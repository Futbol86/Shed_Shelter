import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import {NavLink} from 'react-router-dom';
import {Field, FieldArray} from "redux-form";
import {FormattedMessage} from "react-intl";
import {Form, Row, Col, Card, CardHeader, CardBody, CardFooter, Button} from 'reactstrap';
import {FieldInputPure, FieldAutoComplete, FieldLevelValidation} from "../../../../components/common/Form";

const renderSupplierDetails = ({ 
        fields, supplyDataEntries, formatCurrencyToNumber, formatNumberToCurrency, 
        handleValueChange, handleSupplierDetailRemove, meta: { error, submitFailed }
    }) => {

    supplyDataEntries = supplyDataEntries.sort((a, b) => a.id - b.id);

    let listSupplyDataEntry = supplyDataEntries.map(item => {
        return {
            label: item.company,
            value: item.id
        }
    });

    listSupplyDataEntry = [...listSupplyDataEntry, {label: "OTHER", value: 100}];

    return (
        <React.Fragment>
            <Row className="mb-2">
                <Col xs="12">
                    <Button color="secondary" className="mr-2" 
                            onClick={() => fields.push({preGSTCost: 0, gSTCost: 0, totalCost: 0, revenueReceiveGSTCost: 0,})}
                    >
                        <i className="icon-plus" />{` `}
                        <FormattedMessage id="app.docs.Add_Supplier" defaultMessage="Add Supplier" />
                    </Button>
                </Col>
            </Row>
            <Row className="mt-4 mb-4">
                <Col md="6">
                    <Row>
                        <Col md="1" className="text-center"> 
                            <strong><FormattedMessage id="app.docs.#" defaultMessage="#"/></strong>
                        </Col>
                        <Col md="3" className="text-center"> 
                            <strong><FormattedMessage id="app.Name" defaultMessage="Name"/></strong>
                        </Col>
                        <Col md="5" className="text-center"> 
                            <strong><FormattedMessage id="app.docs.Detail" defaultMessage="Detail"/></strong>
                        </Col>
                        <Col md="3" className="text-center"> 
                            <strong><FormattedMessage id="app.docs.Invoice_Number" defaultMessage="Invoice number"/></strong>
                        </Col>
                    </Row>
                </Col>
                <Col md="5">
                    <Row>
                        <Col md="3" className="text-center"> 
                            <strong><FormattedMessage id="app.docs.Pre_GST_Cost" defaultMessage="Pre GST cost"/></strong>
                        </Col>
                        <Col md="3" className="text-center"> 
                            <strong><FormattedMessage id="app.docs.GST_Component" defaultMessage="GST component"/></strong>
                        </Col>
                        <Col md="3" className="text-center"> 
                            <strong><FormattedMessage id="app.docs.Total_Cost" defaultMessage="Total cost"/></strong>
                        </Col>
                        <Col md="3" className="text-center"> 
                            <strong><FormattedMessage id="app.docs.Rebate_Estimate" defaultMessage="Rebate estimate"/></strong>
                        </Col>
                    </Row>
                </Col>
            </Row>
            {
                fields.map((member, index) => {
                    return (
                        <Row key={index} className="mb-2">
                            <Col md="6">
                                <Row>
                                    <Col md="1"> 
                                        {`${index + 1}`}
                                    </Col>
                                    <Col md="3"> 
                                        <Field
                                            multi={false}
                                            name={`${member}.supplierId`}
                                            options={listSupplyDataEntry}
                                            component={FieldAutoComplete}
                                        />
                                    </Col>
                                    <Col md="5"> 
                                        <Field  name={`${member}.detail`} type="text" component={FieldInputPure}/>
                                    </Col>
                                    <Col md="3"> 
                                        <Field  name={`${member}.invoiceNumber`} type="text" component={FieldInputPure}/>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md="5">
                                <Row>
                                    <Col md="3"> 
                                        <Field name={`${member}.preGSTCost`} type="text" component={FieldInputPure} 
                                               style={{textAlign: 'right'}}
                                               parse={(value)  => formatCurrencyToNumber(value)}
                                               format={(value) => formatNumberToCurrency(value)}
                                               onChange={(evt, newValue, previousValue, name) => handleValueChange(evt, newValue, previousValue, name, index)}
                                        />
                                    </Col>
                                    <Col md="3"> 
                                        <Field  name={`${member}.gSTCost`} type="text" component={FieldInputPure} 
                                                style={{textAlign: 'right'}}
                                                parse={(value)  => formatCurrencyToNumber(value)}
                                                format={(value) => formatNumberToCurrency(value)}
                                                onChange={(evt, newValue, previousValue, name) => handleValueChange(evt, newValue, previousValue, name, index)}
                                        />
                                    </Col>
                                    <Col md="3"> 
                                        <Field  name={`${member}.totalCost`} type="text" component={FieldInputPure} 
                                                style={{textAlign: 'right'}}
                                                parse={(value)  => formatCurrencyToNumber(value)}
                                                format={(value) => formatNumberToCurrency(value)}
                                                onChange={(evt, newValue, previousValue, name) => handleValueChange(evt, newValue, previousValue, name, index)}
                                        />
                                    </Col>
                                    <Col md="3"> 
                                        <Field  name={`${member}.revenueReceiveGSTCost`} type="text" component={FieldInputPure} 
                                                style={{textAlign: 'right'}}
                                                parse={(value)  => formatCurrencyToNumber(value)}
                                                format={(value) => formatNumberToCurrency(value)}
                                                onChange={(evt, newValue, previousValue, name) => handleValueChange(evt, newValue, previousValue, name, index)}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col md="1">
                                <button type="button" className="btn btn-link" title="Remove" 
                                        onClick={() => handleSupplierDetailRemove(fields, index)}>
                                    <i className="icon-minus" />
                                </button>
                            </Col>
                        </Row>
                    )
                })
            }
            <Row className="mt-4">
                <Col md={{size: 5, offset: 6}}> 
                    <Row>
                        <Col md="3"> 
                            <Field name="supplierDetailsTotal.allPreGSTCost" type="text" component={FieldInputPure} readOnly={true}
                                   format={(value) => formatNumberToCurrency(value)}
                                   style={{fontSize: 16, fontWeight: 'bold', textAlign: 'right'}}/>
                        </Col>
                        <Col md="3"> 
                            <Field name="supplierDetailsTotal.allGSTCost" type="text" component={FieldInputPure} readOnly={true}
                                   format={(value) => formatNumberToCurrency(value)}
                                   style={{fontSize: 16, fontWeight: 'bold', textAlign: 'right'}}/>
                        </Col>
                        <Col md="3"> 
                            <Field name="supplierDetailsTotal.allTotalCost" type="text" component={FieldInputPure} readOnly={true}
                                   format={(value) => formatNumberToCurrency(value)}
                                   style={{backgroundColor: "yellow", fontSize: 16, fontWeight: 'bold', textAlign: 'right'}}/>
                        </Col>
                        <Col md="3"> 
                            <Field name="supplierDetailsTotal.allTotalRevenueGSTCost" type="text" component={FieldInputPure} readOnly={true}
                                   format={(value) => formatNumberToCurrency(value)}
                                   style={{backgroundColor: "yellow", fontSize: 16, fontWeight: 'bold', textAlign: 'right'}}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </React.Fragment>
    )
}

class SupplierDetails extends Component {
    render(){
        return (
            <Card>
                <CardHeader>
                    <h4><FormattedMessage id="app.docs.Suppliers" defaultMessage="Suppliers" /></h4>
                </CardHeader>
                <CardBody>
                    <FieldArray name="supplierDetails" {...this.props} component={renderSupplierDetails} />
                </CardBody>
            </Card>
        );
    }
}

SupplierDetails.propTypes = {
    supplyDataEntries: PropTypes.array
};

export default SupplierDetails;