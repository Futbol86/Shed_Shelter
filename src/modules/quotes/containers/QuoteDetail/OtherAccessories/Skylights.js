import React, {Component} from 'react';
import SkylightsComponent from "../../../components/QuoteDetail/OtherAccessories/Skylights";
import {PREDEFINED_ACCESSORIES_MATERIAL_LIST, PREDEFINED_BUILDING_PROFILES} from "../../../../../constants";
import isEmpty from "lodash/isEmpty";
import {connect} from 'react-redux';
import memoize from "memoize-one";


import {QD_OA_changeSkylightColorList} from "../../../actions";
import {getQDOASkylightColors} from "../../../selectors";
import {formValueSelector} from "redux-form";
import {QUOTES_BUILDING_DETAIL_FORM_NAME} from "../../../constants";

class Skylights extends Component {

    componentDidMount() {
        if (!isEmpty(this.props.skylightMaterial)){
            const skylightMaterial = PREDEFINED_ACCESSORIES_MATERIAL_LIST.find(item => item.id === this.props.skylightMaterial);
            if (!isEmpty(skylightMaterial)) {
                const skylightColors = skylightMaterial.colors;
                this.props.QD_OA_changeSkylightColorList({skylightColors});
            }
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.skylightMaterial && this.props.skylightMaterial !== prevProps.skylightMaterial) {
            const skylightMaterial = PREDEFINED_ACCESSORIES_MATERIAL_LIST.find(item => item.id === this.props.skylightMaterial);
            if (!isEmpty(skylightMaterial)) {
                const skylightColors = skylightMaterial.colors;
                this.props.changeFieldValue("skylightColor", skylightColors[0].color);
                this.props.QD_OA_changeSkylightColorList({skylightColors});
            }
            else
                this.props.QD_OA_changeSkylightColorList({skylightColors: []});
        }
    }

    setMaxSelectableSkylight = () => {
        const {skylightGarageRoofs} = this.props;
        let countMaxSelectableSkylight = 0;
        if(skylightGarageRoofs) {
            for (let row = 0; row < skylightGarageRoofs.length; row++) {
                if (skylightGarageRoofs[row])
                    for (let part = 0; part < skylightGarageRoofs[row].length; part++) {
                        if(skylightGarageRoofs[row][part] && skylightGarageRoofs[row][part].items) {
                            countMaxSelectableSkylight = countMaxSelectableSkylight
                                + Math.floor((skylightGarageRoofs[row][part].items.length - 1) / 2);
                        }
                    }
            }
        }
        return countMaxSelectableSkylight;
    };

    /**
     * Get material profile list, but use Memoize so that it always render once since the roofProfileId is not changed within this component
     */
    getMaterialProfileList = memoize(
        (roofProfileId) => {
            // console.log('Memoize called: ', roofProfileId);
            if (roofProfileId) {
                const roofProfile = PREDEFINED_BUILDING_PROFILES.roofs.find(profile => profile.id === roofProfileId);
                if (roofProfile) {
                    const profileNameShort = roofProfile.description.toLowerCase().substring(0, 4);
                    if ((profileNameShort === 'trim') || (profileNameShort === 'corr'))
                        return PREDEFINED_ACCESSORIES_MATERIAL_LIST.filter(item => item.profileShort === profileNameShort);
                }
            }
            return PREDEFINED_ACCESSORIES_MATERIAL_LIST;
        }
    );

    render() {
        const {buildingLength, changeFieldValue, skylightGarageRoofs, skylightColorOptions, roofProfileId, productCategoryId} = this.props;
        const materialProfileList = this.getMaterialProfileList(roofProfileId);

        return (
            <SkylightsComponent buildingLength={buildingLength}
                                changeFieldValue={changeFieldValue}
                                skylightGarageRoofs={skylightGarageRoofs}
                                maxSelectableSkylight={this.setMaxSelectableSkylight()}
                                skylightColorOptions={skylightColorOptions}
                                materialProfileList={materialProfileList}
                                productCategoryId={productCategoryId}
            />
        );
    }
}

const formSelector = formValueSelector(QUOTES_BUILDING_DETAIL_FORM_NAME);
const mapStateToProps = (state) => ({
    skylightColorOptions:   getQDOASkylightColors(state),
    skylightMaterial:       formSelector(state, "skylightMaterial"),
    roofProfileId:          formSelector(state, "roofs[0].profileId")

});
export default connect(mapStateToProps, {QD_OA_changeSkylightColorList})(Skylights);