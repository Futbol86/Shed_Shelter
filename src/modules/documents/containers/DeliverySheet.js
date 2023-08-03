import React, {Component} from 'react';
import {connect} from 'react-redux';
import {change, reduxForm, formValueSelector} from "redux-form";
import {onSubmitActions} from "redux-form-submit-saga";
import {withRouter} from "react-router";
import {isEqual, isEmpty} from "lodash";
import moment from 'moment';

import {
    DOCS_TYPE_DELIVERY_SHEET,  DOCS_DELIVERY_SHEET_FORM_NAME
} from "../constants";
import {DOC_changeActiveModal, DOC_loadADocument} from "../actions";
import {getQPData, getDocCurrentModalId, getShortOfTradingName, getSumScopeOfWorks} from "../selectors";
import DeliverySheetComponent from "../components/DeliverySheet";

//-- Import quote functionality from the quotes module
import {loadQuoteInfo} from '../../quotes/actions';
import {loadProfileAction} from '../../users/actions';
import {getQDClientDetail, getQDJobNumber, getQDBuildingDetail} from '../../quotes/selectors';
import {getDealerInfo, getUserId, getUserProfile} from "../../users/selectors";
import docDetail from '../sagas/docDetail';

const CURRENT_PAGE_ID = 'delivery-sheet';

class DeliverySheet extends Component {
    componentDidMount() {
        if (!this.props.dealerInfo)
            this.props.loadProfileAction({id: this.props.userId});

        let subKey = '1';
        let {quoteId} = this.props;
        if (!quoteId)
            quoteId = this.props.match.params.quoteId;
        if (quoteId) {
            subKey = quoteId;
            /*
            //-- Do not reload a document if it is already loaded
            if (this.props.savedData && (this.props.savedData.subKey === subKey)){
                this.doInitDocument(this.props.savedData);
            }
            else {
                this.props.DOC_loadADocument({
                    type: DOCS_TYPE_SCHEDULE_SHEET,
                    subKey,
                    pageId: CURRENT_PAGE_ID
                });
                this.props.loadQuoteInfo({id: quoteId});
            }*/

            //-- Load a document anytime cause savedData doesn't update values that user changes
            this.props.DOC_loadADocument({
                type: DOCS_TYPE_DELIVERY_SHEET,
                subKey,
                pageId: CURRENT_PAGE_ID
            });


            if (!this.props.savedData || (this.props.savedData.subKey !== subKey)){
                this.props.loadQuoteInfo({id: quoteId});
            }
        }
    }

    //-- Initiate the redux-form
    doInitDocument = (document) => {
        if (!isEmpty(document)){
            if (isEmpty(document.type))
                document.type = DOCS_TYPE_DELIVERY_SHEET;
            if (isEmpty(document.quoteDate)){
                const date = moment().format('DD/MM/YYYY');
                document.quoteDate = date;
            }
        }

        const {dealerInfo, userInfo, tradesSavedData, buildingDetail, clientDetail} = this.props;
        let nssJobId = '';
        if (!isEmpty(dealerInfo)) {
            if (dealerInfo.tradingName) {
                nssJobId = getShortOfTradingName(dealerInfo.tradingName);
                if (userInfo)
                    nssJobId += 'L-' + this.props.jobNumber;
            }
            else
                nssJobId = 'NSSL-000000';

            document = {
                ...document,
                nssJobId: nssJobId
            };

            if (!isEmpty(dealerInfo.paymentAccName))
                document.dealerAccountName = dealerInfo.paymentAccName;
            if (!isEmpty(dealerInfo.paymentBsb))
                document.dealerAccountBSB = dealerInfo.paymentBsb;
            if (!isEmpty(dealerInfo.paymentAccNumber))
                document.dealerAccountNumber = dealerInfo.paymentAccNumber;
        }

        if (isEmpty(document.warnText))
            document.warnText = "All late payments charged at  @ 2% per month on outstanding balance and calculated daily";

        if (isEmpty(document.clientRepresentative)){
            const {clientDetail} = this.props;
            document.clientRepresentative = clientDetail && clientDetail.contact1 && clientDetail.contact1.name;
            if (clientDetail && clientDetail.type === "dual" && clientDetail.contact2) {
                document.clientRepresentative = document.clientRepresentative + " or " + clientDetail.contact2.name;
            }
        }

        /*if (tradesSavedData && !isEmpty(tradesSavedData.scopeOfWorks)){
            document.scopeOfWorks = tradesSavedData.scopeOfWorks.map(work => {
                return {
                    ...work,
                    price: work.price ? Number(work.price).toFixed(2) : '0.00'
                };
            });
        }
        else if (isEmpty(document.scopeOfWorks)){
            let quoteNumber = '';
            if (dealerInfo.tradingName) {
                quoteNumber = getShortOfTradingName(dealerInfo.tradingName);
            }
            quoteNumber += 'L-' + this.props.jobNumber;

            document.scopeOfWorks = [
                {
                    name: 'Supply concrete slab for building as per ' + dealerInfo.tradingName,
                    desc: quoteNumber,
                    price: 0
                },
                {
                    name: 'Full construction of building as per ' + dealerInfo.tradingName,
                    desc: quoteNumber,
                    price: 0
                },
            ]
        }*/
        
        //console.log('buildingDetail', buildingDetail);
        //console.log('document.kitPrice out', document.kitPrice);
        if(isEmpty(document.referenceNumber)){
            document.referenceNumber = document.nssJobId;
        }


        if (isEmpty(document.dealerAccountName))
            document.dealerAccountName = 'National Sheds and Shelters';
        if (isEmpty(document.dealerAccountBSB))
            document.dealerAccountBSB = '082 551';
        if (isEmpty(document.dealerAccountNumber))
            document.dealerAccountNumber = '18 330 1577';

        if (!isEmpty(clientDetail)){
            document.siteAddress = {
                clientId: clientDetail.id,
                addressNumber: clientDetail.addressNumber,
                addressStreet: clientDetail.addressStreet,
                addressCity: clientDetail.addressCity,
                addressState: clientDetail.addressState,
                addressPostcode: clientDetail.addressPostcode,
                siteLocatedFrom: clientDetail.siteLocatedFrom || 0,
                lat: clientDetail.lat || 0,
                lng: clientDetail.lng || 0
            };
        }

        //console.log('initDocument', document);
        this.props.initialize(document);
    };

