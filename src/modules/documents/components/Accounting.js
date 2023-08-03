import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import Modal from 'react-modal';
import {NavLink} from 'react-router-dom';
import {Field} from "redux-form";
import {FormattedMessage} from "react-intl";
import {Form, Row, Col, Card, CardHeader, CardBody, CardFooter} from 'reactstrap';
import QuoteInfoComponent from './Accounting/QuoteInfo';
import SupplierDetailsComponent from './Accounting/SupplierDetails';
import TradeDetailsComponent from './Accounting/TradeDetails';
import AccountingLogModal from '../containers/Accounting/AccountingLogModal';

const formatNumberToCurrency = (value) => {
    let result = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    return result;
}

const formatCurrencyToNumber = (currency) => {
    let result = Number(currency.replace(/[^0-9.-]+/g,""));
    return result;
}

class Accounting extends Component {
    render(){
        const {
            accountingDetail, supplyDataEntries, tradeDataEntries, quoteInfo, quoteId, currentModalId, submitting, pristine, invalid, handleModalChange, handleModalClose, 
            handleSupplierValueChange, handleSupplierDetailRemove, handleTradeValueChange, handleTradeDetailRemove, handleSubmit
        } = this.props;

        return (
            <div className="animated fadeIn">
                <Form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <h2><FormattedMessage id="app.docs.Accounting" defaultMessage="Accounting" /></h2>
                            <div className="card-actions p-2">
                                <a href="#" onClick={() => handleModalChange(1-currentModalId)}>
                                    <i className="icon-clock" title="Accounting Logs" />{`  `}
                                    <strong><FormattedMessage id="app.docs.Logs" defaultMessage="Logs" /></strong>
                                </a>
                                <Modal className="Modal__Bootstrap modal-dialog modal-xl"
                                    isOpen={currentModalId === 1}
                                    contentLabel="Accounting Logs"
                                    style={{content: {outline: 0}}}
                                >
                                    <AccountingLogModal quoteId={quoteId} handleModalClose={handleModalClose} />
                                </Modal>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <Row className="mt-4 mb-2">
                                <Col md="12"> 
                                    <QuoteInfoComponent quoteInfo={quoteInfo}/>
                                </Col>
                            </Row>
                            <Row className="mt-4 mb-2">
                                <Col md="12"> 
                                    <SupplierDetailsComponent formatNumberToCurrency={formatNumberToCurrency}
                                                              formatCurrencyToNumber={formatCurrencyToNumber}
                                                              supplyDataEntries={supplyDataEntries}
                                                              handleValueChange={handleSupplierValueChange}
                                                              handleSupplierDetailRemove={handleSupplierDetailRemove}
                                    />
                                </Col>
                            </Row>
                            <Row className="mt-4 mb-2">
                                <Col md="12"> 
                                    <TradeDetailsComponent formatNumberToCurrency={formatNumberToCurrency}
                                                           formatCurrencyToNumber={formatCurrencyToNumber}
                                                           tradeDataEntries={tradeDataEntries}
                                                           handleValueChange={handleTradeValueChange}
                                                           handleTradeDetailRemove={handleTradeDetailRemove}/>
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter>
                            <div className='d-flex justify-content-between'>
                                <NavLink to={`/quotes/list`} className="btn-secondary p-2 text-dark">
                                    <FormattedMessage id="app.docs.Return_Quote_List" defaultMessage="Return Quote List" />
                                </NavLink>
                                
                                <LaddaButton data-size={L} data-style={EXPAND_LEFT} data-color="green"
                                             data-spinner-lines={12} className="btn btn-dark" type="submit"
                                             loading={submitting}  disabled={submitting || invalid || pristine}>
                                    {
                                        accountingDetail && accountingDetail.id ? <FormattedMessage id="app.Update" defaultMessage="Update" />
                                                                                : <FormattedMessage id="app.Save" defaultMessage="Save" />
                                    }
                                </LaddaButton>
                            </div>
                        </CardFooter>
                    </Card>
                </Form>
            </div>
        );
    }
}

Accounting.propTypes = {
    handleSubmit: PropTypes.func
};

export default Accounting;