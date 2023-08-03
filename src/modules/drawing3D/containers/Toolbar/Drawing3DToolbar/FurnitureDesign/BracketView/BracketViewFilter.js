import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import { onSubmitActions } from 'redux-form-submit-saga';

import { BRACKET_VIEW_FILTER_FORM_NAME } from '../../../../../constants';
import BracketViewFilterComponent from '../../../../../components/Toolbar/Drawing3DToolbar/FurnitureDesign/BracketView/BracketViewFilter';

export default
connect(null, null)(
    reduxForm({
        form: BRACKET_VIEW_FILTER_FORM_NAME,
        onSubmit: onSubmitActions(BRACKET_VIEW_FILTER_FORM_NAME),
        enableReinitialize: true,
        keepDirtyOnReinitialize: true
    })(BracketViewFilterComponent)
);