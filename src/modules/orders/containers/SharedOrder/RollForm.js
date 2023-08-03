import React, {Component} from 'react';
import {reduxForm} from "redux-form";
import {onSubmitActions} from "redux-form-submit-saga";
import {SHARED_ORDER_ROLL_FORM_FORM_NAME} from "../../constants";

import RollFormComponent from "../../components/SharedOrder/RollForm";

class RollForm extends Component {
    componentDidMount() {
        const {orderDetails} = this.props;
        this.props.initialize({
            id: orderDetails.id,
            scheduledDeliveryDate: orderDetails.scheduledDeliveryDate,
            orderReference: orderDetails.orderReference,
            consolidationAddress: orderDetails.consolidationAddress
        });
    };    

    render() {
        return (
            <RollFormComponent {...this.props} />
        );
    }
}

export default 
    reduxForm({
        form: SHARED_ORDER_ROLL_FORM_FORM_NAME,
        onSubmit: onSubmitActions(SHARED_ORDER_ROLL_FORM_FORM_NAME),
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
    })(RollForm);