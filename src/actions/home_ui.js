const pfx = 'ui/home/';

/* ========= Actions ========= */

export const UPDATE_SCROLL_HORIZONTAL_OFFSET = pfx + 'UPDATE_SCROLL_HORIZONTAL_OFFSET';

/* ========= Action Creators ========= */

export const updateScrollHorizontalOffset = (offset = 0) => ({
    type: UPDATE_SCROLL_HORIZONTAL_OFFSET,
    offset
});

export default {
    UPDATE_SCROLL_HORIZONTAL_OFFSET,

    updateScrollHorizontalOffset,
};