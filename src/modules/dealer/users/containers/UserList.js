import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';

import {loadListUsersAction} from '../actions';
import {openModalAction} from '../../../../actions';
import UserListComponent from "../components/UserList";
import {PAGINATION_ITEMS_PER_PAGE} from "../../constants";
import {getUsersList} from "../selectors";
import {getUserId} from "../../../users/selectors";

class UserList extends Component {
    componentDidMount() {
        const {history, users} = this.props;
        if (users && users.length > 0 && history.action === 'POP')
            return null;

        let payload = {};
        let filter = {};
        const query = new URLSearchParams(history.location.search);
        const page = query.get('page');
        if (page)
            payload.skip = (page - 1) * PAGINATION_ITEMS_PER_PAGE;
        const state = query.get('state');
        if (state)
            filter.state = state;
        const search = query.get('search');
        if (search)
            filter.search = search;
        if (filter)
            payload.filter = filter;

        this.props.loadListUsersAction(payload);
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

        this.props.loadListUsersAction(payload);

        //-- Update router's link
        const {history} = this.props;
        const query = new URLSearchParams(history.location.search);
        query.set('page', page);
        //-- push then we can go with back button, replace then NO
        history.push({...history.location, search: query.toString()});
    };

    /**
     * We temporarily re-call API when pagination is changed
     *
     * @param nextProps
     */
    componentDidUpdate(preProps) {
        const search = this.props.location.search;
        const preSearch = preProps.location.search;

        if (search !== preSearch){
            let payload = {filter: this.props.filter};
            const query = new URLSearchParams(search);
            const page = query.get('page');
            if (page)
                payload.skip = (page - 1) * PAGINATION_ITEMS_PER_PAGE;
            this.props.loadListUsersAction(payload);
        }
    }

    render() {
        const {users, currentUserId, pagination} = this.props;

        return (
            <UserListComponent users={users} currentUserId={currentUserId}
                               onChangePage={this.onChangePage}
                               pagination={pagination}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    users:          getUsersList(state),
    currentUserId:  getUserId(state)
});

export default withRouter(connect(mapStateToProps, {loadListUsersAction, openModalAction})(UserList));