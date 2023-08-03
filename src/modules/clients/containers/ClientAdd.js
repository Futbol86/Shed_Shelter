import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, formValueSelector} from "redux-form";
import {onSubmitActions} from "redux-form-submit-saga";
// import { push } from 'react-router-redux';
import { push } from 'connected-react-router';

import {addNewClientAction} from '../actions';
import ClientAddComponent from "../components/ClientAdd";
import {CLIENTS_ADD_FORM_NAME} from "../constants";
import {getUserId} from "../../users/selectors";

/**
 * Contact1 - 4: Will use FormSection (https://redux-form.com/7.3.0/docs/api/formsection.md/)
 *  - Consider to use FieldArray? (https://redux-form.com/7.3.0/docs/api/fieldarray.md/)
 *  - City or Town: auto-completion
 */

class ClientAdd extends Component {
    componentDidMount(){
        this.props.initialize({
            userId: this.props.userId,
            type: 'sing'
        });
    }

    render(){
        return (
            <ClientAddComponent {...this.props} />
        );
    }
}

const formSelector = formValueSelector(CLIENTS_ADD_FORM_NAME); // <-- same as form name
const mapStateToProps = (state) => ({
    currentType: formSelector(state, 'type'),
    contact1AddressNumber:  formSelector(state, 'contact1.addressNumber'),
    contact1AddressStreet:  formSelector(state, 'contact1.addressStreet'),
    contact1AddressCity:    formSelector(state, 'contact1.addressCity'),
    contact1AddressState:   formSelector(state, 'contact1.addressState'),
    contact1AddressPostcode: formSelector(state, 'contact1.addressPostcode'),
    contact1PhoneHome:      formSelector(state, 'contact1.phoneHome'),
    contact1PhoneMobile:    formSelector(state, 'contact1.phoneMobile'),
    userId: getUserId(state)
});

const onSubmitSuccess = (result, dispatch) => {
    const clientId = result.data.id;
    // return dispatch(push(`/clients/${clientId}`));
    return dispatch(push(`/quotes/add/${clientId}`));   //-- Redirect to quote creation
};

export default connect(mapStateToProps, {addNewClientAction})(
    reduxForm({
        form: CLIENTS_ADD_FORM_NAME,
        onSubmit: onSubmitActions(CLIENTS_ADD_FORM_NAME),
        onSubmitSuccess: onSubmitSuccess,
        enableReinitialize: true,
        keepDirtyOnReinitialize: true
    })(ClientAdd)
);