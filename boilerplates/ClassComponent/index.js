import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.css';

export class SomeComponent extends Component {
    static defaultProps = {}
    static propTypes = {}

    render() {
        return (
            <div className={styles.container}>
                <p>SomeComponent</p>
            </div>
        );
    }
};

export default SomeComponent;
