import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, formValueSelector, change} from "redux-form";
import {DOC_changeActiveModal} from "../../../documents/actions";
import {getDocCurrentModalId} from "../../../documents/selectors";
import {} from "../../actions";
import {
    getBracketDrawing, getFlashingDrawing, getBasePlateDrawing, 
    getBrigingApexPlateDrawing, getAwningDrawing
} from "../../selectors";
import {DRAWING_3D_LIBRARIES_TOOLBAR_FORM_NAME} from "../../constants";
import Drawing3DLibrariesToolBarComponent from '../../components/Toolbar/Drawing3DLibrariesToolbar';

class Drawing3DLibrariesToolBar extends Component {
    componentDidMount() {
        this.props.changeFieldValue("purlinAndGirt.purlinGirtSectionType", 3);
        this.props.changeFieldValue("purlinAndGirt.rollForm", "Stramit");
        this.props.changeFieldValue("boltAndNut", {
            "distanceBoltHeadAndBottomWasher": 20,
            "position": {x: 0, y: 0, z: 0},
            "rotate": {x: 0, y: 0, z: 0}, 
        });
    }

    handleShowBracketDrawing = (evt) => {
        this.props.DOC_changeActiveModal({modalId: 1});
    }

    handleShowFlashingDrawing = (evt) => {
        this.props.DOC_changeActiveModal({modalId: 2});
    }

    handleShowBasePlateDrawing = (evt) => {
        this.props.DOC_changeActiveModal({modalId: 2});
    }

    handleShowBrigingApexPlateDrawing = (evt) => {
        this.props.DOC_changeActiveModal({modalId: 2});
    }

    handleShowAwningDrawing = (evt) => {
        this.props.DOC_changeActiveModal({modalId: 2});
    }

    handleModalChange = (modalId) => {
        this.props.DOC_changeActiveModal({modalId});
    };

    render() {
        return (
            <div className="animated fadeIn">
                <Drawing3DLibrariesToolBarComponent {...this.props}
                                                    handleShowBracketDrawing={this.handleShowBracketDrawing}
                                                    handleShowFlashingDrawing={this.handleShowFlashingDrawing}
                                                    handleShowBasePlateDrawing={this.handleShowBasePlateDrawing}
                                                    handleShowBrigingApexPlateDrawing={this.handleShowBrigingApexPlateDrawing}
                                                    handleShowAwningDrawing={this.handleShowAwningDrawing}
                                                    handleModalChange={this.handleModalChange}/>
            </div>
        );
    }
}

const formSelector = formValueSelector(DRAWING_3D_LIBRARIES_TOOLBAR_FORM_NAME);

const mapStateToProps = (state) => ({
    currentModalId:           getDocCurrentModalId(state),
    bracketDrawing:           getBracketDrawing(state),
    flashingDrawing:          getFlashingDrawing(state),
    basePlateDrawing:         getBasePlateDrawing(state),
    brigingApexPlateDrawing:  getBrigingApexPlateDrawing(state),
    awningDrawing:            getAwningDrawing(state),

    purlinAndGirtFormData:    formSelector(state, "purlinAndGirt"),
    bracketFormData:          formSelector(state, "bracket"),
});

const mapDispatchToProps = (dispatch) => ({
    DOC_changeActiveModal:      payload => dispatch(DOC_changeActiveModal(payload)),

    changeFieldValue: function (field, value) {
        dispatch(change(DRAWING_3D_LIBRARIES_TOOLBAR_FORM_NAME, field, value))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: DRAWING_3D_LIBRARIES_TOOLBAR_FORM_NAME,
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
    })(Drawing3DLibrariesToolBar)
);
