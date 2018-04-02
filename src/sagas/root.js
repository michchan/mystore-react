import { fork, takeEvery, takeLatest, all } from 'redux-saga/effects';
import { fetchingTopFreeAppsFlow } from './app_store';
import { START_FETCHING_TOP_FREE_APPS_FLOW } from '../actions';

export const rootSaga = function * root() {
    yield all([
        takeLatest(START_FETCHING_TOP_FREE_APPS_FLOW, fetchingTopFreeAppsFlow),
    ]);
}

export default rootSaga;