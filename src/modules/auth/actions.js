// import {httpClient} from '../../services';
// const url = '/authentication';

import { defineAction } from 'redux-define';
import {LOADING, FAILURE, SUCCESS} from '../../constants';
import {createAction} from 'redux-actions';


export const LOGIN_ACTION   = defineAction('LOGIN_ACTION',  [LOADING, FAILURE, SUCCESS], 'auth');
export const LOGOUT_ACTION  = defineAction('LOGOUT_ACTION', [LOADING, FAILURE, SUCCESS], 'auth');
export const FORGOT_REQUEST_ACTION   = defineAction('FORGOT_REQUEST_ACTION',  [LOADING, FAILURE, SUCCESS], 'auth');
export const PASSWORD_RESET_ACTION   = defineAction('PASSWORD_RESET_ACTION',  [LOADING, FAILURE, SUCCESS], 'auth');

export const logoutAction   = createAction(LOGOUT_ACTION.ACTION);
export const loginAction    = createAction(LOGIN_ACTION.ACTION);