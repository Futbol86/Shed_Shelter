import quoteListSaga from './sagas/quoteList';
import quoteDetailSaga from './sagas/quoteDetail';

export default
[
    ...quoteListSaga,
    ...quoteDetailSaga
];