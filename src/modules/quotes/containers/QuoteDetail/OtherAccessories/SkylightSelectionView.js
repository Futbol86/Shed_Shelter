import React, {Component} from 'react';
import {connect} from 'react-redux';
import SkylightSelectionViewComponent from "../../../components/QuoteDetail/OtherAccessories/SkylightSelectionView";

import {
    BAY_LENGTH_RATIO,
    QUOTES_BUILDING_DETAIL_FORM_NAME,
    SKYLIGHT_ROW_IDS
} from "../../../constants";
import {PRODUCT_CATEGORY_SKILLION_CARPORTS, PRODUCT_CATEGORY_SKILLION_SHEDS} from "../../../../../constants";
import {formValueSelector} from "redux-form";


class SkylightSelectionView extends Component {

    handleClick = (attr) => {
        //console.log("SkylightSelectionView: click", attr);
        if(attr.rowIndex >= 0 && attr.partIndex >= 0 && attr.skylightIndex >= 0
            && this.selectableSkylight(attr.rowIndex, attr.partIndex, attr.skylightIndex)
        ){
            var newStatus = !attr.hasSkylight;
            const {changeFieldValue} = this.props;
            const fieldName = `skylightGarageRoofs[${attr.rowIndex}].[${attr.partIndex}].items[${attr.skylightIndex}].s`;
            changeFieldValue(fieldName, newStatus);
            this.countSelectedSkylight();
        }
    };

    countSelectedSkylight = () => {
        const {skylightGarageRoofs, changeFieldValue} = this.props;
        let item;
        let count=0;
        for (var row = 0; row < skylightGarageRoofs.length; row++) {
            if (skylightGarageRoofs[row])
                for (var part = 0; part < skylightGarageRoofs[row].length; part++) {
                    if(skylightGarageRoofs[row][part] && skylightGarageRoofs[row][part].items) {
                        for(let itemIndex = 0; itemIndex < skylightGarageRoofs[row][part].items.length; itemIndex++){
                            item = skylightGarageRoofs[row][part].items[itemIndex];
                            if(item.s){
                                count = count + 1;
                            }
                        }
                    }
                }
        }
        changeFieldValue(`skylightGarageQty`, count);
    };

    selectableSkylight = (rowIndex, partIndex, skylightIndex) => {
        const {skylightGarageRoofs} = this.props;
        var result = false;
        if(skylightIndex>0 && skylightGarageRoofs && skylightGarageRoofs.length > rowIndex
            && skylightGarageRoofs[rowIndex].length > partIndex
            && skylightGarageRoofs[rowIndex][partIndex]
            && skylightGarageRoofs[rowIndex][partIndex].items
            && skylightGarageRoofs[rowIndex][partIndex].items.length > skylightIndex
            && skylightIndex < skylightGarageRoofs[rowIndex][partIndex].items.length - 1
        ){
            var items = skylightGarageRoofs[rowIndex][partIndex].items;
            if(!(items[skylightIndex-1].s || items[skylightIndex+1].s)){
                result = true;
            }
        }

        return result;
    }

    /*
    * roof structure
    * [
    *     // item 0, annexe left
    *     // includes bays
    *     [ {startBay:0, items: // bay 0 and list of roof items from the beginning of this bay index
    *           [{w:720, s:(false-roof, true-skylight)}, .....]
    *       }, {},
    *      ...]
    *      //end annexe left
    *      ,
    *      [// main building, left side]
    *      ,
    *      [// main building, right side]
    *      ,
    *      [// right annexe]
    * ]
    * */
    calculateRoofItems = (rowIndex, bays, leftX, topY, height, scale)=>{
        const {roofColors0, skylightColor, skylightGarageRoofs} = this.props;
        var index = 0;
        var roofItems = [];
        var x;
        var y = topY; //top for main building
        var countBayIndex = 0;
        var distanceToStartBay = 0;
        if(skylightGarageRoofs[rowIndex].length > 0){
            for(var partIndex = 0; partIndex < skylightGarageRoofs[rowIndex].length; partIndex++)
            {
                var {startBay, items} = skylightGarageRoofs[rowIndex][partIndex];
                for(countBayIndex; countBayIndex < startBay && countBayIndex < bays.length; countBayIndex++){
                    distanceToStartBay = distanceToStartBay + bays[countBayIndex].actualSize;
                }

                x = leftX + distanceToStartBay*scale;
                for (var i = 0; i < items.length; i++) {
                    roofItems.push({
                        x: x,
                        y: y,
                        hasSkylight: items[i].s,
                        width: items[i].w * scale,
                        skylightColor: skylightColor,
                        height: height,
                        skylightIndex: i,
                        partIndex: partIndex,
                        rowIndex: rowIndex,
                        roofColor: roofColors0
                    });
                    x = x + items[i].w * scale;
                }

            }
        }
        return roofItems;
    }

