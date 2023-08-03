import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, getFormValues} from "redux-form";
import {onSubmitActions} from "redux-form-submit-saga";
import { push } from 'connected-react-router';

import {loadAnOrderInfo, clearOrderDetail} from '../actions';
import OrderEditComponent from "../components/OrderEdit";
import {ORDER_DETAIL_FORM_NAME} from "../constants";
import {getUserId} from "../../users/selectors";
import {getOrderInfo} from "../selectors";

import isEmpty from "lodash/isEmpty";

class OrderEdit extends Component {
    componentDidMount(){
        let { quoteId } = this.props.match.params;
        if (quoteId) {
            this.props.loadAnOrderInfo({quoteId});
        }
    }

    componentDidUpdate(prevProps) {
        const {orderDetails, orderDetailsFormData} = this.props;

        if ((!orderDetailsFormData || isEmpty(orderDetailsFormData) || !orderDetailsFormData.rollForms || !orderDetailsFormData.suppliers)
            && (orderDetails && !isEmpty(orderDetails))
        ) {
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
        return (
            <OrderEditComponent {...this.props} quoteId={quoteId}/>
        );
    }
}

const mapStateToProps = (state) => ({
    orderDetailsFormData:   getFormValues(ORDER_DETAIL_FORM_NAME)(state),
    orderDetails:           getOrderInfo(state),
    userId:                 getUserId(state),
    
});

const onSubmitSuccess = (result, dispatch) => {
    return dispatch(push(`/orders/list`));
};

const mapDispatchToProps = (dispatch) => ({
    loadAnOrderInfo:            payload => dispatch(loadAnOrderInfo(payload)),
    clearOrderDetail:           payload => dispatch(clearOrderDetail(payload)),
});

export default connect(mapStateToProps,mapDispatchToProps) (
    reduxForm({
        form: ORDER_DETAIL_FORM_NAME,
        onSubmit: onSubmitActions(ORDER_DETAIL_FORM_NAME),
        onSubmitSuccess: onSubmitSuccess,
        enableReinitialize: true,
        keepDirtyOnReinitialize: true
    })(OrderEdit)
);