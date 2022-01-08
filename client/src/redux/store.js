import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import {persistStore} from 'redux-persist';
// import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga';
import rootSaga from './root-saga';


import rootReducer from './root-reducer';

const sagaMiddleware= createSagaMiddleware();

const middlewares = [sagaMiddleware];
if (process.env.NODE_ENV==='development') {
    middlewares.push(logger)
}
//..isll spread all of the middleares from teh array as individual arguments
export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga); //inside run we pass each individual saga

export const persistor = persistStore(store);

export default {store,persistor};