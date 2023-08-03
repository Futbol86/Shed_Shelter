import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import FlashingsComponent from "../../../components/QuoteDetail/BuildingColour/Flashings";
import {formValueSelector} from "redux-form";
import {QUOTES_BUILDING_DETAIL_FORM_NAME} from "../../../constants";

class Flashings extends Component {
    /**
     * Handle copy colour from wall and roof
     *
     * @param nextProps
     */
    // componentWillReceiveProps(nextProps) {
    //     const {
    //         wallColors0, roofColors0, flashingIsRollerDoor, flashingIsBarge,
    //         flashingIsRollerDoorCopied, flashingIsBargeCopied
    //     } = nextProps;
    //     const {
    //         changeFieldValue, wallColors0: oldWallColor0, roofColors0: oldRoofColor0,
    //         flashingIsRollerDoorCopied: OldFlashingIsRollerDoorCopied,
    //         flashingIsBargeCopied: OldFlashingIsBargeCopied
    //     } = this.props;
    //     if (flashingIsRollerDoor && flashingIsRollerDoorCopied) {
    //         if (flashingIsRollerDoorCopied !== OldFlashingIsRollerDoorCopied || wallColors0 !== oldWallColor0){
    //             changeFieldValue('flashingRollerDoorColor', wallColors0);
    //         }
    //     }
    //     if (flashingIsBarge && flashingIsBargeCopied) {
    //         if (flashingIsBargeCopied !== OldFlashingIsBargeCopied || roofColors0 !== oldRoofColor0){
    //             changeFieldValue('flashingBargeColor', roofColors0);
    //         }
    //     }
    // }

    componentDidUpdate(prevProps) {
        const {
            changeFieldValue, wallColors0, roofColors0, flashingIsRollerDoor, flashingIsAccessDoor, flashingIsBarge,
            flashingIsRollerDoorCopied, flashingIsAccessDoorCopied, flashingIsBargeCopied, flashingIsCorner, flashingIsCornerCopied,
            flashingRollerDoorColor, flashingAccessDoorColor, flashingBargeColor, flashingCornerColor
        } = this.props;

        const {
            wallColors0: oldWallColor0, roofColors0: oldRoofColor0,
            flashingIsRollerDoorCopied: OldFlashingIsRollerDoorCopied,
            flashingIsAccessDoorCopied: OldFlashingIsAccessDoorCopied,
            flashingIsBargeCopied: OldFlashingIsBargeCopied,
            flashingIsCornerCopied: OldFlashingIsCornerCopied,
            flashingIsRollerDoor: OldFlashingIsRollerDoor,
            flashingIsAccessDoor: OldFlashingIsAccessDoor,
            flashingIsBarge: OldFlashingIsBarge,
            flashingIsCorner: OldFlashingIsCorner
        } = prevProps;

        if (flashingIsRollerDoor && flashingIsRollerDoorCopied) {
            if (flashingIsRollerDoorCopied !== OldFlashingIsRollerDoorCopied || wallColors0 !== oldWallColor0
                || !flashingRollerDoorColor
            ){
                changeFieldValue('flashingRollerDoorColor', wallColors0);
            }
        } else if(flashingIsRollerDoor && !flashingRollerDoorColor){
            changeFieldValue('flashingRollerDoorColor', '#E4E4E4');
        } else if(!flashingIsRollerDoor){
            changeFieldValue('flashingRollerDoorColor', null);
        }
        
        if (flashingIsAccessDoor && flashingIsAccessDoorCopied) {
            if (flashingIsAccessDoorCopied !== OldFlashingIsAccessDoorCopied || wallColors0 !== oldWallColor0
                || !flashingAccessDoorColor
            ){
                changeFieldValue('flashingAccessDoorColor', wallColors0);
            }
        } else if(flashingIsAccessDoor && !flashingAccessDoorColor){
            changeFieldValue('flashingAccessDoorColor', '#E4E4E4');
        } else if(!flashingIsAccessDoor){
            changeFieldValue('flashingAccessDoorColor', null);
        }

        if (flashingIsBarge && flashingIsBargeCopied) {
            if (flashingIsBargeCopied !== OldFlashingIsBargeCopied || roofColors0 !== oldRoofColor0
                || !flashingBargeColor
            ){
                changeFieldValue('flashingBargeColor', roofColors0);
            }
        } else if(flashingIsBarge && !flashingBargeColor){
            changeFieldValue('flashingBargeColor', '#E4E4E4');
        } else if(!flashingIsBarge){
            changeFieldValue('flashingBargeColor', null);
        }

        if (flashingIsCorner && flashingIsCornerCopied) {
            if (flashingIsCornerCopied !== OldFlashingIsCornerCopied || wallColors0 !== oldWallColor0
                || !flashingCornerColor
            ){
                changeFieldValue('flashingCornerColor', wallColors0);
            }
        } else if(flashingIsCorner && !flashingCornerColor){
            changeFieldValue('flashingCornerColor', '#E4E4E4');
        } else if(!flashingIsCorner){
            changeFieldValue('flashingCornerColor', null);
        }
    }

    /**
     * We can use memoize to recalculate props / states but not to update inside render
     */
    // updateColor = memoize(
    //     (isEnable, isCopied, fieldName, color) => {
    //         console.log('Memoize called.');
    //         if (isEnable && isCopied) {
    //             this.props.changeFieldValue(fieldName, color);
    //             console.log('Memoize invoked change.');
    //         }
    //     }
    // );

    render() {
        //Warning: Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state.
        // this.updateColor(this.props.flashingIsCorner, this.props.flashingIsCornerCopied, this.props.flashingBargeColor, this.props.wallColors0);
        return (
            <FlashingsComponent {...this.props} />
        );
    }
}

Flashings.propTypes = {
    changeFieldValue: PropTypes.func,
    wallColors0: PropTypes.string,
    roofColors0: PropTypes.string
};

const formSelector = formValueSelector(QUOTES_BUILDING_DETAIL_FORM_NAME);
const mapStateToProps = (state) => ({
    flashingIsRollerDoor:       formSelector(state, "flashingIsRollerDoor"),
    flashingIsRollerDoorCopied: formSelector(state, "flashingIsRollerDoorCopied"),
    flashingIsAccessDoor:       formSelector(state, "flashingIsAccessDoor"),
    flashingIsAccessDoorCopied: formSelector(state, "flashingIsAccessDoorCopied"),
    flashingIsBarge:            formSelector(state, "flashingIsBarge"),
    flashingIsBargeCopied:      formSelector(state, "flashingIsBargeCopied"),
    flashingIsCorner:           formSelector(state, "flashingIsCorner"),
    flashingIsCornerCopied:     formSelector(state, "flashingIsCornerCopied"),
    flashingRollerDoorColor:    formSelector(state, "flashingRollerDoorColor"),
    flashingAccessDoorColor:    formSelector(state, "flashingAccessDoorColor"),
    flashingBargeColor:    formSelector(state, "flashingBargeColor"),
    flashingCornerColor:    formSelector(state, "flashingCornerColor"),
});

export default connect(mapStateToProps, {})(Flashings);