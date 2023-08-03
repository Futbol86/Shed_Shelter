import React, {Component} from 'react';
import {Field} from 'redux-form';
import {Form, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Row, Col, Label} from 'reactstrap';
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import {FormattedMessage} from 'react-intl';
import FieldDatePicker from '../../../components/common/Form/FieldDatePicker';
import { REPORT_FILTER_OPTIONS } from "../constants";

class ReportingFilter extends Component {
    render() {
        const {handleSubmit} = this.props;

        return (
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <FormattedMessage id="app.reporting.Option" defaultMessage="Option" />
                            </InputGroupText>
                        </InputGroupAddon>
                        <Field component="select" name="option" id="option"
                            className="form-control" style={{width: '200px'}}
                        >
                            {REPORT_FILTER_OPTIONS && REPORT_FILTER_OPTIONS.map((option, idx) => {
                                return <option key={idx} value={option.value}>{option.name}</option>
                            })}
                        </Field>
                        <InputGroupAddon addonType="prepend" className="ml-2">
                            <InputGroupText>
                                <FormattedMessage id="app.reporting.From_Date" defaultMessage="From Date" />
                            </InputGroupText>
                        </InputGroupAddon>
                        <Field name="fromDate" type="date" component={FieldDatePicker}
                            className="form-control"
                            placeholderText="DD/MM/YYYY" dateFormat="dd/MM/yyyy"
                            style={{width: '100px'}}
                        />

                            <InputGroupAddon addonType="prepend" className="ml-2">
                            <InputGroupText>
                                <FormattedMessage id="app.reporting.To_Date" defaultMessage="To Date" />
                            </InputGroupText>
                        </InputGroupAddon>

                        <Field  name="toDate" type="date" component={FieldDatePicker}
                                className="form-control"
                                placeholderText="DD/MM/YYYY" dateFormat="dd/MM/yyyy"
                                style={{width: '100px'}} 
                        />
                        
                        <InputGroupAddon addonType="append" className="ml-2">
                            <LaddaButton data-size={L} data-style={EXPAND_LEFT} data-color="green"
                                            data-spinner-lines={12} className="btn btn-dark" type="submit">
                                <FormattedMessage id="app.reporting.Search" defaultMessage="Search" />
                            </LaddaButton>
                        </InputGroupAddon>
                    </InputGroup>
                    <br />
                    <Row>
                        <Col xs="4">
                            <InputGroup>
                                <InputGroupAddon className="ml-4 mr-4">
                                    <Field name='uniqueClient' id="uniqueClient" component="input" type="checkbox" />{` `}
                                    <Label for="uniqueClient">
                                        <FormattedMessage id="app.reporting.Unique_Client" defaultMessage='Unique Client' />
                                    </Label>
                                </InputGroupAddon>
                            </InputGroup>
                        </Col>
                        <Col xs="4">
                            <InputGroup>
                                <InputGroupAddon className="ml-4 mr-4">
                                    <Field name='reportNotes' id="reportNotes" component="input" type="checkbox"/>{` `}
                                    <Label for="reportNotes">
                                        <FormattedMessage id="app.reporting.Report_Notes" defaultMessage='Report Notes' />
                                    </Label>
                                </InputGroupAddon>
                                <InputGroupAddon className="ml-4 mr-4">
                                    <Field name='reportTexts' id="reportTexts" component="input" type="checkbox"/>{` `}
                                    <Label for="reportTexts">
                                        <FormattedMessage id="app.reporting.Report_Texts" defaultMessage='Report Texts' />
                                    </Label>
                                </InputGroupAddon>
                            </InputGroup>
                        </Col>
                    </Row>
                </FormGroup>
            </Form>
        );
    }
}

export default ReportingFilter;