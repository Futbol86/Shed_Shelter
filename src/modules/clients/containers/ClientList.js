import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';

import {loadListClientsAction} from '../actions';
import ClientListComponent from "../components/ClientList";
import {getClientsList, getFilterInfo, getPaginationInfo} from "../selectors";
import {PAGINATION_ITEMS_PER_PAGE} from "../constants";

class ClientList extends Component {
    componentDidMount() {
        const {history, clients} = this.props;
        if (clients && clients.length > 0 && history.action === 'POP')
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

        this.props.loadListClientsAction(payload);
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

        this.props.loadListClientsAction(payload);

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
    componentWillReceiveProps(nextProps) {
        const search = this.props.location.search;
        const newSearch = nextProps.location.search;
        if (search !== newSearch){
            let payload = {filter: this.props.filter};
            const query = new URLSearchParams(newSearch);
            const page = query.get('page');
            if (page)
                payload.skip = (page - 1) * PAGINATION_ITEMS_PER_PAGE;
            this.props.loadListClientsAction(payload);
        }
    }

    render() {
        const {clients, pagination} = this.props;
        return (
            <ClientListComponent clients={clients}
                                 pagination={pagination} onChangePage={this.onChangePage} />
        );
    }
}

const mapStateToProps = (state) => ({
    clients: getClientsList(state),
    pagination: getPaginationInfo(state),
    filter: getFilterInfo(state)
});

export default withRouter(connect(mapStateToProps, {loadListClientsAction})(ClientList));