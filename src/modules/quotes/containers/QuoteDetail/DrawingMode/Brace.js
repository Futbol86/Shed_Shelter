import React from 'react';
import BraceComponent from '../../../components/QuoteDetail/DrawingMode/Brace';
import {
    WALL_BOTTOM_INDEX,
    WALL_RIGHT_INDEX,
    WALL_TOP_INDEX,
    QUOTES_DM_COMPONENT_IDS,
    ANNEXE_LEFT_ID,
    ANNEXE_RIGHT_ID,
    ANNEXE_WALL_RIGHT_INDEX,
    ANNEXE_WALL_HORIZONTAL_INDEX
} from "../../../constants";
import {ROLLER_DOOR_THICK} from "../../../constants";
import isEmpty from 'lodash/isEmpty';

class Brace extends React.Component {
    inititialBraces = () => {
        const {buildingDetails, bays, roofs, leftX, topY, scale} = this.props;
        return {
            allWallBraces: this.inititialWallBraces(buildingDetails, bays, leftX, topY, scale),
            allRoofBraces: this.inititialRoofBraces(buildingDetails, bays, roofs, leftX, topY, scale)
        }
    };

    inititialWallBraces = (buildingDetails, bays, leftX, topY, scale) => {
        let braceItems = [];
        let brace;
        let bay;
        let x = leftX;
        if(bays){
            for (let bayIndex = 0; bayIndex < bays.length; bayIndex++){
                bay = bays[bayIndex];
                if(bay){
                    if(bay.braces) {
                        for (let braceIndex = 0; braceIndex < bay.braces.length; braceIndex++) {
                            brace = bay.braces[braceIndex];
                            if (brace) {
                                braceItems.push(this.calcWallBracePosition(buildingDetails, bays, bayIndex, brace, braceIndex, x, topY, scale));
                            }
                        }
                    }
                    x = x + bay.actualSize * scale;
                }
            }
        }
        return braceItems;
    };

    inititialRoofBraces = (buildingDetails, bays, roofs, leftX, topY, scale) => {
        let braceItems = [];
        let brace;
        let bay, roof;
        let x = leftX;
        
        if (roofs && roofs.length >= 3){
            for (let roofIndex = 0; roofIndex < roofs.length; roofIndex = roofIndex + 2){
                roof = roofs[roofIndex];
                if (roof.braces){
                    for (let braceIndex = 0; braceIndex < roof.braces.length; braceIndex++){
                        brace = roof.braces[braceIndex];
                        let bayIndex = brace.bayIndex;
                        braceItems.push(this.calcRoofBracePosition(buildingDetails, bays, bayIndex, brace, braceIndex, x, roofIndex, topY, scale));
                    }
                }
            }
        }
        
        return braceItems;
    };

    calcWallBracePosition = (buildingDetails, bays, bayIndex, brace, braceIndex, leftXBay,  topY, scale) => {
        const bay = bays[bayIndex];
        const {buildingSpan} = buildingDetails;
        //calc left top position
        let x = leftXBay;
        let y = topY;
        let width, height;
        let isHorizontal;
        
        if (scale > 0) {
            let annexeIndex = brace.annexeIndex;
            let leftAnnexeSpan = (buildingDetails.isAnnexeLeft && !isEmpty(buildingDetails.annexeLeft)) ? buildingDetails.annexeLeft.span : 0;
            let rightAnnexeSpan = (buildingDetails.isAnnexeRight && !isEmpty(buildingDetails.annexeRight)) ? buildingDetails.annexeRight.span : 0;
            
            if (annexeIndex === ANNEXE_LEFT_ID) {
                y = y - leftAnnexeSpan * scale;
                if (brace.wallIndex === ANNEXE_WALL_RIGHT_INDEX && bayIndex >= 0){
                    x = x + bay.actualSize * scale;
                }

                isHorizontal = (brace.wallIndex === ANNEXE_WALL_HORIZONTAL_INDEX);
                height = (leftAnnexeSpan / Math.ceil(leftAnnexeSpan / 4000)) * scale;
            } else if (annexeIndex === ANNEXE_RIGHT_ID) {
                y = y + buildingSpan * scale;
                if (brace.wallIndex === ANNEXE_WALL_RIGHT_INDEX && bayIndex >= 0){
                    x = x + bay.actualSize * scale;
                } else if (brace.wallIndex === ANNEXE_WALL_HORIZONTAL_INDEX) {
                    y = y + rightAnnexeSpan * scale;
                }

                isHorizontal = (brace.wallIndex === ANNEXE_WALL_HORIZONTAL_INDEX);
                height = (rightAnnexeSpan / Math.ceil(rightAnnexeSpan / 4000)) * scale;
            } else {
                if (brace.wallIndex === WALL_RIGHT_INDEX && bayIndex >= 0){
                    x = x + bay.actualSize * scale;
                } else if (brace.wallIndex === WALL_BOTTOM_INDEX){
                    y = y + buildingSpan * scale;
                }

                isHorizontal = (brace.wallIndex === WALL_TOP_INDEX || brace.wallIndex === WALL_BOTTOM_INDEX);
                height = (buildingSpan / Math.ceil(buildingSpan / 4000)) * scale;
            }

            if (isHorizontal){
                //Side wall
                y = y - ROLLER_DOOR_THICK / 2;
                width = bay.actualSize * scale;
                height = ROLLER_DOOR_THICK;
            } else {    
                //End wall
                x = x - ROLLER_DOOR_THICK / 2;
                y = y + brace.offset * scale;
                width = ROLLER_DOOR_THICK;
            }
        }
        
        return {
            braceIndex: braceIndex,
            width: width,
            height: height,
            posX: x,
            posY: y,
            wallIndex: brace.wallIndex,
            bayIndex: bayIndex,
            scale: scale
        }
    };

