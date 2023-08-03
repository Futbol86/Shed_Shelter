import clientListSaga from './sagas/clientList';
import quoteListSaga from './sagas/quoteList';

/**
 * Note: even sagas listening events are separated in dashboard and other modules,
 *  reducers will produce similar tree in both dashboard and sub-module list this case.
 *  It is acceptable in this, however be aware of this when re-using code in the future.
 *
 * @type {{clientList: function(*=, *=), quoteList: function(*=, *=)}}
 */
export default
[
    ...clientListSaga,
    ...quoteListSaga,
];