import React, { Component } from 'react';
import {reduxForm, getFormValues} from 'redux-form';
import {connect} from 'react-redux';
import { onSubmitActions } from 'redux-form-submit-saga';
import moment from 'moment';
import {loadListQuotesAction} from "../../quotes/actions";
import MetrixReportingListFilterComponent from '../components/MetrixReportingListFilter';
import {METRIX_REPORTING_LIST_FORM_NAME} from '../constants';

class MetrixReportingListFilter extends Component {
    componentDidMount() {
        const initialValues = {
            fromDate: moment(new Date()).subtract(1, 'month').toDate(),
            toDate: new Date(),
            deliveryFromDate: new Date(),
            deliveryToDate: new Date(),
        }

        this.props.initialize(initialValues);
    }

    handleSubmit = (evt) => {
        evt.preventDefault();
        const {filterData} = this.props;
        
        let filter = {};
        filter.search = filterData.search;
        filter.searchableItems = filterData.searchableItems;
        filter.fromDate = filterData.fromDate;
        filter.toDate = filterData.toDate;
        filter.deliveryFromDate = filterData.deliveryFromDate;
        filter.deliveryToDate = filterData.deliveryToDate;

        this.props.loadListQuotesAction({filter});
    }

    render() {
        return (
            <MetrixReportingListFilterComponent {...this.props} handleSubmit={this.handleSubmit}/>
        )
    }
}

const mapStateToProps = (state) => ({
    filterData: getFormValues(METRIX_REPORTING_LIST_FORM_NAME)(state),
});

export default connect(mapStateToProps, {loadListQuotesAction})(
    reduxForm({
        form: METRIX_REPORTING_LIST_FORM_NAME,
        onSubmit: onSubmitActions(METRIX_REPORTING_LIST_FORM_NAME),
        enableReinitialize: true,
        keepDirtyOnReinitialize: true
    })(MetrixReportingListFilter)
);