import React from 'react';
import {NavLink} from 'react-router-dom';
import { Row, Col, Card, CardHeader, CardBody, Table, Badge } from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import {QUOTES_JOB_STATUSES} from '../../../quotes/constants';

const QuoteStatus = ({ 
    countQuotes, countStatuses, statuses, filterData,     
    isUniqueClient, isReportNotes, isReportTexts  
}) => {
    return (
        <Card>
            <CardHeader className="p-2">
                <strong><FormattedMessage id="app.reporting.Quote_Status" defaultMessage="Quote Status" /></strong>
            </CardHeader>
            <CardBody>
                <Row className="pb-2">
                    <Col xs="12">
                        <strong>
                            <FormattedMessage id="app.reporting.Total_number_of_Quotes_recorded_in_search_period" 
                                defaultMessage="Total number of Quotes recorded in search period:"
                            />
                            {' '}
                            {countQuotes ? countQuotes : 0}
                        </strong> 
                    </Col>
                </Row>
                <Row className="pb-2">
                    <Col xs="12">
                        <u><b><FormattedMessage id="app.reporting.Basic_Result" defaultMessage="Basic Result" /></b></u>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <Table responsive striped>
                            <thead>
                                <tr>
                                    <th><FormattedMessage id="app.reporting.ID" defaultMessage="ID" /></th>
                                    <th><FormattedMessage id="app.reporting.Status" defaultMessage="Status" /></th>
                                    <th><FormattedMessage id="app.reporting.Number" defaultMessage="Number" /></th>
                                    <th><FormattedMessage id="app.reporting.Percent" defaultMessage="Percent" /></th>
                                </tr>
                            </thead>
                            <tbody>
                                {(countQuotes && countStatuses && statuses) ?
                                    QUOTES_JOB_STATUSES && QUOTES_JOB_STATUSES.map((status, idx) =>
                                    {
                                        const countStatus = statuses[status.value] ? statuses[status.value] : 0;
                                        let quoteListLink = "";
                                        if (filterData && filterData.option && filterData.fromDate && filterData.toDate) {
                                            if(isReportNotes || isReportTexts)
                                                quoteListLink = `/quotes/note-and-text/list?option=${filterData.option}&fromDate=${filterData.fromDate}&toDate=${filterData.toDate}&jobStatus=${status.name.toLowerCase()}&isUniqueClient=${isUniqueClient}&isReportNotes=${isReportNotes}&isReportTexts=${isReportTexts}`;
                                            else
                                                quoteListLink = `/quotes/list?option=${filterData.option}&fromDate=${filterData.fromDate}&toDate=${filterData.toDate}&jobStatus=${status.name.toLowerCase()}&isUniqueClient=${isUniqueClient}`;
                                        }
                                        return (
                                            <tr key={idx}>
                                                <td>{status.id}</td>
                                                <td>
                                                    <Badge color={(status.value === 'active') ? 'success' : ((status.value === 'dormant') ?
                                                        'warning' : ((status.value === 'dead') ? 'dark' : 'info'))}
                                                        className={(status.value === 'dead') ? 'text-red' : ''}
                                                    >
                                                        {status.name}
                                                    </Badge>
                                                </td>
                                                <td><NavLink to={quoteListLink}>{countStatus}</NavLink></td>
                                                <td>{(100 * countStatus / countStatuses).toFixed(1)}%</td>
                                            </tr>
                                            );
                                    })
                                    : null
                                }
                                {(!countQuotes || !countStatuses || !statuses) &&
                                    <tr><td colSpan={4}><FormattedMessage id="app.reporting.No_Reporting_Found" defaultMessage='No Reporting Found' /></td></tr>
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
};

export default QuoteStatus;