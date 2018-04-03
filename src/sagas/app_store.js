import { take, call, put, race, all, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';

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
    INIT_FETCH_ERROR
} from '../actions';

import { getTopFreeAppsAPI, topFreeAppsParams, appStoreEntryMap, getTopGrossingAppsAPI, topGrossingAppsParams, appStoreMetaMap } from '../api';
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
        [configs.processData]: (data) => {
            return {
                topFreeApps: processAppStoreData(data.topFreeApps),
                topGrossingApps: processAppStoreData(data.topGrossingApps),
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

const processAppStoreData = (data) => {
    const { entry, ...meta } = data.feed;
    const parsedEntries = mapApiFields(entry, appStoreEntryMap);
    const parsedMeta = mapApiFields(meta, appStoreMetaMap);
    const normalizedData = normalize(parsedEntries, appStoreEntriesNormalizedSchema);

    return {
        meta: parsedMeta,
        ...normalizedData,
        entities: normalizedData.entities.apps,
    }
}
