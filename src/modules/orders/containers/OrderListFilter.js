import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import { onSubmitActions } from 'redux-form-submit-saga';

import OrderListFilterComponent from '../components/OrderListFilter';
import {ORDER_LIST_FILTER_FORM_NAME} from '../constants';
import {getFilterInfo} from "../selectors";

const mapStateToProps = (state) => ({
    initialValues: {
        filter: getFilterInfo(state)
    }
});
export default
connect(mapStateToProps, null)(
    reduxForm({
        form: ORDER_LIST_FILTER_FORM_NAME,
        onSubmit: onSubmitActions(ORDER_LIST_FILTER_FORM_NAME),
        // fields: [ 'search', 'state', ],
        enableReinitialize: true,
        keepDirtyOnReinitialize: true
    })(OrderListFilterComponent)
);