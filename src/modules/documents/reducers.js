import {combineReducers} from 'redux';
import contractTermsReducer from "./reducers/contractTerms";
import quotePageReducer from './reducers/quotePage';
import quotePrinterReducer from './reducers/quotePrinter';
import docAccountingReducer from './reducers/docAccounting';
import docFormSheetReducer from './reducers/docFormSheet';
import docNoteSheetReducer from './reducers/docNoteSheet';

const documentsReducer = {
    contractTerms:  contractTermsReducer,
    quotePage:      quotePageReducer,
    quotePrinter:   quotePrinterReducer,
    docAccounting:  docAccountingReducer,
    docFormSheet:   docFormSheetReducer,
    docNoteSheet:    docNoteSheetReducer
};

export default combineReducers(documentsReducer);