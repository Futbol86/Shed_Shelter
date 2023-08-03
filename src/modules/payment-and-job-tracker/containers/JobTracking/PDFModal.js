import React, {Component} from 'react';
import {connect} from 'react-redux';

// import PDFModalComponent from "../../../documents/components/CommonPDFModal";
// import {DOC_convertHTMLToPDF} from "../../../documents/actions";
// import {getRemotePDF} from "../../../documents/selectors";
// import {getShortOfTradingName} from "../../../documents/selectors";
import {getDealerInfo} from "../../../users/selectors";
import { JT_JOB_TRACKING } from '../../constants';

import isEmpty from "lodash/isEmpty";

class PDFModal extends Component {
    componentDidMount() {
        let {dealerInfo, quoteDetails} = this.props;
        let pageData = {...this.props};

        if (!isEmpty(dealerInfo)) {
            pageData = {
                ...pageData,
                nssJobId: this.getJobNumber(dealerInfo, quoteDetails)
            };
        }

        this.props.DOC_convertHTMLToPDF({
            pageId: JT_JOB_TRACKING,
            pageData: pageData
        });
    }

    getJobNumber(dealerInfo, quoteDetails) {
        let nssJobId = '';

        if (dealerInfo && dealerInfo.tradingName && quoteDetails && quoteDetails.jobNumber) {
            // nssJobId = getShortOfTradingName(dealerInfo.tradingName);
            nssJobId += 'L-' + quoteDetails.jobNumber;
        } else {
            nssJobId = 'NSSL-000000';
        }

        return nssJobId;
    }

    render() {
        const {dealerInfo, quoteDetails} = this.props;
        return (
            <h2>PDF Modal</h2>
            // <PDFModalComponent {...this.props}
            //     pageTitleId = {"app.payment-and-job-tracker.Job_Tracking"}
            //     pdfName={`${this.getJobNumber(dealerInfo, quoteDetails)}-Job Tracking`}
            // />
        );
    }
}

const mapStateToProps = (state) => ({
    // remotePDF:      getRemotePDF(state),
    // dealerInfo:     getDealerInfo(state),
});

export default connect(mapStateToProps, {})(PDFModal);