import { 
    FETCHING_TOP_GROSSING_APPS_SUCCESS, 
    INIT_FETCH_SUCCESS 
} from '../actions';
import { fetchTopAppsResultReducer } from './helper';

const INITIAL_STATE = {
    result: [],
    meta: {},
    lastFetchMoment: null,
};

export const topGrossingApps = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INIT_FETCH_SUCCESS: return { 
            ...state, 
            result: action.topGrossingApps.result || state.result,
            meta: action.topGrossingApps.meta || state.meta,
            lastFetchMoment: action.fetchMoment || state.lastFetchMoment,
        }
        case FETCHING_TOP_GROSSING_APPS_SUCCESS: return fetchTopAppsResultReducer(state, action);
        default:
            return state;
    }
};

export default topGrossingApps;