import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.css';

export const AppSearchBar = (props = {}) => {
    const { 
        value,
        onChange,
        onFocus,
        onBlur,
        onClearText,
        isFocused,
    } = props;

    return (
        <div className={styles.container}>
            <input 
                className={styles.input}
                placeholder='&#xF002;  搜尋'
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
            />
            {
                !!value &&
                <div className={styles.clearButton} onClick={onClearText}>
                    <i className="fa fa-times-circle"/>
                </div>
            }
        </div>
    );
};

AppSearchBar.defaultProps = {

};
AppSearchBar.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    onClearText: PropTypes.func.isRequired,
    isFocused: PropTypes.bool.isRequired,
};

export default AppSearchBar;
