import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import FootingsComponent from "../../../components/QuoteDetail/BuildingDetail/Footings";
import {formValueSelector} from "redux-form";
import {QUOTES_BUILDING_DETAIL_FORM_NAME, FOOTING_TYPES} from "../../../constants";

class Footings extends Component {
    /**
     * Handle Piers Only
     *
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
    }

    handleFootingTypeChange = (event) => {
        let footingType = Number(event.target.value);
        let isPierOnly = footingType === FOOTING_TYPES.PIERS_ONLY;
        const {bays, annexeLeft, annexeRight} = this.props;
        const {changeFieldValue} = this.props;
        if (bays && bays.length) {
            for (let bayIndex = 0; bayIndex < bays.length; bayIndex++) {
                let bay = bays[bayIndex];
                let fieldName = `bays[${bayIndex}].isP1`;
                changeFieldValue(fieldName, isPierOnly);
                fieldName = `bays[${bayIndex}].isP3`;
                changeFieldValue(fieldName, isPierOnly);

                if (bayIndex === bays.length - 1) {
                    fieldName = `bays[${bayIndex}].isP6`;
                    changeFieldValue(fieldName, isPierOnly);

                    fieldName = `bays[${bayIndex}].isP8`;
                    changeFieldValue(fieldName, isPierOnly);
                }

                fieldName = `bays[${bayIndex}].isAnnexeP1`;
                changeFieldValue(fieldName, isPierOnly);
                
                fieldName = `bays[${bayIndex}].isAnnexeP3`;
                changeFieldValue(fieldName, isPierOnly);

                fieldName = `bays[${bayIndex}].isAnnexeP6`;
                changeFieldValue(fieldName, isPierOnly);

                fieldName = `bays[${bayIndex}].isAnnexeP8`;
                changeFieldValue(fieldName, isPierOnly);

                fieldName = `bays[${bayIndex}].isFullSlab`;
                changeFieldValue(fieldName, !isPierOnly);

                fieldName = `bays[${bayIndex}].isLeftAnnexeFullSlab`;
                changeFieldValue(fieldName, !isPierOnly);

                fieldName = `bays[${bayIndex}].isRightAnnexeFullSlab`;
                changeFieldValue(fieldName, !isPierOnly);
            }
        }

        if (isPierOnly) {
            changeFieldValue('footingsFullSlab1', 0);
            changeFieldValue('footingsFullSlab2', 0);
        } else {
            changeFieldValue('footingsFullSlab1', '100mm');
            changeFieldValue('footingsFullSlab2', 'F72');
        }
    }

    render() {
        let footingType = Number(this.props.footingsPiers);
        let isPierOnly = footingType === FOOTING_TYPES.PIERS_ONLY;
        return (
            <FootingsComponent {...this.props}
                isPierOnly = {isPierOnly}
                handleFootingTypeChange = {this.handleFootingTypeChange}
            />
        );
    }
}

Footings.propTypes = {
    changeFieldValue: PropTypes.func
};

const formSelector = formValueSelector(QUOTES_BUILDING_DETAIL_FORM_NAME);
const mapStateToProps = (state) => ({
    footingsPiers:      formSelector(state, "footingsPiers"),
    footingsSoilType:   formSelector(state, "footingsSoilType"),
    annexeLeft:         formSelector(state, "annexeLeft"),
    annexeRight:        formSelector(state, "annexeRight"),
    bays:               formSelector(state, "bays"),
});

export default connect(mapStateToProps, {})(Footings);