import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, formValueSelector, change, getFormValues} from "redux-form";

import { 
    doQuickBooksAuthorizeUri, clearQuickBooksRedirectUri, doQuickBooksGetCompanyInfo
} from './../actions';
import { 
    getQuickBooksUri, getQuickBooksCompanyInfo,
} from '../selectors';
import { MYOB_APIS_FORM_NAME } from "../constants";
import MyObApisComponent from "../components/MyObApis";

class MyObApis extends Component {
    componentDidMount() {
        // this.props.changeFieldValue("CompanyInfo_CompanyId", "4620816365316347150")
    }

    componentDidUpdate(prevProps) {
        // const { quickBooksUri } = this.props;

        // if(quickBooksUri) {
        //     window.open(quickBooksUri, '_blank');
        //     this.props.clearQuickBooksRedirectUri();
        // }
    }

    handleRedirectToMyObServer = () => {
        console.log('--- handleRedirectToMyObServer')
        const CLIENT_ID = "720d2d2a-2ecd-4784-b60c-c5da48473704";
        const CLIENT_SECRECT = "l73jl7UCFjEvKmT2bPlt2v0K";
        const REDIRECT_URI = "http://localhost:4000/api/myob-callback";
        const MYOB_SERVER_URI = `https://secure.myob.com/oauth2/account/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=CompanyFile`;
        window.open(MYOB_SERVER_URI, '_blank');
    }

    render() {
        return (
            <div>
                <MyObApisComponent {...this.props} handleRedirectToMyObServer={this.handleRedirectToMyObServer}/>
            </div>
        )
    }
}

const formSelector              = formValueSelector(MYOB_APIS_FORM_NAME);

const mapStateToProps = (state) => ({
    // quickBooksUri:           getQuickBooksUri(state),
    // quickBooksCompanyInfo:   getQuickBooksCompanyInfo(state),

    // CompanyId:               formSelector(state, "CompanyInfo_CompanyId"),
});

const mapDispatchToProps = (dispatch) => ({
    // doQuickBooksAuthorizeUri:            payload => dispatch(doQuickBooksAuthorizeUri(payload)),  
    // clearQuickBooksRedirectUri:          payload => dispatch(clearQuickBooksRedirectUri(payload)),  

    // doQuickBooksGetCompanyInfo:          payload => dispatch(doQuickBooksGetCompanyInfo(payload)),  

    changeFieldValue: function (field, value) {
        dispatch(change(MYOB_APIS_FORM_NAME, field, value))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: MYOB_APIS_FORM_NAME,
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
    })(MyObApis)
);
