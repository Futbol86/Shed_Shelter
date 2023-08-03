import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import EngineeringRangeComponent from "../../../components/QuoteDetail/BuildingDetail/EngineeringRange";
import {formValueSelector} from "redux-form";
import {QUOTES_BUILDING_DETAIL_FORM_NAME} from "../../../constants";
import {PREDEFINED_ENGINEERING_CLASSES} from "../../../../../constants";
import isEmpty from "lodash/isEmpty";

class EngineeringRange extends Component {
    /**
     * Handle change of engineerClass
     *
     * @param nextProps
     */
    componentDidUpdate(prevProps) {
        if (this.props.engineerClass && this.props.engineerClass !== prevProps.engineerClass) {
            this.props.changeFieldValue("engineerBuildingPurpose", this.props.engineerClass);
            const engineerClass = PREDEFINED_ENGINEERING_CLASSES.find(item => item.id === this.props.engineerClass);
            if (!isEmpty(engineerClass))
                this.props.changeFieldValue("regionImportanceLevel", engineerClass.importantLevel);
        }
    }

    render() {
        return (
            <EngineeringRangeComponent {...this.props} />
        );
    }
}

EngineeringRange.propTypes = {
    changeFieldValue: PropTypes.func
};

const formSelector = formValueSelector(QUOTES_BUILDING_DETAIL_FORM_NAME);
const mapStateToProps = (state) => ({
    engineerClass:   formSelector(state, "engineerClass")
});

export default connect(mapStateToProps, {})(EngineeringRange);