import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.css';

export const AppSearchBar = (props = {}) => {
    const { 
        value,
        onChange
    } = props;

    return (
        <div className={styles.container}>
            <input 
                className={styles.input}
                placeholder='&#xF002;  搜尋'
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

AppSearchBar.defaultProps = {

};
AppSearchBar.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default AppSearchBar;
