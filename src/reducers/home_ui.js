import { 
    INIT_FETCH_STARTED, INIT_FETCH_SUCCESS, INIT_FETCH_ERROR 
} from '../actions';

const INITIAL_STATE = {
    appLoading: false,
};

export const homeUi = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INIT_FETCH_SUCCESS: 
        case INIT_FETCH_ERROR: {
            return { ...state, appLoading: false };
        }
        case INIT_FETCH_STARTED: {
            return { ...state, appLoading: true };
        }
        default:
            return state;
    }
};

export default homeUi;