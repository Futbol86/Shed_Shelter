import React, {Component} from "react";
import {connect} from "react-redux";

import DeliverySummaryComponent from "../../components/QuoteDetail/DeliverySummary";
import {getQDClientDetail, getQDDSActiveModal, getQDDSEmNotes} from "../../selectors";
import {QD_DS_changeActiveModal} from '../../actions';
import {formValueSelector} from "redux-form";
import {QUOTES_BUILDING_DETAIL_FORM_NAME} from "../../constants";


class DeliverySummary extends Component {
    handleModalChange = (modalId) => {
        this.props.QD_DS_changeActiveModal({modalId});
    };

    componentDidUpdate(preProp) {
        if (this.props.emNotes && !preProp.emNotes) {
            this.props.changeFieldValue("emModRequired", 1);
        }
        else if (!this.props.emNotes && this.props.emNotes !== preProp.emNotes)
            this.props.changeFieldValue("emModRequired", 0);
    }

    render() {
        return (
            <DeliverySummaryComponent {...this.props}
                                      handleModalChange={this.handleModalChange}
                                      handleMapDrawing={this.handleMapDrawing}
                                      handleMapDrawingAlt={this.handleMapDrawingAlt}
            />
        );
    }
}

const formSelector = formValueSelector(QUOTES_BUILDING_DETAIL_FORM_NAME);
const mapStateToProps = (state) => ({
    clientDetail:       getQDClientDetail(state),
    activeModal:        getQDDSActiveModal(state),
    emNotes:            formSelector(state, 'emNotes')
});

export default connect(mapStateToProps, {QD_DS_changeActiveModal})(DeliverySummary);