import { take, call, put, race, all, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { 
    FETCHING_TOP_FREE_APPS_STARTED, 
    FETCHING_TOP_FREE_APPS_ERROR, 
    FETCHING_TOP_FREE_APPS_SUCCESS,
    START_FETCHING_TOP_FREE_APPS_FLOW
} from '../actions';

import { getTopFreeAppsAPI, topFreeAppsParams } from '../api';
import { getAPICaller } from '../lib/api';
import { handleApiCall, handleApiCallConfigKeys as configs } from '../lib/saga';

/**
 * Some Saga
 */
export const fetchingTopFreeAppsFlow = function* fetchingTopFreeAppsFlow(action) {
    const { limit } = action;

    yield call(handleApiCall, {
        [configs.startedType]: FETCHING_TOP_FREE_APPS_STARTED,
        [configs.successType]: FETCHING_TOP_FREE_APPS_SUCCESS,
        [configs.errorType]: FETCHING_TOP_FREE_APPS_ERROR,
        [configs.callFunction]: getAPICaller(getTopFreeAppsAPI),
        [configs.callParams]: [{ 
            [topFreeAppsParams.LIMIT]: limit,
        }],
        [configs.requestTimeout]: 5000,
    });
}