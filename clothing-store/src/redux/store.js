/*
    Redux Store:
    1. Import configureStore from @reduxjs/toolkit
    2. declare the middlewares
    3. declare the store with reducers and middleware
*/

import { configureStore } from "@reduxjs/toolkit";
import logger from 'redux-logger';

/*
    Redux thunk:
    1. It is a piece of middleware that allows us to fire function
    2. If we have redux saga, we will not need to use redux thunk anymore
 */

import thunk from "redux-thunk";
import createSagaMiddleware from 'redux-saga'

import rootSaga from "./root-sagas";
import reducers from "./root-reducer";

//Redux persist
import { persistStore } from "redux-persist";

//Redux saga
const sagaMiddleware = createSagaMiddleware();

const middlewares = [logger, sagaMiddleware];

export const store = configureStore({reducer: reducers, middleware: middlewares});

sagaMiddleware.run(rootSaga);

//Redux persist
export const persistor = persistStore(store)

export default {store, persistor};