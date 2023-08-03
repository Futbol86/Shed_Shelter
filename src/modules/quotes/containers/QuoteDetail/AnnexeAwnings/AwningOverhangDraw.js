import React, {Component} from 'react';
import {connect} from 'react-redux';
import AwningOverhangeDrawComponent from "../../../components/QuoteDetail/AnnexeAwnings/AwningOverhangDraw";

import {QUOTES_BUILDING_DETAIL_FORM_NAME} from "../../../constants";
import {formValueSelector} from "redux-form";
import sizeMe from "react-sizeme";


class AwningOverhangeDraw extends Component {
    render() {
        return (
            <AwningOverhangeDrawComponent {...this.props} parentWidth={this.props.size.width}/>
        );
    }
}

const formSelector = formValueSelector(QUOTES_BUILDING_DETAIL_FORM_NAME);
const mapStateToProps = (state) => ({
    buildingLength:     Number(formSelector(state, "buildingLength")),
    buildingSpan:       Number(formSelector(state, "buildingSpan")),
    buildingHeight:     Number(formSelector(state, "buildingHeight")),
    isAnnexeLeft:         +(formSelector(state, "isAnnexeLeft")),
    isAnnexeRight:        +(formSelector(state, "isAnnexeRight")),
    annexeLeft:           (formSelector(state, "annexeLeft")),
    annexeRight:          (formSelector(state, "annexeRight"))

});

export default connect(mapStateToProps, {})(sizeMe()(AwningOverhangeDraw));