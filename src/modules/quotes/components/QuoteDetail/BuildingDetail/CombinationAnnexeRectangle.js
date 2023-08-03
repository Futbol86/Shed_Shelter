import React from 'react';
import { Rect } from 'react-konva';
class CombinationAnnexeRectangle extends React.Component{

    state ={
        border_color: 'black',
        border_width:1
    };

    handleClick = () => {
        // console.log('AnnexeClick: bay-',  this.props.bayIndex, ', annexe-',this.props.annexeIndex);
        this.props.onAnnexeClick({
            bayIndex: this.props.bayIndex,
            annexeIndex: this.props.annexeIndex,
        });
    };

    render() {
        if(this.props.hasAnnexe) {
            return (
                <Rect
                    x={this.props.x}
                    y={this.props.y}
                    width={this.props.width}
                    height={this.props.height}
                    fill={this.props.color}
                    stroke={this.state.border_color}
                    strokeWidth={this.state.border_width}
                    onClick={this.handleClick}
                />
            );
        } else {
            return (<Rect
                x={this.props.x}
                y={this.props.y}
                width={this.props.width}
                height={this.props.height}
                fill='transparent'
                onClick={this.handleClick}
            />);
        }
    }
};
export default CombinationAnnexeRectangle;