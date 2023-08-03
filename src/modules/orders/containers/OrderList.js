import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import uuid from "uuid";
import {openModalAction} from "../../../actions";
import {MODAL_TYPE_CONFIRMATION} from '../../../constants';
import {loadListOrder, deleteAnOrder, updateAnOrderStatus} from '../actions';
import OrderListComponent from "../components/OrderList";
import {getOrderList, getFilterInfo, getPaginationInfo} from "../selectors";
import { PAGINATION_ITEMS_PER_PAGE } from "../constants";

class OrderList extends Component {
    componentDidMount() {
        const {history} = this.props;

        let payload = {}, filter = {};
        const query = new URLSearchParams(history.location.search);
        const page = query.get('page');
        if (page)
            payload.skip = (page - 1) * PAGINATION_ITEMS_PER_PAGE;
        const search = query.get('search');
        if (search)
            filter.search = search;
        if (filter)
            payload.filter = filter;
            
        this.props.loadListOrder(payload);
    }

    onChangePage = (page) => {
        let payload = {};
        //-- get filtering information
        const {filter, pagination} = this.props;
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
        this.props.loadListOrder(payload);

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
            text: 'Are you sure to ' + `${currentStatus === 'closed' ? 'open' : 'closed'}` + ' this order?',
            onConfirm: () => {                
                let updatedStatus = currentStatus === 'closed' ? 'processing' : 'closed';
                this.props.updateAnOrderStatus({ id, status: updatedStatus });
            },
        });
    }

    handleDeleteClick = (id) => {        
        this.props.openModalAction({
            id: uuid.v4(),
            type: MODAL_TYPE_CONFIRMATION,
            text: 'Are you sure to delete this order?',
            onConfirm: () => {
                this.props.deleteAnOrder({id});
            },
        });
    }

    render() {        
        return (
            <OrderListComponent {...this.props}
                                handleOpenOrCloseClick={this.handleOpenOrCloseClick}
                                handleDeleteClick={this.handleDeleteClick}
                                onChangePage={this.onChangePage} />
        );
    }
}

const mapStateToProps = (state) => ({
    orders:     getOrderList(state),
    pagination: getPaginationInfo(state),
    filter:     getFilterInfo(state),
});

const mapDispatchToProps = (dispatch) => ({
    loadListOrder:              payload => dispatch(loadListOrder(payload)), 
    updateAnOrderStatus:        payload => dispatch(updateAnOrderStatus(payload)),
    deleteAnOrder:              payload => dispatch(deleteAnOrder(payload)),
    
    openModalAction:            payload => dispatch(openModalAction(payload)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderList));