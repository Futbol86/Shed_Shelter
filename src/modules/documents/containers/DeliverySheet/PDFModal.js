import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getFormValues} from 'redux-form';

import PDFModalComponent from "../../components/CommonPDFModal";
import {DOC_convertHTMLToPDF} from "../../actions";
import {getRemotePDF, getPDFNamePrefix} from "../../selectors";
import {DOCS_DELIVERY_SHEET_FORM_NAME, DOCS_TYPE_DELIVERY_SHEET} from "../../constants";


class DeliverySheetPDFModal extends Component {
    componentDidMount() {
        let pageData = this.props.pageData;

        this.props.DOC_convertHTMLToPDF({
            pageId: DOCS_TYPE_DELIVERY_SHEET,
            pageData: {
                ...pageData,
                clientDetail: this.props.clientDetail,
                buildingDetail: this.props.buildingDetail,
                userInfo: this.props.userInfo,
                dealerTradingName: this.props.dealerTradingName,
                dealerInfo: this.props.dealerInfo
            }
        });
    }

    render() {
        const { dealerInfo, clientDetail, jobNumber } = this.props;
        const pdfName = getPDFNamePrefix(dealerInfo && dealerInfo.tradingName, jobNumber, clientDetail && clientDetail.agentName)
                        + "Delivery";
        return (
            <PDFModalComponent {...this.props} pageTitleId="app.docs.Delivery" pdfName = {pdfName} />
        );
    }
}

const mapStateToProps = (state) => ({
    remotePDF:  getRemotePDF(state),
    pageData:   getFormValues(DOCS_DELIVERY_SHEET_FORM_NAME)(state),
});

export default connect(mapStateToProps, {DOC_convertHTMLToPDF})(DeliverySheetPDFModal);