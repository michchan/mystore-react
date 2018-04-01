import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

export class AppErrorBoundary extends Component {
    static defaultProps = {}
    static propTypes = {}

    state = { 
        hasError: false,
        error: null,
        info: null,
    };

    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({ hasError: true, error, info });
        // You can also log the error to an error reporting service
        console.log(error, info);
    }
    
    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div className={'container'}>
                    <p className={'title'}>{
                        'Opps! An error occured.'
                    }</p>
                    <p className={'error-title'}>{ `Error: ${this.state.error}` }</p>
                    <p className={'error-info'}>{this.state.info}</p>
                </div>
            );
        }
        
        return this.props.children;
    }
};

export default AppErrorBoundary;
