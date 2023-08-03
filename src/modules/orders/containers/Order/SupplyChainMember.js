import React, {Component} from 'react';
import {connect} from 'react-redux';
import {formValueSelector} from "redux-form";
import {loadListSupplyDataEntry} from '../../actions';
import {DOC_changeActiveModal} from "../../../documents/actions";
import {ORDER_DETAIL_FORM_NAME, PREDEFINED_SUPPLY_TYPE_IDS} from "../../constants";
import {getDocCurrentModalId} from "../../../documents/selectors";
import {getSupplyDataEntryList} from "../../selectors";

import SupplyChainMemberComponent from "../../components/Order/SupplyChainMember";

class SupplyChainMember extends Component {
    componentDidMount(){
        const { quoteId } = this.props;
        if (quoteId) {
            this.props.loadListSupplyDataEntry({limit: 1000});
        }
    }

    handleModalChange = (modalId) => {
        this.props.DOC_changeActiveModal({modalId});
    }

    handleModalClose = () => {
        this.handleModalChange(0);
    }

    initialSupplyDataEntries = () => {
        const {supplyDataEntries} = this.props;
        let allRollForms = [], allSuppliers = [];

        if (supplyDataEntries && supplyDataEntries.length) {
            allRollForms = supplyDataEntries ? supplyDataEntries.filter(entry => entry.supplyType + '' === PREDEFINED_SUPPLY_TYPE_IDS.ROLL_FORM + '') : [];
            allSuppliers = supplyDataEntries ? supplyDataEntries.filter(entry => entry.supplyType + '' === PREDEFINED_SUPPLY_TYPE_IDS.SUPPLIER + '') : [];
        }

        return {allRollForms, allSuppliers}
    }

    render() {
        const {allRollForms, allSuppliers} = this.initialSupplyDataEntries();

        return (
            <SupplyChainMemberComponent {...this.props}
                allRollForms={allRollForms} allSuppliers={allSuppliers}
                handleModalChange={this.handleModalChange}
                handleModalClose={this.handleModalClose}
            />
        );
    }
}

const formSelector = formValueSelector(ORDER_DETAIL_FORM_NAME);
const mapStateToProps = (state) => ({
    supplyDataEntries:      getSupplyDataEntryList(state),
    rollForms:              formSelector(state, "rollForms"),
    suppliers:              formSelector(state, "suppliers"),
    selectedRollFormSupplierId:     formSelector(state, "selectedRollFormSupplierId"),
    currentModalId:         getDocCurrentModalId(state)
});

const mapDispatchToProps = (dispatch) => ({
    loadListSupplyDataEntry:    payload => dispatch(loadListSupplyDataEntry(payload)),
    DOC_changeActiveModal:      payload => dispatch(DOC_changeActiveModal(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SupplyChainMember);