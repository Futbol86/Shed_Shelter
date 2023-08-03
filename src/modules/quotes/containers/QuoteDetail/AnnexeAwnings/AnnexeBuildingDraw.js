import React, {Component} from 'react';
import {connect} from 'react-redux';

import AnnexeBuildingDrawComponent from "../../../components/QuoteDetail/AnnexeAwnings/AnnexeBuildingDraw";
import {QUOTES_BUILDING_DETAIL_FORM_NAME} from "../../../constants";
import {formValueSelector} from "redux-form";


class AnnexeBuildingDraw extends Component {
    render() {
        return (
            <div ref="drawLayer">
                  <AnnexeBuildingDrawComponent {...this.props} />
            </div>
        );
    }
}

const formSelector = formValueSelector(QUOTES_BUILDING_DETAIL_FORM_NAME);
const mapStateToProps = (state) => ({
    buildingSpan:       Number(formSelector(state, "buildingSpan")),
    buildingHeight:     Number(formSelector(state, "buildingHeight")),
    buildingSlope:      Number(formSelector(state, "buildingSlope")),
    isAnnexeLeft:         +(formSelector(state, "isAnnexeLeft")),
    isAnnexeRight:        +(formSelector(state, "isAnnexeRight")),
    isMezzanineFloor:     +(formSelector(state, "isMezzanineFloor")),
    annexeLeft:           (formSelector(state, "annexeLeft")),
    annexeRight:          (formSelector(state, "annexeRight")),
    annexeSlope:          Number(formSelector(state, "annexeSlope")),
    mezzanineFloor:       (formSelector(state, "mezzanineFloor")),
    productId:          Number(formSelector(state, "productId")),
});

export default connect(mapStateToProps, {})(AnnexeBuildingDraw);