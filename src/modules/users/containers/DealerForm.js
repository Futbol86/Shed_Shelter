import React, {Component} from "react";
import {change, formValueSelector, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import { onSubmitActions } from 'redux-form-submit-saga';
import {isEmpty, isEqual} from 'lodash';

import DealerFormComponent from '../components/DealerForm';
import {DEALER_INFO_FORM_NAME} from '../constants';
import {validateRequired} from "../../../components/common/Form/FieldLevelValidation";
import {checkIsDealerRole, getDealerInfo, getDealerLogoFile} from "../selectors";
import {doUploadDealerLogo} from "../actions";

class DealerForm extends Component {
    componentDidMount() {
        const {dealerInfo} = this.props;
        if (dealerInfo) {
            this.initDealerForm(dealerInfo);
        }
    }

    componentDidUpdate(prevProps) {
        const {dealerInfo} = this.props;
        if (isEmpty(prevProps.dealerInfo) && !isEmpty(dealerInfo)) {
            this.initDealerForm(dealerInfo);
        }

        const {logoFile} = this.props;
        if ( !isEmpty(logoFile) && (!isEqual(prevProps.logoFile, logoFile)) ) {
            this.props.changeFieldValue("logoFile", logoFile);
            this.props.changeFieldValue("companyLogo", `${process.env.REACT_APP_STATIC_FILE_URL}/${logoFile}`);
        }
    }

    initDealerForm = (data) => {
        this.props.initialize({
            ...data,
            id: this.props.userId
        });
    };

    handleFileDrops = (acceptedFiles, rejectedFiles) => {
        acceptedFiles.forEach(file => {
            this.props.doUploadDealerLogo(file);
        });
    };


    render() {
        return (
            <DealerFormComponent {...this.props} handleFileDrops={this.handleFileDrops} />
        );
    }
}

const validate = values => {
    const errors = {};
    errors.companyName = validateRequired(values.companyName);
    errors.tradingName = validateRequired(values.tradingName);
    return errors;
};

const formSelector = formValueSelector(DEALER_INFO_FORM_NAME);
const mapStateToProps = (state) => ({
    dealerInfo: getDealerInfo(state),
    isDealer:   checkIsDealerRole(state),
    logoFile:   getDealerLogoFile(state),
    companyLogo:   formSelector(state, "companyLogo"),
});

const mapDispatchToProps = (dispatch) => (
    {
        changeFieldValue: function (field, value) {
            dispatch(change(DEALER_INFO_FORM_NAME, field, value))
        },
        doUploadDealerLogo: payload => dispatch(doUploadDealerLogo(payload))
    }
);

export default
connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: DEALER_INFO_FORM_NAME,
        onSubmit: onSubmitActions(DEALER_INFO_FORM_NAME),
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
        validate
    })(DealerForm)
);