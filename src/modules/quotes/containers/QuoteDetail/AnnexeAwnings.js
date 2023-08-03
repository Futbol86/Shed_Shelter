import React, {Component} from "react";
import {connect} from "react-redux";
import {formValueSelector} from "redux-form";
import {QUOTES_BUILDING_DETAIL_FORM_NAME} from "../../constants";
import AnnexeAwningsComponent from "../../components/QuoteDetail/AnnexeAwnings";
import {
    PRODUCT_TYPES,
    PRODUCT_CATEGORY_SKILLION_CARPORTS,
    PRODUCT_CATEGORY_SKILLION_SHEDS
} from "../../../../constants";

class AnnexeAwnings extends Component {
    render() {
        const currentProduct = PRODUCT_TYPES.find(item => item.id === parseInt(this.props.productId));
        const isSkillionRoof = (currentProduct && (currentProduct.categoryId === PRODUCT_CATEGORY_SKILLION_CARPORTS
            || currentProduct.categoryId === PRODUCT_CATEGORY_SKILLION_SHEDS));        
        return (
            <AnnexeAwningsComponent
                {...this.props}
                isSkillionRoof={isSkillionRoof}
            />
        );
    }

}

const formSelector = formValueSelector(QUOTES_BUILDING_DETAIL_FORM_NAME);
const mapStateToProps = (state) => ({
    bays:               formSelector(state, "bays"),
    buildingLength:     Number(formSelector(state, "buildingLength")),
    numberOfBays:       Number(formSelector(state, "numberOfBays")),
});

export default connect(mapStateToProps,{})(AnnexeAwnings);