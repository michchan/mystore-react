import { 
    FETCHING_TOP_FREE_APPS_SUCCESS, 
    FETCHING_TOP_GROSSING_APPS_SUCCESS, 
    INIT_FETCH_SUCCESS
} from '../actions';

const INITIAL_STATE = {
    entities: {},
    lastFetchMoment: null,
};

export const apps = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INIT_FETCH_SUCCESS: return {
            ...state,
            entities: { 
                ...state.entities, 
                ...action.topFreeApps.entities, 
                ...action.topGrossingApps.entities 
            },
            lastFetchMoment: action.fetchMoment || state.lastFetchMoment,   
        }
        case FETCHING_TOP_GROSSING_APPS_SUCCESS: return fetchTopAppsReducer(state, action);
        case FETCHING_TOP_FREE_APPS_SUCCESS: return fetchTopAppsReducer(state, action);
        default:
            return state;
    }
};

export default apps;

const fetchTopAppsReducer = (state, action) => {
    return { 
        ...state, 
        entities: { ...state.entities, ...action.entities },
        lastFetchMoment: action.fetchMoment || state.lastFetchMoment,
    };
}