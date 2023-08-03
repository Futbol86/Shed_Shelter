import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getQDJobNumber, getQDUserDetail} from "../../../selectors";
import { ZIP_PACKAGE_TYPES, EXPORTED_PDF_IDS, EXPORTED_PDF_TYPES } from '../../../constants';

class PDFModal extends Component {
    componentDidMount() {
        
    }

    handleDownloadClick = () => {

    }

    initialPDFInfo = () => {
        const {clientDetail, jobNumber, dealerInfo, exportedPdfId, userAccessModules} = this.props;
        const pdfNamePrefix = "";
        let pdfId = this.getExportedPdfId(exportedPdfId, userAccessModules);
        switch (pdfId) {
            case EXPORTED_PDF_IDS.BOM:
                return {
                    pageTitleId: "app.quotes.Bill_Of_Material",
                    pdfName: pdfNamePrefix + "BOM" 
                }
            case EXPORTED_PDF_IDS.ENGS:
                return {
                    pageTitleId: "app.quotes.Engineering_Drawing",
                    pdfName: pdfNamePrefix + "Engs" 
                }
            case EXPORTED_PDF_IDS.PUNCHING_DETAIL:
                return {
                    pageTitleId: "app.quotes.Punching_Detail",
                    pdfName: pdfNamePrefix + "Punching Details"
                }
            case EXPORTED_PDF_IDS.SHS_COLUMN_DETAIL:
                return {
                    pageTitleId: "app.quotes.SHS_Column_Detail",
                    pdfName: pdfNamePrefix + "SHS Column Details"
                }
            case EXPORTED_PDF_IDS.FLASHING:
                return {
                    pageTitleId: "app.quotes.Flashing_Drawing",
                    pdfName: pdfNamePrefix + "Flashings"
                }
            case EXPORTED_PDF_IDS.BRACKET:
                return {
                    pageTitleId: "app.quotes.Bracket_Drawing",
                    pdfName: pdfNamePrefix + "Brackets"
                }
            case EXPORTED_PDF_IDS.PURLIN_GIRT_REPORT:
                return {
                    pageTitleId: "app.quotes.Purlin_And_Girt_Report",
                    pdfName: pdfNamePrefix + "Purlin And Girt Report"
                }
            case EXPORTED_PDF_IDS.MAP:
                return {
                    pageTitleId: "app.quotes.Map",
                    pdfName: pdfNamePrefix + "Map"
                }
            default:
                return {
                    pageTitleId: "app.quotes.Bill_Of_Material",
                    pdfName: pdfNamePrefix + "BOM" 
                }
        }
    }

    getExportedPdfId = (exportedPdfId, userAccessModules) => {
        if (!exportedPdfId && userAccessModules && userAccessModules.length > 0) {
            for (let i = 0; i < EXPORTED_PDF_TYPES.length; i++) {
                for (let j = 0; j < userAccessModules.length; j++) {
                    if ((EXPORTED_PDF_TYPES[i].value === userAccessModules[j])
                        || (EXPORTED_PDF_TYPES[i].value === 'BOM' && userAccessModules[j].includes('BOM'))
                    ) {
                        return EXPORTED_PDF_TYPES[i].value;
                    }
                }
            }
        }
        
        return exportedPdfId;
    }

    render() {
        const {exportedPdfId} = this.props;
        const {pageTitleId, pdfName} = this.initialPDFInfo();
        return;
    }
}

const mapStateToProps = (state) => ({
    jobNumber:      getQDJobNumber(state),
    userDetail:     getQDUserDetail(state)
});


export default connect(mapStateToProps, null)(PDFModal);