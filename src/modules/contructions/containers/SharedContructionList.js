import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import {loadListContruction} from '../actions';
import SharedContructionListComponent from "../components/SharedContructionList";
import {getContructionList, getFilterInfo, getPaginationInfo} from "../selectors";
import {getUserId} from "../../users/selectors";
import { PAGINATION_ITEMS_PER_PAGE } from "../constants";

class SharedContructionList extends Component {
    componentDidMount() {
        const {history, userId} = this.props;
        let payload = {}, filter = "";
        const query = new URLSearchParams(history.location.search);
        const page = query.get('page');
        if (page)
            payload.skip = (page - 1) * PAGINATION_ITEMS_PER_PAGE;
        const search = query.get('search');
        if (search)
            filter = search;
        let {status} = this.props.match.params;
       
        // Find Supply Data Entry
        filter = `${filter}&isSharedContruction=1` + '&userId=' + userId + '&status=' + status;

        if (filter && filter.length)
            payload.filter = filter;
   
        this.props.loadListContruction(payload);
    }

    componentWillReceiveProps(nextProps) {
        const {history, userId} = this.props;
        let payload = {}, filter = "";
        const query = new URLSearchParams(history.location.search);
        const page = query.get('page');
        if (page)
            payload.skip = (page - 1) * PAGINATION_ITEMS_PER_PAGE;
        const search = query.get('search');
        if (search)
            filter = search;
        let status = this.props.match.params.status;
        let newStatus = nextProps.match.params.status;
        if(status !== newStatus) {
            status = newStatus;
            filter = `${filter}&isSharedContruction=1` + '&userId=' + userId + '&status=' + status;

            if (filter && filter.length)
                payload.filter = filter;
            payload.search = null;
            this.props.loadListContruction(payload);
        }
    }

    onChangePage = (page) => {
        const {userId} = this.props;
        let status = this.props.match.params.status;
        let payload = {};
        //-- get filtering information
        const {filter, pagination} = this.props;
        filter.userId = userId;
        filter.isSharedContruction = 1;
        filter.status = status;
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

    render() {
        let {status} = this.props.match.params;
        return (
            <SharedContructionListComponent {...this.props}
                                            status={status}
                                            onChangePage={this.onChangePage} />
        );
    }
}

const mapStateToProps = (state) => ({
    contructions:       getContructionList(state),
    userId:             getUserId(state),
    pagination:         getPaginationInfo(state),
    filter:             getFilterInfo(state)
});

export default withRouter(connect(mapStateToProps, {loadListContruction})(SharedContructionList));