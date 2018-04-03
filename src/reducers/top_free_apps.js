import { 
    FETCHING_TOP_FREE_APPS_SUCCESS, 
    INIT_FETCH_SUCCESS 
} from '../actions';
import { fetchTopAppsResultReducer } from './helper';

const INITIAL_STATE = {
    result: [],
    meta: {},
    lastFetchMoment: null,
};

export const topFreeApps = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INIT_FETCH_SUCCESS: return { 
            ...state, 
            result: action.topFreeApps.result || state.result,
            meta: action.topFreeApps.meta || state.meta,
            lastFetchMoment: action.fetchMoment || state.lastFetchMoment,
        }
        case FETCHING_TOP_FREE_APPS_SUCCESS: return fetchTopAppsResultReducer(state, action);
        default:
            return state;
    }
};

export default topFreeApps;