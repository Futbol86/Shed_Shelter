import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, formValueSelector} from "redux-form";
import {onSubmitActions} from "redux-form-submit-saga";
// import { push } from 'react-router-redux';
import { push } from 'connected-react-router';

import {addNewClientAction, getAClientInfo} from '../actions';
import ClientAddComponent from "../components/ClientAdd";
import {CLIENTS_EDIT_FORM_NAME} from "../constants";
import {getClientInfo} from "../selectors";

class ClientEditContainer extends Component {
    componentWillMount() {
        let {clientId} = this.props.match.params;
        if (!clientId)
            clientId = 1;
        this.props.getAClientInfo({id: clientId});
    }

    render() {
        if (!this.props.client.id)
            return null;
        return (
            <ClientAddComponent {...this.props} id={this.props.client.id} />
        )
    }
}

const formSelector = formValueSelector(CLIENTS_EDIT_FORM_NAME); // <-- same as form name
const mapStateToProps = (state) => ({
    client:         getClientInfo(state),
    initialValues:  getClientInfo(state),
    currentType:    formSelector(state, 'type'),
    contact1AddressNumber:  formSelector(state, 'contact1.addressNumber'),
    contact1AddressStreet:  formSelector(state, 'contact1.addressStreet'),
    contact1AddressCity:    formSelector(state, 'contact1.addressCity'),
    contact1AddressState:   formSelector(state, 'contact1.addressState'),
    contact1AddressPostcode: formSelector(state, 'contact1.addressPostcode'),
    contact1PhoneHome:      formSelector(state, 'contact1.phoneHome'),
    contact1PhoneMobile:    formSelector(state, 'contact1.phoneMobile')
});

const onSubmitSuccess = (result, dispatch) => {
    const clientId = result.data.id;
    return dispatch(push(`/clients/${clientId}`));
};

export default connect(mapStateToProps, {addNewClientAction, getAClientInfo})(
    reduxForm({
        form: CLIENTS_EDIT_FORM_NAME,
        onSubmit: onSubmitActions(CLIENTS_EDIT_FORM_NAME),
        onSubmitSuccess: onSubmitSuccess,
        enableReinitialize: true,
        keepDirtyOnReinitialize: true
    })(ClientEditContainer)
);