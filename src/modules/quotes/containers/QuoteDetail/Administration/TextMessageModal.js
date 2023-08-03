import React, {Component} from 'react';
import {connect} from 'react-redux';
import {formValueSelector, reduxForm} from "redux-form";
import {QD_AD_sendTextMessage} from '../../../actions';
import {getQDBuildingDetailId} from "../../../selectors";
import TextMessageModalComponent from "../../../components/QuoteDetail/Administration/TextMessageModal";
import {QUOTES_AD_TEXT_MESSAGE_FORM_NAME} from "../../../constants";
import {validateRequired, validateBetweenValue} from "../../../../../components/common/Form/FieldLevelValidation";

class TextMessageModal extends Component {
    componentDidMount() {
        const {client, userInfo} = this.props;
        let initialTextMessageForm = {};
        // if (userInfo && userInfo.firstName) {
        //     let userName = userInfo.firstName.replace(/[^a-zA-Z0-9]/g, "");
        //     if (userName && userName.length > 11) {
        //         userName = userName.substring(0, 11);
        //     }
        //     initialTextMessageForm.textMessageSenderIdentity = userName;
        // }
        if (userInfo && userInfo.phone && userInfo.phone.length) {
            let phoneMobile = userInfo.phone.replace(/[^0-9]/g, "");
            initialTextMessageForm.textMessageSenderIdentity = phoneMobile;
        }

        if (client && client.contact1 && client.contact1.phoneMobile) {
            initialTextMessageForm.textMessagePhoneMobile = client.contact1.phoneMobile;
        }

        //console.log('initialTextMessageForm', initialTextMessageForm);
        this.props.initialize(initialTextMessageForm);
    }

    /**
     * Handle Note submit: We will need to do it by ourselves, cannot use the default submission since it cause
     * the parent form (buildingDetail) to be submitted too.
     *
     * @param event
     */
    handleSend = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const { currentTextMessageData, buildingId, handleModalClose, userInfo } = this.props;
        if (currentTextMessageData.senderIdentity && currentTextMessageData.phoneMobile && currentTextMessageData.content) {
            this.props.QD_AD_sendTextMessage({
                ...currentTextMessageData,
                buildingId,
                userInfo
            });
        }

        handleModalClose();
    };
    
    render() {
        return (
            <TextMessageModalComponent {...this.props}
                handleSend={this.handleSend}
                handleModalClose={this.props.handleModalClose}
            />
        );
    }
}

/**
 * Form validation
 *
 * @param values
 */
const validate = (values) => {
    const errors = {};
    /*  https://developer.nexmo.com/messaging/sms/guides/custom-sender-id
    The from parameter in the request can only contain numeric or alphanumeric values that obey certain rules:
        1. Numeric
            - Must be a telephone number of up to 15 digits
            - Must be in international format
            - Cannot include the leading + or 00
        2. Alphanumeric
            - Must be a string of up to 11 supported characters  .
            - Cannot contain spaces
    */
    const senderIdentity = values.textMessageSenderIdentity;
    let senderIdentityErr = undefined;
    if (!senderIdentity
        || !senderIdentity.length
        || (/[^a-zA-Z0-9]/.test(senderIdentity))
        || (!isNaN(senderIdentity) && senderIdentity.length > 15)
        || (isNaN(senderIdentity) && (senderIdentity.length > 11 || senderIdentity.includes(' ')))
        || (senderIdentity.length >= 2 &&  senderIdentity.substring(0, 2) === '00')
    ) {
        senderIdentityErr = '- Must be a phone number of up to 15 digits and cannot include the leading + or 00. OR:'
            + ' Must be a string of up to 11 supported characters and cannot contain spaces';
    }

    errors.textMessageSenderIdentity = senderIdentityErr;
    errors.textMessageNumber = validateRequired(values.textMessageNumber);
    errors.textMessagePhoneMobile = validateRequired(values.textMessagePhoneMobile);
    errors.textMessageContent = validateRequired(values.textMessageContent) || validateBetweenValue(0, 160)(values.textMessageContent.length);
    return errors;
};

const formSelector = formValueSelector(QUOTES_AD_TEXT_MESSAGE_FORM_NAME);
const mapStateToProps = (state) => ({
    currentTextMessageData: {
        senderIdentity:     formSelector(state, "textMessageSenderIdentity"),
        phoneMobile:        Number(formSelector(state, "textMessagePhoneMobile")),
        content:            formSelector(state, "textMessageContent")
    },
    buildingId:             getQDBuildingDetailId(state),
});

const mapDispatchToProps = (dispatch) => ({
    QD_AD_sendTextMessage:       payload => dispatch(QD_AD_sendTextMessage(payload)),
});


export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: QUOTES_AD_TEXT_MESSAGE_FORM_NAME,
        validate
    })(TextMessageModal)
);