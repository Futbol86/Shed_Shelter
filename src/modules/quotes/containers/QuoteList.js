import React, {Component} from 'react';
import {connect} from 'react-redux';
import uuid from "uuid";

import auth from "../../../services/auth";
import {loadListQuotesAction, deleteAQuoteAction, lockAQuoteAction, unlockAQuoteAction, QD_AD_setCheckedQuotes} from '../actions';
import QuoteListComponent from "../components/QuoteList";
import {getFilterInfo, getPaginationInfo, getQuotesList, getQDADCheckedQuotes} from "../selectors";
import {openModalAction} from "../../../actions";
import {DOC_changeActiveModal} from "../../documents/actions";
import {getDocCurrentModalId} from "../../documents/selectors";
import { getUserProfile } from '../../users/selectors';
import {MODAL_TYPE_CONFIRMATION} from '../../../constants';
import {QUOTE_STATUS_LIST} from "../constants";

class QuoteList extends Component {
    handleDeleteClick = (id) => {
        this.props.openModalAction({
            id: uuid.v4(),
            type: MODAL_TYPE_CONFIRMATION,
            text: 'Are you sure to DELETE this quote?<br />This action cannot be Undo!',
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

    handleCheckedQuote = (e, buildingId, clientDetail) => {
        let { checkedQuotes } = this.props;
        const { contact1 } = clientDetail;
        if(e.target.checked === true) {
            if(!checkedQuotes.includes(buildingId)) {
                checkedQuotes.push({
                    buildingId,
                    phoneHome: contact1.phoneHome
                });
            }
        } else {
            let findRemovedIndex = checkedQuotes.findIndex(item => item.buildingId === buildingId);
            checkedQuotes.splice(findRemovedIndex, 1)
        }

       this.props.QD_AD_setCheckedQuotes(checkedQuotes);
    }

    handleModalChange = (modalId) => {
        this.props.DOC_changeActiveModal({modalId});
    };

    onChangePage = (page) => {
        const {limit, total} = this.props.pagination;
        let {filter} = this.props;
        const newSkip = (page - 1) * limit;
        if (newSkip >= 0 && newSkip <= total)
            //this.props.loadListQuotesAction({skip: newSkip});
            this.props.loadListQuotesAction({filter, skip: newSkip});
    };

    componentDidMount() {
        const {history} = this.props;
        if (history.location.search && history.location.search.length) {            
            this.props.loadListQuotesAction({filter: history.location.search.replace("?", "&")});
        } else {
            this.props.loadListQuotesAction();
        }
        //-- TODO: TEST the lookupWindSpeed function
        /*const data = {
            MaxShedSpan:    4040,
            MaxShedHeight:  3500,
            MinShedPitch:   4,
            // MaxShedPitch:   24,
            MaxBaySpacing:  3000,
            WindSpeed:      '39C',
            Qu:             1.3689,
            Cpi: 0.2,
            MaxShedLength: 10000
        };
        const result = utils.lookupWindSpeed(data);
        console.log('Calculate Wind Speed: ', result);*/
    }

    render() {
        const {quotes, filter, pagination, currentModalId, userInfo} = this.props;
        const isDealer = auth.isADealer();
        const isAnAccounting = auth.isAnAccounting();

        return (
            <QuoteListComponent quotes={quotes} displayClient = {true} isDealer={isDealer} isAnAccounting={isAnAccounting}
                                filter={filter} userInfo={userInfo} currentModalId={currentModalId}                    
                                handleDeleteClick={this.handleDeleteClick}
                                pagination={pagination} onChangePage={this.onChangePage}
                                handleLockClick={this.handleLockClick} handleUnlockClick={this.handleUnlockClick}
                                handleCheckedQuote={this.handleCheckedQuote}
                                handleModalChange={this.handleModalChange}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    quotes: getQuotesList(state),
    pagination: getPaginationInfo(state),
    filter: getFilterInfo(state),

    userInfo:       getUserProfile(state),
    currentModalId: getDocCurrentModalId(state),
    checkedQuotes:  getQDADCheckedQuotes(state)
});

export default connect(mapStateToProps, {
    loadListQuotesAction, deleteAQuoteAction, lockAQuoteAction, 
    QD_AD_setCheckedQuotes, openModalAction, DOC_changeActiveModal
})(QuoteList);