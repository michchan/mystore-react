import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.css';
import { appFields as fields } from '../../api';

export const AppListItem = (props = {}) => {
    const { 
        data, 
        index 
    } = props;

    const rowNumber = index + 1;
    const isEvenRow = (index + 1) % 2 === 0;

    const appName = data[fields.NAME];
    const appCatName = data[fields.CATEGORY_LABEL];
    const appIconSrc = data[fields.ICON_100];
    const appIconHeight = data[fields.ICON_100_HEIGHT];
    const appIconBorderRadius = isEvenRow ? appIconHeight / 2 : appIconHeight / 4;
    
    return (
        <div {...props} className={styles.container}>
            <div className={styles.innerContainer}>
                <div className={styles.rowNumber}>{ rowNumber }</div>

                <img src={appIconSrc} alt="icon" className={styles.appIcon} style={{
                    width: appIconHeight,
                    height: appIconHeight,
                    borderRadius: appIconBorderRadius,
                }}/>

                <div className={styles.colRight}>
                    <div className={styles.appName}>{ appName }</div>
                    <div className={styles.appCatName}>{ appCatName }</div>
                    <div className={styles.appRatingContainer}>{ 'rating placeholder' }</div>
                </div>
            </div>
        </div>
    );
};

AppListItem.defaultProps = {
};
AppListItem.propTypes = {
    data: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
    index: PropTypes.number.isRequired,
};

export default AppListItem;
