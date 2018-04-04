import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const someHOC = (WrappedComponent) => { 
    return class extends Component {
        render() {
            return <WrappedComponent {...this.props} />
        }
    }
}

export default someHOC;