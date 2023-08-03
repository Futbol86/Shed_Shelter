import React, {Component} from "react";
import PriceComponent from "../../components/QuoteDetail/Price";

import utils from "../../../../services/utils";

class Price extends Component {

    // formatMoney(price, decimalCount = 2, decimal = ".", thousands = ","){
    //     try {
    //         let amount = price.length > 1 ? price.substring(1) : '';
    //         decimalCount = Math.abs(decimalCount);
    //         decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
    //
    //         const negativeSign = amount < 0 ? "-" : "";
    //
    //         let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    //         let j = (i.length > 3) ? i.length % 3 : 0;
    //
    //         return "$" + negativeSign +
    //                (j ? i.substring(0, j) + thousands : '') +
    //                i.substring(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
    //                (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    //     } catch (e) {
    //         return price;
    //     }
    // };

    render() {
        const {quoteDetails, userDetail, changeFieldValue} = this.props;
        let totalPrice = 0;
        let foundFrame = false;
                
        changeFieldValue("totalPrice",  totalPrice);
        return (
            <PriceComponent foundFrame = {foundFrame}/>
        );
    }

}

export default Price;