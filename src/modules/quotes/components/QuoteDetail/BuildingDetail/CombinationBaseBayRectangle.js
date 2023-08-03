import React from 'react';
import { Rect, Text } from 'react-konva';
class CombinationBaseBayRectangle extends React.Component{

    state ={
        openBaseColor:'white',
        border_color: 'transparent',
        border_width:1
    };

    handleClick = () => {
        if( this.props.onBaseBayClick) {
            this.props.onBaseBayClick({
                wallIndex: this.props.wallIndex,
                bayIndex: this.props.bayIndex,
                annexeIndex: this.props.annexeIndex
            });
        }
    };

    render() {
        if(this.props.isFilled){
            //console.log("mee", this.props.isFilled);
            return  (
                <React.Fragment>
                    <Rect
                        x={this.props.x}
                        y={this.props.y}
                        width={this.props.width}
                        height={this.props.height}
                        fill={!this.props.annexeIndex || this.props.hasAnnexe ? this.props.color : 'transparent'}
                        onClick={this.handleClick}
                    />
                    {this.props.annexeIndex ?
                        <Text
                            x={this.props.x}
                            y={this.props.y + this.props.height /2 - 6}
                            fontSize={12}
                            text={this.props.hasAnnexe ? this.props.text : ""}
                            wrap="char"
                            align="center"
                            width={this.props.width}
                            onClick={this.handleClick}
                        /> :
                        <Text
                            x={this.props.x}
                            y={this.props.y + this.props.height /2 - 12}
                            fontSize={12}
                            text={`Bay ${this.props.bayIndex + 1}\n${this.props.text}`}
                            wrap="char"
                            align="center"
                            width={this.props.width}
                            onClick={this.handleClick}
                        />
                    }
                </React.Fragment>
            );
        } else {
            return (
                <Rect
                    x={this.props.x}
                    y={this.props.y}
                    width={this.props.width}
                    height={this.props.height}
                    fill={this.state.openBaseColor}
                    onClick={this.handleClick}
                />
            );
        }
    }
};
export default CombinationBaseBayRectangle;