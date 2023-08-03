import React, { Component } from 'react';
import { connect } from 'react-redux';
import { change, formValueSelector, reduxForm, getFormValues } from 'redux-form';
import FindUsComponent from "../../../components/QuoteDetail/Administration/FindUsModal";
import { QD_updateBuildingDetail } from '../../../actions';
import { getQDBuildingDetailId } from '../../../selectors';
import {
    QUOTES_BUILDING_DETAIL_FORM_NAME,
    QUOTES_AD_FIND_US_FORM_NAME
} from "../../../constants";

class FindUsModal extends Component {
    componentDidMount() {
        const {savedFindUs} = this.props;

        //console.log('savedFindUs', savedFindUs);
        this.props.initialize(savedFindUs);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const { findUs, changeFieldValue, handleModalClose } = this.props;

        changeFieldValue(`findUs`, findUs);

        //Auto save
        this.props.QD_updateBuildingDetail({
            id: this.props.buildingId,
            findUs
        });

        handleModalClose();
    }

    render() {
        return <FindUsComponent {...this.props} handleSubmit={this.handleSubmit}/>;
    }
}

const formSelector = formValueSelector(QUOTES_BUILDING_DETAIL_FORM_NAME);
const mapStateToProps = (state) => ({
    findUs:         getFormValues(QUOTES_AD_FIND_US_FORM_NAME)(state),
    savedFindUs:    formSelector(state, 'findUs'),
    buildingId:     getQDBuildingDetailId(state)
});

const mapDispatchToProps = (dispatch) => ({
    changeFieldValue: function (field, value) {
        dispatch(change(QUOTES_BUILDING_DETAIL_FORM_NAME, field, value))
    },

    QD_updateBuildingDetail:       payload => dispatch(QD_updateBuildingDetail(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: QUOTES_AD_FIND_US_FORM_NAME
    })(FindUsModal)
);