import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {formValueSelector} from "redux-form";

import VentilationComponent from "../../../components/QuoteDetail/OtherAccessories/Ventilation";
import {QUOTES_BUILDING_DETAIL_FORM_NAME} from "../../../constants";
import {PREDEFINED_VENTILATION_MATERIAL_LIST} from "../../../../../constants";

class Ventilation extends Component {

    componentDidUpdate(prevProps) {
        const {
            changeFieldValue, roofColors0, ventilationIsColorCopied
        } = this.props;

        const {
            roofColors0: oldRoofColor0,
            ventilationIsColorCopied: oldVentilationIsColorCopied
        } = prevProps;

        if (ventilationIsColorCopied) {
            if (ventilationIsColorCopied !== oldVentilationIsColorCopied || roofColors0 !== oldRoofColor0){
                changeFieldValue('ventilationColor', roofColors0);
            }
        }
    }

    handleQtyInput = (event) => {
        const regExp = /^0[0-9].*$/;
        if (regExp.test(event.target.value)) {
            const number = Number(event.target.value);
            this.props.changeFieldValue('ventilationQty', number);
        }
    };

    handleVentilationProfileChange = (event) => {
        const ventilationId = event.target.value;
        const {changeFieldValue, ventilationColor} = this.props;
        changeFieldValue('ventilationMaterial', ventilationId);

        if(PREDEFINED_VENTILATION_MATERIAL_LIST.find(v => v.id === ventilationId)){
            if(PREDEFINED_VENTILATION_MATERIAL_LIST.find(v => v.id === ventilationId).name.includes("Zincalume")) {
                changeFieldValue('ventilationColor', '#C0C0C0');
                changeFieldValue('ventilationIsColorCopied', 0);
            }
            // else if(ventilationColor === '#C0C0C0') {
            //     changeFieldValue('ventilationColor', '#E4E4E4'); //change to Surfmist if profile is reselected
            // }
        }
    };

    render() {
        return (
            <VentilationComponent {...this.props}
                                  handleVentilationProfileChange={this.handleVentilationProfileChange}
                                  handleQtyInput={this.handleQtyInput}
            />
        );
    }
}

Ventilation.propTypes = {
    changeFieldValue: PropTypes.func,
};

const formSelector = formValueSelector(QUOTES_BUILDING_DETAIL_FORM_NAME);
const mapStateToProps = (state) => ({
    ventilationMaterial:    formSelector(state, "ventilationMaterial"),
    ventilationColor:       formSelector(state, "ventilationColor"),
    ventilationIsColorCopied:    formSelector(state, "ventilationIsColorCopied"),
    roofColors0:            formSelector(state, "roofs[0].color")
});

export default connect(mapStateToProps, {})(Ventilation);