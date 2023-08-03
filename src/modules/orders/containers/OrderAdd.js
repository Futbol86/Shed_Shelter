import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, getFormValues} from "redux-form";
import {onSubmitActions} from "redux-form-submit-saga";
import { push } from 'connected-react-router';

import {loadAnOrderInfo, clearOrderDetail} from '../actions';
import {loadQuoteInfo} from '../../quotes/actions';
import OrderAddComponent from "../components/OrderAdd";
import {ORDER_DETAIL_FORM_NAME} from "../constants";
import {getUserId} from "../../users/selectors";
import {getOrderInfo} from "../selectors";
import {getQDJobNumber, getQDADClientInfo} from "../../quotes/selectors";

import isEmpty from "lodash/isEmpty";

class OrderAdd extends Component {
    componentDidMount(){
        const { quoteId } = this.props.match.params;
        if (quoteId) {
            this.props.loadAnOrderInfo({quoteId});
            this.props.loadQuoteInfo({id: quoteId});
        }
    }

    componentDidUpdate(prevProps) {
        const {savedOrderDetails, orderDetails} = this.props;

        if ((!orderDetails || isEmpty(orderDetails)) && (savedOrderDetails && !isEmpty(savedOrderDetails))) {
            //Order is already exist, transfer to edit page
            this.props.clearOrderDetail();

            const { quoteId } = this.props.match.params;
            const { history } = this.props;
            history.push(`/orders/edit/${quoteId}`);
        } else if ((!orderDetails || isEmpty(orderDetails)) && (savedOrderDetails && isEmpty(savedOrderDetails))) {
            const { quoteId } = this.props.match.params;
            const { userId } = this.props;
            
            let initialOrderForm = {
                quoteId: quoteId,
                userId: userId,
                status: 'processing'
            }

            this.props.initialize(initialOrderForm);
        }
    }

    componentWillUnmount() {
        this.props.clearOrderDetail();
    }

    render() {
        const { quoteId } = this.props.match.params;
        return (
            <OrderAddComponent {...this.props} quoteId={quoteId}/>
        );
    }
}

const mapStateToProps = (state) => ({
    orderDetails:           getFormValues(ORDER_DETAIL_FORM_NAME)(state),
    savedOrderDetails:      getOrderInfo(state),
    userId:                 getUserId(state),
    jobNumber:              getQDJobNumber(state),
    clientDetails:          getQDADClientInfo(state)
});

const onSubmitSuccess = (result, dispatch) => {
    const { quoteId } = result.data;
    return dispatch(push(`/orders/edit/${quoteId}`));
};

const mapDispatchToProps = (dispatch) => ({
    loadAnOrderInfo:            payload => dispatch(loadAnOrderInfo(payload)),
    clearOrderDetail:           payload => dispatch(clearOrderDetail(payload)),
    loadQuoteInfo:              payload => dispatch(loadQuoteInfo(payload)),
});

export default connect(mapStateToProps,mapDispatchToProps) (
    reduxForm({
        form: ORDER_DETAIL_FORM_NAME,
        onSubmit: onSubmitActions(ORDER_DETAIL_FORM_NAME),
        onSubmitSuccess: onSubmitSuccess,
        enableReinitialize: true,
        keepDirtyOnReinitialize: true
    })(OrderAdd)
);