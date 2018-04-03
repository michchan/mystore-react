import _ from 'lodash';

import { 
    FETCHING_TOP_FREE_APPS_SUCCESS, 
    FETCHING_TOP_GROSSING_APPS_SUCCESS, 
    INIT_FETCH_SUCCESS,
    FETCHING_APPS_LOOKUP_SUCCESS
} from '../actions';

const INITIAL_STATE = {
    entities: {},
    lastFetchMoment: null,
};

export const apps = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCHING_APPS_LOOKUP_SUCCESS: {
            let newEntities = { ...action.entities, ...state.entities };

            _.forEach(newEntities, (entity, appId) => {
                _.forEach(action.entities, (newEntity, _appId) => {
                    if (+_appId === +appId) {
                        newEntities[appId] = { ...entity, ...newEntity };
                    }
                });
            });

            return {
                ...state,
                lastFetchMoment: action.fetchMoment || state.lastFetchMoment,
                entities: newEntities,
            };
        }
        case INIT_FETCH_SUCCESS: return {
            ...state,
            lastFetchMoment: action.fetchMoment || state.lastFetchMoment,
            entities: { 
                ...state.entities, 
                ...action.topFreeApps.entities, 
                ...action.topGrossingApps.entities 
            },
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