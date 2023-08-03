import React from 'react';
import {Stage, Layer,  Line} from 'react-konva';
import {BAY_PARTITION_WIDTH, WALL_THICKNESS} from "../../../constants";
import {getBuildingSlopesListFromProduct} from "../../../selectors";

class AnnexeBuildingDraw extends React.Component {
    render() {
        const padding = 2;
        const {buildingSpan, buildingHeight, buildingSlope, annexeSlope, isAnnexeLeft,
            isAnnexeRight, isMezzanineFloor, annexeLeft, annexeRight, mezzanineFloor, productId, isSkillionRoof} = this.props;
        const hasLeftAnnexe = isAnnexeLeft && annexeLeft && annexeLeft.height && annexeLeft.span;
        const hasRightAnnexe = isAnnexeRight && annexeRight && annexeRight.height && annexeRight.span;
        const hasMezzanine = isMezzanineFloor && mezzanineFloor && mezzanineFloor.height;

        let tempSlope = buildingSlope;
        if(!tempSlope || tempSlope===0){
            const slopeList = getBuildingSlopesListFromProduct(productId);
            if(slopeList && slopeList.length > 0){
                tempSlope = slopeList[0];
            } else {
                tempSlope = 10;
            }
        }
        const roofRadian = (Math.PI * tempSlope) / 180;
        const buildingRoofHeight = isSkillionRoof ? Math.abs((Math.tan(roofRadian) * buildingSpan)) :
            Math.abs((Math.tan(roofRadian) * (buildingSpan / 2)));


        tempSlope = annexeSlope;
        if(!tempSlope || tempSlope===0){
            tempSlope = 5;
        }
        let annexeRadian = (Math.PI * tempSlope) / 180;
        let annexLeftRoofHeight = 0;
        let annexRightRoofHeight = 0;
        if(hasLeftAnnexe){
            annexLeftRoofHeight = Math.abs((Math.tan(annexeRadian) * (annexeLeft.span)));
        }
        if(hasRightAnnexe){
            annexRightRoofHeight = Math.abs((Math.tan(annexeRadian) * (annexeRight.span)));
        }

        //below values would be the actual parent size
        let stageWidth;
        if (this.props.parentWidth)
            stageWidth = this.props.parentWidth;
        else
            stageWidth = BAY_PARTITION_WIDTH * 10;

        const stageHeight = BAY_PARTITION_WIDTH * 7;
        const centerX = stageWidth/2;

        const totalSpan = (Math.max(hasLeftAnnexe ? annexeLeft.span : 0, hasRightAnnexe ? annexeRight.span : 0)
                            + padding)*2 + buildingSpan;
        const scale = Math.min((stageWidth  - padding*2) / (totalSpan),
                      (stageHeight  - padding*3) / (buildingHeight+buildingRoofHeight));

        return (
            <Stage height={stageHeight} width={stageWidth}>
                <Layer>
                    {isSkillionRoof ?
                        <Line
                            points={[
                                // start point at the bottom of left wall
                                (centerX - (buildingSpan/2)*scale), (stageHeight - padding),
                                // left wall
                                (centerX - (buildingSpan/2)*scale), (stageHeight - buildingHeight*scale - padding),
                                //roof
                                (centerX + (buildingSpan/2)*scale), (stageHeight - (buildingHeight + buildingRoofHeight)*scale - padding),
                                // right wall
                                (centerX + (buildingSpan/2)*scale), (stageHeight - padding),
                                // end point
                                (centerX - (buildingSpan/2)*scale), (stageHeight - padding),
                            ]}
                            fill="#000000"
                            stroke="#000000"
                            strokeWidth={WALL_THICKNESS}
                            close={true}
                        />
                        :
                        <Line
                            points={[
                                // start point at the bottom of left wall
                                (centerX - (buildingSpan/2)*scale), (stageHeight - padding),
                                // left wall
                                (centerX - (buildingSpan/2)*scale), (stageHeight - buildingHeight*scale - padding),
                                //left roof
                                (centerX), (stageHeight - (buildingHeight + buildingRoofHeight)*scale - padding),
                                // right roof
                                (centerX + (buildingSpan/2)*scale), (stageHeight - buildingHeight*scale - padding),
                                // right wall
                                (centerX + (buildingSpan/2)*scale), (stageHeight - padding),
                                // end point
                                (centerX - (buildingSpan/2)*scale), (stageHeight - padding),
                            ]}
                            fill="#000000"
                            stroke="#000000"
                            strokeWidth={WALL_THICKNESS}
                            close={true}
                        />
                    }

                    {/*Left Annexe*/}
                    {hasLeftAnnexe ?
                            <Line
                            points={[
                            // start point at the bottom of left wall
                            (centerX - (buildingSpan/2)*scale), (stageHeight - padding),
                            // base left annexe line
                            (centerX - (buildingSpan/2 + annexeLeft.span)*scale), (stageHeight - padding),
                            // left annexe wall
                            (centerX - (buildingSpan/2 + annexeLeft.span)*scale),  (stageHeight - annexeLeft.height*scale - padding),
                            //left roof
                            (centerX - (buildingSpan/2)*scale), (stageHeight - (annexeLeft.height + annexLeftRoofHeight)*scale - padding),

                        ]}
                            fill="#000000"
                            stroke="#000000"
                            strokeWidth={WALL_THICKNESS}
                            close={true}
                            />
                    : null}

                    {/*Right Annexe*/}
                    {hasRightAnnexe ?
                        <Line
                            points={[
                                // start point at the bottom of right wall
                                (centerX + (buildingSpan/2)*scale), (stageHeight - padding),
                                // base right annexe line
                                (centerX + (buildingSpan/2 + annexeRight.span)*scale), (stageHeight - padding),
                                // right annexe wall
                                (centerX + (buildingSpan/2 + annexeRight.span)*scale),  (stageHeight - annexeRight.height*scale - padding),
                                //left roof
                                (centerX + (buildingSpan/2)*scale), (stageHeight - (annexeRight.height + annexRightRoofHeight)*scale - padding),

                            ]}
                            fill="#000000"
                            stroke="#000000"
                            strokeWidth={WALL_THICKNESS}
                            close={true}
                        />
                    : null}

                    {/*Right Annexe*/}
                    {hasMezzanine ?
                        <Line
                            points={[
                                (centerX - (buildingSpan/2)*scale), (stageHeight - mezzanineFloor.height*scale - padding),
                                (centerX + (buildingSpan/2)*scale), (stageHeight - mezzanineFloor.height*scale - padding)
                            ]}
                            fill="#000000"
                            stroke="#000000"
                            strokeWidth={WALL_THICKNESS}
                            close={true}
                        />
                    : null}
                </Layer>
            </Stage>
        )
    }
}

export default AnnexeBuildingDraw;