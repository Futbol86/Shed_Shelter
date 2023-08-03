import React, {Component} from 'react';
import {connect} from 'react-redux';
import {formValueSelector} from "redux-form";

import BuildingColourComponent from "../../components/QuoteDetail/BuildingColour";
import {QUOTES_BUILDING_DETAIL_FORM_NAME} from "../../constants";

class BuildingColour extends Component {
    render() {

        return (
            <BuildingColourComponent {...this.props} />
        );
    }
}

const formSelector = formValueSelector(QUOTES_BUILDING_DETAIL_FORM_NAME);
const mapStateToProps = (state) => ({
    wallProfiles0:  formSelector(state, "walls[0].profileId"),
    wallColors0:    formSelector(state, "walls[0].color"),
    roofProfiles0:  formSelector(state, "roofs[0].profileId"),
    roofColors0:    formSelector(state, "roofs[0].color")
});


export default connect(mapStateToProps, null)(BuildingColour);