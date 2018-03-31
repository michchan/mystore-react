import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

export const SomeComponent = (props = {}) => {
    return (
        <div className={'container'}>
            <p>SomeComponent</p>
        </div>
    );
};

SomeComponent.defaultProps = {

};
SomeComponent.propTypes = {};

export default SomeComponent;
