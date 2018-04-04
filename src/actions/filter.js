const pfx = 'app/filter/';

/* ========= Actions ========= */

export const UPDATE_FILTER_TEXT = pfx + 'UPDATE_FILTER_TEXT';;

/* ========= Action Creators ========= */

export const updateFilterText = (text='') => ({
    type: UPDATE_FILTER_TEXT,
    text
});

export default {
    UPDATE_FILTER_TEXT,

    updateFilterText,
};