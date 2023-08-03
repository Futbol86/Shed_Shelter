import React from "react";
import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import Modal from "react-modal";
import TrackingList from './JobTracking/TrackingList';
import TrackingNumber from './JobTracking/TrackingNumber';
import JobTrackingInfo from './JobTracking/JobTrackingInfo';
import ClientContact from '../../quotes/components/QuoteDetail/Administration/ClientContact';

import PDFModal from '../containers/JobTracking/PDFModal';

const JobTracking = ({ 
    quoteDetails, clientDetail, checkList, numberList, currentModalId, trackingJobId, 
    handleOptionClick, handleLockUnlockClick, handleModalChange, handleDeliveryDateSave 
}) => {          
    return (
        <div className="animated fadeIn">
            <Card>
                <CardHeader>
                    <h2>
                        <FormattedMessage id="app.payment-and-job-tracker.Job_Tracking" defaultMessage='Job Tracking' />
                    </h2>
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
                            <PDFModal checkList={checkList}
                                numberList={numberList}
                                trackingJobId={trackingJobId}
                                quoteDetails={quoteDetails}
                                clientDetail={clientDetail}
                                handleModalClose={() => handleModalChange(0)}
                            />
                        </Modal>
                    </div>
                </CardHeader>
                <CardBody>
                    <Row className="mb-2">
                        <Col xs={12}>
                            <JobTrackingInfo quoteDetails={quoteDetails} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <ClientContact client={clientDetail} />
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col xs={12}>
                            <div className="highlight-panel">
                                {
                                    numberList.map((item, idx) => {
                                        return (
                                            <div key={idx} style={{display: 'inline-block'}} className="mr-2 mb-2">
                                                <TrackingNumber
                                                    isSelected={item.isSelected}
                                                    value={item.id}
                                                    bgColor={item.bgColor}
                                                />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <TrackingList checkList={checkList}
                                handleOptionClick={handleOptionClick}
                                handleLockUnlockClick={handleLockUnlockClick}
                                handleDeliveryDateSave={handleDeliveryDateSave}
                            />
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    )
}
export default JobTracking;