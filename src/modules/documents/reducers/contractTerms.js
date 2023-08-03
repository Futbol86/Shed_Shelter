import {
    DOC_CHANGE_ACTIVE_MODAL,
    DOC_CHANGE_TYPE_MODAL,
    DOC_LOAD_A_DOCUMENT,
    DOC_CONVERT_HTML_TO_PDF,
    DOC_REQUEST_ZIP_CONTENT
} from '../actions';

const defaultState = {
    modalId: 0,
    modalType: null,
    activeDocument: null,
    remotePDF: null
};

const contractTermsReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case DOC_CHANGE_ACTIVE_MODAL:
            if (action.payload.modalId === 0) {
                return {
                    ...state,
                    modalId: 0,
                    remotePDF: null
                };    
            } else {
                return {
                    ...state,
                    modalId: action.payload.modalId
                };
            }

        case DOC_CHANGE_TYPE_MODAL:
            return {
                ...state,
                modalType: action.payload.modalType
            }
        
        case DOC_LOAD_A_DOCUMENT.LOADING:
            return {
                ...state,
                activeDocument: null
            };

        case DOC_LOAD_A_DOCUMENT.SUCCESS:
            if (!action.payload.pageId || action.payload.pageId === 'contract-term'){
                const result = action.payload.data;
                let document;
                if (result && result.data && result.data[0])
                    document = result.data[0];
                else
                    document = {};  //-- empty object, so it will diff from the default null
                return {
                    ...state,
                    activeDocument: document,
                };
            }
            else
                return state;

        case DOC_LOAD_A_DOCUMENT.FAILURE:
            return state;

        case DOC_CONVERT_HTML_TO_PDF.SUCCESS:
            const rs = action.payload.data;
            let pdfBuffer;
            if (rs && rs.data) {
                pdfBuffer = rs.data;
            }
            else
                pdfBuffer = rs;
            return {
                ...state,
                remotePDF: pdfBuffer,
            };

        case DOC_REQUEST_ZIP_CONTENT.SUCCESS:
            const res = action.payload;
            const zipFileData = res.data;
            const contentDisposition = res.headers['content-disposition'];
            let fileName = 'sheds.zip';
            if (contentDisposition) {
                //--content-disposition: "attachment; filename=Shed-NSSL-621267.zip"
                const fileNameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
                if (fileNameMatch.length > 1)
                    fileName = fileNameMatch[1];
            }

            const url = window.URL.createObjectURL(new Blob([zipFileData]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();

            return {
                ...state
            };

        default:
            return state;
    }
};

export default contractTermsReducer;