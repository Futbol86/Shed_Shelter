import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, change} from "redux-form";
import {onSubmitActions} from "redux-form-submit-saga";
import { FURNITURE_DESIGN_FORM_NAME, DOCS_TYPE_BOM_SHEET } from "../../../constants";
import { loadAFurnitureSettings, doSetViewDetail, DOC_exportBOMPDF } from "../../../actions";
import { 
    getAFurnitureComponents, getAFurnitureSettings, getViewDetailStatus, getSelectedFurnitureWall, 
    getSelectedFurnitureItem, getSelectedTileItem, getSelectedGlassItem, getSelectedMirrorItem, 
    getFurnitureTabIndex
} from "../../../selectors";
import FurnitureDesignComponent from '../../../components/Toolbar/Drawing3DToolbar/FurnitureDesign';

class FurnitureDesign extends Component {
    componentDidMount() {
        document.querySelector(".side-panel-toggle").addEventListener("click", () => {
            document.querySelector(".wrapper").classList.toggle("side-panel-open");
        });

        this.props.loadAFurnitureSettings({quoteId: 2738});
    }

    handleExportBOMPDFFile = (evt) => {
        evt.preventDefault();

        this.props.DOC_exportBOMPDF({
            pageId: DOCS_TYPE_BOM_SHEET,
            pageData: {
                quoteId: 2738,
            }
        });
    }

    handleSetViewDetail = (evt) => {
        evt.preventDefault();
        this.props.doSetViewDetail();
    }

    render() {
        return (
            <div className="animated fadeIn">
                <FurnitureDesignComponent {...this.props} handleExportBOMPDFFile={this.handleExportBOMPDFFile}
                                                          handleSetViewDetail={this.handleSetViewDetail}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    furnitureComponent:       getAFurnitureComponents(state),
    furnitureSettings:        getAFurnitureSettings(state),
    isViewDetail:             getViewDetailStatus(state),

    selectedWall:             getSelectedFurnitureWall(state),
    selectedFurnitureItem:    getSelectedFurnitureItem(state),
    selectedTileItem:         getSelectedTileItem(state),
    selectedGlassItem:        getSelectedGlassItem(state),
    selectedMirrorItem:       getSelectedMirrorItem(state),

    furnitureTabIndex:        getFurnitureTabIndex(state),
});

const mapDispatchToProps = (dispatch) => ({
    loadAFurnitureSettings:   payload => dispatch(loadAFurnitureSettings(payload)),
    doSetViewDetail:          payload => dispatch(doSetViewDetail(payload)),
    DOC_exportBOMPDF:         payload => dispatch(DOC_exportBOMPDF(payload)),

    changeFieldValue: function (field, value) {
        dispatch(change(FURNITURE_DESIGN_FORM_NAME, field, value))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: FURNITURE_DESIGN_FORM_NAME,
        onSubmit: onSubmitActions(FURNITURE_DESIGN_FORM_NAME),
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
    })(FurnitureDesign)
);
