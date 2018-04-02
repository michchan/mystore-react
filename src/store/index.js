import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reduxLogger from 'redux-logger';
import reduxDiffLogger from 'redux-diff-logger';

import { rootReducer } from '../reducers/root';
import { rootSaga } from '../sagas/root';
import { servicesEnabled, IS_DEV } from '../lib/index';

// confiure store
const sagaMiddleware = createSagaMiddleware();

const middleware = [
    sagaMiddleware,
];

if (IS_DEV) {
    servicesEnabled.reduxLogger && middleware.push(reduxLogger);
    servicesEnabled.reduxDiffLogger && middleware.push(reduxDiffLogger);
}

export const store = createStore(rootReducer, {}, applyMiddleware(...middleware));
export default store;

sagaMiddleware.run(rootSaga);