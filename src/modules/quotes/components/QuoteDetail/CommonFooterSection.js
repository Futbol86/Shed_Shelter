import React from 'react';
import { Row, Col, CardFooter, Button, Alert } from 'reactstrap';
import { Link } from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import Modal from "react-modal";
import {QUOTE_STATUS_LIST} from "../../constants";
import {PRODUCT_CATEGORY_SKILLION_CARPORTS, PRODUCT_CATEGORY_GABLE_CARPORTS} from "../../../../constants";

import PDFModal from "../../containers/QuoteDetail/CommonFooterSection/PDFModal";
import PDFExportModal from "../../containers/QuoteDetail/CommonFooterSection/PDFExportModal";

const CommonFooterSection = ({  tabKey, handleGoTab, quoteId, submitting, productCategoryId, isAdminMode, userId, quoteUserId, quoteDealerId,
                                 invalid, pristine, error, submitSucceeded,
                                 handleModalChange, handleDownloadClick, handleSENTClick, sendingOrders,
                                 currentModalId, exportedPdfId, quoteDetails, clientDetail, dealerInfo, userAccessModules, quoteStatus, hasAdminTabAccess
                            }) =>
{
    const isSending = (sendingOrders && quoteId && sendingOrders.includes(quoteId));
    // console.log('isSending: ', isSending);

    let menuStrings = {};
    let totalMenuStrings = 0;
    if (productCategoryId === PRODUCT_CATEGORY_SKILLION_CARPORTS || productCategoryId === PRODUCT_CATEGORY_GABLE_CARPORTS) {
         menuStrings = {
            0: {
                id: 'app.quotes.Product_Selection',
                defaultMessage: 'Product Selection'
            },
            1: {
                id: 'app.quotes.Building_Detail',
                defaultMessage: 'Building Detail'
            },
            2: {
                id: 'app.quotes.Building_Colour',
                defaultMessage: 'Building Colour'
            },
            3: {
                id: 'app.quotes.Drawing_Mode',
                defaultMessage: 'Drawing Mode'
            },
            4: {
                id: 'app.quotes.Other_Accessories',
                defaultMessage: 'Other Accessories'
            },
            5: {
                id: 'app.quotes.Delivery_n_Summary',
                defaultMessage: 'Delivery & Summary'
            },
            6: {
                id: 'app.quotes.Other_Charges',
                defaultMessage: 'Other Charges'
            }
        };
        totalMenuStrings = 6;
    } else {
        menuStrings = {
            0: {
                id: 'app.quotes.Product_Selection',
                defaultMessage: 'Product Selection'
            },
            1: {
                id: 'app.quotes.Building_Detail',
                defaultMessage: 'Building Detail'
            },
            2: {
                id: 'app.quotes.Building_Colour',
                defaultMessage: 'Building Colour'
            },
            3: {
                id: 'app.quotes.Annexes_n_Awnings',
                defaultMessage: 'Annexes & Awnings'
            },
            4: {
                id: 'app.quotes.Drawing_Mode',
                defaultMessage: 'Drawing Mode'
            },
            5: {
                id: 'app.quotes.Other_Accessories',
                defaultMessage: 'Other Accessories'
            },
            6: {
                id: 'app.quotes.Delivery_n_Summary',
                defaultMessage: 'Delivery & Summary'
            },
            7: {
                id: 'app.quotes.Other_Charges',
                defaultMessage: 'Other Charges'
            }
        };
        totalMenuStrings = 7;
    }

    if (hasAdminTabAccess) {
        totalMenuStrings = totalMenuStrings + 1;
        menuStrings[totalMenuStrings] = {
            id: 'app.quotes.Administration',
            defaultMessage: 'Administration'
        }
    }
    
    return (
        <React.Fragment>
            {(quoteStatus === QUOTE_STATUS_LIST.LOCKED || ((userId !== quoteUserId && userId !== quoteDealerId) && !isAdminMode)) &&
            <Row>
                <Col xs="12" className="text-center">
                    <Alert color="info">
                        <FormattedMessage id="app.quotes.This_Quote_is_Locked_and_READ_ONLY" defaultMessage="This Quote is Locked and READ ONLY!" />{' '}
                        {(isAdminMode) ? <FormattedMessage id="app.quotes.Warning_Admin_Mode_is_ON" defaultMessage="Warning: Admin Mode is ON!" /> : null}
                    </Alert>
                </Col>
            </Row>
            }

            {(quoteStatus === QUOTE_STATUS_LIST.SENT) &&
            <Row>
                <Col xs="12" className="text-center">
                    <Alert color="info">
                        <FormattedMessage id="app.quotes.This_Quote_was_Sent_and_READ_ONLY" defaultMessage="This Quote was Sent and READ ONLY!" />{' '}
                        {(isAdminMode) ? <FormattedMessage id="app.quotes.Warning_Admin_Mode_is_ON" defaultMessage="Warning: Admin Mode is ON!" /> : null}
                    </Alert>
                </Col>
            </Row>
            }

            {error &&
            <Row>
                <Col xs="12">
                    <Alert color="danger">
                        <p><FormattedMessage id="app.Error" defaultMessage="Error" />: {error}</p>
                    </Alert>
                </Col>
            </Row>
            }

            {(submitSucceeded && pristine) &&
            <Row>
                <Col xs="12">
                    <Alert color="success">
                        <FormattedMessage id="app.quotes.Building_Data_was_saved_successfully" defaultMessage="Building Data was saved successfully!" />
                    </Alert>
                </Col>
            </Row>
            }

            <Row>
                <Col xs="12">
                    <CardFooter className="d-flex justify-content-between">
                        {(tabKey <= 0) ? null :
                            <Button color="secondary" onClick={() => handleGoTab(tabKey - 1)}>
                                <i className="icon-arrow-left"/> {' '}
                                <FormattedMessage id={menuStrings[tabKey - 1].id} defaultMessage={menuStrings[tabKey - 1].defaultMessage} />
                            </Button>
                        }

                        {(tabKey < 1) ? null :
                            <Button tag={Link} to={`/documents/quote-printer/${quoteId}`}
                                    className="btn btn-primary" style={{pointerEvents: "visible"}}
                            >
                                <i className="fa fa-print fa-lg"/> {' '}
                                <FormattedMessage id="app.Print" defaultMessage="Print"/>
                            </Button>
                        }

                        {(quoteStatus !== QUOTE_STATUS_LIST.LOCKED || isAdminMode) ?
                        <LaddaButton data-size={L} data-style={EXPAND_LEFT} data-color="red"
                                     data-spinner-lines={12} className="btn btn-dark" type="submit"
                                     loading={submitting} disabled={submitting || invalid || pristine}>
                            <i className="fa fa-save fa-lg" /> {' '}
                            <FormattedMessage id="app.Save" defaultMessage="Save" />
                        </LaddaButton>
                        : null}

                        <Button  className="btn btn-primary" onClick={() => handleModalChange(1)}>
                            <i className="fa fa-file-pdf-o fa-lg"/> {' '}
                            <FormattedMessage id="app.quotes.Pdf_Export" defaultMessage="Export"/>
                        </Button>

                        <Modal className="Modal__Bootstrap modal-dialog modal-lg"
                               isOpen={(currentModalId === 1)}
                               onRequestClose={() => handleModalChange(-1)}
                               contentLabel="pdfExport"
                        >
                            <PDFExportModal buildingDetail={quoteDetails} 
                                            clientDetail={clientDetail}
                                            userAccessModules={userAccessModules}
                                            handleModalClose={() => handleModalChange(-1)}
                                            handleSubmit = {() => handleModalChange(2)}
                                            pageTitleId = "app.quotes.Pdf_Export"
                            />
                        </Modal>

                        <Modal className="Modal__Bootstrap modal-dialog modal-lg"
                               isOpen={(currentModalId === 2)}
                               onRequestClose={() => handleModalChange(0)}
                               contentLabel="Pdf"
                        >
                            <PDFModal   buildingDetail={quoteDetails} clientDetail={clientDetail} dealerInfo={dealerInfo} 
                                        exportedPdfId = {exportedPdfId}
                                        userAccessModules = {userAccessModules}
                                        handleModalClose={() => handleModalChange(0)}
                            />
                        </Modal>

                        {/*{(quoteStatus === QUOTE_STATUS_LIST.LOCKED) &&*/}
                        {/*<Button className="btn btn-primary" onClick={() => handleDownloadClick()} disabled={false}*/}
                                {/*style={{opacity: 1}}*/}
                        {/*>*/}
                            {/*<i className="fa fa-file-archive-o fa-lg"/> {' '}*/}
                            {/*<FormattedMessage id="app.Download" defaultMessage="Download"/>*/}
                        {/*</Button>}*/}

                        {(((quoteStatus === QUOTE_STATUS_LIST.LOCKED && (userId === quoteUserId || userId === quoteDealerId)) || isAdminMode) && !isSending) ?
                        <Button className="btn btn-primary" onClick={() => handleSENTClick()} disabled={false}
                                style={{opacity: 1}}
                        >
                            <i className="fa fa-paper-plane-o fa-lg"/> {' '}
                            <FormattedMessage id="app.quotes.SEND_Order" defaultMessage="SEND Order"/>
                        </Button>
                        : null}

                        {((quoteStatus === QUOTE_STATUS_LIST.LOCKED || isAdminMode) && isSending) ?
                        <Button className="btn btn-secondary" disabled={true} style={{opacity: 0.5}}>
                            <i className="fa fa-spinner fa-lg"/> {' '}
                            <FormattedMessage id="app.quotes.SENDING" defaultMessage="SENDING"/>
                        </Button>
                        : null}

                        {(tabKey >= totalMenuStrings) ? null :
                            <Button color="dark" onClick={() => handleGoTab(tabKey + 1)}>
                                <FormattedMessage id={menuStrings[tabKey + 1].id} defaultMessage={menuStrings[tabKey + 1].defaultMessage} />
                                {' '} <i className="icon-arrow-right"/>
                            </Button>
                        }
                    </CardFooter>
                </Col>
            </Row>
        </React.Fragment>

    );
};

export default CommonFooterSection;