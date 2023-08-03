import React, { Component } from 'react';
import {reduxForm, getFormValues} from 'redux-form';
import {connect} from 'react-redux';
import {RP_loadReport} from '../actions';
import ReportingFilterComponent from '../components/ReportingFilter';
import {REPORTING_DETAIL_FORM_NAME} from '../constants';

class ReportingFilter extends Component {
    componentDidMount() {
        const initialValues = {
            option: 'quoteDate',
            fromDate: new Date(),
            toDate: new Date()
        }

        this.props.initialize(initialValues);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const { filterData } = this.props;
        this.props.RP_loadReport(filterData)
    }

    render() {
        return (
            <ReportingFilterComponent {...this.props}
                handleSubmit={this.handleSubmit}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    filterData: getFormValues(REPORTING_DETAIL_FORM_NAME)(state),
});

const mapDispatchToProps = (dispatch) => ({
    RP_loadReport:    payload => dispatch(RP_loadReport(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: REPORTING_DETAIL_FORM_NAME,
    })(ReportingFilter)
);