    handleModalChange = (modalId) => {
        this.props.DOC_changeActiveModal({modalId});
    };

    

    componentDidUpdate(prevProps) {
        const {savedData, tradesSavedData, dealerInfo, buildingDetail, 
            kitAdditionalItems, changeFieldValue, kitAdditionalItemsTotal, scopeOfWorks,
            siteAndConcreteTotal, constructionTotal} = this.props;
        //console.log('componentDidUpdate', savedData);
        if (!isEmpty(savedData) && !isEmpty(dealerInfo)) {
            if ((!isEqual(prevProps.savedData, savedData))
                || (!isEqual(prevProps.tradesSavedData, tradesSavedData))
                || (!isEqual(prevProps.dealerInfo, dealerInfo))
                || (!isEqual(prevProps.buildingDetail, buildingDetail))
            ) {
                this.doInitDocument(savedData);
            }
        } else if (!isEqual(prevProps.savedData, savedData)
                || (!isEqual(prevProps.tradesSavedData, tradesSavedData))
                || (isEmpty(savedData) && !isEqual(prevProps.dealerInfo, dealerInfo))
                || (!isEqual(prevProps.buildingDetail, buildingDetail))
        ) {
            this.doInitDocument({
                type: DOCS_TYPE_DELIVERY_SHEET,
                subKey: this.props.match && this.props.match.params && this.props.match.params.quoteId
            });
        }
       
    }

    render() {
        const {clientDetail} = this.props;
        var siteAddress;
        if (!isEmpty(clientDetail)){
            siteAddress =  {
                clientId: clientDetail.id,
                addressNumber: clientDetail.addressNumber,
                addressStreet: clientDetail.addressStreet,
                addressCity: clientDetail.addressCity,
                addressState: clientDetail.addressState,
                addressPostcode: clientDetail.addressPostcode,
                siteLocatedFrom: clientDetail.siteLocatedFrom || 0,
                lat: clientDetail.lat || 0,
                lng: clientDetail.lng || 0
            };
        }
        return (
            <DeliverySheetComponent {...this.props} siteAddress={siteAddress}
                                           handleKitDepositChange={this.handleKitDepositChange}
                                           handleModalChange={this.handleModalChange}
            />
        );
    }
}

//const tradesFormSelector = formValueSelector(DOCS_TRADES_SHEET_FORM_NAME);
const formSelector = formValueSelector(DOCS_DELIVERY_SHEET_FORM_NAME);
const mapStateToProps = (state) => ({
    userId:         getUserId(state),
    userInfo:       getUserProfile(state),
    dealerInfo:     getDealerInfo(state),
    currentModalId: getDocCurrentModalId(state),
    savedData:      getQPData(state, CURRENT_PAGE_ID),
    clientDetail:   getQDClientDetail(state),
    jobNumber:      getQDJobNumber(state),
    buildingDetail: getQDBuildingDetail(state),
    referenceNumber:     formSelector(state, "referenceNumber"),
});

const mapDispatchToProps = (dispatch) => (
    {
        changeFieldValue: function (field, value) {
            dispatch(change(DOCS_DELIVERY_SHEET_FORM_NAME, field, value))
        },
        DOC_changeActiveModal:  payload => dispatch(DOC_changeActiveModal(payload)),
        DOC_loadADocument:      payload => dispatch(DOC_loadADocument(payload)),
        loadQuoteInfo:          payload => dispatch(loadQuoteInfo(payload)),
        loadProfileAction:      payload => dispatch(loadProfileAction(payload))
    }
);

const tranformFunc = (props) => {
    return {
        ...props,
        data: JSON.stringify(props)
    }
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: DOCS_DELIVERY_SHEET_FORM_NAME,
            onSubmit: onSubmitActions(DOCS_DELIVERY_SHEET_FORM_NAME, tranformFunc),
            enableReinitialize: true,
            keepDirtyOnReinitialize: true,
            updateUnregisteredFields: true
        })(DeliverySheet)
    )
);