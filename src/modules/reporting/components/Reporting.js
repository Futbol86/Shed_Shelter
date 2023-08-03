import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBody, CardFooter, Button, Alert} from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import Modal from "react-modal";

import ReportingFilter from '../containers/ReportingFilter';
import QuoteStatus from './Reporting/QuoteStatus';
import FindUs from './Reporting/FindUs';
import PDFModal from '../containers/Reporting/PDFModal';

const Reporting = ({reportingDetail, filterData, isUniqueClient, isReportNotes, isReportTexts, handleModalChange, currentModalId}) => {
    const {countQuotes, countStatuses, countFindUs, statuses, findUsData} = reportingDetail;
    return (
        <div className="animated fadeIn">
            <Card>
                <CardHeader>
                    <h2>
                        <FormattedMessage id="app.reporting.Reporting" defaultMessage='Reporting' />
                    </h2>
                    {(countQuotes || countFindUs) ?
                        <div className="card-actions">
                            <a href="#" onClick={() => handleModalChange(1-currentModalId)}>
                                <h2>
                                    <i className="icon-printer" title="Print" />
                                </h2>
                            </a>

                            <Modal className="Modal__Bootstrap modal-dialog modal-lg"
                                isOpen={(currentModalId > 0)}
                                onRequestClose={() => handleModalChange(0)}
                                contentLabel="Reporting"
                                style={{content: {outline: 0}}}
                            >
                                <PDFModal
                                    reportingDetail={reportingDetail}
                                    handleModalClose={() => handleModalChange(0)}
                                />
                            </Modal>
                        </div>
                        : null
                    }
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col xs="12">
                            <div className="mb-2">
                                <ReportingFilter />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12">
                            <QuoteStatus    countQuotes={countQuotes}
                                            countStatuses={countStatuses}
                                            statuses={statuses}
                                            filterData={filterData}
                                            isUniqueClient={isUniqueClient}
                                            isReportNotes={isReportNotes}
                                            isReportTexts={isReportTexts}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12">
                            <FindUs countQuotes={countQuotes} countFindUs={countFindUs} findUsData={findUsData} />
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    )
};

Reporting.propTypes = {
    quotes: PropTypes.array,
};

export default Reporting;