import React, { Component } from 'react';
import { Row, Col, Card, CardHeader, CardBody, Table } from 'reactstrap';
import { FormattedMessage, FormattedDate, FormattedTime } from 'react-intl';
import Pagination from '../../../../components/common/Pagination';

class AccountingLogModal extends Component {
    render() {
        const { accountingLogs, pagination, onChangePage, handleModalClose, handleExportPDFFile } = this.props;
        
        return (
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">
                        <strong><FormattedMessage id="app.docs.Accounting_Logs" defaultMessage="Accounting Logs" /></strong>
                    </h4>
                    <button type="button" className="close" onClick={handleModalClose}>
                        <span aria-hidden="true">&times;</span>
                            <span className="sr-only">
                            <FormattedMessage id="app.Close" defaultMessage="Close" />
                        </span>
                    </button>
                </div>
                <div className="modal-body">
                    <Row className="mb-2">
                        <Col md="12">
                            <Table responsive striped>
                                <thead>
                                    <tr>
                                        <th>
                                            <FormattedMessage id="app.docs.No" defaultMessage="No" />
                                        </th>
                                        <th>
                                            <FormattedMessage id="app.order.Job_Number" defaultMessage="Job Number" />
                                        </th>
                                        <th>
                                            <FormattedMessage id="app.quotes.User_Name" defaultMessage="User Name" />
                                        </th>
                                        <th>
                                            <FormattedMessage id="app.quotes.Content" defaultMessage="Content" />
                                        </th>
                                        <th>
                                            <FormattedMessage id="app.order.Created_At" defaultMessage="Created At" />
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(accountingLogs && accountingLogs.length > 0)
                                        ? accountingLogs.map((accountingLog, idx) => (
                                            <tr key={idx}>
                                                <td>
                                                    {idx + 1}
                                                </td>
                                                <td>
                                                    {accountingLog.quoteDetail && accountingLog.quoteDetail.jobNumber}
                                                </td>
                                                <td>
                                                    {accountingLog.userDetail && accountingLog.userDetail.firstName + " " + accountingLog.userDetail.lastName}
                                                </td>
                                                <td style={{whiteSpace: "pre-wrap"}}>{accountingLog.content}</td>
                                                <td>
                                                    <div>
                                                        <FormattedDate value={accountingLog.createdAt}>
                                                            {
                                                                parts => (<>{parts.split('/')[1]}/{parts.split('/')[0]}/{parts.split('/')[2]}</>)
                                                            }
                                                        </FormattedDate>
                                                        {' '}
                                                        <FormattedTime value={`${accountingLog.createdAt}`} />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                        : <tr><td colSpan={4}><FormattedMessage id="app.docs.No_Log_Found" defaultMessage="No Log Found!" /></td></tr>
                                    }
                                </tbody>
                            </Table>
                            <Pagination pagination={pagination} onChangePage={onChangePage} />
                        </Col>
                    </Row>
                </div>
                <div className="modal-footer d-flex justify-content-between">
                    <button type="button" className="btn btn-secondary" onClick={handleModalClose}>
                        <i className="fa fa-times fa-lg" /> {' '}
                        <FormattedMessage id="app.Close" defaultMessage="Close" />
                    </button>
                    <button type="button" className="btn btn-primary" onClick={handleExportPDFFile}>
                        <i className="fa fa-file" /> {' '}
                        <FormattedMessage id="app.docs.Export_PDF" defaultMessage="Export PDF"/>
                    </button>
                </div>
            </div>
        )
    }
}

export default AccountingLogModal;