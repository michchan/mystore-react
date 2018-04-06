import _ from 'lodash';

import { 
    INIT_FETCH_STARTED, 
    INIT_FETCH_SUCCESS, 
    INIT_FETCH_ERROR, 
    FETCHING_TOP_FREE_APPS_STARTED, 
    FETCHING_TOP_FREE_APPS_ERROR,
    FETCHING_APPS_LOOKUP_SUCCESS,
    FETCHING_APPS_LOOKUP_STARTED,
    FETCHING_APPS_LOOKUP_ERROR,
    UPDATE_SCROLL_LEFT,
    UPDATE_SCROLL_WIDTH,
    UPDATE_CLIENT_SIZE,
    UPDATE_SCROLL_TOP,
    UPDATE_SEARCH_VALUE,
    UPDATE_IS_SEARCH_FOCUSED,
    UPDATE_FILTER_TEXT,
    LIST_ITEM_APPEARED
} from '../actions';

const INITIAL_STATE = {
    appLookUpLoading: false,
    appLoading: false,
    loadingMore: false,
    hasReachedEndHorizontal: false,
    scrollLeft: 0,
    scrollTop: 0,
    lastScrollTop: 0,
    scrollWidth: 0,
    scrollHeight: 0,
    clientWidth: 0,
    clientHeight: 0,
    searchValue: '',
    isSearchFocused: false,
    appearedItemIndices: [], // storing items' ids which has been animated appearing
    showHeader: true,
};

export const homeUi = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LIST_ITEM_APPEARED: {
            
            return {
                ...state,
                appearedItemIndices: _.times(action.index + 1, i => i),
            };
        }
        case UPDATE_FILTER_TEXT: return { 
            ...state, 
            scrollTop: !action.text? state.lastScrollTop : 0, // when there is filter text, scroll to top, otherwise scroll to last scroll top value
            lastScrollTop: state.scrollTop === 0? state.lastScrollTop : state.scrollTop,
        };
        case UPDATE_IS_SEARCH_FOCUSED: return { ...state, isSearchFocused: action.isFocused };
        case UPDATE_SEARCH_VALUE: return { 
            ...state, 
            searchValue: action.value,
            scrollTop: !action.value? state.lastScrollTop : state.scrollTop, // when there is filter text, scroll to top, otherwise scroll to last scroll top value
        };
        case UPDATE_CLIENT_SIZE: return { ...state, clientWidth: action.width, clientHeight: action.height };
        case UPDATE_SCROLL_WIDTH: return { ...state, scrollWidth: action.scrollWidth };
        case UPDATE_SCROLL_TOP: {
            const hasReachedEndHorizontal = action.scrollTop * 2/3 >= state.scrollWidth - state.clientWidth;
            const willReachEndVertical = action.scrollTop - 100 >= state.scrollHeight - state.clientHeight; 
            // Here 200 is a threshold for reaching end
            const isScrollingDown = action.scrollTop > state.scrollTop;

            return {
                ...state,
                hasReachedEndHorizontal: hasReachedEndHorizontal,
                scrollLeft: state.hasReachedEndHorizontal? state.scrollLeft : action.scrollTop * 2/3,
                scrollTop: action.scrollTop,
                scrollHeight: action.scrollHeight,
                lastScrollTop: state.scrollTop,
                showHeader: (isScrollingDown && hasReachedEndHorizontal && !willReachEndVertical)? false : true,
            };
        }
        case UPDATE_SCROLL_LEFT: {
            const hasReachedEndHorizontal = state.scrollLeft >= state.scrollWidth - state.clientWidth;
            return { 
                ...state, 
                hasReachedEndHorizontal: hasReachedEndHorizontal,
                scrollLeft: state.hasReachedEndHorizontal? state.scrollLeft : action.scrollLeft,
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