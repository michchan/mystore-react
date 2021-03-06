import { fork, takeEvery, takeLatest, all } from 'redux-saga/effects';
import { 
    fetchingTopFreeAppsFlow, 
    fetchingTopGrossingAppsFlow, 
    initFetchFlow,
    fetchingAppsLookupFlow
} from './app_store';
import { 
    START_FETCHING_TOP_FREE_APPS_FLOW,
    START_FETCHING_TOP_GROSSING_APPS_FLOW, 
    START_INIT_FETCH_FLOW,
    START_FETCHING_APPS_LOOKUP_FLOW
} from '../actions';

export const rootSaga = function * root() {
    yield all([
        takeLatest(START_INIT_FETCH_FLOW, initFetchFlow),
        takeLatest(START_FETCHING_TOP_FREE_APPS_FLOW, fetchingTopFreeAppsFlow),
        takeLatest(START_FETCHING_TOP_GROSSING_APPS_FLOW, fetchingTopGrossingAppsFlow),
        takeLatest(START_FETCHING_APPS_LOOKUP_FLOW, fetchingAppsLookupFlow),
    ]);
}

export default rootSaga;