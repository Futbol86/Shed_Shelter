import docDetailSaga from './sagas/docDetail';
import docAccountingSaga from './sagas/docAccounting';
import docFormSheetSaga from './sagas/docFormSheet';
import docNoteSheetSaga from './sagas/docNoteSheet';

export default
[
    ...docDetailSaga,
    ...docAccountingSaga,
    ...docFormSheetSaga,
    ...docNoteSheetSaga
];