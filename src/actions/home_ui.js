const pfx = 'ui/home/';

/* ========= Actions ========= */

export const UPDATE_CLIENT_SIZE = pfx + 'UPDATE_CLIENT_SIZE';
export const UPDATE_SCROLL_HORIZONTAL_OFFSET = pfx + 'UPDATE_SCROLL_HORIZONTAL_OFFSET';
export const UPDATE_SCROLL_WIDTH = pfx + 'UPDATE_SCROLL_WIDTH';

/* ========= Action Creators ========= */

export const updateClientSize = (width, height) => ({
    type: UPDATE_CLIENT_SIZE,
    width,
    height,
});

export const updateScrollHorizontalOffset = (offset = 0, scrollTop) => ({
    type: UPDATE_SCROLL_HORIZONTAL_OFFSET,
    offset,
    scrollTop,
});

export const updateScrollWidth = (scrollWidth) => ({
    type: UPDATE_SCROLL_WIDTH,
    scrollWidth
});

export default {
    UPDATE_CLIENT_SIZE,
    UPDATE_SCROLL_HORIZONTAL_OFFSET,
    UPDATE_SCROLL_WIDTH,

    updateClientSize,
    updateScrollHorizontalOffset,
    updateScrollWidth,
};