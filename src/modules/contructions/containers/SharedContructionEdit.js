import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, getFormValues} from "redux-form";
import {onSubmitActions} from "redux-form-submit-saga";
import { push } from 'connected-react-router';
import uuid from "uuid";
import {openModalAction} from "../../../actions";
import {MODAL_TYPE_CONFIRMATION, MODAL_TYPE_INFORMATION} from '../../../constants';
import {loadAnContructionInfo, loadListContructionPlanner, acceptAnContruction, rejectAnContruction, clearContructionDetail} from '../actions';
import SharedContructionEditComponent from "../components/SharedContructionEdit";
import {CONTRUCTION_DETAIL_FORM_NAME} from "../constants";
import {getUserId} from "../../users/selectors";
import {getContructionInfo, getContructionPlannerList, getIsContructionAccepted, getIsContructionRejected} from "../selectors";

import auth from "../../../services/auth";

import isEmpty from "lodash/isEmpty";

class SharedContructionEdit extends Component {
    componentDidMount(){
        const { quoteId } = this.props.match.params;
        const { history } = this.props;
        const query = new URLSearchParams(history.location.search);
      
        const contructionId = +query.get('contructionId');
        const accept = +query.get('accept');
        const reject = +query.get('reject');
        const contructionDataEntryId = +query.get('contructionDataEntryId');

        if (quoteId && contructionId && contructionDataEntryId && accept) {
            this.props.acceptAnContruction({
                id: contructionId,
                contructionDataEntryId,
                isAccepted: true
            });
        } else if (quoteId && contructionId && contructionDataEntryId && reject) {
            this.props.openModalAction({
                id: uuid.v4(),
                type: MODAL_TYPE_CONFIRMATION,
                text: 'Are you sure to reject this contruction?',
                onConfirm: () => {
                    this.props.rejectAnContruction({
                        id: contructionId,
                        contructionDataEntryId,
                        isRejected: true
                    });
                },
                onClose: () => {
                    history.push(`/contructions/shared-contructions/list`);
                }
            });
        } else if (quoteId) {
            let payload = {};
            payload.filter = `&quoteId=${quoteId}`;
            this.props.loadListContructionPlanner(payload);
            this.props.loadAnContructionInfo({quoteId, isSharedContruction: true});

        }
    }

    componentDidUpdate(prevProps) {
        const {contructionDetails, contructionDetailsFormData, isContructionAccepted, isContructionRejected, history} = this.props;

        if (isContructionAccepted && !prevProps.isContructionAccepted) {
            const { quoteId } = this.props.match.params;
            this.props.openModalAction({
                id: uuid.v4(),
                type: MODAL_TYPE_INFORMATION,
                text: 'The contruction is accepted!',
                onClose: () => {
                    this.props.loadAnContructionInfo({quoteId, isSharedContruction: true});
                    history.push(`/contructions/shared-contructions/edit/${quoteId}`);
                }
            });
        } else if (isContructionRejected) {
            this.props.openModalAction({
                id: uuid.v4(),
                type: MODAL_TYPE_INFORMATION,
                text: 'The contruction is rejected!',
                onClose: () => {
                    history.push(`/contructions/shared-contructions/list`);
                }
            });
        } if ((!contructionDetailsFormData || isEmpty(contructionDetailsFormData)) && (contructionDetails && !isEmpty(contructionDetails))) {
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
        const { quoteId } = this.props.match.params;
        const isAdmin = auth.isAnAdmin();
        // console.log('-- contructionPlannerDetails', this.props.contructionPlannerDetails)
        return (
            <SharedContructionEditComponent {...this.props} quoteId={quoteId} isAdmin={isAdmin}/>
        );
    }
}

const mapStateToProps = (state) => ({
    contructionDetailsFormData:   getFormValues(CONTRUCTION_DETAIL_FORM_NAME)(state),
    contructionDetails:           getContructionInfo(state),
    contructionPlannerDetails:    getContructionPlannerList(state),

    isContructionAccepted:        getIsContructionAccepted(state),
    isContructionRejected:        getIsContructionRejected(state),

    userId:                 getUserId(state),
});

const onSubmitSuccess = (result, dispatch) => {
    return dispatch(push(`/contructions/share-contructions/list`));
};

const mapDispatchToProps = (dispatch) => ({
    loadAnContructionInfo:            payload => dispatch(loadAnContructionInfo(payload)),
    loadListContructionPlanner:       payload => dispatch(loadListContructionPlanner(payload)), 
    clearContructionDetail:           payload => dispatch(clearContructionDetail(payload)),
    acceptAnContruction:              payload => dispatch(acceptAnContruction(payload)),
    rejectAnContruction:              payload => dispatch(rejectAnContruction(payload)),

    openModalAction:            payload => dispatch(openModalAction(payload)),
});

export default connect(mapStateToProps,mapDispatchToProps) (
    reduxForm({
        form: CONTRUCTION_DETAIL_FORM_NAME,
        onSubmit: onSubmitActions(CONTRUCTION_DETAIL_FORM_NAME),
        onSubmitSuccess: onSubmitSuccess,
        enableReinitialize: true,
        keepDirtyOnReinitialize: true
    })(SharedContructionEdit)
);