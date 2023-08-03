import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getFormValues} from 'redux-form';

//import PDFModalComponent from "../../../documents/components/CommonPDFModal";
// import {DOC_convertHTMLToPDF} from "../../../documents/actions";
// import {getRemotePDF} from "../../../documents/selectors";
import {
    REPORTING_DETAIL_FORM_NAME,
    RP_REPORTING,
    REPORT_FILTER_OPTIONS
} from '../../constants';

import {QUOTES_JOB_STATUSES, FIND_US_CONTENTS} from '../../../quotes/constants';

class PDFModal extends Component {
    componentDidMount() {
        let {reportingDetail} = this.props;

        if (reportingDetail) {
            const {countQuotes, countStatuses, countFindUs, statuses, findUsData} = reportingDetail;
            //Fill data
            let pageData = {
                fromDate: this.props.pageData && this.props.pageData.fromDate,
                toDate: this.props.pageData && this.props.pageData.toDate
            };

            let searchOption = REPORT_FILTER_OPTIONS && this.props.pageData && this.props.pageData.option
                && REPORT_FILTER_OPTIONS.some(op => op.value === this.props.pageData.option)
                ? REPORT_FILTER_OPTIONS.find(op => op.value === this.props.pageData.option)['name'] : '';
            pageData.option = searchOption;
            pageData.countQuotes = countQuotes;
            pageData.countFindUs = countFindUs;

            pageData.statuses = [];
            if (QUOTES_JOB_STATUSES && QUOTES_JOB_STATUSES.length) {
                for (let i = 0; i < QUOTES_JOB_STATUSES.length; i++)  {
                    const status = QUOTES_JOB_STATUSES[i];
                    if (statuses && countStatuses) {
                        const countStatus = statuses[status.value] ? statuses[status.value] : 0;
                        pageData.statuses.push({
                            id:         status.id,
                            name:       status.name,
                            number:     countStatus,
                            percentage: (100 * countStatus / countStatuses).toFixed(1) + ' %'
                        });
                    } else {
                        pageData.statuses.push({
                            id:         status.id,
                            name:       status.name,
                            number:     0,
                            percentage: '0 %'
                        });
                    }
                }
            }

            pageData.basicFindUs = [];
            if (FIND_US_CONTENTS && FIND_US_CONTENTS.length) {
                for (let i = 0; i < FIND_US_CONTENTS.length; i++)  {
                    const findUsCategory = FIND_US_CONTENTS[i];

                    if (findUsData && countFindUs) {
                        const countFindUsCatagory = findUsData[findUsCategory.value] ? findUsData[findUsCategory.value].total : 0;
                        pageData.basicFindUs.push({
                            id:         findUsCategory.id,
                            name:       findUsCategory.name,
                            number:     countFindUsCatagory,
                            percentage: (100 * countFindUsCatagory / countFindUs).toFixed(1) + ' %'
                        });
                    } else {
                        pageData.basicFindUs.push({
                            id:         findUsCategory.id,
                            name:       findUsCategory.name,
                            number:     0,
                            percentage: '0 %'
                        });
                    }
                }
            }

            pageData.detailFindUs = [];
            if (FIND_US_CONTENTS && FIND_US_CONTENTS.length) {
                for (let i = 0; i < FIND_US_CONTENTS.length; i++)  {
                    const findUsCategory = FIND_US_CONTENTS[i];
                    const detailData = {
                        name: findUsCategory.name,
                        details: []
                    }

                    if (findUsCategory.details && findUsCategory.details.length) {
                        for (let j = 0; j < findUsCategory.details.length; j++) {
                            const findUsDetail = findUsCategory.details[j];
                            if (findUsData && countFindUs) {
                                const countFindUsCatagory = findUsData[findUsCategory.value]
                                    && findUsData[findUsCategory.value][findUsDetail.value]
                                    ? findUsData[findUsCategory.value][findUsDetail.value] : 0;
                                detailData.details.push({
                                    id:         findUsDetail.id,
                                    name:       findUsDetail.name,
                                    number:     countFindUsCatagory,
                                    percentage: (100 * countFindUsCatagory / countFindUs).toFixed(1) + ' %'
                                });
                            } else {
                                detailData.details.push({
                                    id:         findUsDetail.id,
                                    name:       findUsDetail.name,
                                    number:     0,
                                    percentage: '0 %'
                                });
                            }
                        }
                    }

                    pageData.detailFindUs.push(detailData);
                }
            }

            this.props.DOC_convertHTMLToPDF({
                pageId: RP_REPORTING,
                pageData: pageData
            });
        }
    }

    render() {
        return (
            <h2>PDF Modal</h2>
            // <PDFModalComponent {...this.props}
            //     pageTitleId = {"app.reporting.Reporting"}
            //     pdfName={"Reporting"}
            // />
        );
    }
}

const mapStateToProps = (state) => ({
    // remotePDF:  getRemotePDF(state),
    pageData:   getFormValues(REPORTING_DETAIL_FORM_NAME)(state),
});

export default connect(mapStateToProps, {})(PDFModal);