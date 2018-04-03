import { 
    INIT_FETCH_STARTED, 
    INIT_FETCH_SUCCESS, 
    INIT_FETCH_ERROR, 
    FETCHING_TOP_FREE_APPS_STARTED, 
    FETCHING_TOP_FREE_APPS_ERROR,
    FETCHING_APPS_LOOKUP_SUCCESS,
    FETCHING_APPS_LOOKUP_STARTED,
    FETCHING_APPS_LOOKUP_ERROR
} from '../actions';

const INITIAL_STATE = {
    appLookUpLoading: false,
    appLoading: false,
    loadingMore: false,
};

export const homeUi = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCHING_APPS_LOOKUP_SUCCESS: 
        case FETCHING_APPS_LOOKUP_ERROR: return { ...state, appLookUpLoading: false };
        case FETCHING_APPS_LOOKUP_STARTED: return { ...state, appLookUpLoading: true };
        case FETCHING_TOP_FREE_APPS_ERROR:
        case FETCHING_APPS_LOOKUP_SUCCESS: return { ...state, loadingMore: false };
        case FETCHING_TOP_FREE_APPS_STARTED: return { ...state, loadingMore: true };
        case INIT_FETCH_SUCCESS: 
        case INIT_FETCH_ERROR: return { ...state, appLoading: false };
        case INIT_FETCH_STARTED: return { ...state, appLoading: true };
        default:
            return state;
    }
};

export default homeUi;