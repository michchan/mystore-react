import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export const someHOC = (WrappedComponent) => { 
    class SomeHOC extends Component {
        render() {
            return <WrappedComponent {...this.props} />
        }
    }

    const mapStateToProps = (state, ownProps) => ({
    });

    const mapDispatchToProps = (dispatch, ownProps) => ({
    })

    return connect(mapStateToProps, mapDispatchToProps)(SomeHOC);
}

export default someHOC;