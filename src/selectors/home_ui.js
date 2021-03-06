
export const homeAppLoadingSelector = state => state.homeUi.appLoading;
export const homeAppLookUpLoadingSelector = state => state.homeUi.appLookUpLoading;
export const homeAppLoadingMoreSelector = state => state.homeUi.loadingMore;
export const homeScrollLeftSelector = state => state.homeUi.scrollLeft;
export const homeSearchValueSelector = state => state.homeUi.searchValue;
export const homeSearchFocusedSelector = state => state.homeUi.isSearchFocused;
export const homeScrollTopSelector = state => state.homeUi.scrollTop;
export const homeLastScrollTopSelector = state => state.homeUi.lastScrollTop;
export const homeAppearedItemIdsSelector = state => state.homeUi.appearedItemIndices;
export const homeShowHeaderSelector = state => state.homeUi.showHeader;
export const scrollHeightSelector = state => state.homeUi.scrollHeight;