import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, getFormValues} from "redux-form";
import {onSubmitActions} from "redux-form-submit-saga";
import { push } from 'connected-react-router';

import {loadAnContructionInfo, clearContructionDetail} from '../actions';
import {loadQuoteInfo} from '../../quotes/actions';
import ContructionAddComponent from "../components/ContructionAdd";
import {CONTRUCTION_DETAIL_FORM_NAME} from "../constants";
import {getUserId} from "../../users/selectors";
// import {getQDQuoteInfo} from "../../quotes/selectors";
import {getContructionInfo} from "../selectors";

import isEmpty from "lodash/isEmpty";

class ContructionAdd extends Component {
    componentDidMount(){
        const { quoteId } = this.props.match.params;
        if (quoteId) {
            this.props.loadQuoteInfo({id: quoteId});
            this.props.loadAnContructionInfo({quoteId});
        }
    }

    componentDidUpdate(prevProps) {
        const {savedContructionDetails, contructionDetails} = this.props;

        if ((!contructionDetails || isEmpty(contructionDetails)) && (savedContructionDetails && !isEmpty(savedContructionDetails))) {
            //Contruction is already exist, transfer to edit page
            this.props.clearContructionDetail();

            const { quoteId } = this.props.match.params;
            const { history } = this.props;
            history.push(`/contructions/edit/${quoteId}`);
        } else if ((!contructionDetails || isEmpty(contructionDetails)) && (savedContructionDetails && isEmpty(savedContructionDetails))) {
            const { quoteId } = this.props.match.params;
            const { userId } = this.props;
            
            let initialContructionForm = {
                quoteId: quoteId,
                dealer: userId,
                userId: userId,
                status: 'processing'
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
            <ContructionAddComponent {...this.props} quoteId={quoteId} uploadRootURL={uploadRootURL}/>
        );
    }
}

const mapStateToProps = (state) => ({
    contructionDetails:           getFormValues(CONTRUCTION_DETAIL_FORM_NAME)(state),
    savedContructionDetails:      getContructionInfo(state),
    userId:                       getUserId(state),
    //quoteDetails:                 getQDQuoteInfo(state),
});

const onSubmitSuccess = (result, dispatch) => {
    const { quoteId } = result.data;
    return dispatch(push(`/contructions/edit/${quoteId}`));
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
    })(ContructionAdd)
);