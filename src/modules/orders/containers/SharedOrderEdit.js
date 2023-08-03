import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, getFormValues} from "redux-form";
import {onSubmitActions} from "redux-form-submit-saga";
import { push } from 'connected-react-router';
import uuid from "uuid";
import {openModalAction} from "../../../actions";
import {MODAL_TYPE_CONFIRMATION, MODAL_TYPE_INFORMATION} from '../../../constants';
import {loadAnOrderInfo, acceptAnOrder, rejectAnOrder, clearOrderDetail} from '../actions';
import SharedOrderEditComponent from "../components/SharedOrderEdit";
import {ORDER_DETAIL_FORM_NAME} from "../constants";
import {getUserId} from "../../users/selectors";
import {getOrderInfo, getIsOrderAccepted, getIsOrderRejected} from "../selectors";

import auth from "../../../services/auth";

import isEmpty from "lodash/isEmpty";

class SharedOrderEdit extends Component {
    componentDidMount(){
        const { quoteId } = this.props.match.params;
        const { history } = this.props;
        const query = new URLSearchParams(history.location.search);
        const orderId = +query.get('orderId');
        const accept = +query.get('accept');
        const reject = +query.get('reject');
        const supplyDataEntryId = +query.get('supplyDataEntryId');

        if (quoteId && orderId &&supplyDataEntryId && accept) {
            this.props.acceptAnOrder({
                id: orderId,
                supplyDataEntryId,
                isAccepted: true
            });
        } else if (quoteId && orderId && supplyDataEntryId && reject) {
            this.props.openModalAction({
                id: uuid.v4(),
                type: MODAL_TYPE_CONFIRMATION,
                text: 'Are you sure to reject this order?',
                onConfirm: () => {
                    this.props.rejectAnOrder({
                        id: orderId,
                        supplyDataEntryId,
                        isRejected: true
                    });
                },
                onClose: () => {
                    history.push(`/orders/shared-orders/list`);
                }
            });
        } else if (quoteId) {
            this.props.loadAnOrderInfo({quoteId, isSharedOrder: true});
        }
    }

    componentDidUpdate(prevProps) {
        const {orderDetails, orderDetailsFormData, isOrderAccepted, isOrderRejected, history} = this.props;

        if (isOrderAccepted && !prevProps.isOrderAccepted) {
            const { quoteId } = this.props.match.params;
            this.props.openModalAction({
                id: uuid.v4(),
                type: MODAL_TYPE_INFORMATION,
                text: 'The order is accepted!',
                onClose: () => {
                    this.props.loadAnOrderInfo({quoteId, isSharedOrder: true});
                    history.push(`/orders/shared-orders/edit/${quoteId}`);
                }
            });
        } else if (isOrderRejected) {
            this.props.openModalAction({
                id: uuid.v4(),
                type: MODAL_TYPE_INFORMATION,
                text: 'The order is rejected!',
                onClose: () => {
                    history.push(`/orders/shared-orders/list`);
                }
            });
        } if ((!orderDetailsFormData || isEmpty(orderDetailsFormData)) && (orderDetails && !isEmpty(orderDetails))) {
            let initialOrderForm = {
                ...orderDetails
            }
    
            this.props.initialize(initialOrderForm);
        }
    }

    componentWillUnmount() {
        this.props.clearOrderDetail();
    }

    render() {
        const { quoteId } = this.props.match.params;
        const isAdmin = auth.isAnAdmin();

        return (
            <SharedOrderEditComponent {...this.props} quoteId={quoteId} isAdmin={isAdmin}/>
        );
    }
}

const mapStateToProps = (state) => ({
    orderDetailsFormData:   getFormValues(ORDER_DETAIL_FORM_NAME)(state),
    orderDetails:           getOrderInfo(state),

    isOrderAccepted:        getIsOrderAccepted(state),
    isOrderRejected:        getIsOrderRejected(state),

    userId:                 getUserId(state),
});

const onSubmitSuccess = (result, dispatch) => {
    return dispatch(push(`/orders/share-orders/list`));
};

const mapDispatchToProps = (dispatch) => ({
    loadAnOrderInfo:            payload => dispatch(loadAnOrderInfo(payload)),
    clearOrderDetail:           payload => dispatch(clearOrderDetail(payload)),
    acceptAnOrder:              payload => dispatch(acceptAnOrder(payload)),
    rejectAnOrder:              payload => dispatch(rejectAnOrder(payload)),

    openModalAction:            payload => dispatch(openModalAction(payload)),
});

export default connect(mapStateToProps,mapDispatchToProps) (
    reduxForm({
        form: ORDER_DETAIL_FORM_NAME,
        onSubmit: onSubmitActions(ORDER_DETAIL_FORM_NAME),
        onSubmitSuccess: onSubmitSuccess,
        enableReinitialize: true,
        keepDirtyOnReinitialize: true
    })(SharedOrderEdit)
);