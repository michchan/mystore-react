import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.css';

export const HomeScene = (props = {}) => {
    return (
        <div className={styles.container}>
            <p>HomeScene</p>
        </div>
    );
};

HomeScene.defaultProps = {

};
HomeScene.propTypes = {};

export default HomeScene;
