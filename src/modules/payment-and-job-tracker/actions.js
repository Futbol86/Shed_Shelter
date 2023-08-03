import { defineAction } from 'redux-define';
import {createAction} from 'redux-actions';
import {LOADING, FAILURE, SUCCESS} from '../../constants';

export const JT_LOAD_A_CHECK_LIST           = defineAction('JT_LOAD_A_CHECK_LIST', [LOADING, FAILURE, SUCCESS], 'jobTracking');
export const JT_UPDATE_A_TRACKING_ITEM      = defineAction('JT_UPDATE_A_TRACKING_ITEM',  [LOADING, FAILURE, SUCCESS], 'jobTracking');
export const JT_UPDATE_A_CHECK_LIST         = 'JT_UPDATE_A_CHECK_LIST';
export const JT_CLEAR_A_CHECK_LIST          = 'JT_CLEAR_A_CHECK_LIST';

export const JT_LOAD_A_SHED_INFORMATION     = defineAction('JT_LOAD_A_SHED_INFORMATION', [LOADING, FAILURE, SUCCESS], 'jobTracking');
export const JT_UPDATE_A_SHED_INFORMATION   = defineAction('JT_UPDATE_A_SHED_INFORMATION',  [LOADING, FAILURE, SUCCESS], 'jobTracking');

export const JT_loadACheckList	            = createAction(JT_LOAD_A_CHECK_LIST.ACTION);
export const JT_updateATrackingItem         = createAction(JT_UPDATE_A_TRACKING_ITEM.ACTION);
export const JT_updateACheckList            = createAction(JT_UPDATE_A_CHECK_LIST);
export const JT_clearACheckList             = createAction(JT_CLEAR_A_CHECK_LIST);

export const JT_loadAShedInformation	    = createAction(JT_LOAD_A_SHED_INFORMATION.ACTION);
export const JT_updateAShedInformation      = createAction(JT_UPDATE_A_SHED_INFORMATION.ACTION);