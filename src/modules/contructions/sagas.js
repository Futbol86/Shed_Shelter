import contructionListSaga from './sagas/contructionList';
import contructionDetailSaga from './sagas/contructionDetail';
import contructionNoteSaga from './sagas/contructionNote';
import contructionDataEntryListSaga from './sagas/contructionDataEntryList';
import contructionDataEntryDetailSaga from './sagas/contructionDataEntryDetail';
import contructionPlannerSaga from './sagas/contructionPlanner';

export default
[
    ...contructionListSaga,
    ...contructionDetailSaga,
    ...contructionNoteSaga,
    ...contructionDataEntryListSaga,
    ...contructionDataEntryDetailSaga,
    ...contructionPlannerSaga
];