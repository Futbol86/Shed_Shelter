import {connect} from 'react-redux';

import BayConfigBayListItemComponent from "../../../components/QuoteDetail/BuildingDetail/BayConfigBayListItem";
import {formValueSelector} from "redux-form";
import {QUOTES_BUILDING_DETAIL_FORM_NAME} from "../../../constants";

const formSelector = formValueSelector(QUOTES_BUILDING_DETAIL_FORM_NAME);
const mapStateToProps = (state, ownProps) => ({
    isLocked:     (formSelector(state, `${ownProps.bayId}.isLocked`)),
});

export default connect(mapStateToProps, {})(BayConfigBayListItemComponent);