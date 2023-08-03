import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getFormValues} from 'redux-form';

import PDFModalComponent from "../../components/Contruction/CommonPDFModal";
import {DOC_exportContructionNotesToPDF} from "../../actions";
import {getRemotePDF, getContructionNoteList, getContructionInfo} from "../../selectors";
import {DOCS_TYPE_CONTRUCTIONS_SHEET} from "../../constants";

class ContructioNoteSheetPDFModal extends Component {
    componentDidMount = async() => {
        let pageData = this.props.pageData;

        this.props.DOC_exportContructionNotesToPDF({
            pageId: DOCS_TYPE_CONTRUCTIONS_SHEET,
            pageData: {
                ...pageData,
                contructionDetails: this.props.contructionDetails,
                contructionNotes: this.props.contructionNotes,
            }
        });
    }

    render() {
        return (
            <PDFModalComponent {...this.props} pageTitleId="app.contruction.Contruction_Notes" />
        );
    }
}

const mapStateToProps = (state) => ({
    remotePDF:          getRemotePDF(state),
    contructionDetails: getContructionInfo(state),
    contructionNotes:   getContructionNoteList(state),
});

export default connect(mapStateToProps, {DOC_exportContructionNotesToPDF})(ContructioNoteSheetPDFModal);