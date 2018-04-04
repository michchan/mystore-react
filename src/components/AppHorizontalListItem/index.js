import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.css';
import { appFields as fields } from '../../api';

export const AppHorizontalListItem = (props = {}) => {
    const { 
        data, 
        index,
        appLookUpLoading,
    } = props;

    const appName = data[fields.NAME];
    const appCatName = data[fields.CATEGORY_LABEL];
    const appIconSrc = data[fields.ICON_100];

    return (
        <div className={styles.container}>
            <img src={appIconSrc} alt="icon" className={styles.appIcon}/>
            <div className={styles.appName}>{ appName }</div>
            <div className={styles.appCatName}>{ appCatName }</div>
        </div>
    );
};

AppHorizontalListItem.defaultProps = {

};
AppHorizontalListItem.propTypes = {
    data: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    appLookUpLoading: PropTypes.bool.isRequired,
};

export default AppHorizontalListItem;
