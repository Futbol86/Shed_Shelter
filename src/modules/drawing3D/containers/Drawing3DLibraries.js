import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, formValueSelector, change, getFormValues} from "redux-form";

import {DOC_changeActiveModal} from "../../documents/actions";
import {getDocCurrentModalId} from "../../documents/selectors";
import { 
    doSetDraggingObject, doClearDraggingObject, doSetBracketDrawing, doSetFlashingDrawing, 
    doSetBasePlateDrawing, doSetBrigingApexPlateDrawing, doSetAwningDrawing, doSetSearchBracketSample
} from './../actions';
import { getDraggingObject, getSearchBracketSampleMesh } from '../selectors';
import {
    DRAWING_3D_LIBRARIES_FORM_NAME,
    DRAWING_3D_LIBRARIES_TOOLBAR_FORM_NAME,
} from "../constants";
import Drawing3DLibrariesComponent from "../components/Drawing3DLibraries";

class Drawing3DLibraries extends Component {
    handleSubmit = (evt) => {
        evt.preventDefault();
        this.props.doSetSearchBracketSample(this.props.searchBracketSample)
    }

    render() {
        return (
            <div>
                <Drawing3DLibrariesComponent {...this.props} handleSubmit={this.handleSubmit}/>
            </div>
        )
    }
}

const formSelector              = formValueSelector(DRAWING_3D_LIBRARIES_TOOLBAR_FORM_NAME);

const mapStateToProps = (state) => ({
    currentModalId:                       getDocCurrentModalId(state),
    draggingObject:                       getDraggingObject(state),
    searchBracketSampleMesh:              getSearchBracketSampleMesh(state),

    purlinAndGirtFormData:                formSelector(state, "purlinAndGirt"),
    wallCladdingFormData:                 formSelector(state, "wallCladding"),

    bracketFormData:                      formSelector(state, "bracket"),
    apexPlateBracketSelected:             formSelector(state, "apexPlateBracketSelected"),
    kneePlateCarportGableSelected:        formSelector(state, "kneePlateCarportGableSelected"),
    kneePlateCarportSkillionSelected:     formSelector(state, "kneePlateCarportSkillionSelected"),
    kneePlateFrameTophatSelected:         formSelector(state, "kneePlateFrameTophatSelected"),
    kneePlateFrameZSectionSelected:       formSelector(state, "kneePlateFrameZSectionSelected"),
    kneePlateRollerDoorTophatSelected:    formSelector(state, "kneePlateRollerDoorTophatSelected"),
    kneePlateRollerDoorZSectionSelected:  formSelector(state, "kneePlateRollerDoorZSectionSelected"),
    lateralKneeBraceSelected:             formSelector(state, "lateralKneeBraceSelected"),
    otherBracketSelected:                 formSelector(state, "otherBracketSelected"),

    flashingSelected:                     formSelector(state, "flashingSelected"),
    basePlateSelected:                    formSelector(state, "basePlateSelected"),

    brigingApexPlateSSTopHatSelected:     formSelector(state, "brigingApexPlateSSTopHatSelected"),
    brigingApexPlateSSZSectionSelected:   formSelector(state, "brigingApexPlateSSZSectionSelected"),
    brigingApexPlateDSTopHatSelected:     formSelector(state, "brigingApexPlateDSTopHatSelected"),
    brigingApexPlateDSZSectionSelected:   formSelector(state, "brigingApexPlateDSZSectionSelected"),

    awningDABSelected:                    formSelector(state, "awningDABSelected"),
    awningIABSelected:                    formSelector(state, "awningIABSelected"),
    boltAndNutFormData:                   formSelector(state, "boltAndNut"),

    searchBracketSample:                  formValueSelector(DRAWING_3D_LIBRARIES_FORM_NAME)(state, "searchBracketSample"),
});

const mapDispatchToProps = (dispatch) => ({
    DOC_changeActiveModal:      payload => dispatch(DOC_changeActiveModal(payload)),
    doSetDraggingObject:        payload => dispatch(doSetDraggingObject(payload)),
    doClearDraggingObject:      payload => dispatch(doClearDraggingObject(payload)),
    doSetBracketDrawing:        payload => dispatch(doSetBracketDrawing(payload)),
    doSetFlashingDrawing:       payload => dispatch(doSetFlashingDrawing(payload)),
    doSetBasePlateDrawing:      payload => dispatch(doSetBasePlateDrawing(payload)),
    doSetBrigingApexPlateDrawing:      payload => dispatch(doSetBrigingApexPlateDrawing(payload)),
    doSetAwningDrawing:         payload => dispatch(doSetAwningDrawing(payload)),
    doSetSearchBracketSample:   payload => dispatch(doSetSearchBracketSample(payload)),

    changeFieldValue: function (field, value) {
        dispatch(change(DRAWING_3D_LIBRARIES_FORM_NAME, field, value))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: DRAWING_3D_LIBRARIES_FORM_NAME,
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
    })(Drawing3DLibraries)
);
