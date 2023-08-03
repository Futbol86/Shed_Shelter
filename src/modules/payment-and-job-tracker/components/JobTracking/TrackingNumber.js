import React from 'react';

const GREEN_COLOR = "#4dbd74";
const TrackingNumber = ({ isSelected, value, bgColor = "#ff3d00" }) => {
    return (
        <div className="tracking-number" style={{backgroundColor: isSelected ? GREEN_COLOR : bgColor}}>
            {value}
        </div>
    )
}

export default TrackingNumber