import React, {Component} from 'react';
import {connect} from 'react-redux';
import sizeMe from 'react-sizeme';
import {formValueSelector} from "redux-form";

import DrawModeViewComponent from "../../../components/QuoteDetail/DrawingMode/DrawModeView";

import {BAY_PARTITION_WIDTH, QUOTES_BUILDING_DETAIL_FORM_NAME, DRAW_TOP_PADDING, DRAW_LEFT_PADDING} from "../../../constants";
import {QD_DM_setMounted} from "../../../actions";

class DrawModeView extends Component {

    componentDidMount(){
        this.props.QD_DM_setMounted({isMounted: true});
    }
    componentWillUnmount(){
        this.props.QD_DM_setMounted({isMounted: false});
    }


    render() {
        const bigPadding = DRAW_LEFT_PADDING;
        const topPadding = DRAW_TOP_PADDING;
        const {buildingSpan, buildingLength, buildingHeight, isAnnexeLeft,
            isAnnexeRight,  annexeLeft, annexeRight,buildingSlope} = this.props;
        const hasLeftAnnexe = isAnnexeLeft && annexeLeft && annexeLeft.height && annexeLeft.span;
        const hasRightAnnexe = isAnnexeRight && annexeRight && annexeRight.height && annexeRight.span;
        let stageWidth;
        if (this.props.size.width)
            stageWidth = this.props.size.width;
        else
            stageWidth = BAY_PARTITION_WIDTH * 10;
        const stageHeight = stageWidth * 0.8;

        var totalSpan = Math.max(hasLeftAnnexe ? annexeLeft.span : 0, hasRightAnnexe ? annexeRight.span : 0)*2
            + buildingSpan;
        const scale1 = Math.min((stageHeight - topPadding - bigPadding - 10) / (totalSpan),
            (stageWidth - bigPadding*2) / (buildingLength));

        let tempSlope = buildingSlope;
        if(!tempSlope || tempSlope===0){
            tempSlope = 10;
        }
        var roofRadian = (Math.PI * tempSlope) / 180;
        var buildingRoofHeight = Math.abs((Math.tan(roofRadian) * (buildingSpan / 2)));

        totalSpan = Math.max(hasLeftAnnexe ? annexeLeft.span : 0, hasRightAnnexe ? annexeRight.span : 0)*2
            + buildingSpan;
        var scale2 = Math.min((stageWidth - bigPadding*2) / (totalSpan),
            (stageHeight  - bigPadding - topPadding - 10) / (buildingHeight + buildingRoofHeight));

        const scale = Math.min(scale1, scale2);
        return (
            <DrawModeViewComponent {...this.props} scale={scale}
                                   stageHeight={stageHeight} stageWidth={stageWidth}/>
        );
    }
}

const formSelector = formValueSelector(QUOTES_BUILDING_DETAIL_FORM_NAME);
const mapStateToProps = (state) => ({
    bays:     formSelector(state, "bays"),
    roofs:      formSelector(state, "roofs"),
    buildingSpan:       Number(formSelector(state, "buildingSpan")),
    buildingLength:     Number(formSelector(state, "buildingLength")),
    buildingHeight:       Number(formSelector(state, "buildingHeight")),
    buildingSlope:      Number(formSelector(state, "buildingSlope")),
    isAnnexeLeft:         +(formSelector(state, "isAnnexeLeft")),
    isAnnexeRight:        +(formSelector(state, "isAnnexeRight")),
    annexeLeft:           (formSelector(state, "annexeLeft")),
    annexeRight:          (formSelector(state, "annexeRight")),
    annexeSlope:          Number(formSelector(state, "annexeSlope")),
    basePlateType:          Number(formSelector(state, "bdHoldDown")),
    productId:          Number(formSelector(state, "productId")),
});

export default connect(mapStateToProps, {QD_DM_setMounted})(sizeMe()(DrawModeView));