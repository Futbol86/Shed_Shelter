import {QD_BD_OPEN_LIGHTBOX_ACTION, QD_BD_UPDATE_FRAME_SIZE_IMAGE, QD_BD_CHANGE_GRID} from '../actions';
import {PRODUCT_CATEGORY_SKILLION_CARPORTS, PRODUCT_CATEGORY_GABLE_CARPORTS} from "../../../constants";
import {BASE_PLATE_TYPE} from "../../quotes/constants";

const defaultState = {
    lightBoxIndex: 0,
    selectedFrameSizeImage: null
};

const buildingDetailReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case QD_BD_OPEN_LIGHTBOX_ACTION:
            return {
                ...state,
                lightBoxIndex: (+action.payload)
            };
        case QD_BD_UPDATE_FRAME_SIZE_IMAGE:
            let image = null, imageSrc = null;
            const {bracketId, selectedFrameSize, productCategoryId} = action.payload;
            if (productCategoryId === PRODUCT_CATEGORY_SKILLION_CARPORTS ||
                productCategoryId === PRODUCT_CATEGORY_GABLE_CARPORTS) {
                let frameSize = selectedFrameSize && selectedFrameSize.length >= 3 ?
                    selectedFrameSize.substring(0, 3) : "";
                if (+bracketId === BASE_PLATE_TYPE.CAST_IN_PLATE) {
                    imageSrc = `CBP${frameSize}A`;
                } else if (+bracketId === BASE_PLATE_TYPE.ON_SLAB_CHEMICAL ||
                    +bracketId === BASE_PLATE_TYPE.ON_SLAB_DYNABOLT
                ) {
                    imageSrc = `P${frameSize}`;
                } else if (+bracketId === BASE_PLATE_TYPE.CAST_IN_TUBE) {
                    imageSrc = `CPT${frameSize}`;
                } else if (+bracketId === BASE_PLATE_TYPE.POST_IN_GROUND) {
                    imageSrc = `CIG${frameSize}`;
                }
            } else {
                let slabType = 'B'; //-- On Slab - Chemical Anchor / On Slab - Dyna Bolt Anchor
                if (+bracketId === 1)
                    slabType = 'C'; //-- Cast in Bracket
                imageSrc = `${slabType}-${selectedFrameSize}`;
            }
            // console.log('imageSrc: ', imageSrc);
            try {
                image = require(`../assets/img/holddown/${imageSrc}.jpg`);
            }
            catch(err){
                image = require('../assets/img/holddown/noimage.jpg');
            }
            return {
                ...state,
                selectedFrameSizeImage: image
            };
        case QD_BD_CHANGE_GRID:
            return {
                ...state,
                selectedGrid: action.payload.grid
            };
        default:
            return state;
    }
};

export default buildingDetailReducer;