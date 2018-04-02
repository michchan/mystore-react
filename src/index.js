import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

import { AppErrorBoundary } from './components/state/AppErrorBoundary';
import {
    HomeScene,
} from './scenes';
import { IS_DEV, disableLogging } from './lib';

if (!IS_DEV) {
    console.disableYellowBox = true;
    disableLogging();
}

// Init dotenv
require('dotenv').config();

ReactDOM.render((
    <AppErrorBoundary>
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route path='/' component={HomeScene}/>
                </Switch>
            </BrowserRouter>
        </Provider>
    </AppErrorBoundary>
), document.getElementById('root'));
registerServiceWorker();
