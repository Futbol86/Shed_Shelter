import {
    LOAD_QUOTE_INFO_ACTION,
    QD_DS_CHANGE_ACTIVE_MODAL, QD_DS_LOAD_ALT_GEOCODE_LATLNG,
    QD_DS_LOAD_GEOCODE_LATLNG_ACTION, QD_DS_UPLOAD_CERT_FILE,
    QD_DS_UPLOAD_CERT_FILES_START
} from '../actions';


const defaultState = {
    geoLocation: {
        lat: 0,
        lng: 0,
    },
    loading: false,
    errors: null,
    activeModal: 0,
    certFiles: []
};

const deliverySummaryReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case QD_DS_LOAD_GEOCODE_LATLNG_ACTION.SUCCESS:
            const location = action.payload.results && action.payload.results[0]
                && action.payload.results[0].geometry && action.payload.results[0].geometry.location;
            return {
                ...state,
                geoLocation: location
            };

        case QD_DS_LOAD_ALT_GEOCODE_LATLNG.SUCCESS:
            const altLocation = action.payload.results && action.payload.results[0]
                && action.payload.results[0].geometry && action.payload.results[0].geometry.location;
            return {
                ...state,
                altGeoLocation: altLocation
            };

        case QD_DS_LOAD_GEOCODE_LATLNG_ACTION.LOADING:
            return {
                ...state,
                loading: true
            };
        case QD_DS_LOAD_GEOCODE_LATLNG_ACTION.FAILURE:
            return {
                ...state,
                errors: action.payload.error,
                loading: false
            };

        case QD_DS_CHANGE_ACTIVE_MODAL:
            return {
                ...state,
                activeModal: action.payload.modalId,
            };


        case LOAD_QUOTE_INFO_ACTION.ACTION:
            return defaultState;

        case LOAD_QUOTE_INFO_ACTION.SUCCESS:
            const rs = action.payload.data;
            if (rs && rs.buildingDetail && rs.buildingDetail.ecCertList) {
                return {
                    ...state,
                    certFiles: rs.buildingDetail.ecCertList
                }
            }
            else
                return state;


        case QD_DS_UPLOAD_CERT_FILES_START:
            return {
                ...state,
                certFiles: []
            };

        case QD_DS_UPLOAD_CERT_FILE.SUCCESS:
            return {
                ...state,
                certFiles: [...state.certFiles, action.payload.data.id]
            };

        default:
            return state;
    }
};

export default deliverySummaryReducer;