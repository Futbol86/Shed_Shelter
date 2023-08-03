import React, {Component} from 'react';
import {Field} from 'redux-form';
import {Form, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Row, Col} from 'reactstrap';
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import {FormattedMessage} from 'react-intl';

import {FieldPrepend, FieldAutoComplete} from '../../../components/common/Form';
import FieldDatePicker from '../../../components/common/Form/FieldDatePicker';
import {METRIX_REPORTING_SEARCHABLE_ITEMS, METRIX_REPORTING_REPORTABLE_ITEMS} from '../constants';

class MetrixReportingListFilter extends Component {
    render() {
        const {filterData, handleSubmit, submitting, pristine, invalid} = this.props;
        var searchableItems = METRIX_REPORTING_SEARCHABLE_ITEMS.map(item => {
            return {
                label: item.name,
                value: item.code
            }
        });

        var reportableItems = METRIX_REPORTING_REPORTABLE_ITEMS.map(item => {
            return {
                label: item.name,
                value: item.code
            }
        });

        return (
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Row className="form-inline mb-2">
                        <Col md="12">
                            <InputGroup>
                                <InputGroupAddon addonType="prepend" className="ml-2">
                                    <InputGroupText>
                                        <FormattedMessage id="app.reporting.From_Date" defaultMessage="From Date" />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Field name="fromDate" type="date" component={FieldDatePicker}
                                        className="form-control width-100"
                                        placeholderText="DD/MM/YYYY" dateFormat="dd/MM/yyyy" style={{width: '100px'}}/>

                                <InputGroupAddon addonType="prepend" className="ml-2">
                                    <InputGroupText>
                                        <FormattedMessage id="app.reporting.To_Date" defaultMessage="To Date" />
                                    </InputGroupText>
                                </InputGroupAddon>                  
                                <Field  name="toDate" type="date" component={FieldDatePicker}
                                        className="form-control width-100"
                                        placeholderText="DD/MM/YYYY" dateFormat="dd/MM/yyyy"/>

                                <InputGroupAddon addonType="prepend" className="ml-2">
                                    <InputGroupText>
                                        <FormattedMessage id="app.reporting.Searchable" defaultMessage="Searchable"/>
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Field name="searchableItems" multi={true} options={searchableItems} 
                                       component={FieldAutoComplete} className="width-300"/>

                                <InputGroupAddon addonType="append" className="mr-4">
                                    <LaddaButton data-size={L} data-style={EXPAND_LEFT} data-color="green"
                                                data-spinner-lines={12} className="btn btn-dark" type="submit"
                                                loading={submitting} disabled={submitting || invalid}>
                                        <FormattedMessage id="app.Search" defaultMessage="Search" />
                                    </LaddaButton>
                                </InputGroupAddon>

                                {
                                    filterData && filterData.searchableItems && filterData.searchableItems.includes("deliveryDate") &&
                                    <React.Fragment>
                                        <InputGroupAddon addonType="prepend" className="ml-2">
                                            <InputGroupText>
                                                <FormattedMessage id="app.reporting.From_Date" defaultMessage="From Date"/>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Field name="deliveryFromDate" type="date" component={FieldDatePicker}
                                            className="form-control width-100"
                                            placeholderText="DD/MM/YYYY" dateFormat="dd/MM/yyyy"/>

                                        <InputGroupAddon addonType="prepend" className="ml-2">
                                            <InputGroupText>
                                                <FormattedMessage id="app.reporting.To_Date" defaultMessage="To Date"/>
                                            </InputGroupText>
                                        </InputGroupAddon>                  
                                        <Field  name="deliveryToDate" type="date" component={FieldDatePicker}
                                                className="form-control width-100"
                                                placeholderText="DD/MM/YYYY" dateFormat="dd/MM/yyyy"/>
                                    </React.Fragment>
                                }

                                {
                                    filterData && filterData.searchableItems && filterData.searchableItems.includes("userName") &&
                                    <InputGroupAddon addonType="prepend" className="ml-2">
                                        <Field name="search" type="text" label="Search" iconClassName="icon-magnifier"
                                            component={FieldPrepend} />
                                    </InputGroupAddon>
                                }
                            </InputGroup>
                        </Col>
                    </Row>
                    <br />
                    <Row className="mb-2">
                        <Col md="12">
                            <InputGroup>
                                <InputGroupAddon addonType="prepend" className="ml-2">
                                    <InputGroupText>
                                        <FormattedMessage id="app.reporting.Reportable" defaultMessage="Reportable"/>
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Field name="reportableItems" multi={true} options={reportableItems} 
                                       component={FieldAutoComplete} className="width-700"/>
                            </InputGroup>
                        </Col>
                    </Row>            
                </FormGroup>
            </Form>
        );
    }
}

export default MetrixReportingListFilter;