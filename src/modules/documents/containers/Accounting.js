import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, formValueSelector, change} from "redux-form";
import {onSubmitActions} from "redux-form-submit-saga";
import {push} from "connected-react-router";
import uuid from 'uuid';

import {MODAL_TYPE_CONFIRMATION} from '../../../constants';
import {openModalAction} from "../../../actions";
import {DOCS_ACCOUNTING_FORM_NAME} from "../constants";
import auth from "../../../services/auth";
import {DOC_changeActiveModal} from "../../documents/actions";
import {getDocCurrentModalId} from "../../documents/selectors";
import {loadListSupplyDataEntry} from "../../orders/actions";
import {getSupplyDataEntryList} from "../../orders/selectors";
import {loadListContructionDataEntry} from "../../contructions/actions";
import {getContructionDataEntryList} from "../../contructions/selectors";
import {DOC_loadAnAccounting, DOC_loadAQuoteInfo, DOC_clearAnAccounting} from "../actions";
import {getAccountingDetail, getAQuoteInfo} from "../selectors";
import {getUserId} from "../../users/selectors";
import AccountingComponent from "../components/Accounting";
import NotFound from "../../../components/common/NotFound";

class Accounting extends Component {
    componentDidMount() {
        let {quoteId}  = this.props.match.params;
        const {userId} = this.props;

        this.props.initialize({quoteId, userId});
        this.props.DOC_loadAnAccounting({quoteId});
        this.props.DOC_loadAQuoteInfo(({id: quoteId}));
        this.props.loadListSupplyDataEntry({limit: 1000});
        this.props.loadListContructionDataEntry({limit: 1000});
    }

    componentWillUnmount() {
        this.props.DOC_clearAnAccounting();
    }

    componentDidUpdate(prevProps) {
        const {accountingDetail} = this.props;

        if(accountingDetail && !prevProps.accountingDetail || 
            (accountingDetail && prevProps.accountingDetail && accountingDetail.quoteId !== prevProps.accountingDetail.quoteId)) {

            this.props.initialize(accountingDetail);

            if(accountingDetail.supplierDetails) {
                this.props.changeFieldValue("supplierDetails", accountingDetail.supplierDetails);
            
                let {allPreGSTCost, allGSTCost, allTotalCost, allTotalRevenueGSTCost} = this.calculateAllTotalCost(accountingDetail.supplierDetails);
                this.props.changeFieldValue("supplierDetailsTotal", {allPreGSTCost, allGSTCost, allTotalCost, allTotalRevenueGSTCost});
            }

            if(accountingDetail.tradeDetails) {
                this.props.changeFieldValue("tradeDetails", accountingDetail.tradeDetails);

                let {allPreGSTCost, allGSTCost, allTotalCost, allTotalRevenueGSTCost} = this.calculateAllTotalCost(accountingDetail.tradeDetails);
                this.props.changeFieldValue("tradeDetailsTotal", {allPreGSTCost, allGSTCost, allTotalCost, allTotalRevenueGSTCost});
            };
        }

        //*** initialize if first create
        let {supplierDetails = [], tradeDetails = []} = this.props;

        if(supplierDetails.length === 0) {
            this.props.changeFieldValue("supplierDetails", [{"preGSTCost": 0, "gSTCost": 0, "totalCost": 0, "revenueReceiveGSTCost": 0}]);
            this.props.changeFieldValue("supplierDetailsTotal", {"allPreGSTCost": 0, "allGSTCost": 0, "allTotalCost": 0, "allTotalRevenueGSTCost": 0});
        }

        if(tradeDetails.length === 0) {
            this.props.changeFieldValue("tradeDetails", [{"preGSTCost": 0, "gSTCost": 0, "totalCost": 0, "revenueReceiveGSTCost": 0}]);
            this.props.changeFieldValue("tradeDetailsTotal", {"allPreGSTCost": 0, "allGSTCost": 0, "allTotalCost": 0, "allTotalRevenueGSTCost": 0});
        }
    }