    addItemToList = (item, list) => {
        if(item != null){
            list.push(item);
        }
        return list;
    }

    render() {
       // console.log("render");
        var scale = BAY_LENGTH_RATIO/1.5;
        var leftX = 20;
        var topY = 20;
        const {bays, buildingLength, buildingSpan,
            isAnnexeLeft, isAnnexeRight, annexeLeft, annexeRight,skylightGarageRoofs} = this.props;
        const hasLeftAnnexe = isAnnexeLeft && annexeLeft && annexeLeft.height && annexeLeft.span;
        const hasRightAnnexe = isAnnexeRight && annexeRight && annexeRight.height && annexeRight.span;
        var scaledBuildingLength = buildingLength*scale + leftX*2;
        var scaleTotalBuildingSpan = (buildingSpan
                                + (hasLeftAnnexe ? annexeLeft.span : 0)
                                + (hasRightAnnexe ? annexeRight.span : 0))*scale + topY*2;
        var items =[];
        if(skylightGarageRoofs && skylightGarageRoofs.length >= 4) {

            if (this.props.productCategoryId === PRODUCT_CATEGORY_SKILLION_CARPORTS ||
                this.props.productCategoryId === PRODUCT_CATEGORY_SKILLION_SHEDS
            ) {
                items = [
                    ...this.calculateRoofItems(SKYLIGHT_ROW_IDS.MAIN_LEFT_ROW, bays, leftX,
                        topY + (hasLeftAnnexe ? annexeLeft.span : 0) * scale, buildingSpan / 2 * scale, scale)
                ];
            } else {
                items =
                    [
                        ...this.calculateRoofItems(SKYLIGHT_ROW_IDS.MAIN_LEFT_ROW, bays, leftX,
                            topY + (hasLeftAnnexe ? annexeLeft.span : 0) * scale, buildingSpan / 2 * scale, scale),
                        ...this.calculateRoofItems(SKYLIGHT_ROW_IDS.MAIN_RIGHT_ROW, bays, leftX,
                            topY + (hasLeftAnnexe ? annexeLeft.span : 0) * scale + buildingSpan / 2 * scale,
                            buildingSpan / 2 * scale, scale),
                        ...this.calculateRoofItems(SKYLIGHT_ROW_IDS.ANNEXE_LEFT_ROW, bays, leftX,
                            topY,
                            hasLeftAnnexe ? annexeLeft.span * scale : 0, scale),
                        ...this.calculateRoofItems(SKYLIGHT_ROW_IDS.ANNEXE_RIGHT_ROW, bays, leftX,
                            topY + (buildingSpan + (hasLeftAnnexe ? annexeLeft.span : 0)) * scale,
                            hasRightAnnexe ? annexeRight.span * scale : 0, scale)
                    ];
            }
        }
        return (
            <SkylightSelectionViewComponent
                                   skylightItems={items}
                                   scaledBuildingLength={scaledBuildingLength}
                                   scaleTotalBuildingSpan={scaleTotalBuildingSpan}
                                   handleClick={this.handleClick}
            />
        );
    }
}


const formSelector = formValueSelector(QUOTES_BUILDING_DETAIL_FORM_NAME);
const mapStateToProps = (state) => ({
    bays:     formSelector(state, "bays"),
    buildingLength:     Number(formSelector(state, "buildingLength")),
    buildingSpan:       Number(formSelector(state, "buildingSpan")),
    isAnnexeLeft:         +(formSelector(state, "isAnnexeLeft")),
    isAnnexeRight:        +(formSelector(state, "isAnnexeRight")),
    annexeLeft:           (formSelector(state, "annexeLeft")),
    annexeRight:          (formSelector(state, "annexeRight")),
    roofColors0:    formSelector(state, "roofs[0].color"),
    roofColors2:    formSelector(state, "roofs[2].color"),
    skylightColor:  formSelector(state, "skylightColor"),
});

export default connect(mapStateToProps, {})(SkylightSelectionView);