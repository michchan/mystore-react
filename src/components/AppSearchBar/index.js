import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.css';

export const AppSearchBar = (props = {}) => {
    return (
        <div className={styles.container}>
            <p>AppSearchBar</p>
        </div>
    );
};

AppSearchBar.defaultProps = {

};
AppSearchBar.propTypes = {};

export default AppSearchBar;