    handleSupplierValueChange = (event, newValue, previousValue, name, index) => {
        let {supplierDetails = []} = this.props;
        let preGSTCost = 0, gSTCost = 0, totalCost = 0, revenueReceiveGSTCost = 0;

        if(name.indexOf("preGSTCost") !== -1) {
            preGSTCost = newValue;
            gSTCost    = parseFloat((preGSTCost/9).toFixed(2));
            totalCost  = preGSTCost + gSTCost;
            revenueReceiveGSTCost = supplierDetails[index].revenueReceiveGSTCost;
        } else if(name.indexOf("gSTCost") !== -1) {
            gSTCost    = newValue;
            preGSTCost = 9*gSTCost;
            totalCost  = preGSTCost + gSTCost;
            revenueReceiveGSTCost = supplierDetails[index].revenueReceiveGSTCost;
        } else if(name.indexOf("totalCost") !== -1) {
            totalCost  = newValue;
            gSTCost    = parseFloat((totalCost/11).toFixed(2));
            preGSTCost = (totalCost - gSTCost);
            revenueReceiveGSTCost = supplierDetails[index].revenueReceiveGSTCost;
        } else if(name.indexOf("revenueReceiveGSTCost") !== -1) {
            preGSTCost = supplierDetails[index].preGSTCost;
            gSTCost    = supplierDetails[index].gSTCost;
            totalCost  = supplierDetails[index].totalCost;
            revenueReceiveGSTCost  = newValue;
        } 

        if(name.indexOf("supplierDetails") !== -1) {
            supplierDetails[index].preGSTCost = preGSTCost;
            supplierDetails[index].gSTCost = gSTCost;
            supplierDetails[index].totalCost = totalCost;        
            supplierDetails[index].revenueReceiveGSTCost = revenueReceiveGSTCost;

            this.props.changeFieldValue("supplierDetails", supplierDetails);

            let {allPreGSTCost, allGSTCost, allTotalCost, allTotalRevenueGSTCost} = this.calculateAllTotalCost(supplierDetails);
            this.props.changeFieldValue("supplierDetailsTotal", {allPreGSTCost, allGSTCost, allTotalCost, allTotalRevenueGSTCost});
        }
    }

    handleTradeValueChange = (event, newValue, previousValue, name, index) => {
        let {tradeDetails = []} = this.props;
        let preGSTCost = 0, gSTCost = 0, totalCost = 0, revenueReceiveGSTCost = 0;

        if(name.indexOf("preGSTCost") !== -1) {
            preGSTCost = newValue;
            gSTCost    = parseFloat((preGSTCost/9).toFixed(2));
            totalCost  = preGSTCost + gSTCost;
            revenueReceiveGSTCost = tradeDetails[index].revenueReceiveGSTCost;
        } else if(name.indexOf("gSTCost") !== -1) {
            gSTCost    = newValue;
            preGSTCost = 9*gSTCost;
            totalCost  = preGSTCost + gSTCost;
            revenueReceiveGSTCost = tradeDetails[index].revenueReceiveGSTCost;
        } else if(name.indexOf("totalCost") !== -1) {
            totalCost  = newValue;
            gSTCost    = parseFloat((totalCost/11).toFixed(2));
            preGSTCost = (totalCost - gSTCost);
            revenueReceiveGSTCost = tradeDetails[index].revenueReceiveGSTCost;
        } else if(name.indexOf("revenueReceiveGSTCost") !== -1) {
            preGSTCost = tradeDetails[index].preGSTCost;
            gSTCost    = tradeDetails[index].gSTCost;
            totalCost  = tradeDetails[index].totalCost;
            revenueReceiveGSTCost  = newValue;
        } 

        if(name.indexOf("tradeDetails") !== -1) {
            tradeDetails[index].preGSTCost = preGSTCost;
            tradeDetails[index].gSTCost = gSTCost;
            tradeDetails[index].totalCost = totalCost;        
            tradeDetails[index].revenueReceiveGSTCost = revenueReceiveGSTCost;

            this.props.changeFieldValue("tradeDetails", tradeDetails);

            let {allPreGSTCost, allGSTCost, allTotalCost, allTotalRevenueGSTCost} = this.calculateAllTotalCost(tradeDetails);
            this.props.changeFieldValue("tradeDetailsTotal", {allPreGSTCost, allGSTCost, allTotalCost, allTotalRevenueGSTCost});
        }
    }

