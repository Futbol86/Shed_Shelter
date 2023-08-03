import React, {Component} from 'react';
import {connect} from 'react-redux';
import uuid from 'uuid';

import {openModalAction} from '../../../actions';

import {loadListQuotesAction, deleteAQuoteAction} from '../actions';
import QuoteListComponent from "../components/DashboardQuoteList";
import {getQuotesList} from "../selectors";
import {MODAL_TYPE_CONFIRMATION} from "../../../constants";
import {QUOTE_STATUS_LIST} from "../../quotes/constants";
import {lockAQuoteAction} from '../../quotes/actions';
import auth from "../../../services/auth";

class QuoteList extends Component {
    handleDeleteClick = (id) => {
        this.props.openModalAction({
            id: uuid.v4(),
            type: MODAL_TYPE_CONFIRMATION,
            text: 'Are you sure to DELETE this quote?',
            // onClose: () => console.log("fire at closing event"),
            onConfirm: () => this.props.deleteAQuoteAction({id}),
        });
    };

    handleLockClick = (id) => {
        this.props.openModalAction({
            id: uuid.v4(),
            type: MODAL_TYPE_CONFIRMATION,
            text: 'Are you sure to LOCK this quote?<br />You will not be able to edit it after this action.',
            // onClose: () => console.log("fire at closing event"),
            onConfirm: () => this.props.lockAQuoteAction({id, status: QUOTE_STATUS_LIST.LOCKED}),
        });
    };

    handleUnlockClick = (id) => {
        this.props.openModalAction({
            id: uuid.v4(),
            type: MODAL_TYPE_CONFIRMATION,
            text: 'Are you sure to UNLOCK this quote?<br />Quote data will be EDITABLE it after this action.',
            // onClose: () => console.log("fire at closing event"),
            onConfirm: () => this.props.lockAQuoteAction({id, status: QUOTE_STATUS_LIST.OPENED}),
        });
    };

    componentDidMount() {
        this.props.loadListQuotesAction();
    }

    render() {
        const {quotes, displayClient} = this.props;
        const isDealer = auth.isADealer();
        const isAnAccounting = auth.isAnAccounting();
        
        return (
            <QuoteListComponent quotes={quotes} displayClient = {displayClient} isDealer={isDealer} isAnAccounting={isAnAccounting}
                                handleDeleteClick={this.handleDeleteClick}
                                handleLockClick={this.handleLockClick} handleUnlockClick={this.handleUnlockClick}
            />
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    quotes: (ownProps && ownProps.quotes) ? ownProps.quotes : getQuotesList(state)
});

export default connect(mapStateToProps, {loadListQuotesAction, deleteAQuoteAction, lockAQuoteAction, openModalAction})(QuoteList);