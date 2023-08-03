import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import { onSubmitActions } from 'redux-form-submit-saga';

import ContructionListFilterComponent from '../components/ContructionListFilter';
import {CONTRUCTION_LIST_FILTER_FORM_NAME} from '../constants';
import {getFilterInfo} from "../selectors";
import {getUserId} from "../../users/selectors";

const mapStateToProps = (state) => ({
    initialValues: {
        userId: getUserId(state),
        filter: getFilterInfo(state),
    }
});
export default
connect(mapStateToProps, null)(
    reduxForm({
        form: CONTRUCTION_LIST_FILTER_FORM_NAME,
        onSubmit: onSubmitActions(CONTRUCTION_LIST_FILTER_FORM_NAME),
        // fields: [ 'search', 'state', ],
        enableReinitialize: true,
        keepDirtyOnReinitialize: true
    })(ContructionListFilterComponent)
);