import React from 'react';
import {Group,  Rect, Image} from 'react-konva';
import AccessDoorOrientation from "../../../containers/QuoteDetail/DrawingMode/AccessDoorOrientation";
import useImage from 'use-image';

class AccessDoor extends React.Component {
    handleDragEnd = e => {
        if(this.props.handleDragEnd) {
            this.props.handleDragEnd({
                newX: e.target.x(),
                newY: e.target.y()
            });
        }
        //console.log('AccessDoor - handleDragEnd:',this.props);
    };

    handleClick = () => {
        // opening orientation: left, right, out in
        // temporary disable orientation clicking
        if(this.props.doorProfile && this.props.doorProfile.includes("swinging")) {
            if (this.props.handleClick) {
                this.props.handleClick({
                    wallIndex: this.props.wallIndex,
                    bayIndex: this.props.bayIndex,
                    doorIndex: this.props.doorIndex,
                    openingOrientation: this.props.openingOrientation
                });
            }
        }
    }

    render() {
        //console.log('AccessDoor:', thBuilding Slopeis.props);
        var {posX, posY, doorProfile} = this.props;
        var x = posX;
        var y = posY;
        const RotateImage = () => {
            const ImgSrc = require("../../../assets/img/rotate_icon.png");
            const [image] = useImage(ImgSrc);
            return <Image image={image} />;
        };
        const isDoubleDoor = doorProfile && doorProfile.toLowerCase().includes("double");
        return (
                <Group x={x} y={y}
                       draggable={this.props.isDraggable}
                       dragBoundFunc={this.props.limitArea}
                       onDragEnd={this.handleDragEnd}
                       onDblClick={this.props.handleDoubleClickToEditDoor}>

                    <Rect x={0} y={0}
                          width={this.props.width}
                          height={this.props.height}
                          fill='transparent'
                          stroke='transparent'
                          strokeWidth={1}/>
                    <AccessDoorOrientation {...this.props} isDoubleDoor={isDoubleDoor}/>
                    {(this.props.doorProfile && this.props.doorProfile.includes("swinging")) &&
                        <Group x={0} y={0}
                                onClick={this.handleClick}>
                                    <RotateImage x={0} y={0}
                                    width={10}
                                    height={10}
                                    />
                        </Group>
                    }
                </Group>
        );
    }
}

export default AccessDoor;