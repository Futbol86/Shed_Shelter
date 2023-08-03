import { defineAction } from 'redux-define';
import {createAction} from 'redux-actions';
import {LOADING, FAILURE, SUCCESS} from '../../../constants';

export const LOAD_LIST_USERS_ACTION     = defineAction('LOAD_LIST_USERS_ACTION',  [LOADING, FAILURE, SUCCESS], 'dealer/users');
export const LOAD_USER_INFO_ACTION      = defineAction('LOAD_USER_INFO',  [LOADING, FAILURE, SUCCESS], 'dealer/users');


export const loadListUsersAction        = createAction(LOAD_LIST_USERS_ACTION.ACTION);
