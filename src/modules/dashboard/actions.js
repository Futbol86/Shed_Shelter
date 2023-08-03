import { defineAction } from 'redux-define';
import {createAction} from 'redux-actions';
import {LOADING, FAILURE, SUCCESS} from '../../constants';

export const LIST_CLIENTS_ACTION    = defineAction('LIST_CLIENTS_ACTION',   [LOADING, FAILURE, SUCCESS], 'dashboard');
export const LIST_QUOTES_ACTION     = defineAction('LIST_QUOTES_ACTION',    [LOADING, FAILURE, SUCCESS], 'dashboard');
export const DELETE_A_QUOTE_ACTION  = defineAction('DELETE_A_QUOTE_ACTION', [LOADING, FAILURE, SUCCESS], 'dashboard');


export const loadListClientsAction  = createAction(LIST_CLIENTS_ACTION.ACTION);
export const loadListQuotesAction   = createAction(LIST_QUOTES_ACTION.ACTION);
export const deleteAQuoteAction     = createAction(DELETE_A_QUOTE_ACTION.ACTION);