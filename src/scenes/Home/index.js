import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.css';
import { AppList } from '../../components';

export const HomeScene = (props = {}) => {
    const {
        topFreeApps,
        topGrossingApps,
    } = props;

    return (
        <div className={styles.container}>
            <AppList data={topFreeApps}/>
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
};

export default HomeScene;