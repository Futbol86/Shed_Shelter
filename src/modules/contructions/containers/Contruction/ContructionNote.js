import React, {Component} from 'react';
import {connect} from 'react-redux';
import uuid from 'uuid';
import {loadListContructionNote, loadEditingNoteAction, deleteAnContructionNote} from '../../actions';
import {openModalAction} from "../../../../actions";
import {getContructionNoteList, getContructionNotePaginationInfo} from "../../selectors";
import {getUserId} from "../../../users/selectors";
import {MODAL_TYPE_CONFIRMATION} from '../../../../constants';
import {PAGINATION_ITEMS_PER_PAGE} from '../../constants';
import {getDocCurrentModalId} from '../../../documents/selectors';
import {DOC_changeActiveModal} from '../../../documents/actions';
import ContructionNoteComponent from "../../components/Contruction/ContructionNote";

import auth from "../../../../services/auth";

class ContructionNote extends Component {
    componentDidMount() {
        const {contructionDetails, userId} = this.props;
        if (contructionDetails && contructionDetails.id) {
            let payload = {};
            payload.skip = 0;
            payload.filter = `&contructionId=${contructionDetails.id}&userId=${userId}`;
            this.props.loadListContructionNote(payload);
        }
    }

    handleModalChange = (modalId) => {
        this.props.DOC_changeActiveModal({modalId});
    };

    onChangePage = (page) => {
        const {contructionDetails} = this.props;
        if (contructionDetails && contructionDetails.id) {
            let payload = {};
            payload.skip = (page - 1) * PAGINATION_ITEMS_PER_PAGE;
            payload.filter = `&contructionId=${contructionDetails.id}`;
            this.props.loadListContructionNote(payload);
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
            onConfirm: () => this.props.deleteAnContructionNote({id}),
        });
    };

    render() {
        const isAdmin = auth.isAnAdmin();
        const uploadRootURL = process.env.REACT_APP_STATIC_FILE_URL2;
        return (
            <ContructionNoteComponent {...this.props}
                isAdmin={isAdmin} uploadRootURL={uploadRootURL}
                loadEditingNote={this.loadEditingNote}
                handleDeleteClick={this.handleDeleteClick}
                onChangePage={this.onChangePage}
                handleModalChange={this.handleModalChange}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    notes:          getContructionNoteList(state),
    userId:         getUserId(state),
    pagination:     getContructionNotePaginationInfo(state),

    currentModalId: getDocCurrentModalId(state),
});


const mapDispatchToProps = (dispatch) => ({
    loadListContructionNote:      payload => dispatch(loadListContructionNote(payload)),
    loadEditingNoteAction:        payload => dispatch(loadEditingNoteAction(payload)),
    deleteAnContructionNote:      payload => dispatch(deleteAnContructionNote(payload)),

    openModalAction:              payload => dispatch(openModalAction(payload)),
    DOC_changeActiveModal:        payload => dispatch(DOC_changeActiveModal(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps) (ContructionNote);