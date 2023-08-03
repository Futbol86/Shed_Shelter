import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import {loadListOrder} from '../actions';
import SharedOrderListComponent from "../components/SharedOrderList";
import {getOrderList, getFilterInfo, getPaginationInfo} from "../selectors";
import { PAGINATION_ITEMS_PER_PAGE } from "../constants";

class SharedOrderList extends Component {
    componentDidMount() {
        const {history} = this.props;
        let payload = {}, filter = "";
        const query = new URLSearchParams(history.location.search);
        const page = query.get('page');
        if (page)
            payload.skip = (page - 1) * PAGINATION_ITEMS_PER_PAGE;
        const search = query.get('search');
        if (search)
            filter = search;
        
        let {status} = this.props.match.params;
        filter = `${filter}&isSharedOrder=1&status=${status}`;

        if (filter && filter.length)
            payload.filter = filter;

        this.props.loadListOrder(payload);
    }

    onChangePage = (page) => {
        let payload = {};
        //-- get filtering information
        const {filter, pagination} = this.props;
        let status = this.props.match.params && this.props.match.params.status;
        payload = {...payload, filter: `${filter ? filter : ''}&isSharedOrder=1&status=${status}`};

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

    componentWillReceiveProps(nextProps) {
        let status = this.props.match.params && this.props.match.params.status;
        let nextStatus = nextProps.match.params && nextProps.match.params.status;

        // console.log('status', status, 'nextStatus', nextStatus);
        if (status !== nextStatus) {
            const {history} = this.props;
            let payload = {}, filter = "";
            const query = new URLSearchParams(history.location.search);
            const page = query.get('page');
            if (page)
                payload.skip = (page - 1) * PAGINATION_ITEMS_PER_PAGE;
            const search = query.get('search');
            if (search)
                filter = search;
            
            filter = `${filter}&isSharedOrder=1&status=${nextStatus}`;

            if (filter && filter.length)
                payload.filter = filter;

            this.props.loadListOrder(payload);
        }
    }

    render() {
        return (
            <SharedOrderListComponent {...this.props}
                                      onChangePage={this.onChangePage} />
        );
    }
}

const mapStateToProps = (state) => ({
    orders:             getOrderList(state),
    pagination:         getPaginationInfo(state),
    filter:             getFilterInfo(state)
});

export default withRouter(connect(mapStateToProps, {loadListOrder})(SharedOrderList));