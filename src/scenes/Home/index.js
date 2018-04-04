import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.css';
import { AppList, AppHorizontalList, AppSearchBar } from '../../components';
import { assetImages } from '../../assets';

export const HomeScene = (props = {}) => {
    const {
        topFreeApps,
        topGrossingApps,
        topGrossingAppsMeta,
        fetchTopFreeApps,
        fetchTopGrossingApps,
        appLoading,
        appLookUpLoading,
        loadingMore,
    } = props;

    if (appLoading)
        return (
            <div className={styles.loadingContainer}>
                <img src={assetImages.loadingSpinner} alt='loading' className={styles.loadingSpinner}/>
            </div>
        );

    return (
        <div className={styles.container}>
            <AppSearchBar/>

            <AppHorizontalList
                data={topGrossingApps}
                appLookUpLoading={appLookUpLoading}
                meta={topGrossingAppsMeta}
            />
            
            <AppList 
                data={topFreeApps} 
                loadMoreRows={fetchTopFreeApps} 
                appLookUpLoading={appLookUpLoading}
                loadingMore={loadingMore}
                headerHeight={380}
            />
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
    topGrossingApps: PropTypes.arrayOf(PropTypes.object),
    topGrossingAppsMeta: PropTypes.object,
    fetchTopFreeApps: PropTypes.func.isRequired,
    fetchTopGrossingApps: PropTypes.func.isRequired,
    appLoading: PropTypes.bool.isRequired,
    appLookUpLoading: PropTypes.bool.isRequired,
    loadingMore: PropTypes.bool.isRequired,
};

export default HomeScene;