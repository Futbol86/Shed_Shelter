import { defineAction } from 'redux-define';
import {createAction} from 'redux-actions';
import {LOADING, FAILURE, SUCCESS} from '../../constants';

export const LOAD_LIST_CLIENTS_ACTION   = defineAction('LOAD_LIST_CLIENTS_ACTION',  [LOADING, FAILURE, SUCCESS], 'clients');
export const GET_A_CLIENTS_INFO         = defineAction('GET_A_CLIENT_INFO',  [LOADING, FAILURE, SUCCESS], 'clients');
export const ADD_NEW_CLIENT_ACTION      = defineAction('ADD_NEW_CLIENT_ACTION',  [LOADING, FAILURE, SUCCESS], 'clients');
export const GET_A_CLIENT_FOR_EDITING   = defineAction('GET_A_CLIENT_FOR_EDITING',  [LOADING, FAILURE, SUCCESS], 'clients');


export const loadListClientsAction      = createAction(LOAD_LIST_CLIENTS_ACTION.ACTION);
export const addNewClientAction         = createAction(ADD_NEW_CLIENT_ACTION.ACTION);
export const getAClientInfo             = createAction(GET_A_CLIENTS_INFO.ACTION);
export const getAClientForEditing       = createAction(GET_A_CLIENT_FOR_EDITING.ACTION);