    calculateAllTotalCost = (details = []) => {
        let allPreGSTCost = 0, allGSTCost = 0, allTotalCost = 0, allTotalRevenueGSTCost = 0;

        details.map(item => {
            allPreGSTCost           += item.preGSTCost;
            allGSTCost              += item.gSTCost;
            allTotalCost            += item.totalCost;
            allTotalRevenueGSTCost  += item.revenueReceiveGSTCost;
        });

        return {allPreGSTCost, allGSTCost, allTotalCost, allTotalRevenueGSTCost};
    }

    handleSupplierDetailRemove = (fields, index) => {
        let {supplierDetails = []} = this.props;

        this.props.openModalAction({
            id: uuid.v4(),
            type: MODAL_TYPE_CONFIRMATION,
            text: 'Do you want to remove?',
            onConfirm: () => {
                fields.remove(index);
                supplierDetails.splice(index, 1);

                let {allPreGSTCost, allGSTCost, allTotalCost, allTotalRevenueGSTCost} = this.calculateAllTotalCost(supplierDetails);
                this.props.changeFieldValue("supplierDetailsTotal", {allPreGSTCost, allGSTCost, allTotalCost, allTotalRevenueGSTCost});
            },
        });
    }

    handleTradeDetailRemove = (fields, index) => {
        let {tradeDetails = []} = this.props;

        this.props.openModalAction({
            id: uuid.v4(),
            type: MODAL_TYPE_CONFIRMATION,
            text: 'Do you want to remove?',
            onConfirm: () => {
                fields.remove(index);
                tradeDetails.splice(index, 1);

                let {allPreGSTCost, allGSTCost, allTotalCost, allTotalRevenueGSTCost} = this.calculateAllTotalCost(tradeDetails);
                this.props.changeFieldValue("tradeDetailsTotal", {allPreGSTCost, allGSTCost, allTotalCost, allTotalRevenueGSTCost});
            },
        });
    }

    handleModalChange = (modalId) => {
        this.props.DOC_changeActiveModal({modalId});
    };

    handleModalClose = () => {
        this.handleModalChange(0);
    }

    render() {
        let {quoteId}  = this.props.match.params;
        const userData = auth.getUserFromStorage();

        if(userData && userData.roles && userData.roles.indexOf("accounting") !== -1) {
            return (
                <AccountingComponent {...this.props} quoteId={quoteId}
                                                    handleSupplierValueChange={this.handleSupplierValueChange} 
                                                    handleSupplierDetailRemove={this.handleSupplierDetailRemove} 
                                                    handleTradeValueChange={this.handleTradeValueChange} 
                                                    handleTradeDetailRemove={this.handleTradeDetailRemove}
                                                    handleModalChange={this.handleModalChange}
                                                    handleModalClose={this.handleModalClose}/>
            );
        } else {
            return (
                <NotFound />
            )
        }
    }
}

/**
 * Form validation
 *
 * @param values
 */

const formSelector = formValueSelector(DOCS_ACCOUNTING_FORM_NAME);
const mapStateToProps = (state) => ({
    currentModalId:     getDocCurrentModalId(state),
    userId:             getUserId(state),

    accountingDetail:   getAccountingDetail(state),
    supplyDataEntries:  getSupplyDataEntryList(state),
    tradeDataEntries:   getContructionDataEntryList(state),

    quoteInfo:          getAQuoteInfo(state),

    supplierDetails:    formSelector(state, "supplierDetails"),
    tradeDetails:       formSelector(state, "tradeDetails"),
});

const mapDispatchToProps = (dispatch) => ({
    DOC_changeActiveModal:          payload => dispatch(DOC_changeActiveModal(payload)),
    loadListSupplyDataEntry:        payload => dispatch(loadListSupplyDataEntry(payload)),
    loadListContructionDataEntry:   payload => dispatch(loadListContructionDataEntry(payload)),

    DOC_loadAnAccounting:           payload => dispatch(DOC_loadAnAccounting(payload)),
    DOC_loadAQuoteInfo:             payload => dispatch(DOC_loadAQuoteInfo(payload)),
    DOC_clearAnAccounting:          payload => dispatch(DOC_clearAnAccounting(payload)),

    changeFieldValue: function (field, value) {
        dispatch(change(DOCS_ACCOUNTING_FORM_NAME, field, value))
    },

    openModalAction:            payload => dispatch(openModalAction(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: DOCS_ACCOUNTING_FORM_NAME,
        onSubmit: onSubmitActions(DOCS_ACCOUNTING_FORM_NAME),
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
    })(Accounting)
);