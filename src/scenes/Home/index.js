import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.css';
import { AppList } from '../../components';

export const HomeScene = (props = {}) => {
    const {
        topFreeApps,
        topGrossingApps,
        fetchTopFreeApps,
        fetchTopGrossingApps,
    } = props;

    return (
        <div className={styles.container}>
            <AppList data={topFreeApps} loadMoreRows={fetchTopFreeApps}/>
        </div>
    );
};

HomeScene.defaultProps = {
    topFreeApps: [],
    topGrossingApps: [],
};
HomeScene.propTypes = {
    topFreeApps: PropTypes.arrayOf(PropTypes.object),
    topGrossingApps: PropTypes.arrayOf(PropTypes.object),
    fetchTopFreeApps: PropTypes.func.isRequired,
    fetchTopGrossingApps: PropTypes.func.isRequired,
};

export default HomeScene;