const pfx = 'somepfx/prefix/';

/* ========= Actions ========= */

export const START_ACTION_FLOW = pfx + 'START_ACTION_FLOW';
export const ACTION_STARTED = pfx + 'ACTION_STARTED';
export const ACTION_SUCCESS = pfx + 'ACTION_SUCCESS';
export const ACTION_ERROR = pfx + 'ACTION_ERROR';

/* ========= Action Creators ========= */

export const startActionFlow = (arg) => ({
    type: START_ACTION_FLOW,
    payload: arg
});

export default {
    START_ACTION_FLOW,
    ACTION_STARTED,
    ACTION_SUCCESS,
    ACTION_ERROR,

    startActionFlow,
};