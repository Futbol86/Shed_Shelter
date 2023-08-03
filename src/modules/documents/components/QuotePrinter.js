import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import {defineMessages, injectIntl} from 'react-intl';

import Tabs from 'react-responsive-tabs';
import 'react-responsive-tabs/styles.css';
import DeliverySheet from "../containers/DeliverySheet";
import FormSheet from "../containers/FormSheet";
import NoteSheet from "../containers/NoteSheet";

const QuotePrinter = ({quoteId, product, selectedTab, handleGoTab, handleQuoteClick, intl}) => {
    const intlStrings = defineMessages({
        Quote_Page: {
            id: 'app.docs.Quote_Page',
            defaultMessage: 'Quote Page'
        },
        Contract_Plan: {
            id: 'app.docs.Contract_Plan',
            defaultMessage: 'Contract Plan'
        },
        Trades: {
            id: 'app.docs.Trades',
            defaultMessage: 'Trades'
        },
        Colours: {
            id: 'app.docs.Colours',
            defaultMessage: 'Colours'
        },
        TnC: {
            id: 'app.docs.TnC',
            defaultMessage: 'T & C\'s'
        },
        Schedule: {
            id: 'app.docs.Schedule',
            defaultMessage: 'Schedule'
        },
        Schedule_Ext: {
            id: 'app.docs.Schedule_Ext',
            defaultMessage: 'Schedule Ext.'
        },
        Delivery: {
            id: 'app.docs.Delivery',
            defaultMessage: 'Delivery'
        },
        // Dealer_info_sheet: {
        //     id: 'app.docs.Dealer_info_sheet',
        //     defaultMessage: 'Dealer info sheet'
        // },
        Variation: {
            id: 'app.docs.Variation',
            defaultMessage: 'Variation'
        },
        Form: {
            id: 'app.docs.Form',
            defaultMessage: 'Form'
        },
        Note: {
            id: 'app.contruction.Note',
            defaultMessage: 'Note'
        }
    });

    const transStrings = {
        Quote_Page: intl.formatMessage(intlStrings.Quote_Page),
        Contract_Plan: intl.formatMessage(intlStrings.Contract_Plan),
        Trades: intl.formatMessage(intlStrings.Trades),
        Colours: intl.formatMessage(intlStrings.Colours),
        TnC: intl.formatMessage(intlStrings.TnC),
        Schedule: intl.formatMessage(intlStrings.Schedule),
        Schedule_Ext: intl.formatMessage(intlStrings.Schedule_Ext),
        Delivery: intl.formatMessage(intlStrings.Delivery),
        // Dealer_info_sheet: intl.formatMessage(intlStrings.Dealer_info_sheet),
        Variation: intl.formatMessage(intlStrings.Variation),
        Form: intl.formatMessage(intlStrings.Form),
        Note: intl.formatMessage(intlStrings.Note),
    };

    let tabItems = [];
    if (quoteId) {
        tabItems = [
            {
                key: 7,
                tabClassName: 'nav-item nav-link',
                panelClassName: 'tab-content tab-pane',
                title: transStrings.Delivery,
                getContent: () => <DeliverySheet quoteId={quoteId} handleGoTab={handleGoTab} handleQuoteClick={handleQuoteClick} />
            },
            {
                key: 8,
                tabClassName: 'nav-item nav-link',
                panelClassName: 'tab-content tab-pane',
                title: transStrings.Form,
                getContent: () => <FormSheet quoteId={quoteId} handleGoTab={handleGoTab} />
            },
            {
                key: 9,
                tabClassName: 'nav-item nav-link',
                panelClassName: 'tab-content tab-pane',
                title: transStrings.Note,
                getContent: () => <NoteSheet quoteId={quoteId} handleGoTab={handleGoTab} />
            }
        ]
    }
    return (
        <div className="animated fadeIn">
            <Row>
                <Col xs="12" className="pb-2">
                    <Tabs items={tabItems} selectedTabKey={selectedTab}
                          onChange={(key) => handleGoTab(key)}    />
                </Col>
            </Row>
        </div>
    );
};

QuotePrinter.propTypes = {
    handleSubmit: PropTypes.func
};

export default injectIntl(QuotePrinter);