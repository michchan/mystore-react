import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.css';

export const SomeComponent = (props = {}) => {
    return (
        <div className={styles.container}>
            <p>SomeComponent</p>
        </div>
    );
};

SomeComponent.defaultProps = {

};
SomeComponent.propTypes = {};

export default SomeComponent;
