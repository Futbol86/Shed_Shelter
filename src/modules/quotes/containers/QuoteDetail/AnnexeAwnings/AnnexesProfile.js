import React, {Component} from 'react';
import {connect} from 'react-redux';
import {formValueSelector} from "redux-form";

import sizeMe from 'react-sizeme';

import AnnexesProfileComponent from "../../../components/QuoteDetail/AnnexeAwnings/AnnexesProfile";
import {QUOTES_BUILDING_DETAIL_FORM_NAME} from "../../../constants";
import {
    PRODUCT_TYPES,
    PRODUCT_CATEGORY_SKILLION_CARPORTS,
    PRODUCT_CATEGORY_SKILLION_SHEDS
} from "../../../../../constants";

class AnnexesProfile extends Component {

    componentDidUpdate(prevProps){
        if ((this.props.isAnnexeLeft || prevProps.isAnnexeLeft)
            && (this.props.isAnnexeLeft !== prevProps.isAnnexeLeft)
            && this.props.bays)
        {
            const {changeFieldValue, isAnnexeLeft, bays, buildingHeight, annexeSlope, annexeLeft} = this.props;
            var newBays = [];
            for (var i = 0; i < bays.length; i++){
                newBays[i] = {
                    ...bays[i],
                    hasLeftAnnexe: isAnnexeLeft
                };
            }
            changeFieldValue('bays', newBays);

            if (isAnnexeLeft && (!annexeLeft || (annexeLeft && !(+annexeLeft.height))) ) {
                const annexeLeftRoofHeight = Math.abs((Math.tan((Math.PI * annexeSlope) / 180) * (annexeLeft && +annexeLeft.span)));
                const maxHeight = Math.floor(buildingHeight - annexeLeftRoofHeight);
                const isPierOnly = Number(this.props.footingsPiers);
                if (maxHeight)
                    changeFieldValue('annexeLeft.height', maxHeight);

                if (isPierOnly)
                    changeFieldValue('annexeLeft.isFullSlab', false);
                else if (!annexeLeft || annexeLeft.isFullSlab === undefined)
                    changeFieldValue('annexeLeft.isFullSlab', true);
            }

            this.props.initNewRoofSkylightItems({...this.props, bays: newBays});
        }

        if ((this.props.isAnnexeRight || prevProps.isAnnexeRight)
            && (this.props.isAnnexeRight !== prevProps.isAnnexeRight)
            && this.props.bays)
        {
            const {changeFieldValue, isAnnexeRight, bays, buildingHeight, annexeSlope, annexeRight} = this.props;
            var newBays = [];
            for (var i = 0; i < bays.length; i++){
                newBays[i] = {
                    ...bays[i],
                    hasRightAnnexe: isAnnexeRight
                };
            }
            changeFieldValue('bays', newBays);

            if (isAnnexeRight && (!annexeRight || (annexeRight && !(+annexeRight.height))) ) {
                const annexeRightRoofHeight = Math.abs((Math.tan((Math.PI * annexeSlope) / 180) * (annexeRight && +annexeRight.span)));
                const maxHeight = Math.floor(buildingHeight - annexeRightRoofHeight);
                const isPierOnly = Number(this.props.footingsPiers);
                if (maxHeight)
                    changeFieldValue('annexeRight.height', maxHeight);

                if (isPierOnly)
                    changeFieldValue('annexeRight.isFullSlab', false);
                else if (!annexeRight || annexeRight.isFullSlab === undefined)
                    changeFieldValue('annexeRight.isFullSlab', true);
            }
            this.props.initNewRoofSkylightItems({...this.props, bays: newBays});
        }
    };

    calculateMaxAnnexeHeight(isAnnexe, annexe, annexeSlope, buildingHeight){
        if (!isAnnexe || !annexeSlope || !annexe || !annexe.span){
            return buildingHeight;
        }

        const annexeRoofHeight = Math.abs((Math.tan((Math.PI * annexeSlope) / 180) * annexe.span));
        return Math.floor(buildingHeight - annexeRoofHeight);
    };

