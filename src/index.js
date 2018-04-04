import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { AutoSizer } from 'react-virtualized';

import { ROOT_ROUTE } from './constants/routes';
import { AppErrorBoundary } from './components/AppErrorBoundary';
import {
    HomeScene,
} from './containers';
import { IS_DEV, disableLogging } from './lib';

if (!IS_DEV) {
    disableLogging();
}

// Init dotenv
require('dotenv').config();

ReactDOM.render((
    <AppErrorBoundary>
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route path={ROOT_ROUTE} component={HomeScene}/>
                </Switch>
            </BrowserRouter>
        </Provider>
    </AppErrorBoundary>
), document.getElementById('root'));
registerServiceWorker();
