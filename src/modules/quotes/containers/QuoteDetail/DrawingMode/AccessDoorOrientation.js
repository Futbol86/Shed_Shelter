import React from 'react';
import AccessDoorOrientationComponent from '../../../components/QuoteDetail/DrawingMode/AccessDoorOrientation';
import {ACCESS_DOOR_AREA,
    VERTICLE_DOOR, QUOTES_ACCESS_DOOR_OPENING_ORIENTATION_IDS
} from "../../../constants";

class AccessDoorOrientation extends React.Component{

    render() {
        //console.log('AccessDoorOrientation:', this.props);
        var {doorOrientation, height, width, openingOrientation, isDoubleDoor} = this.props;
        var doorPoints = [];
        var x1, y1, x2, y2, x3, y3;
        var openingArea = ACCESS_DOOR_AREA/2;
        if(doorOrientation === VERTICLE_DOOR) {
            // 1- the open position on the wall
            // 2- where the door stick to the wall
            // 3- the opened position (outside the wall)
            x1 = x2 = ACCESS_DOOR_AREA/2;
            if(openingOrientation === QUOTES_ACCESS_DOOR_OPENING_ORIENTATION_IDS.LEFT_INSIDE){
                y1 = 0;
                y2 = y1 + height;
                x3 = x1 + openingArea;
                y3 = y1;
            } else if(openingOrientation === QUOTES_ACCESS_DOOR_OPENING_ORIENTATION_IDS.LEFT_OUTSIDE){
                y1 = 0;
                y2 = y1 + height;
                x3 = x1 - openingArea;
                y3 = y1;
            } else if(openingOrientation === QUOTES_ACCESS_DOOR_OPENING_ORIENTATION_IDS.RIGHT_INSIDE){
                y1 = height;
                y2 = 0;
                x3 = x1 + openingArea;
                y3 = y1;
            } else if(openingOrientation === QUOTES_ACCESS_DOOR_OPENING_ORIENTATION_IDS.RIGHT_OUTSIDE){
                y1 = height;
                y2 = 0;
                x3 = x1 - openingArea;
                y3 = y1;
            }
        } else {
            y1 = y2 = ACCESS_DOOR_AREA/2;
            if(openingOrientation === QUOTES_ACCESS_DOOR_OPENING_ORIENTATION_IDS.LEFT_INSIDE){
                x1 = 0;
                x2 = width;
                y3 = y1 - openingArea;
                x3 = x1;
            } else if(openingOrientation === QUOTES_ACCESS_DOOR_OPENING_ORIENTATION_IDS.LEFT_OUTSIDE){
                x1 = 0;
                x2 = width;
                y3 = y1 + openingArea;
                x3 = x1;
            } else if(openingOrientation === QUOTES_ACCESS_DOOR_OPENING_ORIENTATION_IDS.RIGHT_INSIDE){
                x1 = width;
                x2 = 0;
                y3 = y1 - openingArea;
                x3 = x1;
            } else if(openingOrientation === QUOTES_ACCESS_DOOR_OPENING_ORIENTATION_IDS.RIGHT_OUTSIDE){
                x1 = width;
                x2 = 0;
                y3 = y1 + openingArea;
                x3 = x1;
            }
        }

        if (isDoubleDoor) {
            var x4, y4, x5, y5;
            x5 = x3;
            y5 = y3;
            x4 = (x1 + x2) / 2;
            y4 = (y1 + y2) / 2;
            x3 = (x2 - x1) + x5;
            y3 = (y2 - y1) + y5;
            doorPoints = [x1,y1,x2,y2,x3,y3,x4,y4,x5,y5,x1,y1];
        } else {
            doorPoints = [x1,y1,x2,y2,x3,y3,x1,y1];
        }

        return (
            <AccessDoorOrientationComponent {...this.props} points={doorPoints}/>
        );
    }
}


export default AccessDoorOrientation;