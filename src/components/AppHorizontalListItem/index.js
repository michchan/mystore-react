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
    const appStoreLinkType = data[fields.LINK_TYPE];
    const appStoreLinkRel = data[fields.LINK_REL];
    const appStoreLinkURL = data[fields.LINK_URL];

    return (
        <a 
            href={appStoreLinkURL}
            rel={appStoreLinkRel}
            type={appStoreLinkType}
            target={'blank'} 
            className={styles.container}
        >
            <img src={appIconSrc} alt="icon" className={styles.appIcon}/>
            <div className={styles.appName}>{ appName }</div>
            <div className={styles.appCatName}>{ appCatName }</div>
        </a>
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
