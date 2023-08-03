import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import {defineMessages, injectIntl} from 'react-intl';

import Tabs from 'react-responsive-tabs';
import 'react-responsive-tabs/styles.css';

import CustomerDetail from './DeliverySummary/CustomerDetail';
import SiteDetail from '../../containers/QuoteDetail/DeliverySummary/SiteDetail';
import SiteDetailAlt from '../../containers/QuoteDetail/DeliverySummary/SiteDetailAlt';
import EngineeringCertification from "../../containers/QuoteDetail/DeliverySummary/EngineeringCertification";
import EngineeringModifications from "./DeliverySummary/EngineeringModifications";
import Tracking from "./DeliverySummary/Tracking";
import Delivery from "./DeliverySummary/Delivery";
import DefaultDelivery from "../../containers/QuoteDetail/DeliverySummary/DefaultDelivery";

const DeliverySummary = ({clientDetail, changeFieldValue, handleGoTab, handleModalChange, activeModal, intl}) => {

    const intlStrings = defineMessages({
        Site_Details: {
            id: 'app.quotes.Site_Details',
            defaultMessage: 'Site Details'
        },
        Alternative_delivery_details: {
            id: 'app.quotes.Alternative_delivery_details',
            defaultMessage: 'Alternative delivery details'
        }
    });
    const transStrings = {
        Site_Details: intl.formatMessage(intlStrings.Site_Details),
        Alternative_delivery_details: intl.formatMessage(intlStrings.Alternative_delivery_details)
    };
    const tabItems = [
        {
            key: 0,
            tabClassName: 'tab',
            panelClassName: 'tab-content tab-pane',
            title: transStrings.Site_Details,
            getContent: () => <SiteDetail clientDetail={clientDetail} changeFieldValue={changeFieldValue} />
        },

        {
            key: 1,
            tabClassName: 'tab',
            panelClassName: 'tab-content tab-pane',
            title: transStrings.Alternative_delivery_details,
            getContent: () => <SiteDetailAlt clientDetail={clientDetail} changeFieldValue={changeFieldValue} />
        }
    ];
    return (
        <React.Fragment>
            <Row>
                <Col xs="12" lg="6">
                    <Row>
                        <Col xs={12}>
                            <CustomerDetail clientDetail={clientDetail} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Tabs items={tabItems} transformWidth={400} />
                        </Col>
                    </Row>
                </Col>
                <Col xs="12" lg="6">
                    <Row>
                        <Col xs={12}>
                            <EngineeringCertification changeFieldValue={changeFieldValue} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <EngineeringModifications activeModal={activeModal}
                                                      handleModalChange={handleModalChange} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Tracking />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Delivery />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <DefaultDelivery changeFieldValue={changeFieldValue}
                                             activeModal={activeModal} handleModalChange={handleModalChange} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </React.Fragment>
    );
};

DeliverySummary.propTypes = {
    clientDetail: PropTypes.object
};

export default injectIntl(DeliverySummary);