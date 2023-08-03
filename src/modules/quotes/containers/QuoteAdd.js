import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
//import {push} from "react-router-redux";
import { push } from 'connected-react-router';
import {reduxForm} from "redux-form";
import {onSubmitActions} from "redux-form-submit-saga";


import {addNewQuoteAction} from '../actions';
import QuoteAddComponent from "../components/QuoteAdd";
import {QUOTES_PRODUCT_SELECTION_FORM_NAME} from "../constants";

import {validateRequired} from '../../../components/common/Form/FieldLevelValidation';
import {getUserId} from "../../users/selectors";


class QuoteAdd extends Component {
    componentDidMount() {
        let {clientId} = this.props.match.params;

        if (!clientId) {
            const {history} = this.props;
            history.push('/clients/list');
        }
        else
            this.props.initialize({
                clientId,
                userId: this.props.userId
            });
    }

    render() {
        let {clientId} = this.props.match.params;
        return (
            <QuoteAddComponent clientId={clientId} {...this.props} />
        );
    }
}

const validate = values => {
    const errors = {};
    errors.productId = validateRequired(values.productId);
    return errors;
};

const onSubmitSuccess = (result, dispatch) => {
    const quoteId = result.data.id;
    return dispatch(push(`/quotes/edit/${quoteId}?fromCreated=1`));
};

const mapStateToProps = (state) => ({
    userId: getUserId(state)
});

export default withRouter(
    connect(mapStateToProps, {addNewQuoteAction})(
        reduxForm({
            form: QUOTES_PRODUCT_SELECTION_FORM_NAME,
            onSubmit: onSubmitActions(QUOTES_PRODUCT_SELECTION_FORM_NAME),
            enableReinitialize: true,
            keepDirtyOnReinitialize: true,
            validate,
            onSubmitSuccess
        })(QuoteAdd)
    )
);