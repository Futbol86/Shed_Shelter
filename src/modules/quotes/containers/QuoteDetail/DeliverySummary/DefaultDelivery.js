import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import DefaultDeliveryComponent from "../../../components/QuoteDetail/DeliverySummary/DefaultDelivery";
import {formValueSelector} from "redux-form";
import {QUOTES_BUILDING_DETAIL_FORM_NAME} from "../../../constants";
import utils from "../../../../../services/utils";
import {checkIsDealerRole} from "../../../../users/selectors";


class DefaultDelivery extends Component {
    componentDidMount(){
        const {dealerKitMargin, retailMarginPrice, finalTotal} = this.props;
        if (dealerKitMargin && retailMarginPrice && finalTotal) {
            this.updateDealerProfit(dealerKitMargin, retailMarginPrice, finalTotal);
        }
    }

    componentDidUpdate(prevProps) {
        const {dealerKitMargin, retailMarginPrice, finalTotal} = this.props;
        if (dealerKitMargin < 0 || dealerKitMargin > 100)
            return ;
        if (finalTotal && (prevProps.currentRetailMargin !== retailMarginPrice)) {
            this.updateDealerProfit(dealerKitMargin, retailMarginPrice, finalTotal);
        }
    }

    updateDealerProfit = (dealerKitMargin, retailMarginPrice, finalTotal) => {
        const {changeFieldValue} = this.props;
        if (dealerKitMargin >= 0 && retailMarginPrice >= 0 && finalTotal >= 0) {
            changeFieldValue('dealerSalePrice', utils.formatCurrencyRaw(finalTotal));
            changeFieldValue('dealerProfit',    utils.formatCurrencyRaw(retailMarginPrice));
            changeFieldValue('dealerCost',      utils.formatCurrencyRaw(Math.round(finalTotal - retailMarginPrice * 1.1)));
            //-- Save the current value
            changeFieldValue('currentRetailMargin',    retailMarginPrice);
        }
    };

    render() {
        // if (!this.props.isDealer)
        //     return null;

        return (
            <DefaultDeliveryComponent {...this.props}
            />
        );
    }
}

DefaultDelivery.propTypes = {
    changeFieldValue: PropTypes.func
};

const bdFormSelector = formValueSelector(QUOTES_BUILDING_DETAIL_FORM_NAME);
const mapStateToProps = (state) => ({
    dealerKitMargin:        bdFormSelector(state, 'dealerKitMargin'),
    retailMarginPrice:      bdFormSelector(state, 'retailMarginPrice'),
    finalTotal:             bdFormSelector(state, 'finalTotal'),
    currentRetailMargin:    bdFormSelector(state, 'currentRetailMargin'),
    isDealer:               checkIsDealerRole(state),
});

export default connect(mapStateToProps, {})(DefaultDelivery);