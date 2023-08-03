import reportingDetailSaga from './sagas/reportingDetail';
import metrixReportingSaga from './sagas/metrixReporting';

export default
[
    ...reportingDetailSaga,
    ...metrixReportingSaga
];