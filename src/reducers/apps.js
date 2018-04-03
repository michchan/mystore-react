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
        case FETCHING_APPS_LOOKUP_SUCCESS: return {
            ...state,
            lastFetchMoment: action.fetchMoment || state.lastFetchMoment,
            entities: newEntitiesReducer(state, action),
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
        entities: newEntitiesReducer(state, action),
        lastFetchMoment: action.fetchMoment || state.lastFetchMoment,
    };
}

const newEntitiesReducer = (state, action) => {
    let newEntities = { ...action.entities, ...state.entities };

    _.forEach(newEntities, (entity, appId) => {
        _.forEach(action.entities, (newEntity, _appId) => {
            if (+_appId === +appId) {
                newEntities[appId] = { ...entity, ...newEntity };
            }
        });
    });
    
    return newEntities;
}
