import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './style.module.css';
import { appStoreMetaFields } from '../../api';
import { AppHorizontalListItem } from '..';

export const AppHorizontalList = (props = {}) => {
    const {
        data,
        meta,
        appLookUpLoading,
    } = props;

    const listTitle = meta[appStoreMetaFields.TITLE];

    return (
        <div className={styles.container}>
            <div className={styles.listTitle}>{ listTitle }</div>
            <div className={styles.listContainer}>
                <div className={styles.spacer}/>
                {data.map((item, index) => (
                    <AppHorizontalListItem
                        key={index} 
                        index={index}
                        data={item}
                        appLookUpLoading={props.appLookUpLoading}
                    />
                ))}
                <div className={styles.spacer}/>
            </div>
        </div>
    );
};

AppHorizontalList.defaultProps = {
    data: [],
    meta: {},
};
AppHorizontalList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    meta: PropTypes.object,
    appLookUpLoading: PropTypes.bool.isRequired,
};

export default AppHorizontalList;
