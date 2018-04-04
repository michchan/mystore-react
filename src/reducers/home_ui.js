import { 
    INIT_FETCH_STARTED, 
    INIT_FETCH_SUCCESS, 
    INIT_FETCH_ERROR, 
    FETCHING_TOP_FREE_APPS_STARTED, 
    FETCHING_TOP_FREE_APPS_ERROR,
    FETCHING_APPS_LOOKUP_SUCCESS,
    FETCHING_APPS_LOOKUP_STARTED,
    FETCHING_APPS_LOOKUP_ERROR,
    UPDATE_SCROLL_HORIZONTAL_OFFSET,
    UPDATE_SCROLL_WIDTH,
    UPDATE_CLIENT_SIZE
} from '../actions';

const INITIAL_STATE = {
    appLookUpLoading: false,
    appLoading: false,
    loadingMore: false,
    scrollHorizontalOffset: 0,
    scrollTop: 0,
    scrollWidth: 0,
    clientWidth: 0,
    clientHeight: 0,
};

export const homeUi = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_CLIENT_SIZE: return { ...state, clientWidth: action.width, clientHeight: action.height };
        case UPDATE_SCROLL_WIDTH: return { ...state, scrollWidth: action.scrollWidth };
        case UPDATE_SCROLL_HORIZONTAL_OFFSET: {
            const isDownwardScrolling = action.scrollTop > state.scrollTop;
            const isOffsetIncreasing = action.offset > state.scrollHorizontalOffset;
            
            // Prevent wrong synchronous scroll after user has manually scrolled horizontally
            if (isDownwardScrolling !== isOffsetIncreasing) return state;

            return { 
                ...state, 
                scrollHorizontalOffset: action.offset,
                scrollTop: action.scrollTop || state.scrollTop,
            };
        }
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