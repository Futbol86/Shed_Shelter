import React, {Component} from "react";
import {connect} from "react-redux";
import {formValueSelector} from "redux-form";
import {QUOTES_BUILDING_DETAIL_FORM_NAME} from "../../constants";
import OtherAccessoriesComponent from "../../components/QuoteDetail/OtherAccessories";
import ProductConvert from "../QuoteDetail/Calculation/ProductConvert";

class OtherAccessories extends Component {
    render() {
        return (
            <OtherAccessoriesComponent {...this.props}
                buildingInsulations = {ProductConvert.predefinedBuildingInsulations(this.props.rollFormSupply)}
            />
        );
    }

}

const formSelector = formValueSelector(QUOTES_BUILDING_DETAIL_FORM_NAME);
const mapStateToProps = (state) => ({
    buildingLength:     Number(formSelector(state, "buildingLength")),
    skylightGarageRoofs: (formSelector(state, "skylightGarageRoofs")),
    roofInsulationType: (formSelector(state, "roofInsulationType")),
    roofInsulationQty: Number(formSelector(state, "roofInsulationQty")),
    roofSafeWireType: (formSelector(state, "roofSafeWireType")),
    roofSafeWireQty: Number(formSelector(state, "roofSafeWireQty")),
    wallInsulationType: (formSelector(state, "wallInsulationType")),
    wallInsulationQty: Number(formSelector(state, "wallInsulationQty")),
    rollFormSupply:  formSelector(state, "rollFormSupply"),
});

export default connect(mapStateToProps,{})(OtherAccessories);