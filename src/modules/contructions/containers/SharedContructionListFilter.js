import React, {Component} from 'react';
import {reduxForm, change, getFormValues} from 'redux-form';
import {connect} from 'react-redux';
import {onSubmitActions} from 'redux-form-submit-saga';

import SharedContructionListFilterComponent from '../components/SharedContruction/SharedContructionListFilter';
import {SHARED_CONTRUCTION_LIST_FILTER_FORM_NAME} from '../constants';
import {getFilterInfo} from "../selectors";
import {getUserId} from '../../users/selectors';

class SharedContructionListFilter extends Component {
    componentDidMount() {
        const {userId, status} = this.props;
        this.props.initialize({isSharedContruction: 1, userId, status});
    }

    componentDidUpdate(prevProps) {
        const {userId, status} = this.props;
        if(status !== prevProps.status){
            this.props.initialize({isSharedContruction: 1, userId, status});
        }
    }

    render(){
        return(
            <SharedContructionListFilterComponent {...this.props}/>
        )
    }
}

export default
    reduxForm({
        form: SHARED_CONTRUCTION_LIST_FILTER_FORM_NAME,
        onSubmit: onSubmitActions(SHARED_CONTRUCTION_LIST_FILTER_FORM_NAME),
        // fields: [ 'search', 'state', ],
        enableReinitialize: true,
        keepDirtyOnReinitialize: true
    })(SharedContructionListFilter);