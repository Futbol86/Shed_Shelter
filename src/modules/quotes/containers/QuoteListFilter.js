import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import { onSubmitActions } from 'redux-form-submit-saga';

import QuoteListFilterComponent from '../components/QuoteListFilter';
import {QUOTES_LIST_FILTER_FORM_NAME} from '../constants';

export default
connect(null, null)(
    reduxForm({
        form: QUOTES_LIST_FILTER_FORM_NAME,
        onSubmit: onSubmitActions(QUOTES_LIST_FILTER_FORM_NAME)
    })(QuoteListFilterComponent)
);