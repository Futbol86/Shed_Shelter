import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import BayConfigBayListComponent from "../../../components/QuoteDetail/BuildingDetail/BayConfigBayList";
import {formValueSelector} from "redux-form";
import {QUOTES_BUILDING_DETAIL_FORM_NAME} from "../../../constants";

class BayConfigBayList extends Component {
    /**
     * Handler to update all bay's length when a bay size is changed.
     *  - (1) Will not do any change if value is not valid (in range minBayLength - maxBayLength
     *  - (2) Will not do any change if current field is locked
     *  - (3) Will not do any change if there is no available un-locked bays
     *  - (4) If the current bay is the only mutable / unlocked bay --> Update its value to the valid one
     *  - NOTE: Still update other bays if they does not satisfy min-max length. Errors will highlight them.
     *
     * @param event
     */
    handleBaySizeChange = (event, newValue) => {
        const {bays, buildingLength, minBayLength, maxBayLength, changeFieldValue} = this.props;
        const value = Number(newValue);
        const name = event.target.name;
        if (value >= minBayLength && value <= maxBayLength) {               //-- (1)
            let matches = /\[(\d+)\]/.exec(name);
            if (matches && matches[1]) {
                const index = Number(matches[1]);
                if (bays && bays.length > 0 && (!bays[index].isLocked)) {   //-- (2)
                    const totalBayLength = bays.reduce((acc, curr) => acc + Number(curr.actualSize), 0);
                    if (totalBayLength !== buildingLength) {
                        const numMutableBays = bays.length - bays.reduce((acc, curr) => (curr.isLocked) ? acc + 1 : acc, 0);
                        if (numMutableBays > 1) {                           //-- (3)
                            //-- We can now change other bay length
                            let remainingTotalBayLength = buildingLength - value;
                            for (let i = 0; i < bays.length; i++)
                                if (bays[i].isLocked)
                                    remainingTotalBayLength -= Number(bays[i].actualSize);
                            if (remainingTotalBayLength >= 0) {
                                const eachValue = Math.ceil(remainingTotalBayLength / (numMutableBays - 1));
                                let numChanged = 0;
                                for (let i = 0; i < bays.length; i++){
                                    if ((!bays[i].isLocked) && (i !== index)) {
                                        const fieldName = `bays[${i}].actualSize`;
                                        if (numChanged >= numMutableBays - 2)
                                            changeFieldValue(fieldName, remainingTotalBayLength - (eachValue * numChanged));
                                        else
                                            changeFieldValue(fieldName, eachValue);
                                        numChanged++;
                                    }
                                }
                            }
                        } else if (numMutableBays === 1) {                          //-- (4)
                            event.preventDefault(); //-- Do not allow to continue onBlur default event
                            const newCurrentBayValue = buildingLength -
                                bays.reduce((acc, curr, idx) => (idx === index) ? acc :acc + Number(curr.actualSize), 0);
                            changeFieldValue(name, newCurrentBayValue);
                        }
                    }
                }
            }
        }
    };

    render() {

        return (
            <BayConfigBayListComponent {...this.props} handleBaySizeChange={this.handleBaySizeChange} />
        );
    }
}

BayConfigBayList.propTypes = {
    numberOfBays: PropTypes.number,
    minBayLength: PropTypes.number,
    maxBayLength: PropTypes.number,
};

const formSelector = formValueSelector(QUOTES_BUILDING_DETAIL_FORM_NAME);
const mapStateToProps = (state) => ({
    bays:     formSelector(state, "bays")
});

export default connect(mapStateToProps, {})(BayConfigBayList);