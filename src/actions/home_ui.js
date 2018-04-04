const pfx = 'ui/home/';

/* ========= Actions ========= */

export const UPDATE_CLIENT_SIZE = pfx + 'UPDATE_CLIENT_SIZE';
export const UPDATE_SCROLL_TOP = pfx + 'UPDATE_SCROLL_TOP';
export const UPDATE_SCROLL_LEFT = pfx + 'UPDATE_SCROLL_LEFT';
export const UPDATE_SCROLL_WIDTH = pfx + 'UPDATE_SCROLL_WIDTH';
export const UPDATE_SEARCH_VALUE = pfx + 'UPDATE_SEARCH_VALUE';

/* ========= Action Creators ========= */

export const updateClientSize = (width, height) => ({
    type: UPDATE_CLIENT_SIZE,
    width,
    height,
});

export const updateScrollLeft = (scrollLeft) => ({
    type: UPDATE_SCROLL_LEFT,
    scrollLeft,
});

export const updateScrollTop = (scrollTop) => ({
    type: UPDATE_SCROLL_TOP,
    scrollTop
});

export const updateScrollWidth = (scrollWidth) => ({
    type: UPDATE_SCROLL_WIDTH,
    scrollWidth
});

export const updateSearchValue = (value) => ({
    type: UPDATE_SEARCH_VALUE,
    value
});

export default {
    UPDATE_CLIENT_SIZE,
    UPDATE_SCROLL_TOP,
    UPDATE_SCROLL_LEFT,
    UPDATE_SCROLL_WIDTH,
    UPDATE_SEARCH_VALUE,

    updateClientSize,
    updateScrollTop,
    updateScrollLeft,
    updateScrollWidth,
    updateSearchValue,
};