import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {formValueSelector} from "redux-form";

import VerminComponent from "../../../components/QuoteDetail/OtherAccessories/Vermin";
import {QUOTES_BUILDING_DETAIL_FORM_NAME} from "../../../constants";

class Vermin extends Component {
    componentDidUpdate(prevProps) {
        const {
            changeFieldValue, wallColors0, verminIsColorCopied
        } = this.props;

        const {
            wallColors0: oldWallColor0,
            verminIsColorCopied: OldVerminIsColorCopied
        } = prevProps;

        if (verminIsColorCopied) {
            if (verminIsColorCopied !== OldVerminIsColorCopied || wallColors0 !== oldWallColor0){
                changeFieldValue('verminColor', wallColors0);
            }
        }
    }

    handleQtyInput = (event) => {
        const regExp = /^0[0-9].*$/;
        if (regExp.test(event.target.value)) {
            const number = Number(event.target.value);
            this.props.changeFieldValue('verminQty', number);
        }
    };

    render() {
        return (
            <VerminComponent {...this.props} handleQtyInput={this.handleQtyInput} />
        );
    }
}

Vermin.propTypes = {
    changeFieldValue: PropTypes.func,
};

const formSelector = formValueSelector(QUOTES_BUILDING_DETAIL_FORM_NAME);
const mapStateToProps = (state) => ({
    verminIsColorCopied:    formSelector(state, "verminIsColorCopied"),
    wallColors0:            formSelector(state, "walls[0].color")
});

export default connect(mapStateToProps, {})(Vermin);