import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import memoize from "memoize-one";
import isEmpty from "lodash/isEmpty";
import {formValueSelector} from "redux-form";

import RainwaterComponent from "../../../components/QuoteDetail/BuildingColour/Rainwater";
import {QUOTES_BUILDING_DETAIL_FORM_NAME, QUOTES_DOOR_KITS} from "../../../constants";
import {getQDClientDetail} from "../../../selectors";
import {
    PREDEFINED_DOWNPIPE_LIST,
    PREDEFINED_DOWNPIPE_LIST_BY_STATE,
    PREDEFINED_LYSAGHT_GUTTER_LIST,
    PREDEFINED_LYSAGHT_GUTTER_LIST_BY_STATE,
    PREDEFINED_STRAMIT_GUTTER_LIST,
    PREDEFINED_STRAMIT_GUTTER_LIST_BY_STATE,
    STRAMIT
} from "../../../../../constants";

class Rainwater extends Component {
    /**
     * Handle copy colour from wall and roof
     *
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
        const {
            wallColors0, roofColors0, rwIsGutters, rwIsDownpipes, rwIsGuttersCopied, rwIsDownpipesCopied
        } = nextProps;
        const {
            changeFieldValue, wallColors0: oldWallColor0, roofColors0: oldRoofColor0,
            rwIsGuttersCopied: OldRwIsGuttersCopied,
            rwIsDownpipesCopied: OldRwIsDownpipesCopied
        } = this.props;
        if (rwIsGutters && rwIsGuttersCopied) {
            if (rwIsGuttersCopied !== OldRwIsGuttersCopied || roofColors0 !== oldRoofColor0){
                changeFieldValue('rwGuttersColor', roofColors0);
            }
        }
        if (rwIsDownpipes && rwIsDownpipesCopied) {
            if (rwIsDownpipesCopied !== OldRwIsDownpipesCopied || wallColors0 !== oldWallColor0){
                changeFieldValue('rwDownpipesColor', wallColors0);
            }
        }
    }

    /**
     * Get Gutter Profile list based on the client's address state.
     *  - Note: We use a memoization helper so that the data is only re-computed when the clientDetail changes
     */
    gutterProfileList = memoize(
        (clientDetail) => {
            const {rollFormSupply} = this.props;
            let gutterList = (rollFormSupply === STRAMIT) ? PREDEFINED_STRAMIT_GUTTER_LIST : PREDEFINED_LYSAGHT_GUTTER_LIST;
            let gutterListByState = (rollFormSupply === STRAMIT) ? 
                                    PREDEFINED_STRAMIT_GUTTER_LIST_BY_STATE :
                                    PREDEFINED_LYSAGHT_GUTTER_LIST_BY_STATE;
            if (isEmpty(clientDetail))
                return gutterList;

            const {addressState} = clientDetail;
            switch (addressState) {
                case 'NSW':
                case 'QLD':
                    const profileIds = gutterListByState[addressState];
                    if (profileIds)
                        return profileIds.map(id => gutterList.find(item => item.id === id));
                    else
                        return gutterList;
                default:
                    return gutterList;
            }
        }
    );

    /**
     * Get Downpipe Profile list based on the client's address state.
     *  - Note: We use a memoization helper so that the data is only re-computed when the clientDetail changes
     */
    downpipeProfileList = memoize(
        (clientDetail) => {
            if (isEmpty(clientDetail))
                return PREDEFINED_DOWNPIPE_LIST;

            const {addressState} = clientDetail;
            switch (addressState) {
                case 'NSW':
                case 'QLD':
                    const profileIds = PREDEFINED_DOWNPIPE_LIST_BY_STATE[addressState];
                    if (profileIds)
                        return profileIds.map(id => PREDEFINED_DOWNPIPE_LIST.find(item => item.id === id));
                    else
                        return PREDEFINED_DOWNPIPE_LIST;
                default:
                    return PREDEFINED_DOWNPIPE_LIST;
            }
        }
    );

    handleDownpipeTypeChange = (event) => {
        const downpipeId = event.target.value;
        const {changeFieldValue} = this.props;
        changeFieldValue('rwDownpipeId', downpipeId);
    };

    render() {
        const gutterList = this.gutterProfileList(this.props.clientDetail);
        const downpipeList = this.downpipeProfileList(this.props.clientDetail);
        return (
            <RainwaterComponent {...this.props} gutterList={gutterList} downpipeList={downpipeList}
                                handleDownpipeTypeChange={this.handleDownpipeTypeChange}
            />
        );
    }
}

Rainwater.propTypes = {
    changeFieldValue: PropTypes.func,
    wallColors0: PropTypes.string,
    roofColors0: PropTypes.string
};

const formSelector = formValueSelector(QUOTES_BUILDING_DETAIL_FORM_NAME);
const mapStateToProps = (state) => ({
    rwIsGutters:        formSelector(state, "rwIsGutters"),
    rwIsGuttersCopied:  formSelector(state, "rwIsGuttersCopied"),
    rwIsDownpipes:      formSelector(state, "rwIsDownpipes"),
    rwIsDownpipesCopied:    formSelector(state, "rwIsDownpipesCopied"),
    rwDownpipeId:       formSelector(state, "rwDownpipeId"),
    clientDetail:       getQDClientDetail(state),
    rollFormSupply:     formSelector(state, "rollFormSupply")
});

export default connect(mapStateToProps, {})(Rainwater);