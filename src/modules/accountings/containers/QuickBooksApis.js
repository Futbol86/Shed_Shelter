import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, formValueSelector, change, getFormValues} from "redux-form";

import { 
    doQuickBooksAuthorizeUri, clearQuickBooksRedirectUri, doQuickBooksGetCompanyInfo
} from './../actions';
import { 
    getQuickBooksUri, getQuickBooksCompanyInfo,
} from '../selectors';
import { QUICK_BOOKS_APIS_FORM_NAME } from "../constants";
import QuickBooksApisComponent from "../components/QuickBooksApis";

class QuickBooksApis extends Component {
    componentDidMount() {
        this.props.changeFieldValue("CompanyInfo_CompanyId", "4620816365316347150")
    }

    componentDidUpdate(prevProps) {
        const { quickBooksUri } = this.props;

        if(quickBooksUri) {
            window.open(quickBooksUri, '_blank');
            this.props.clearQuickBooksRedirectUri();
        }
    }

    render() {
        return (
            <div>
                <QuickBooksApisComponent {...this.props} />
            </div>
        )
    }
}

const formSelector              = formValueSelector(QUICK_BOOKS_APIS_FORM_NAME);

const mapStateToProps = (state) => ({
    quickBooksUri:           getQuickBooksUri(state),
    quickBooksCompanyInfo:   getQuickBooksCompanyInfo(state),

    CompanyId:               formSelector(state, "CompanyInfo_CompanyId"),
});

const mapDispatchToProps = (dispatch) => ({
    doQuickBooksAuthorizeUri:            payload => dispatch(doQuickBooksAuthorizeUri(payload)),  
    clearQuickBooksRedirectUri:          payload => dispatch(clearQuickBooksRedirectUri(payload)),  

    doQuickBooksGetCompanyInfo:          payload => dispatch(doQuickBooksGetCompanyInfo(payload)),  

    changeFieldValue: function (field, value) {
        dispatch(change(QUICK_BOOKS_APIS_FORM_NAME, field, value))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: QUICK_BOOKS_APIS_FORM_NAME,
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
    })(QuickBooksApis)
);
