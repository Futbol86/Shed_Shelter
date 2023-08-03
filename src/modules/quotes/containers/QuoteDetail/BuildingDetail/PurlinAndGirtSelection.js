import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import PurlinAndGirtSelectionComponent from "../../../components/QuoteDetail/BuildingDetail/PurlinAndGirtSelection";
import {formValueSelector} from "redux-form";
import {QUOTES_BUILDING_DETAIL_FORM_NAME} from "../../../constants";

class PurlinAndGirtSelection extends Component {
    /**
     * Handle change of engineerClass
     *
     * @param nextProps
     */
    componentDidUpdate(prevProps) {
        if (this.props.purlinAndGirtType && this.props.purlinAndGirtType !== prevProps.purlinAndGirtType) {
            // this.props.changeFieldValue("engineerBuildingPurpose", this.props.engineerClass);
        }
    }

    render() {
        return (
            <PurlinAndGirtSelectionComponent {...this.props} />
        );
    }
}

PurlinAndGirtSelection.propTypes = {
    changeFieldValue: PropTypes.func
};

const formSelector = formValueSelector(QUOTES_BUILDING_DETAIL_FORM_NAME);
const mapStateToProps = (state) => ({
    purlinAndGirtType:   formSelector(state, "purlinAndGirtType")
});

export default connect(mapStateToProps, {})(PurlinAndGirtSelection);