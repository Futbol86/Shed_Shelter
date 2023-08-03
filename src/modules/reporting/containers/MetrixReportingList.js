import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, getFormValues, formValueSelector} from 'redux-form';
import moment from 'moment';

import {RP_exportMetrixReportEXCEL, RP_clearRemoteMetrixReportEXCEL} from "../actions";
import {getRemoteMetrixReportEXCEL} from "../selectors";
import {getUserAccessModules} from "../../users/selectors";

import {loadListQuotesAction} from "../../quotes/actions";
import {getQuotesList, getPaginationInfo} from "../../quotes/selectors";
import {loadListSupplyDataEntry} from "../../orders/actions";
import {getSupplyDataEntryList} from "../../orders/selectors";
import {loadListContructionDataEntry} from "../../contructions/actions";
import {getContructionDataEntryList} from "../../contructions/selectors";
import {METRIX_REPORTING_LIST_FORM_NAME} from '../constants';

import MetrixReportingListComponent from "../components/MetrixReportingList";
import NotFound from "../../../components/common/NotFound";

class MetrixReportingList extends Component {
    componentDidMount() {
        let filter = {};
        filter.fromDate = moment(new Date()).subtract(1, 'month').toDate();
        filter.toDate = new Date();

        this.props.loadListQuotesAction({filter});
        this.props.loadListSupplyDataEntry({limit: 1000});
        this.props.loadListContructionDataEntry({limit: 1000});
    };

    componentDidUpdate() {
        const {remoteEXCEL} = this.props;

        let blobEXCEL, excelFileURL;
        if (remoteEXCEL){
            blobEXCEL = new Blob([remoteEXCEL], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;'});
            //Build a URL from the file
            excelFileURL = window.URL.createObjectURL(blobEXCEL);
            //Open the URL on new Window
            window.open(excelFileURL, '_blank');
            this.props.RP_clearRemoteMetrixReportEXCEL({});
        }
    }

    onChangePage = (page) => {
        const {limit, total} = this.props.pagination;
        const {filterData} = this.props;
        
        let filter = {};
        filter.search = filterData.search;
        filter.searchableItems = filterData.searchableItems;
        filter.fromDate = filterData.fromDate;
        filter.toDate = filterData.toDate;
        filter.deliveryFromDate = filterData.deliveryFromDate;
        filter.deliveryToDate = filterData.deliveryToDate;

        const newSkip = (page - 1) * limit;
        if (newSkip >= 0 && newSkip <= total)
            this.props.loadListQuotesAction({skip: newSkip, filter});
    };

    handleExportExcelFile = (evt) => {
        evt.preventDefault();
        const {filterData, reportableItems} = this.props;
        const {searchableItems, search, fromDate, toDate, deliveryFromDate, deliveryToDate} = filterData;

        this.props.RP_exportMetrixReportEXCEL({reportableItems, searchableItems, search, fromDate, toDate, deliveryFromDate, deliveryToDate});
    }

    render() {
        const accessModules = this.props.userAccessModules;
        
        // if (accessModules && accessModules.some(mod => mod === 'all' || mod === 'reporting')) {
            return (
                <MetrixReportingListComponent {...this.props} onChangePage={this.onChangePage} 
                                              handleExportExcelFile={this.handleExportExcelFile}/>
            );
        // } else {
        //     return (
        //         <NotFound />
        //     );
        // }
    }
}

const formSelector = formValueSelector(METRIX_REPORTING_LIST_FORM_NAME);
const mapStateToProps = (state) => ({
    userAccessModules:  getUserAccessModules(state),

    pagination:         getPaginationInfo(state),
    filterData:         getFormValues(METRIX_REPORTING_LIST_FORM_NAME)(state),

    quotes:             getQuotesList(state),
    supplyDataEntries:  getSupplyDataEntryList(state),
    tradeDataEntries:   getContructionDataEntryList(state),

    remoteEXCEL:        getRemoteMetrixReportEXCEL(state),

    reportableItems:    formSelector(state, 'reportableItems')
});

const mapDispatchToProps = (dispatch) => ({
    loadListQuotesAction:               payload => dispatch(loadListQuotesAction(payload)),
    loadListSupplyDataEntry:            payload => dispatch(loadListSupplyDataEntry(payload)),
    loadListContructionDataEntry:       payload => dispatch(loadListContructionDataEntry(payload)),

    RP_exportMetrixReportEXCEL:         payload => dispatch(RP_exportMetrixReportEXCEL(payload)),
    RP_clearRemoteMetrixReportEXCEL:    payload => dispatch(RP_clearRemoteMetrixReportEXCEL(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: METRIX_REPORTING_LIST_FORM_NAME
    })(MetrixReportingList)
);