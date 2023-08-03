import React from 'react';
import {Stage, Layer, Rect, Text, Line} from 'react-konva';
import {BAY_PARTITION_WIDTH, WALL_THICKNESS} from "../../../constants";

class AwningOverhangDraw extends React.Component {
    render() {
        const padding = 5;
        const overhangSize = 20;
        const {buildingSpan, buildingLength, isAnnexeLeft, isAnnexeRight,  annexeLeft, annexeRight, isSkillionRoof} = this.props;
        const hasLeftAnnexe = isAnnexeLeft && annexeLeft && annexeLeft.height && annexeLeft.span;
        const hasRightAnnexe = isAnnexeRight && annexeRight && annexeRight.height && annexeRight.span;

        //below values would be the actual parent size
        let stageWidth;
        if (this.props.parentWidth)
            stageWidth = this.props.parentWidth;
        else
            stageWidth = BAY_PARTITION_WIDTH * 6;

        const stageHeight = BAY_PARTITION_WIDTH * 5;
        const centerX = stageWidth/2;
        //end

        const totalSpan = (Math.max(hasLeftAnnexe ? annexeLeft.span : 0, hasRightAnnexe ? annexeRight.span : 0)
            + padding + overhangSize)*2 + buildingSpan;
        const scale = Math.min((stageHeight - padding*2 - overhangSize*2) / (totalSpan),
            (stageWidth*2/3  - padding*2 - overhangSize*2) / (buildingLength));

        return (
            <Stage height={stageHeight} width={stageWidth}>
                <Layer>
                    {/*Main building*/}
                    <Rect
                        x={centerX - (buildingLength*scale)/2}
                        y={(stageHeight - buildingSpan*scale)/2}
                        width={(buildingLength)*scale}
                        height={buildingSpan*scale}
                        fill="gray"
                        stroke="#000000"
                        strokeWidth={WALL_THICKNESS}
                    />

                    {isSkillionRoof ? null :
                    <React.Fragment>
                        {/* Ridge */}
                        <Line
                            points={[
                                centerX - (buildingLength*scale)/2, (stageHeight/2),
                                centerX - (buildingLength*scale)/5, (stageHeight/2),
                            ]}
                            fill="#000000"
                            stroke="#000000"
                            strokeWidth={1}
                        />

                        <Line
                            points={[
                                centerX + (buildingLength*scale)/5, (stageHeight/2),
                                centerX + (buildingLength*scale)/2, (stageHeight/2),
                            ]}
                            fill="#000000"
                            stroke="#000000"
                            strokeWidth={1}
                        />

                        <Text
                            x={centerX - (buildingLength*scale)/2}
                            y={stageHeight/2 - 14/2}
                            fontSize={14}
                            text="Ridge"
                            wrap="char"
                            align="center"
                            fill="#000000"
                            width={(buildingLength)*scale}
                        />
                    </React.Fragment>
                    }

                    {/*Front building Overhang*/}
                    <Rect
                        x={centerX - (buildingLength*scale)/2 - overhangSize}
                        y={(stageHeight - buildingSpan*scale)/2}
                        width={overhangSize}
                        height={buildingSpan*scale}
                        fill="white"
                        stroke="#000000"
                        strokeWidth={1}
                    />

                    {/*Back building Overhang*/}
                    <Rect
                        x={centerX + (buildingLength*scale)/2}
                        y={(stageHeight - buildingSpan*scale)/2}
                        width={overhangSize}
                        height={buildingSpan*scale}
                        fill="white"
                        stroke="#000000"
                        strokeWidth={1}
                    />

                    {/*Left Annexe*/}
                    {hasLeftAnnexe ?
                        <React.Fragment>
                            <Rect
                                x={centerX - (buildingLength*scale)/2}
                                y={(stageHeight - buildingSpan*scale)/2 - annexeLeft.span*scale}
                                width={buildingLength*scale}
                                height={annexeLeft.span*scale}
                                fill="gray"
                                stroke="#000000"
                                strokeWidth={1}
                            />

                            <Text
                                x={centerX - (buildingLength*scale)/2}
                                y={(stageHeight - buildingSpan*scale)/2 - (annexeLeft.span*scale+14)/2}
                                fontSize={14}
                                text="Annexe"
                                wrap="char"
                                align="center"
                                width={(buildingLength)*scale}
                            />

                            <Rect
                                x={(centerX - (buildingLength*scale)/2)}
                                y={(stageHeight - buildingSpan*scale)/2 - annexeLeft.span*scale - overhangSize }
                                width={(buildingLength)*scale}
                                height={overhangSize}
                                fill="white"
                                stroke="#000000"
                                strokeWidth={1}
                            />

                            <Rect
                                x={(centerX - (buildingLength*scale)/2) - overhangSize}
                                y={(stageHeight - buildingSpan*scale)/2 - annexeLeft.span*scale }
                                width={overhangSize}
                                height={annexeLeft.span*scale}
                                fill="white"
                                stroke="#000000"
                                strokeWidth={1}
                            />

                            <Rect
                                x={(centerX + (buildingLength*scale)/2)}
                                y={(stageHeight - buildingSpan*scale)/2 - annexeLeft.span*scale }
                                width={overhangSize}
                                height={annexeLeft.span*scale}
                                fill="white"
                                stroke="#000000"
                                strokeWidth={1}
                            />


                        </React.Fragment>

                         :

                        /*Dont have Left Annexe, draw left overhang*/
                         <Rect
                                x={(centerX - buildingLength*scale/2)}
                                y={(stageHeight - buildingSpan*scale)/2 - overhangSize}
                                width={(buildingLength)*scale}
                                height={overhangSize}
                                fill="white"
                                stroke="#000000"
                                strokeWidth={1}
                         />
                    }

                    {/*Right Annexe*/}
                    {hasRightAnnexe ?
                        <React.Fragment>
                            <Rect
                                x={(centerX - buildingLength*scale/2)}
                                y={(stageHeight + buildingSpan*scale)/2}
                                width={(buildingLength)*scale}
                                height={annexeRight.span*scale}
                                fill="gray"
                                stroke="#000000"
                                strokeWidth={1}
                            />

                            <Text
                                x={(centerX - buildingLength*scale/2)}
                                y={(stageHeight + buildingSpan*scale)/2 + (annexeRight.span*scale - 14)/2}
                                fontSize={14}
                                text="Annexe"
                                wrap="char"
                                align="center"
                                width={(buildingLength)*scale}
                            />

                            <Rect
                                x={(centerX - (buildingLength*scale)/2)}
                                y={(stageHeight + buildingSpan*scale)/2 + annexeRight.span*scale}
                                width={(buildingLength)*scale}
                                height={overhangSize}
                                fill="white"
                                stroke="#000000"
                                strokeWidth={1}
                            />

                            <Rect
                                x={(centerX - (buildingLength*scale)/2) - overhangSize}
                                y={(stageHeight + buildingSpan*scale)/2 }
                                width={overhangSize}
                                height={annexeRight.span*scale}
                                fill="white"
                                stroke="#000000"
                                strokeWidth={1}
                            />

                            <Rect
                                x={(centerX + (buildingLength*scale)/2)}
                                y={(stageHeight + buildingSpan*scale)/2 }
                                width={overhangSize}
                                height={annexeRight.span*scale}
                                fill="white"
                                stroke="#000000"
                                strokeWidth={1}
                            />
                        </React.Fragment>
                        :
                        /*Dont have Right Annexe, draw left overhang*/
                            <Rect
                                x={(centerX - buildingLength*scale/2)}
                                y={(stageHeight + buildingSpan*scale)/2 }
                                width={(buildingLength)*scale}
                                height={overhangSize}
                                fill="white"
                                stroke="#000000"
                                strokeWidth={1}
                            />
                    }

                </Layer>
            </Stage>
        )
    }
}


export default AwningOverhangDraw;