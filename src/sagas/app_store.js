import { take, call, put, race, all, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import _ from 'lodash';

import { 
    FETCHING_TOP_FREE_APPS_STARTED, 
    FETCHING_TOP_FREE_APPS_ERROR, 
    FETCHING_TOP_FREE_APPS_SUCCESS,
    START_FETCHING_TOP_FREE_APPS_FLOW,
    FETCHING_TOP_GROSSING_APPS_STARTED,
    FETCHING_TOP_GROSSING_APPS_SUCCESS,
    FETCHING_TOP_GROSSING_APPS_ERROR,
    INIT_FETCH_STARTED,
    INIT_FETCH_SUCCESS,
    INIT_FETCH_ERROR,
    startFetchingAppsLookupFlow,
    FETCHING_APPS_LOOKUP_STARTED,
    FETCHING_APPS_LOOKUP_SUCCESS,
    FETCHING_APPS_LOOKUP_ERROR
} from '../actions';

import { getTopFreeAppsAPI, topFreeAppsParams, appStoreEntryMap, getTopGrossingAppsAPI, topGrossingAppsParams, appStoreMetaMap, getAppLookupAPI, appLookUpQuery, appLookUpMap } from '../api';
import { getAPICaller, mapApiFields } from '../lib/api';
import { handleApiCall, handleApiCallConfigKeys as configs } from '../lib/saga';
import { normalize } from 'normalizr';
import { appStoreEntriesNormalizedSchema } from '../normalizers/app_store';

/**
 * Fetch all on app initilized
 */
export const initFetchFlow = function * initFetchFlow(action) {
    yield call(handleApiCall, {
        [configs.startedType]: INIT_FETCH_STARTED,
        [configs.successType]: INIT_FETCH_SUCCESS,
        [configs.errorType]: INIT_FETCH_ERROR,
        [configs.callFunction]: {
            topFreeApps: getAPICaller(getTopFreeAppsAPI),
            topGrossingApps: getAPICaller(getTopGrossingAppsAPI),
        },
        [configs.callParams]: {
            topFreeApps: [{ [topFreeAppsParams.LIMIT]: 10 }],
            topGrossingApps: [{ [topGrossingAppsParams.LIMIT]: 10 }],
        }, 
        [configs.processData]: function * (data) {
            const topFreeApps = yield call(processAppStoreData, data.topFreeApps);
            const topGrossingApps = yield call(processAppStoreData, data.topGrossingApps);

            const appIds = _.union(topFreeApps.result, topGrossingApps.result);
            yield put(startFetchingAppsLookupFlow(appIds));

            return {
                topFreeApps,
                topGrossingApps,
            };
        },
        [configs.bindProcessedDataToAction]: true,
        [configs.requestTimeout]: 5000,
    });
}

/**
 * Fetch Top Free Apps Saga
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
        [configs.processData]: processAppStoreData,
        [configs.bindProcessedDataToAction]: true,
        [configs.requestTimeout]: 5000,
    });
}

/**
 * Fetch Top Grossing Apps Saga
 */
export const fetchingTopGrossingAppsFlow = function* fetchingTopGrossingAppsFlow(action) {
    const { limit } = action;

    yield call(handleApiCall, {
        [configs.startedType]: FETCHING_TOP_GROSSING_APPS_STARTED,
        [configs.successType]: FETCHING_TOP_GROSSING_APPS_SUCCESS,
        [configs.errorType]: FETCHING_TOP_GROSSING_APPS_ERROR,
        [configs.callFunction]: getAPICaller(getTopGrossingAppsAPI),
        [configs.callParams]: [{ 
            [topGrossingAppsParams.LIMIT]: limit,
        }],
        [configs.processData]: processAppStoreData,
        [configs.bindProcessedDataToAction]: true,
        [configs.requestTimeout]: 5000,
    });
}

/**
 * Fetch Apps (given mutiple app ids) Lookup Saga
 */
export const fetchingAppsLookupFlow = function* fetchingAppsLookupFlow(action) {
    const { ids } = action;

    if (!_.isArray(ids)) return;
    if (ids.length === 0) return;
    
    yield call(handleApiCall, {
        [configs.startedType]: FETCHING_APPS_LOOKUP_STARTED,
        [configs.successType]: FETCHING_APPS_LOOKUP_SUCCESS,
        [configs.errorType]: FETCHING_APPS_LOOKUP_ERROR,
        [configs.callFunction]: getAPICaller(getAppLookupAPI),
        [configs.callParams]: [{
            [appLookUpQuery.ID]: ids.toString(),
        }], 
        [configs.processData]: function * (data) {
            const parsedData = mapApiFields(data.results, appLookUpMap);
            const normalizedData = normalize(parsedData, appStoreEntriesNormalizedSchema);
            
            return {
                ...normalizedData,
                entities: normalizedData.entities.apps,
            };
        },
        [configs.bindProcessedDataToAction]: true,
        [configs.requestTimeout]: 5000,
    });
}

const processAppStoreData = function * (data) {
    const { entry, ...meta } = data.feed;
    const parsedData = mapApiFields(entry, appStoreEntryMap);
    const parsedMeta = mapApiFields(meta, appStoreMetaMap);
    const normalizedData = normalize(parsedData, appStoreEntriesNormalizedSchema);

    yield put(startFetchingAppsLookupFlow(normalizedData.result));

    return {
        meta: parsedMeta,
        ...normalizedData,
        entities: normalizedData.entities.apps,
    };
}
