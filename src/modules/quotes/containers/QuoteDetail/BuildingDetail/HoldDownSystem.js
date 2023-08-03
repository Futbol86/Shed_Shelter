import React, {Component} from 'react';
import {connect} from 'react-redux';

import HoldDownSystemComponent from "../../../components/QuoteDetail/BuildingDetail/HoldDownSystem";
import {formValueSelector} from "redux-form";
import {QUOTES_BUILDING_DETAIL_FORM_NAME} from "../../../constants";
import FrameSelection from '../TutorialSelection/FrameSelection';
import {getQDBDSelectedFrameSizeImage, getQDBuildingDetail} from "../../../selectors";
import {QD_BD_updateFrameSizeImage} from '../../../actions';

class HoldDownSystem extends Component {
    componentDidMount() {
        if (this.props.bdHoldDown && (this.props.bdHoldDown > 0)) {
            const productCategoryId = this.props.productCategoryId;
            const selectedFrame = this.props.selectedFrame;
            const midColumnType = (selectedFrame && selectedFrame.MidColumnMember) ? selectedFrame.MidColumnMember.substring(0, 4) : "";
            const bracketId = this.props.bdHoldDown;
            const selectedFrameSize = midColumnType;
            this.props.QD_BD_updateFrameSizeImage({bracketId, selectedFrameSize, productCategoryId});
        }
    }

    componentDidUpdate(prevProps) {
        //Also update when other inputs changed
        const productCategoryId = this.props.productCategoryId;
        const selectedFrame = this.props.selectedFrame;
        const prevSelectedFrame = prevProps.selectedFrame;
        const midColumnType = (selectedFrame && selectedFrame.MidColumnMember) ? selectedFrame.MidColumnMember.substring(0, 4) : "";
        const prevMidColumnType = (prevSelectedFrame && prevSelectedFrame.MidColumnMember) ? prevSelectedFrame.MidColumnMember.substring(0, 4) : "";
        // console.log('midColumnType: ', midColumnType);
        if (midColumnType !== prevMidColumnType)  {
            const bracketId = this.props.bdHoldDown;
            const selectedFrameSize = midColumnType;
            this.props.QD_BD_updateFrameSizeImage({bracketId, selectedFrameSize, productCategoryId});
        } else if (this.props.bdHoldDown !== prevProps.bdHoldDown) {
            const bracketId = this.props.bdHoldDown;
            const selectedFrameSize = midColumnType;
            this.props.QD_BD_updateFrameSizeImage({bracketId, selectedFrameSize, productCategoryId});
        }
    }

    render() {
        // console.log('selectedFrameSizeImage: ', this.props.selectedFrameSizeImage);
        return (
            <HoldDownSystemComponent {...this.props} />
        );
    }
}


const formSelector = formValueSelector(QUOTES_BUILDING_DETAIL_FORM_NAME);
const mapStateToProps = (state) => ({
    bdHoldDown:   formSelector(state, "bdHoldDown"),
    buildingDetail: getQDBuildingDetail(state),
    selectedFrameSizeImage: getQDBDSelectedFrameSizeImage(state)
});

export default connect(mapStateToProps, {QD_BD_updateFrameSizeImage})(HoldDownSystem);