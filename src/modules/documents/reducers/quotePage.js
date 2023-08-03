import {DOC_LOAD_A_DOCUMENT, DOC_QP_UPLOAD_LOGO_FILE} from "../actions";

const defaultState = {
    modalId: 0,
    logoFile: null,
    remotePDF: null
};

const quotePageReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case DOC_QP_UPLOAD_LOGO_FILE.SUCCESS:
            return {
                ...state,
                logoFile: action.payload.data.id
            };

        case DOC_LOAD_A_DOCUMENT.ACTION:
            if (action.payload && action.payload.pageId) {
                return {
                    ...state,
                    [`saved-${action.payload.pageId}`]: null,
                };
            } else
                return state;

        case DOC_LOAD_A_DOCUMENT.SUCCESS:
            if (action.pageId){
                const result = action.payload.data;
                let document;
                let savedData = {};

                if (result && result.data && result.data[0])
                    document = result.data[0];

                if (document && document.data) {
                    savedData = JSON.parse(document.data);
                    if (savedData) {
                        savedData = {
                            ...savedData,
                            id: document.id,
                            type: document.type
                        }
                    }
                    else
                        savedData = {};
                }

                return {
                    ...state,
                    [`saved-${action.pageId}`]: savedData,
                };
            }
            else
                return state;

        default:
            return state;
    }
};

export default quotePageReducer;