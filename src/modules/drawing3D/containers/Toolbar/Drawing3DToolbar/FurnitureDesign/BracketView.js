import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, formValueSelector, getFormValues, change} from "redux-form";

import { DRAWING_3D_TOOLBAR_FORM_NAME, BRACKET_VIEW_LABELS } from "../../../../constants";
import { 
    doSetCheckedShedComponentNodes, doSetExpandedShedComponentNodes, doSetClickedShedComponentNode 
} from "../../../../actions";
import { 
    getSearchBracket, getShedComponentNodes, getCheckedShedComponentNodes, 
    getExpandedShedComponentNodes 
} from "../../../../selectors";
import BracketViewComponent from "../../../../components/Toolbar/Drawing3DToolbar/FurnitureDesign/BracketView";

class BracketView extends Component {
    render() {
        return (
            <div>
                <BracketViewComponent {...this.props} />
            </div>
        )
    }
}

const formSelector = formValueSelector(DRAWING_3D_TOOLBAR_FORM_NAME);

const mapStateToProps = (state) => ({
    formDatas:                  getFormValues(DRAWING_3D_TOOLBAR_FORM_NAME)(state),
    shedComponentNodes:         getShedComponentNodes(state),
    checkedShedComponentNodes:  getCheckedShedComponentNodes(state),
    expandedShedComponentNodes: getExpandedShedComponentNodes(state),
    searchBracket:              getSearchBracket(state),
});

const mapDispatchToProps = (dispatch) => ({
    doSetCheckedShedComponentNodes:  payload => dispatch(doSetCheckedShedComponentNodes(payload)),
    doSetExpandedShedComponentNodes: payload => dispatch(doSetExpandedShedComponentNodes(payload)),
    doSetClickedShedComponentNode:   payload => dispatch(doSetClickedShedComponentNode(payload)),

    changeFieldValue: function (field, value) {
        dispatch(change(DRAWING_3D_TOOLBAR_FORM_NAME, field, value))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: DRAWING_3D_TOOLBAR_FORM_NAME,
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
    })(BracketView)
);