import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, getFormValues} from "redux-form";
import {onSubmitActions} from "redux-form-submit-saga";
import { push } from 'connected-react-router';

import {loadAnContructionInfo, clearContructionDetail} from '../actions';
import {loadQuoteInfo} from '../../quotes/actions';
import ContructionEditComponent from "../components/ContructionEdit";
import {CONTRUCTION_DETAIL_FORM_NAME} from "../constants";
import {getUserId} from "../../users/selectors";
// import {getQDQuoteInfo} from "../../quotes/selectors";
import {getContructionInfo} from "../selectors";

import isEmpty from "lodash/isEmpty";

class ContructionEdit extends Component {
    componentDidMount(){
        let { quoteId } = this.props.match.params;
        if (quoteId) {
            this.props.loadQuoteInfo({id: quoteId});
            this.props.loadAnContructionInfo({quoteId});
        }
    }

    componentDidUpdate(prevProps) {
        const {contructionDetails, contructionDetailsFormData} = this.props;

        if ((!contructionDetailsFormData || isEmpty(contructionDetailsFormData)) && (contructionDetails && !isEmpty(contructionDetails))) {
            let initialContructionForm = {
                ...contructionDetails
            }
    
            this.props.initialize(initialContructionForm);
        }
    }

    componentWillUnmount() {
        this.props.clearContructionDetail();
    }

    render() {
        const uploadRootURL = process.env.REACT_APP_STATIC_FILE_URL2;
        const { quoteId } = this.props.match.params;
        
        return (
            <ContructionEditComponent {...this.props} quoteId={quoteId} uploadRootURL={uploadRootURL}/>
        );
    }
}

const mapStateToProps = (state) => ({
    contructionDetailsFormData:   getFormValues(CONTRUCTION_DETAIL_FORM_NAME)(state),
    contructionDetails:           getContructionInfo(state),
    userId:                       getUserId(state),
    // quoteDetails:                 getQDQuoteInfo(state),
});

const onSubmitSuccess = (result, dispatch) => {
    return dispatch(push(`/contructions/list`));
};

const mapDispatchToProps = (dispatch) => ({
    loadQuoteInfo:                    payload => dispatch(loadQuoteInfo(payload)),
    loadAnContructionInfo:            payload => dispatch(loadAnContructionInfo(payload)),
    clearContructionDetail:           payload => dispatch(clearContructionDetail(payload)),
});

export default connect(mapStateToProps,mapDispatchToProps) (
    reduxForm({
        form: CONTRUCTION_DETAIL_FORM_NAME,
        onSubmit: onSubmitActions(CONTRUCTION_DETAIL_FORM_NAME),
        onSubmitSuccess: onSubmitSuccess,
        enableReinitialize: true,
        keepDirtyOnReinitialize: true
    })(ContructionEdit)
);