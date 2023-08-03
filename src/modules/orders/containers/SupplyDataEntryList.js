import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import uuid from "uuid";

import {openModalAction} from "../../../actions";
import {MODAL_TYPE_CONFIRMATION} from '../../../constants';
import {loadListSupplyDataEntry, deleteASupplyDataEntry} from '../actions';
import SupplyDataEntryListComponent from "../components/SupplyDataEntryList";
import {getSupplyDataEntryList, getSupplyDataEntryPaginationInfo} from "../selectors";
import {PAGINATION_ITEMS_PER_PAGE} from "../constants";

class SupplyDataEntryList extends Component {
    componentDidMount() {
        const {history, supplyDataEntries} = this.props;
        if (supplyDataEntries && supplyDataEntries.length > 0 && history.action === 'POP')
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

        this.props.loadListSupplyDataEntry(payload);
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

        this.props.loadListSupplyDataEntry(payload);

        //-- Update router's link
        const {history} = this.props;
        const query = new URLSearchParams(history.location.search);
        query.set('page', page);
        //-- push then we can go with back button, replace then NO        
        history.push({...history.location, search: query.toString()});
    };

    handleDeleteClick = (id) => {
        this.props.openModalAction({
            id: uuid.v4(),
            type: MODAL_TYPE_CONFIRMATION,
            text: 'Are you sure to delete this supplier?',
            onConfirm: () => {
                this.props.deleteASupplyDataEntry(id)
            },
        });
    }

    render() {
        return (
            <SupplyDataEntryListComponent {...this.props}
                handleDeleteClick={this.handleDeleteClick}
                onChangePage={this.onChangePage}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    supplyDataEntries:  getSupplyDataEntryList(state),
    pagination:         getSupplyDataEntryPaginationInfo(state)
});

const mapDispatchToProps = (dispatch) => ({
    loadListSupplyDataEntry:    payload => dispatch(loadListSupplyDataEntry(payload)),
    deleteASupplyDataEntry:     payload => dispatch(deleteASupplyDataEntry(payload)), 

    openModalAction:            payload => dispatch(openModalAction(payload)),
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(SupplyDataEntryList));