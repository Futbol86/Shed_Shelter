import React, {Component} from "react";

import PDFExportModalComponent from "../../../components/QuoteDetail/CommonFooterSection/PDFExportModal";

class PDFExportModal extends Component {
    initialOptions(buildingDetail) {
        let hasSHSColumn = false;
        
        return {
            hasSHSColumn
        };
    };

    render() {
        const { buildingDetail, handleModalClose, handleSubmit, userAccessModules } = this.props;
        const { hasSHSColumn } = this.initialOptions(buildingDetail);

        return (
            <PDFExportModalComponent
                hasSHSColumn = {hasSHSColumn}
                userAccessModules = {userAccessModules}
                handleModalClose = {handleModalClose}
                handleSubmit = {handleSubmit}
            />
        );
    }
}


export default PDFExportModal;