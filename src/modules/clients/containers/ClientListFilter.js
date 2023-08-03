import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import { onSubmitActions } from 'redux-form-submit-saga';

import ClientListFilterComponent from '../components/ClientListFilter';
import {CLIENTS_LIST_FILTER_FORM_NAME} from '../constants';
import {getFilterInfo} from "../selectors";

const mapStateToProps = (state) => ({
    initialValues: getFilterInfo(state)
});
export default
connect(mapStateToProps, null)(
    reduxForm({
        form: CLIENTS_LIST_FILTER_FORM_NAME,
        onSubmit: onSubmitActions(CLIENTS_LIST_FILTER_FORM_NAME),
        // fields: [ 'search', 'state', ],
        enableReinitialize: true,
        keepDirtyOnReinitialize: true
    })(ClientListFilterComponent)
);