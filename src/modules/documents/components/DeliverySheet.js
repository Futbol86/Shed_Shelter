import React from 'react';
import Modal from "react-modal";
import {Button} from "reactstrap";
import {FormattedMessage} from 'react-intl';

import PDFModal from "../containers/DeliverySheet/PDFModal";
import CommonFooterSection from "./CommonFooterSection";
import DealerSection from "./PaymentScheduleSheet/DealerSection";
import SignatureSection from "./DeliverySheet/SignatureSection";
import ClientSection from "./PaymentScheduleSheet/ClientSection";
import LocationDirection from "./DeliverySheet/LocationDirection";
import SiteDetailAddressMap from "./DeliverySheet/SiteDetailAddressMap";

const DeliverySheet = ({quotePageData, currentModalId, handleModalChange, handleGoTab, handleKitDepositChange,
                       dealerInfo = {}, userInfo, buildingDetail, clientDetail, scopeOfWorks, siteAndConcrete, 
                       constructions, additionalCost, jobNumber, quoteId,
                       handleSubmit, handleQuoteClick, submitting, invalid, pristine, error, submitSucceeded, siteAddress
                       }) => {
    return (
        <div className="animated fadeIn">
            <form onSubmit={handleSubmit}>
                <DealerSection logoPath={dealerInfo && dealerInfo.companyLogo}
                               dealerInfo={dealerInfo} userInfo={userInfo} />

                <ClientSection clientDetail={clientDetail} />

                <LocationDirection />
                
                

                <SignatureSection dealerInfo={dealerInfo} />

                <div style={{ height: '40vh', width: '100%' }}>
                        <SiteDetailAddressMap buildingDetail={buildingDetail}  siteAddress={siteAddress} 
                          />
                </div>

                <CommonFooterSection handleGoTab={handleGoTab} handleQuoteClick={handleQuoteClick} quoteId={quoteId} tabKey={6}
                                     submitting={submitting} invalid={invalid}
                                     pristine={pristine} error={error} submitSucceeded={submitSucceeded}>

                        <Button color="secondary" onClick={() => handleModalChange(1-currentModalId)}>
                            <i className="fa fa-print fa-lg" title="Print" />
                            {' '}
                            <FormattedMessage id="app.Print" defaultMessage="Print" />
                        </Button>

                        <Modal className="Modal__Bootstrap modal-dialog modal-lg"
                               isOpen={(currentModalId > 0)}
                               onRequestClose={() => handleModalChange(0)}
                               contentLabel="Delivery"
                               style={{content: {outline: 0}}}
                        >
                            <PDFModal buildingDetail={buildingDetail} clientDetail={clientDetail}
                                      userInfo={userInfo} dealerInfo={dealerInfo}
                                      dealerTradingName={dealerInfo.tradingName}
                                      jobNumber = {jobNumber}
                                      handleModalClose={() => handleModalChange(0)}
                            />
                        </Modal>

                </CommonFooterSection>
            </form>
        </div>
);
};

export default DeliverySheet;