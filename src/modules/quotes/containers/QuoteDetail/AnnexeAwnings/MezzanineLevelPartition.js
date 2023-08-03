import React, {Component} from 'react';
import {connect} from 'react-redux';
import MezzanineLevelPartitionComponent from "../../../components/QuoteDetail/AnnexeAwnings/MezzanineLevelPartition";

import {
    BASE_BAY_PADDING, WALL_THICKNESS, BAY_LENGTH_RATIO, BAY_PARTITION_TOP_PADDING,
    BAY_PARTITION_WIDTH, QUOTES_BUILDING_DETAIL_FORM_NAME, WALL_STATUS_NOTHING, WALL_STATUS_HAS_WALL,
     MEZZANINE_WALL_COLOR
} from "../../../constants";
import {formValueSelector} from "redux-form";


class MezzanineLevelPartition extends Component {

    handleBaseBayClick = (attr) => {
        //TODO: set Mezzanine floor status
         const {changeFieldValue} = this.props;

        if(attr.bayIndex >= 0 && attr.bayIndex < this.props.bays.length ){
            var bay = this.props.bays[attr.bayIndex];
            if(bay) {
                const fieldName = `bays[${attr.bayIndex}].` + "hasMezzanineFloor";
                changeFieldValue(fieldName, bay.hasMezzanineFloor ? 0 : 1 );
            }
        }
    };


    calculateParttionItems = (bays) => {
        var wallList = [];
        var bayBaseList = [];
        var leftX = 50;
        var bay;
        var items;
        if(bays) {
            for (var i = 0; i < bays.length; i++) {
                bay = bays[i];
                if (bay) {
                    items = this.calculatePartition(bay, i, leftX);
                    wallList = [
                        ...wallList,
                        ...items.bayWalls
                    ];

                    bayBaseList = [
                        ...bayBaseList,
                        items.floor
                    ];

                    leftX = leftX + bay.actualSize * BAY_LENGTH_RATIO;

                }
            }
        }


        return {
            wallList: wallList,
            baseBayList: bayBaseList,
            scaledBuildingLength:leftX,
        }
    };

    calculatePartition = (bay, index, leftX) =>{
        return{
            bayWalls: this.calculateWalls(bay, index, leftX),
            floor:this.drawBaseBay(bay, index, leftX)
        }
    };

    calculateWalls = (bay, bayIndex, leftX) => {
        var results = [];
        var w = this.drawWall(bay, bayIndex, 0, bay.partitionLeftStatus
            , leftX);
        if(w != null){
            results.push(w);
        }

        w = this.drawWall(bay, bayIndex, 1, bay.partitionTopStatus, leftX);
        if(w != null){
            results.push(w);
        }

        w = this.drawWall(bay, bayIndex, 2, bay.partitionRightStatus, leftX);
        if(w != null){
            results.push(w);
        }

        w = this.drawWall(bay, bayIndex, 3, bay.partitionBottomStatus, leftX);
        if(w != null){
            results.push(w);
        }

        return results;
    };

    drawWall = (bay, bayIndex, wallIndex, status, leftX)=>{
        if(status !== WALL_STATUS_NOTHING) // has wall status => wall or thin line
        {
            switch (wallIndex){
                case 0: //left
                    return {
                        x:leftX,
                        y:BAY_PARTITION_TOP_PADDING,
                        hasWall: status === WALL_STATUS_HAS_WALL,
                        isVerticle:true,
                        wallIndex:wallIndex,
                        bayIndex:bayIndex,
                        bayWidth:bay.actualSize*BAY_LENGTH_RATIO,
                        color:MEZZANINE_WALL_COLOR
                    };
                case 1: // top
                    return {
                        x:leftX,
                        y:BAY_PARTITION_TOP_PADDING,
                        hasWall:  status === WALL_STATUS_HAS_WALL,
                        isVerticle:false,
                        wallIndex:wallIndex,
                        bayIndex:bayIndex,
                        bayWidth:bay.actualSize*BAY_LENGTH_RATIO,
                        color:MEZZANINE_WALL_COLOR
                    };
                case 2: //right
                    return {
                        x:leftX + bay.actualSize*BAY_LENGTH_RATIO,
                        y:BAY_PARTITION_TOP_PADDING,
                        hasWall:  status === WALL_STATUS_HAS_WALL,
                        isVerticle:true,
                        wallIndex:wallIndex,
                        bayIndex:bayIndex,
                        bayWidth:bay.actualSize*BAY_LENGTH_RATIO,
                        color:MEZZANINE_WALL_COLOR
                    };
                case 3: // bottom
                    return {
                        x:leftX,
                        y:BAY_PARTITION_TOP_PADDING + BAY_PARTITION_WIDTH,
                        hasWall:  status === WALL_STATUS_HAS_WALL,
                        isVerticle:false,
                        wallIndex:wallIndex,
                        bayIndex:bayIndex,
                        bayWidth:bay.actualSize*BAY_LENGTH_RATIO,
                        color:MEZZANINE_WALL_COLOR
                    };
            }
        } else {
            return null;
        }
    };

    drawBaseBay = (bay, bayIndex, leftX) => {
        if(bay.actualSize - WALL_THICKNESS > 0){
            return {
                x: leftX + BASE_BAY_PADDING,
                y: BAY_PARTITION_TOP_PADDING + BASE_BAY_PADDING,
                bayIndex:bayIndex,
                width: bay.actualSize*BAY_LENGTH_RATIO - BASE_BAY_PADDING*2,
                height: BAY_PARTITION_WIDTH - BASE_BAY_PADDING*2,
                color:MEZZANINE_WALL_COLOR,
                hasMezzanineFloor: bay.hasMezzanineFloor ? bay.hasMezzanineFloor : 0,
            }
        }
    };

    render() {
        const  {wallList, baseBayList, scaledBuildingLength} = this.calculateParttionItems(this.props.bays);
        //console.log("baseBayList", baseBayList);
        if(this.props.isMezzanineFloor) {
            return (
                    <MezzanineLevelPartitionComponent walls={wallList}
                                                      baseBays={baseBayList}
                                                      scaledBuildingLength={scaledBuildingLength}
                                                      handleBaseBayClick={this.handleBaseBayClick}/>

                    );
        } else {
            return <div></div>;
        }
    }
}


const formSelector = formValueSelector(QUOTES_BUILDING_DETAIL_FORM_NAME);
const mapStateToProps = (state) => ({
    bays:     formSelector(state, "bays"),
    isMezzanineFloor: formSelector(state, "isMezzanineFloor"),
});

export default connect(mapStateToProps, {})(MezzanineLevelPartition);