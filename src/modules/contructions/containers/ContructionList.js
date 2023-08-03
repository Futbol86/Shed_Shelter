import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import uuid from "uuid";
import {openModalAction} from "../../../actions";
import {MODAL_TYPE_CONFIRMATION} from '../../../constants';
import {loadListContruction, deleteAnContruction, updateAnContructionStatus} from '../actions';
import ContructionListComponent from "../components/ContructionList";
import {getContructionList, getFilterInfo, getPaginationInfo} from "../selectors";
import {getUserId} from "../../users/selectors";
import { PAGINATION_ITEMS_PER_PAGE } from "../constants";

class ContructionList extends Component {
    componentDidMount() {
        const {history, userId} = this.props;

        let payload = {}, filter = "";
        const query = new URLSearchParams(history.location.search);
        const page = query.get('page');
        if (page)
            payload.skip = (page - 1) * PAGINATION_ITEMS_PER_PAGE;
        const search = query.get('search');
        if (search)
            filter += search;
        filter += '&userId=' + userId;
        if (filter)
            payload.filter = filter;
        
        this.props.loadListContruction(payload);
    }

    onChangePage = (page) => {
        let payload = {}, filter = {};
        //-- get filtering information
        var {userId, pagination} = this.props;
        filter.userId = userId;
        
        if (filter)
            payload = {...payload, filter};
        
        //-- get pagination
        if (pagination){
            const {limit, total, skip} = pagination;
            if (Math.floor(skip / limit) + 1 === page)
                return null;
            const newSkip = (page - 1) * limit;
            if (newSkip >= 0 && newSkip <= total)
                payload = {...payload, skip: newSkip};
        }
        this.props.loadListContruction(payload);

        //-- Update router's link
        const {history} = this.props;
        const query = new URLSearchParams(history.location.search);
        query.set('page', page);
        //-- push then we can go with back button, replace then NO
        history.push({...history.location, search: query.toString()});
    };

    handleOpenOrCloseClick = (id, currentStatus) => {        
        this.props.openModalAction({
            id: uuid.v4(),
            type: MODAL_TYPE_CONFIRMATION,
            text: 'Are you sure to ' + `${currentStatus === 'closed' ? 'open' : 'closed'}` + ' this contruction?',
            onConfirm: () => {                
                let updatedStatus = currentStatus === 'closed' ? 'processing' : 'closed';
                this.props.updateAnContructionStatus({ id, status: updatedStatus });
            },
        });
    }

    handleDeleteClick = (id) => {        
        this.props.openModalAction({
            id: uuid.v4(),
            type: MODAL_TYPE_CONFIRMATION,
            text: 'Are you sure to delete this contruction?',
            onConfirm: () => {
                this.props.deleteAnContruction({id});
            },
        });
    }

    render() {
        return (
            <ContructionListComponent {...this.props}
                                      handleOpenOrCloseClick={this.handleOpenOrCloseClick}
                                      handleDeleteClick={this.handleDeleteClick}
                                      onChangePage={this.onChangePage} />
        );
    }
}

const mapStateToProps = (state) => ({
    contructions:     getContructionList(state),
    userId:           getUserId(state),
    pagination:       getPaginationInfo(state),
    filter:           getFilterInfo(state),
});

const mapDispatchToProps = (dispatch) => ({
    loadListContruction:              payload => dispatch(loadListContruction(payload)), 
    updateAnContructionStatus:        payload => dispatch(updateAnContructionStatus(payload)),
    deleteAnContruction:              payload => dispatch(deleteAnContruction(payload)),
    
    openModalAction:                  payload => dispatch(openModalAction(payload)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ContructionList));