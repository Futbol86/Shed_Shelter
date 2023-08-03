import React, {Component} from "react";
import {connect} from "react-redux";

import CommonFooterSectionComponent from "../../components/QuoteDetail/CommonFooterSection";
import {formValueSelector} from "redux-form";
import {QUOTES_BUILDING_DETAIL_FORM_NAME} from "../../constants";
import {getDealerInfo, getUserId, getUserAccessModules} from "../../../users/selectors";
import {loadProfileAction} from "../../../users/actions";
import {getQDSendingOrders} from "../../selectors";

class CommonFooterSection extends Component {
    componentDidMount() {
        if (!this.props.dealerInfo)
            this.props.loadProfileAction({id: this.props.userId});
    }

    handleModalChange = (modalId) => {
        this.props.DOC_changeActiveModal({modalId});
    };

    render() {
        if (!this.props.tabKey)
            return null;

        return (
            <CommonFooterSectionComponent {...this.props} handleModalChange={this.handleModalChange}
                                          handleDownloadClick={this.props.handleDownloadClick}
            />
        );
    }

}

const formSelector = formValueSelector(QUOTES_BUILDING_DETAIL_FORM_NAME);
const mapStateToProps = (state) => ({
    userId:         getUserId(state),
    userAccessModules:  getUserAccessModules(state),
    dealerInfo:     getDealerInfo(state),
    exportedPdfId:  formSelector(state, "exportedPdf"),
    sendingOrders:  getQDSendingOrders(state)
});

const mapDispatchToProps = (dispatch) => (
    {
        loadProfileAction:      payload => dispatch(loadProfileAction(payload)),
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(CommonFooterSection);