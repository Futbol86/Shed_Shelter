import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, reset, change} from "redux-form";
import {onSubmitActions} from "redux-form-submit-saga";
import {loadListContructionPlanner} from '../../actions';
import {getContructionDataEntryList, getContructionPlannerList} from "../../selectors";
import {SHARED_CONTRUCTION_ESTIMATED_CONTRUCTION_DATE_FORM_NAME} from "../../constants";

import EstimatedContructionDateComponent from "../../components/SharedContruction/EstimatedContructionDate";

class EstimatedContructionDate extends Component {
    componentDidMount() {
        const {contructionDetails, contructionPlannerDetails, userId} = this.props;

        var CPDetail = contructionPlannerDetails && contructionPlannerDetails.filter(item => item.userId === userId);
        var estimatedStartDate = CPDetail && CPDetail[0] && CPDetail[0].estimatedStartDate;
        var estimatedCompletionDate = CPDetail && CPDetail[0] && CPDetail[0].estimatedCompletionDate;

        this.props.initialize({
            id: CPDetail && CPDetail[0] && CPDetail[0].id,
            quoteId: contructionDetails.quoteId,
            userId,
            estimatedStartDate,
            estimatedCompletionDate
        });
    };

    render() {
        return (
            <EstimatedContructionDateComponent {...this.props} />
        );
    }
}

const onSubmitSuccess = (result, dispatch) => {
    const {estimatedStartDate, estimatedCompletionDate} = result.data.data || result.data;
    dispatch(reset(SHARED_CONTRUCTION_ESTIMATED_CONTRUCTION_DATE_FORM_NAME));
    dispatch(change(SHARED_CONTRUCTION_ESTIMATED_CONTRUCTION_DATE_FORM_NAME,"estimatedStartDate", estimatedStartDate));
    dispatch(change(SHARED_CONTRUCTION_ESTIMATED_CONTRUCTION_DATE_FORM_NAME,"estimatedCompletionDate", estimatedCompletionDate));
};

const mapStateToProps = (state) => ({
    contructionDataEntries:       getContructionDataEntryList(state), 
    contructionPlannerDetails:    getContructionPlannerList(state),
});

const mapDispatchToProps = (dispatch) => ({
    loadListContructionPlanner:       payload => dispatch(loadListContructionPlanner(payload)),

    changeFieldValue: function (field, value) {
        dispatch(change(SHARED_CONTRUCTION_ESTIMATED_CONTRUCTION_DATE_FORM_NAME, field, value))
    },
});

export default connect(mapStateToProps, mapDispatchToProps) (
    reduxForm({
        form: SHARED_CONTRUCTION_ESTIMATED_CONTRUCTION_DATE_FORM_NAME,
        onSubmitSuccess: onSubmitSuccess,
        onSubmit: onSubmitActions(SHARED_CONTRUCTION_ESTIMATED_CONTRUCTION_DATE_FORM_NAME),
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
    })(EstimatedContructionDate)
)