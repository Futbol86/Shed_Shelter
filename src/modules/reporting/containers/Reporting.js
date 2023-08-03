import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, getFormValues, formValueSelector} from 'redux-form';
import ReportingComponent from "../components/Reporting";
import NotFound from "../../../components/common/NotFound";
import {getRPReportingDetail} from "../selectors";
import {getUserAccessModules} from "../../users/selectors";
import {RP_clearReportDetail} from "../actions";
// import {getDocCurrentModalId} from "../../documents/selectors";
// import {DOC_changeActiveModal} from "../../documents/actions";
import { REPORTING_DETAIL_FORM_NAME } from '../constants';

class Reporting extends Component {
    componentWillUnmount() {
        this.props.RP_clearReportDetail();
    };

    handleModalChange = (modalId) => {
        this.props.DOC_changeActiveModal({modalId});
    };

    render() {
        const accessModules = this.props.userAccessModules;
        // if (accessModules && accessModules.some(mod => mod === 'all' || mod === 'reporting')) {
            return (
                <ReportingComponent {...this.props} handleModalChange={this.handleModalChange} />
            );
        // } else {
        //     return (
        //         <NotFound />
        //     );
        // }
    }
}

const formSelector = formValueSelector(REPORTING_DETAIL_FORM_NAME);
const mapStateToProps = (state) => ({
    reportingDetail:    getRPReportingDetail(state),
    // currentModalId:     getDocCurrentModalId(state),
    userAccessModules:  getUserAccessModules(state),
    filterData:         getFormValues(REPORTING_DETAIL_FORM_NAME)(state),

    isUniqueClient:     formSelector(state, 'uniqueClient'),
    isReportNotes:      formSelector(state, 'reportNotes'),
    isReportTexts:      formSelector(state, 'reportTexts'),
});

const mapDispatchToProps = (dispatch) => ({
    // DOC_changeActiveModal:      payload => dispatch(DOC_changeActiveModal(payload)),
    RP_clearReportDetail:       payload => dispatch(RP_clearReportDetail(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: REPORTING_DETAIL_FORM_NAME
    })(Reporting)
);