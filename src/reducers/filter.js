import _ from 'lodash';

import { 
    UPDATE_FILTER_TEXT 
} from '../actions';

const INITIAL_STATE = {
    terms: [],
};

export const filter = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_FILTER_TEXT: {
            const terms = _.trim(action.text).split(' ');

            if(_.isEqual(terms, state.terms)) return state;

            return { ...state, terms };
        }
        default:
            return state;
    }
};

export default filter;