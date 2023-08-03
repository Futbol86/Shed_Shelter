import React, {Component} from 'react';
import {reduxForm} from "redux-form";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from "lodash/isEmpty";

import BraceModuleComponent from "../../../components/QuoteDetail/BuildingDetail/BraceModule";
import {formValueSelector} from "redux-form";
import {QUOTES_BUILDING_DETAIL_FORM_NAME} from "../../../constants";
import {PREDEFINED_BRACE_SELECTION, STRAMIT_PREDEFINED_BRACE_SELECTION, STRAMIT} from "../../../../../constants";

class BraceModule extends Component {
    /*componentDidMount() {
        let {buildingSpan, buildingSlope, buildingHeight} = this.props;
        let averageHeight=buildingHeight+buildingSpan/4*Math.tan(buildingSlope/180*Math.PI);
        console.log('averageHeight', buildingSpan, buildingSlope, averageHeight);
        this.props.initialize({ averageHeight: averageHeight });
    }*/
    /**
     * Handle Piers Only
     *
     * @param nextProps
     */
    componentDidUpdate(prevProps) {
        if (prevProps.selectedEwBrace !== this.props.selectedEwBrace){
            const selectedBrace = PREDEFINED_BRACE_SELECTION.find(item => item.id === this.props.selectedEwBrace);
            if (selectedBrace)
                this.props.changeFieldValue("ewBraceStrength", selectedBrace.strength);
        }
        if (prevProps.selectedSwBrace !== this.props.selectedSwBrace){
            const selectedBrace = PREDEFINED_BRACE_SELECTION.find(item => item.id === this.props.selectedSwBrace);
            if (selectedBrace)
                this.props.changeFieldValue("swBraceStrength", selectedBrace.strength);
        }

        if (prevProps.buildingHeight !== this.props.buildingHeight){
            let {buildingSpan, buildingSlope, buildingHeight} = this.props;
            let averageHeight= Math.ceil(buildingHeight+buildingSpan/4*Math.tan(buildingSlope/180*Math.PI));
            this.props.changeFieldValue("averageHeight", averageHeight);
        }
    }



    render() {
        let braceWidths = [];
        if (!isEmpty(this.props.bays)){
            const allWidths = this.props.bays.map(item => item.actualSize);
            braceWidths = [...new Set(allWidths)];
        }

        let braceSelection = (this.props.rollFormSupply === STRAMIT)
                ? STRAMIT_PREDEFINED_BRACE_SELECTION : PREDEFINED_BRACE_SELECTION;
        return (
            <BraceModuleComponent {...this.props} braceWidths={braceWidths}
                        braceSelection={braceSelection}
            />
        );
    }
}

BraceModule.propTypes = {
    changeFieldValue: PropTypes.func
};

const formSelector = formValueSelector(QUOTES_BUILDING_DETAIL_FORM_NAME);
const mapStateToProps = (state) => ({
    selectedEwBrace:   formSelector(state, "ewBraceSelection"),
    selectedSwBrace:   formSelector(state, "swBraceSelection"),
    bays:              formSelector(state, "bays"),
    buildingSpan:      formSelector(state, "buildingSpan"),
    buildingSlope:     formSelector(state, "buildingSlope"),
    buildingHeight:    formSelector(state, "buildingHeight"),
    rollFormSupply:    formSelector(state, "rollFormSupply"),
});

export default connect(mapStateToProps, {})(BraceModule);