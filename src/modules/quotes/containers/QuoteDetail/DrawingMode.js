import React, {Component} from "react";
import {connect} from "react-redux";
import DrawingModeComponent from "../../components/QuoteDetail/DrawingMode";
import {getQDDMCurrentButtonId, getQDDMCurrentModalId} from "../../selectors";
import {QD_DM_changeDrawButton, QD_DM_changeModal, QD_DM_setActiveBayComponent} from '../../actions';
import {formValueSelector, getFormValues, reduxForm} from "redux-form";
import {
    QUOTES_BUILDING_DETAIL_FORM_NAME,
    QUOTES_DRAWING_MODE_FORM_NAME,
    WALL_STATUS_HAS_WALL,
    WALL_LEFT_INDEX,
    WALL_RIGHT_INDEX,
    DRAW_MODE_BUTTON_IDS
} from "../../constants";
import isEmpty from "lodash/isEmpty";
import { PRODUCT_TYPES, PRODUCT_CATEGORY_SKILLION_CARPORTS, PRODUCT_CATEGORY_SKILLION_SHEDS } from "../../../../constants";

class DrawingMode extends Component {
    componentDidMount() {
        const {bays} = this.props;
        if (bays) {
            for (let bayIndex = 0; bayIndex < bays.length - 1; bayIndex++){
                const bay = bays[bayIndex];
                const nextBay = bays[bayIndex + 1];
                if(bay){
                    if((bay.partitionRightStatus === WALL_STATUS_HAS_WALL) ||
                        (bay.hasLeftAnnexe && bay.leftAnnexeP3 === WALL_STATUS_HAS_WALL) ||
                        (bay.hasRightAnnexe && bay.rightAnnexeP3 === WALL_STATUS_HAS_WALL) ||
                        (nextBay && nextBay.hasLeftAnnexe && nextBay.leftAnnexeP1 === WALL_STATUS_HAS_WALL) ||
                        (nextBay && nextBay.hasRightAnnexe && nextBay.rightAnnexeP1 === WALL_STATUS_HAS_WALL)
                    ) {
                        let initialValues = {
                            bayPartionWall: (bayIndex + 2) * 10 + Number(WALL_RIGHT_INDEX)
                        }
                        this.props.initialize(initialValues);
                        break;
                    }
                }
            }
        }
    };

    handleDrawingButtonClick = (buttonId) => {
        this.props.QD_DM_changeDrawButton({buttonId});
    };

    handleModalChange = (componentId) => {
        this.props.QD_DM_changeModal({componentId});
        //-- If the modal is close, also set activeBayComponent to null
        if (componentId === 0) {
            this.props.QD_DM_setActiveBayComponent({bayComponentIndex: null});
        }
    };

    handleBayComponentEditClick = ({bayIndex, annexeIndex, component}) => {
        if (bayIndex >=0 && component) {
            this.props.QD_DM_setActiveBayComponent({bayComponentIndex: {bayIndex, annexeIndex, component}});
        }
    };

    initialOptions(buildingDetails) {
        let partitionWalls = [];
        let sideWalls = [];
        let isSkillionRoof = false;
        if (buildingDetails) {
            const {bays, isAnnexeLeft, isAnnexeRight, annexeLeft, annexeRight} = buildingDetails;
            if (bays) {
                for (let bayIndex = 0; bayIndex < bays.length - 1; bayIndex++){
                    const bay = bays[bayIndex];
                    const nextBay = bays[bayIndex + 1];
                    if(bay){
                        if((bay.partitionRightStatus === WALL_STATUS_HAS_WALL) ||
                            (bay.hasLeftAnnexe && bay.leftAnnexeP3 === WALL_STATUS_HAS_WALL) ||
                            (bay.hasRightAnnexe && bay.rightAnnexeP3 === WALL_STATUS_HAS_WALL) ||
                            (nextBay && nextBay.hasLeftAnnexe && nextBay.leftAnnexeP1 === WALL_STATUS_HAS_WALL) ||
                            (nextBay && nextBay.hasRightAnnexe && nextBay.rightAnnexeP1 === WALL_STATUS_HAS_WALL)
                        ) {
                            partitionWalls.push({
                                bayIndex: bayIndex,
                                wallIndex: WALL_RIGHT_INDEX    
                            });
                        }
                    }
                }
            }

            const hasLeftAwning = isAnnexeLeft && !isEmpty(annexeLeft);
            const hasRightAwning = isAnnexeRight && !isEmpty(annexeRight);

            sideWalls.push({
                grid: "A",
                buttonId: hasLeftAwning ? DRAW_MODE_BUTTON_IDS.LEFT_AWNING_SIDE_WALL : DRAW_MODE_BUTTON_IDS.TOP_SIDE_WALL
            });

            sideWalls.push({
                grid: "B",
                buttonId: hasLeftAwning ? DRAW_MODE_BUTTON_IDS.TOP_SIDE_WALL : DRAW_MODE_BUTTON_IDS.BOTTOM_SIDE_WALL
            });

            if (hasLeftAwning) {
                sideWalls.push({
                    grid: "C",
                    buttonId: DRAW_MODE_BUTTON_IDS.BOTTOM_SIDE_WALL
                });

                if (hasRightAwning) {
                    sideWalls.push({
                        grid: "D",
                        buttonId: DRAW_MODE_BUTTON_IDS.RIGHT_AWNING_SIDE_WALL
                    });
                }
            } else if (hasRightAwning) {
                sideWalls.push({
                    grid: "C",
                    buttonId: DRAW_MODE_BUTTON_IDS.RIGHT_AWNING_SIDE_WALL
                });
            }

            const currentProduct = PRODUCT_TYPES.find(item => item.id === parseInt(buildingDetails.productId));
            isSkillionRoof = (currentProduct && (currentProduct.categoryId === PRODUCT_CATEGORY_SKILLION_CARPORTS
                || currentProduct.categoryId === PRODUCT_CATEGORY_SKILLION_SHEDS));
        }
        return {
            partitionWalls,
            sideWalls,
            isSkillionRoof
        }
    };

    render() {
        const {partitionWalls, sideWalls, isSkillionRoof} = this.initialOptions(this.props.buildingDetails);
        return (
            <DrawingModeComponent {...this.props}
                                  partitionWalls={partitionWalls} sideWalls={sideWalls}
                                  isSkillionRoof={isSkillionRoof}
                                  handleDrawingButtonClick={this.handleDrawingButtonClick}
                                  handleModalChange={this.handleModalChange}
                                  handleBayComponentEditClick={this.handleBayComponentEditClick}
            />
        );
    }
}
const formSelector = formValueSelector(QUOTES_BUILDING_DETAIL_FORM_NAME);
const drawingModeFormSelector = formValueSelector(QUOTES_DRAWING_MODE_FORM_NAME);
const mapStateToProps = (state) => ({
    buildingDetails:   getFormValues(QUOTES_BUILDING_DETAIL_FORM_NAME)(state),
    bays:     formSelector(state, "bays"),
    currentButtonId: getQDDMCurrentButtonId(state),
    currentModalId: getQDDMCurrentModalId(state),
    bayPartionWall: drawingModeFormSelector(state, "bayPartionWall")
});

export default connect(mapStateToProps,{QD_DM_changeDrawButton, QD_DM_changeModal, QD_DM_setActiveBayComponent})(
    reduxForm({
        form: QUOTES_DRAWING_MODE_FORM_NAME
    })(DrawingMode)
);