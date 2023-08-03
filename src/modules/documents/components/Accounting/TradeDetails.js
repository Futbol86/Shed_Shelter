import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import {NavLink} from 'react-router-dom';
import {Field, FieldArray} from "redux-form";
import {FormattedMessage, FormattedNumber} from "react-intl";
import {Form, Row, Col, Card, CardHeader, CardBody, CardFooter, Button} from 'reactstrap';
import {FieldInputPure, FieldAutoComplete, FieldLevelValidation} from "../../../../components/common/Form";

const renderTradeDetails = ({ 
        fields, tradeDataEntries, formatCurrencyToNumber, formatNumberToCurrency, 
        handleValueChange, handleTradeDetailRemove, meta: { error, submitFailed }
    }) => {

    tradeDataEntries = tradeDataEntries.sort((a, b) => a.id - b.id);

    let listTradeDataEntry = tradeDataEntries.map(item => {
        return {
            label: item.tradesRegisteredName,
            value: item.id
        }
    });

    listTradeDataEntry = [...listTradeDataEntry, {label: "OTHER", value: 100}];

    return (
        <React.Fragment>
            <Row className="mb-2">
                <Col xs="12">
                    <Button color="secondary" className="mr-2" 
                            onClick={() => fields.push({preGSTCost: 0, gSTCost: 0, totalCost: 0, revenueReceiveGSTCost: 0,})}>
                        <i className="icon-plus" />{` `}
                        <FormattedMessage id="app.docs.Add_Trade" defaultMessage="Add Trade" />
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
                            <strong>
                                <FormattedMessage id="app.Name" defaultMessage="Name"/>
                            </strong>
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
                            <strong><FormattedMessage id="app.docs.Revenue_Received_Including_GST" defaultMessage="Revenue receive including GST"/></strong>
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
                                            name={`${member}.tradeId`}
                                            options={listTradeDataEntry}
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
                                        <Field name={`${member}.gSTCost`} type="text" component={FieldInputPure} 
                                               style={{textAlign: 'right'}}
                                               parse={(value)  => formatCurrencyToNumber(value)}
                                               format={(value) => formatNumberToCurrency(value)}
                                               onChange={(evt, newValue, previousValue, name) => handleValueChange(evt, newValue, previousValue, name, index)}
                                        />
                                    </Col>
                                    <Col md="3"> 
                                        <Field name={`${member}.totalCost`} type="text" component={FieldInputPure} 
                                               style={{textAlign: 'right'}}
                                               parse={(value)  => formatCurrencyToNumber(value)}
                                               format={(value) => formatNumberToCurrency(value)}
                                               onChange={(evt, newValue, previousValue, name) => handleValueChange(evt, newValue, previousValue, name, index)}
                                        />
                                    </Col>
                                    <Col md="3"> 
                                        <Field name={`${member}.revenueReceiveGSTCost`} type="text" component={FieldInputPure} 
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
                                        onClick={() => handleTradeDetailRemove(fields, index)}>
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
                            <Field name="tradeDetailsTotal.allPreGSTCost" type="text" component={FieldInputPure} readOnly={true}
                                   format={(value) => formatNumberToCurrency(value)}
                                   style={{fontSize: 16, fontWeight: 'bold', textAlign: 'right'}}/>
                        </Col>
                        <Col md="3"> 
                            <Field name="tradeDetailsTotal.allGSTCost" type="text" component={FieldInputPure} readOnly={true}
                                   format={(value) => formatNumberToCurrency(value)}
                                   style={{fontSize: 16, fontWeight: 'bold', textAlign: 'right'}}/>
                        </Col>
                        <Col md="3"> 
                            <Field name="tradeDetailsTotal.allTotalCost" type="text" component={FieldInputPure} readOnly={true}
                                   format={(value) => formatNumberToCurrency(value)}
                                   style={{backgroundColor: "yellow", fontSize: 16, fontWeight: 'bold', textAlign: 'right'}}/>
                        </Col>
                        <Col md="3"> 
                            <Field name="tradeDetailsTotal.allTotalRevenueGSTCost" type="text" component={FieldInputPure} readOnly={true}
                                   format={(value) => formatNumberToCurrency(value)}
                                   style={{backgroundColor: "yellow", fontSize: 16, fontWeight: 'bold', textAlign: 'right'}}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </React.Fragment>
    )
}

class TradeDetails extends Component {
    render(){
        return (
            <Card>
                <CardHeader>
                    <h4><FormattedMessage id="app.docs.Trades" defaultMessage="Trades" /></h4>
                </CardHeader>
                <CardBody>
                    <FieldArray name="tradeDetails" {...this.props} component={renderTradeDetails} />
                </CardBody>
            </Card>
        );
    }
}

TradeDetails.propTypes = {
    tradeDataEntries: PropTypes.array
};

export default TradeDetails;