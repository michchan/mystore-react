import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Rating from 'react-rating';

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
    const userRating = data[fields.AVG_USER_RATING];
    const userRatingCount = data[fields.USER_RATING_COUNT];
    
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
                    {
                        (userRating && userRatingCount) &&
                        <div className={styles.appRatingContainer}>  
                            <div className={styles.userRating}>
                                <Rating 
                                    fractions={2} 
                                    initialRating={+userRating} 
                                    readonly
                                    emptySymbol="fa fa-star-o"
                                    fullSymbol="fa fa-star"
                                />
                            </div>
                            <div className={styles.userRatingCount}>{ `(${userRatingCount})` }</div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

AppListItem.defaultProps = {
};
AppListItem.propTypes = {
    data: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
};

export default AppListItem;
