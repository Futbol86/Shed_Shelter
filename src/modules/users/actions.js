import { defineAction } from 'redux-define';
import {LOADING, FAILURE, SUCCESS} from '../../constants';
import {createAction} from 'redux-actions';


export const UPDATE_PROFILE_ACTION  = defineAction('UPDATE_PROFILE_ACTION',  [LOADING, FAILURE, SUCCESS], 'users');
export const UPDATE_PF_PASSWORD_ACTION   = defineAction('UPDATE_PF_PASSWORD_ACTION',  [LOADING, FAILURE, SUCCESS], 'users');
export const LOAD_PROFILE_ACTION    = defineAction('LOAD_PROFILE_ACTION',  [LOADING, FAILURE, SUCCESS], 'users');
export const UPLOAD_DEALER_LOGO     = defineAction('UPLOAD_DEALER_LOGO',  [LOADING, FAILURE, SUCCESS], 'users');


export const updateProfileAction    = createAction(UPDATE_PROFILE_ACTION.ACTION);
export const loadProfileAction      = createAction(LOAD_PROFILE_ACTION.ACTION);
export const doUploadDealerLogo     = createAction(UPLOAD_DEALER_LOGO.ACTION);