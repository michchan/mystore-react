const pfx = 'ui/home/';

/* ========= Actions ========= */

export const UPDATE_CLIENT_SIZE = pfx + 'UPDATE_CLIENT_SIZE';
export const UPDATE_SCROLL_TOP = pfx + 'UPDATE_SCROLL_TOP';
export const UPDATE_SCROLL_LEFT = pfx + 'UPDATE_SCROLL_LEFT';
export const UPDATE_SCROLL_WIDTH = pfx + 'UPDATE_SCROLL_WIDTH';
export const UPDATE_SEARCH_VALUE = pfx + 'UPDATE_SEARCH_VALUE';
export const UPDATE_IS_SEARCH_FOCUSED = pfx + 'UPDATE_IS_SEARCH_FOCUSED';
export const LIST_ITEM_APPEARED = pfx + 'LIST_ITEM_APPEARED';

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

export const updateScrollTop = (scrollTop, scrollHeight) => ({
    type: UPDATE_SCROLL_TOP,
    scrollTop,
    scrollHeight,
});

export const updateScrollWidth = (scrollWidth) => ({
    type: UPDATE_SCROLL_WIDTH,
    scrollWidth
});

export const updateSearchValue = (value) => ({
    type: UPDATE_SEARCH_VALUE,
    value
});

export const updateIsSearchFocused = (isFocused = false) => ({
    type: UPDATE_IS_SEARCH_FOCUSED,
    isFocused
});

export const listItemAppeared = (index = 0) => ({
    type: LIST_ITEM_APPEARED,
    index,
});

export default {
    UPDATE_CLIENT_SIZE,
    UPDATE_SCROLL_TOP,
    UPDATE_SCROLL_LEFT,
    UPDATE_SCROLL_WIDTH,
    UPDATE_SEARCH_VALUE,
    LIST_ITEM_APPEARED,

    updateClientSize,
    updateScrollTop,
    updateScrollLeft,
    updateScrollWidth,
    updateSearchValue,
    updateIsSearchFocused,
    listItemAppeared,
};