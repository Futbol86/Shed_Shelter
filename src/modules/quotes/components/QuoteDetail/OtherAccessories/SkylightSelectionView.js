import React from 'react';
import {Stage, Layer} from 'react-konva';
import {BAY_PARTITION_WIDTH} from "../../../constants";
import SkylightItem from "../OtherAccessories/SkylightItem";
class SkylightSelectionView extends React.Component{

    render() {
        const {skylightItems, scaledBuildingLength, scaleTotalBuildingSpan} = this.props;
        //console.log("SkylightSelectionView:",skylightItems);
        //console.log("scaledBuildingLength:",scaledBuildingLength);
        return (
            <React.Fragment>
                <Stage width={scaledBuildingLength} height={scaleTotalBuildingSpan + 10}>
                    <Layer>
                        {skylightItems && skylightItems.map((item, idx) => {
                            if (item) {
                                return <SkylightItem key={idx} {...item}
                                                     onClick={this.props.handleClick}
                                />
                            }
                            return null;
                        })

                        }

                    </Layer>
                </Stage>
            </React.Fragment>
        );
    }
};
export default SkylightSelectionView;