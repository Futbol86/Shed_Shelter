import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import { Prompt } from 'react-router';

import {doChangeTab} from '../actions';
import QuotePrinterComponent from "../components/QuotePrinter";
import {getSelectedTab} from "../selectors";

class QuotePrinter extends Component {
    componentWillUnmount() {
        this.props.doChangeTab({tabIndex: 0});
    };

    /**
     * Handle go to tabs in Quote Printer.
     *
     * @param idx
     * @param currentTabIndex
     */
    handleGoTab = (idx) => {
        this.props.doChangeTab({tabIndex: idx});
    };

    handleQuoteClick = (quoteId) => {
        if (quoteId) {
            const {history} = this.props;
            history.push(`/quotes/edit/${quoteId}`);
        }
    };

    render() {
        const {quoteId} = this.props.match.params;
        return (
            <React.Fragment>
                <QuotePrinterComponent {...this.props} quoteId={quoteId} selectedTab={9}
                    handleGoTab={this.handleGoTab} handleQuoteClick={this.handleQuoteClick}
                />
                <Prompt
                    when={this.props.dirty}
                    message={`WARNING: There is unsaved data in the current Form. \r\nAre you sure you want to leave?`}
                />
            </React.Fragment>
        );
    }
}


const mapStateToProps = (state) => ({
    selectedTab:    getSelectedTab(state)
});


export default withRouter(
    connect(mapStateToProps, {doChangeTab})((QuotePrinter))
);