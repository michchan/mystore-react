import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.css';
import { AppList, AppHorizontalList, AppSearchBar } from '../../components';
import { assetImages } from '../../assets';

export const HomeScene = (props = {}) => {
    const {
        topFreeApps,
        topFreeAppsResult,
        topGrossingApps,
        topGrossingAppsMeta,
        fetchTopFreeApps,
        fetchTopGrossingApps,
        appLoading,
        appLookUpLoading,
        loadingMore,
        updateScrollTop,
        setScrollWidth,
        handleOnHorizontalScroll,
        scrollLeft,
        searchValue,
        onSearchValueChange,
        clearSearchValue,
        onSearchFocus,
        onSearchBlur,
        isSearchFocused,
        scrollTop,
        lastScrollTop,
        appearedItems,
        addAppearedItem,
        showHeader,
    } = props;

    if (appLoading)
        return (
            <div className={styles.loadingContainer}>
                <img src={assetImages.loadingSpinner} alt='loading' className={styles.loadingSpinner}/>
            </div>
        );

    return (
        <div className={styles.container}>
            <AppSearchBar
                value={searchValue}
                onChange={onSearchValueChange}
                onFocus={onSearchFocus}
                onBlur={onSearchBlur}
                onClearText={clearSearchValue}
                isFocused={isSearchFocused}
            />
        
            {
                // !!showHeader &&
                <AppHorizontalList
                    data={topGrossingApps}
                    appLookUpLoading={appLookUpLoading}
                    meta={topGrossingAppsMeta}
                    scrollOffset={scrollLeft}
                    setScrollWidth={setScrollWidth}
                    handleOnScroll={handleOnHorizontalScroll}
                    isShown={showHeader}
                />
            }

            <div className={styles.listContainer}>
                <AppList 
                    data={topFreeApps} 
                    loadMoreRows={fetchTopFreeApps} 
                    appLookUpLoading={appLookUpLoading}
                    loadingMore={loadingMore}
                    handleOnScroll={updateScrollTop}
                    isFiltered={!!searchValue}
                    scrollTop={scrollTop}
                    lastScrollTop={lastScrollTop}
                    appearedItems={appearedItems}
                    addAppearedItem={addAppearedItem}
                />
            </div>
        </div>
    );
};

HomeScene.defaultProps = {
    topFreeApps: [],
    topGrossingApps: [],
    topGrossingAppsMeta: {},
};
HomeScene.propTypes = {
    topFreeApps: PropTypes.arrayOf(PropTypes.object),
    appearedItems: PropTypes.array,
    topGrossingApps: PropTypes.arrayOf(PropTypes.object),
    topGrossingAppsMeta: PropTypes.object,
    fetchTopFreeApps: PropTypes.func.isRequired,
    fetchTopGrossingApps: PropTypes.func.isRequired,
    updateScrollTop: PropTypes.func.isRequired,
    setScrollWidth: PropTypes.func.isRequired,
    handleOnHorizontalScroll: PropTypes.func.isRequired,
    onSearchValueChange: PropTypes.func.isRequired,
    onSearchFocus: PropTypes.func.isRequired,
    onSearchBlur: PropTypes.func.isRequired,
    clearSearchValue: PropTypes.func.isRequired,
    addAppearedItem: PropTypes.func.isRequired,
    appLoading: PropTypes.bool.isRequired,
    appLookUpLoading: PropTypes.bool.isRequired,
    loadingMore: PropTypes.bool.isRequired,
    isSearchFocused: PropTypes.bool.isRequired,
    showHeader: PropTypes.bool.isRequired,
    scrollLeft: PropTypes.number.isRequired,
    searchValue: PropTypes.string.isRequired,
    scrollTop: PropTypes.number.isRequired,
    lastScrollTop: PropTypes.number.isRequired,
};

export default HomeScene;