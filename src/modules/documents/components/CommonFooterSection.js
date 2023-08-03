import React from 'react';
import { Row, Col, CardFooter, Alert, Button } from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';

const CommonFooterSection = ({submitting, invalid, pristine, error, submitSucceeded, tabKey, quoteId, handleGoTab, handleQuoteClick, children}) => {
    const menuStrings = {
        0: {
            id: 'app.docs.Quote_Page',
            defaultMessage: 'Quote Page'
        },
        1: {
            id: 'app.docs.Contract_Plan',
            defaultMessage: 'Contract Plan'
        },
        2: {
            id: 'app.docs.Trades',
            defaultMessage: 'Trades'
        },
        3: {
            id: 'app.docs.Colours',
            defaultMessage: 'Colours'
        },
        4: {
            id: 'app.docs.TnC',
            defaultMessage: 'T & C\'s'
        },
        5: {
            id: 'app.docs.Schedule',
            defaultMessage: 'Schedule'
        },
        6: {
            id: 'app.docs.Schedule_Ext',
            defaultMessage: 'Schedule Ext.'
        },
        7: {
            id: 'app.docs.Delivery',
            defaultMessage: 'Delivery'
        },
        // 8: {
        //     id: 'app.docs.Dealer_info_sheet',
        //     defaultMessage: 'Dealer info sheet'
        // },
        // 9: {
        //     id: 'app.docs.Variation',
        //     defaultMessage: 'Variation'
        // },
        8: {
            id: 'app.docs.Variation',
            defaultMessage: 'Variation'
        }
    };
    return (
        <React.Fragment>
            {error &&
            <Row>
                <Col xs="12">
                    <Alert color="danger">
                        <p><FormattedMessage id="app.Error" defaultMessage="Error" />: {error}</p>
                    </Alert>
                </Col>
            </Row>
            }

            {(submitSucceeded) &&
            <Row>
                <Col xs="12">
                    <Alert color="success">
                        <FormattedMessage id="app.docs.Data_was_saved_successfully" defaultMessage="Building Data was saved successfully!" />
                    </Alert>
                </Col>
            </Row>
            }

            <Row>
                <Col xs="12">
                    <CardFooter className="d-flex justify-content-between">
                        {/*(!tabKey || tabKey <= 0) ? <div /> :
                            <Button color="secondary" onClick={() => handleGoTab(tabKey - 1)}>
                                <i className="icon-arrow-left"/> {' '}
                                <FormattedMessage id={menuStrings[tabKey - 1].id} defaultMessage={menuStrings[tabKey - 1].defaultMessage} />
                            </Button>
                        /*}

                        {/* <div> */}

                        {(!tabKey || tabKey <= 0) ?
                            <Button color="secondary" onClick={() => handleGoTab(8)}>
                                <i className="icon-arrow-left"/> {' '}
                                <FormattedMessage id={menuStrings[8].id} defaultMessage={menuStrings[8].defaultMessage} />
                            </Button>
                            :
                            <Button color="secondary" onClick={() => handleGoTab(tabKey - 1)}>
                                <i className="icon-arrow-left"/> {' '}
                                <FormattedMessage id={menuStrings[tabKey - 1].id} defaultMessage={menuStrings[tabKey - 1].defaultMessage} />
                            </Button>
                        }
                        
                        {children}

                        <LaddaButton data-size={L} data-style={EXPAND_LEFT} data-color="red"
                                        data-spinner-lines={12} className="btn btn-dark mr-1" type="submit"
                                        loading={submitting} disabled={submitting || invalid || pristine}>
                            <i className="fa fa-save fa-lg" /> {' '}
                            <FormattedMessage id="app.Save" defaultMessage="Save" />
                        </LaddaButton>

                        <Button color="secondary" onClick={() => handleQuoteClick(quoteId)}>
                            <i className="fa fa-edit fa-lg" title="Edit Quote" />
                            {' '}
                            <FormattedMessage id="app.Quote" defaultMessage="Quote" />
                        </Button>

                        {(tabKey >= 8) ? 
                            <Button color="dark" onClick={() => handleGoTab(0)}>
                                <FormattedMessage id={menuStrings[0].id} defaultMessage={menuStrings[0].defaultMessage} />
                                {' '} <i className="icon-arrow-right"/>
                            </Button>
                            :
                            <Button color="dark" onClick={() => handleGoTab(tabKey + 1)}>
                                <FormattedMessage id={menuStrings[tabKey + 1].id} defaultMessage={menuStrings[tabKey + 1].defaultMessage} />
                                {' '} <i className="icon-arrow-right"/>
                            </Button>
                        }
                        
                        {/* </div> */}

                        {/*(tabKey >= 8) ? <div /> :
                            <Button color="dark" onClick={() => handleGoTab(tabKey + 1)}>
                                <FormattedMessage id={menuStrings[tabKey + 1].id} defaultMessage={menuStrings[tabKey + 1].defaultMessage} />
                                {' '} <i className="icon-arrow-right"/>
                            </Button>
                        */}
                    </CardFooter>
                </Col>
            </Row>
        </React.Fragment>

    );
};

export default CommonFooterSection;