    calcRoofBracePosition = (buildingDetails, bays, bayIndex, brace, braceIndex, leftXBay, roofIndex, topY, scale) => {      
        const {buildingSpan} = buildingDetails;
        const {isSkillionRoof} = this.props;
        const annexeIndex = brace.annexeIndex;
        let wallIndex = brace.wallIndex;
        let x = leftXBay;
        let y = topY;
        let height = 0;
        let width = 0;
        
        if(scale > 0) {
            let leftAnnexeSpan = (buildingDetails.isAnnexeLeft && !isEmpty(buildingDetails.annexeLeft)) ? buildingDetails.annexeLeft.span : 0;
            let rightAnnexeSpan = (buildingDetails.isAnnexeRight && !isEmpty(buildingDetails.annexeRight)) ? buildingDetails.annexeRight.span : 0;
            for (let i = 0; i < bayIndex; i++){
                let bay = bays[i];
                x = x + bay.actualSize * scale;
            }

            width = bays[bayIndex].actualSize * scale;
            if (brace.annexeIndex === ANNEXE_LEFT_ID) {
                y = y - leftAnnexeSpan * scale;
                height = leftAnnexeSpan * scale;
            } else if (brace.annexeIndex === ANNEXE_RIGHT_ID) {
                y = y + buildingSpan * scale;
                height = rightAnnexeSpan * scale;
            } else {
                if (roofIndex === 2) {   //Slope 2
                    y = y + buildingSpan / 2 * scale;
                }
                height = isSkillionRoof ? buildingSpan * scale : buildingSpan / 2 * scale;
            }
        }

        return {
            braceIndex: braceIndex,
            width: width,
            height: height,
            posX: x,
            posY: y,
            bayIndex: bayIndex,
            annexeIndex: annexeIndex,
            wallIndex: wallIndex,
            scale: scale
        }
    };

    handleDoubleClickToEditWallBrace = (event) => {
        let bayIndex, braceIndex, annexeIndex;
        if (event.target && event.target.parent && event.target.parent.attrs){
            bayIndex = event.target.parent.attrs.bayIndex ? event.target.parent.attrs.bayIndex : 0;
            braceIndex = event.target.parent.attrs.braceIndex ? event.target.parent.attrs.braceIndex : 0;
            annexeIndex = event.target.parent.attrs.annexeIndex ? event.target.parent.attrs.annexeIndex : 0;
        }
        if(this.props.handleBayBraceEditClick) {
            this.props.handleBayBraceEditClick({
                bayIndex,
                annexeIndex,
                component: {
                    index: braceIndex,
                    type: QUOTES_DM_COMPONENT_IDS.WALL_BRACE
                }
            });
        }
    };

    handleDoubleClickToEditRoofBrace = (event) => {
        let bayIndex, wallIndex, annexeIndex;
        if (event.target && event.target.parent && event.target.parent.attrs){
            bayIndex = event.target.parent.attrs.bayIndex ? event.target.parent.attrs.bayIndex : 0;
            wallIndex = event.target.parent.attrs.wallIndex ? event.target.parent.attrs.wallIndex : 0;
            annexeIndex = event.target.parent.attrs.annexeIndex ? event.target.parent.attrs.annexeIndex : 0;
        }
        if(this.props.handleBayBraceEditClick) {
            this.props.handleBayBraceEditClick({
                bayIndex,
                annexeIndex,
                component: {
                    index: wallIndex,
                    type: QUOTES_DM_COMPONENT_IDS.ROOF_BRACE
                }
            });
        }
    };

    render(){
        const {allWallBraces, allRoofBraces} = this.inititialBraces();
        return (
            <BraceComponent {...this.props} 
                            allWallBraces = {allWallBraces} allRoofBraces = {allRoofBraces}
                            handleDoubleClickToEditWallBrace = {this.handleDoubleClickToEditWallBrace}
                            handleDoubleClickToEditRoofBrace = {this.handleDoubleClickToEditRoofBrace}
            />
        );
    }
}

export default Brace;