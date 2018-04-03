/** Common codes here */

export const fetchTopAppsResultReducer = (state, action) => {
    return { 
        ...state, 
        result: action.result || state.result,
        meta: action.meta || state.meta,
        lastFetchMoment: action.fetchMoment || state.lastFetchMoment,
        offset: state.offset + action.limit,
    };
};