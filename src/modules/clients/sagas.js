import clientListSaga from './sagas/clientList';
import clientDetailSaga from './sagas/clientDetail';
import clientAddSaga from './sagas/clientAdd';

export default
[
    ...clientListSaga,
    ...clientDetailSaga,
    ...clientAddSaga,
];