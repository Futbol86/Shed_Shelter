import React, {Component} from 'react';
import {connect} from 'react-redux';
import {formValueSelector} from "redux-form";
import {loadListContructionDataEntry} from '../../actions';
import {DOC_changeActiveModal} from "../../../documents/actions";
import {CONTRUCTION_DETAIL_FORM_NAME} from "../../constants";
import {getDocCurrentModalId} from "../../../documents/selectors";
import {getContructionDataEntryList} from "../../selectors";

import ContructionChainMemberComponent from "../../components/Contruction/ContructionChainMember";

class ContructionChainMember extends Component {
    componentDidMount(){
        const { quoteId } = this.props;
        if (quoteId) {
            this.props.loadListContructionDataEntry({limit: 1000});
        }
    }

    handleModalChange = (modalId) => {
        this.props.DOC_changeActiveModal({modalId});
    }

    handleModalClose = () => {
        this.handleModalChange(0);
    }

    render() {
        return (
            <ContructionChainMemberComponent {...this.props}
                handleModalChange={this.handleModalChange}
                handleModalClose={this.handleModalClose}
            />
        );
    }
}

const formSelector = formValueSelector(CONTRUCTION_DETAIL_FORM_NAME);
const mapStateToProps = (state) => ({
    contructionDataEntries:      getContructionDataEntryList(state),
    contructionMembers:          formSelector(state, "contructionMembers"),
    selectedContructionMemberId:     formSelector(state, "selectedContructionMemberId"),
    currentModalId:         getDocCurrentModalId(state)
});

const mapDispatchToProps = (dispatch) => ({
    loadListContructionDataEntry:     payload => dispatch(loadListContructionDataEntry(payload)),
    DOC_changeActiveModal:            payload => dispatch(DOC_changeActiveModal(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContructionChainMember);