import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

export class SomeComponent extends Component {
    static defaultProps = {}
    static propTypes = {}

    render() {
        return (
            <div className={'container'}>
                <p>SomeComponent</p>
            </div>
        );
    }
};

export default SomeComponent;