    handleAnnexeSpanChange = (event) => {
        const annexeSpanName = event.target.name;
        const annexeSpan = Number(event.target.value);
        const {isAnnexeLeft, isAnnexeRight, annexeLeft, annexeRight, annexeSlope, buildingHeight, buildingSpan, buildingSlope, isSkillionRoof } = this.props;
        const isAnnexe = annexeSpanName && annexeSpanName.includes("annexeLeft") ? isAnnexeLeft : isAnnexeRight;
        const annexe = annexeSpanName && annexeSpanName.includes("annexeLeft") ? annexeLeft : annexeRight;
        const annexeRoofHeight = Math.abs((Math.tan((Math.PI * annexeSlope) / 180) * annexeSpan));
        let maxAnnexeHeight = Math.floor(buildingHeight - annexeRoofHeight);
        if (isSkillionRoof && annexeSpanName && annexeSpanName.includes("annexeRight")) {
            let tempSlope = buildingSlope;
            if(!tempSlope || tempSlope===0){
                tempSlope = 10;
            }
            const roofRadian = (Math.PI * tempSlope) / 180;
            const roofHeight = isSkillionRoof ? Math.abs((Math.tan(roofRadian) * buildingSpan)) :
                Math.abs((Math.tan(roofRadian) * (buildingSpan / 2)));
            maxAnnexeHeight = Math.floor(buildingHeight + roofHeight - annexeRoofHeight);
        }
        if (isAnnexe && Number(annexe.height) > maxAnnexeHeight){
            const {changeFieldValue} = this.props;
            const annexeFieldName = annexeSpanName && annexeSpanName.includes("annexeLeft") ? 'annexeLeft' : 'annexeRight';
            changeFieldValue(`${annexeFieldName}.height`, maxAnnexeHeight);
        }
    };

    render() {
        const {isAnnexeLeft, isAnnexeRight, annexeLeft, annexeRight, annexeSlope, buildingHeight, buildingSpan, buildingSlope, isSkillionRoof} = this.props;
        let tempSlope = buildingSlope;
        if(!tempSlope || tempSlope===0){
            tempSlope = 10;
        }
        const roofRadian = (Math.PI * tempSlope) / 180;
        const roofHeight = isSkillionRoof ? Math.abs((Math.tan(roofRadian) * buildingSpan)) :
            Math.abs((Math.tan(roofRadian) * (buildingSpan / 2)));
        const maxLeftAnnexeHeight = this.calculateMaxAnnexeHeight(isAnnexeLeft, annexeLeft, annexeSlope, buildingHeight);
        const maxRightAnnexeHeight = isSkillionRoof ?
            this.calculateMaxAnnexeHeight(isAnnexeRight, annexeRight, annexeSlope, buildingHeight + roofHeight) :
            this.calculateMaxAnnexeHeight(isAnnexeRight, annexeRight, annexeSlope, buildingHeight);
        return (
            <AnnexesProfileComponent {...this.props} 
                                     maxLeftAnnexeHeight = {maxLeftAnnexeHeight}
                                     maxRightAnnexeHeight = {maxRightAnnexeHeight}
                                     handleAnnexeSpanChange = {this.handleAnnexeSpanChange}
                                     isSkillionRoof = {isSkillionRoof}
            />
        );
    }
}

const formSelector = formValueSelector(QUOTES_BUILDING_DETAIL_FORM_NAME);
const mapStateToProps = (state) => ({
    bays:               formSelector(state, "bays"),
    buildingLength:     Number(formSelector(state, "buildingLength")),
    buildingSpan:       Number(formSelector(state, "buildingSpan")),
    buildingHeight:     Number(formSelector(state, "buildingHeight")),
    buildingSlope:      Number(formSelector(state, "buildingSlope")),
    isAnnexeLeft:         +(formSelector(state, "isAnnexeLeft")),
    isAnnexeRight:        +(formSelector(state, "isAnnexeRight")),
    isMezzanineFloor:     +(formSelector(state, "isMezzanineFloor")),
    annexeSlope:          +(formSelector(state, "annexeSlope")),
    annexeLeft:           (formSelector(state, "annexeLeft")),
    annexeRight:          (formSelector(state, "annexeRight")),
    footingsPiers:        (formSelector(state, "footingsPiers")),
});

export default connect(mapStateToProps, {})(sizeMe()(AnnexesProfile));