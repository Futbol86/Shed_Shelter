import orderListSaga from './sagas/orderList';
import orderDetailSaga from './sagas/orderDetail';
import orderNoteSaga from './sagas/orderNote';
import supplyDataEntryListSaga from './sagas/supplyDataEntryList';
import supplyDataEntryDetailSaga from './sagas/supplyDataEntryDetail';

export default
[
    ...orderListSaga,
    ...orderDetailSaga,
    ...orderNoteSaga,
    ...supplyDataEntryListSaga,
    ...supplyDataEntryDetailSaga,
];