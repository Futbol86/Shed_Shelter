import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import { onSubmitActions } from 'redux-form-submit-saga';

import SharedOrderListFilterComponent from '../components/SharedOrder/SharedOrderListFilter';
import {SHARED_ORDER_LIST_FILTER_FORM_NAME} from '../constants';
import {getFilterInfo} from "../selectors";
import {getUserProfile} from '../../users/selectors';

const mapStateToProps = (state) => ({
    initialValues: {
        user: getUserProfile(state),
        filter: getFilterInfo(state)
    }
});
export default
connect(mapStateToProps, null)(
    reduxForm({
        form: SHARED_ORDER_LIST_FILTER_FORM_NAME,
        onSubmit: onSubmitActions(SHARED_ORDER_LIST_FILTER_FORM_NAME),
        // fields: [ 'search', 'state', ],
        enableReinitialize: true,
        keepDirtyOnReinitialize: true
    })(SharedOrderListFilterComponent)
);