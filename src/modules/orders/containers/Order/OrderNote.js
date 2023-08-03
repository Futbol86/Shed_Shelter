import React, {Component} from 'react';
import {connect} from 'react-redux';
import uuid from 'uuid';
import {loadListOrderNote, loadEditingNoteAction, deleteAnOrderNote} from '../../actions';
import {openModalAction} from "../../../../actions";
import {getOrderNoteList, getOrderNotePaginationInfo} from "../../selectors";
import {getUserId} from "../../../users/selectors";
import {MODAL_TYPE_CONFIRMATION} from '../../../../constants';
import {ORDER_NOTE_PAGINATION_ITEMS_PER_PAGE} from '../../constants';

import OrderNoteComponent from "../../components/Order/OrderNote";

import auth from "../../../../services/auth";

class OrderNote extends Component {
    componentDidMount() {
        const {orderDetails} = this.props;
        if (orderDetails && orderDetails.id) {
            let payload = {};
            payload.skip = 0;
            payload.filter = `&orderId=${orderDetails.id}`;
            this.props.loadListOrderNote(payload);
        }
    }

    onChangePage = (page) => {
        const {orderDetails} = this.props;
        if (orderDetails && orderDetails.id) {
            let payload = {};
            payload.skip = (page - 1) * ORDER_NOTE_PAGINATION_ITEMS_PER_PAGE;
            payload.filter = `&orderId=${orderDetails.id}`;
            this.props.loadListOrderNote(payload);
        }
    };

    loadEditingNote = (note) => {
        this.props.loadEditingNoteAction({note});
    };

    handleDeleteClick = (id) => {
        this.props.openModalAction({
            id: uuid.v4(),
            type: MODAL_TYPE_CONFIRMATION,
            text: 'Are you sure to DELETE this note?',
            onConfirm: () => this.props.deleteAnOrderNote({id}),
        });
    };

    render() {
        const isAdmin = auth.isAnAdmin();
        const uploadRootURL = process.env.REACT_APP_STATIC_FILE_URL;
        return (
            <OrderNoteComponent {...this.props}
                isAdmin={isAdmin} uploadRootURL={uploadRootURL}
                loadEditingNote={this.loadEditingNote}
                handleDeleteClick={this.handleDeleteClick}
                onChangePage={this.onChangePage}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    notes:          getOrderNoteList(state),
    userId:         getUserId(state),
    pagination:     getOrderNotePaginationInfo(state)
});


const mapDispatchToProps = (dispatch) => ({
    loadListOrderNote:      payload => dispatch(loadListOrderNote(payload)),
    loadEditingNoteAction:  payload => dispatch(loadEditingNoteAction(payload)),
    deleteAnOrderNote:      payload => dispatch(deleteAnOrderNote(payload)),

    openModalAction:        payload => dispatch(openModalAction(payload))
});

export default connect(mapStateToProps, mapDispatchToProps) (OrderNote);