/*
    Redux Store:
    1. Import configureStore from @reduxjs/toolkit
    2. declare the middlewares
    3. declare the store with reducers and middleware
*/

import { configureStore, applyMiddleware} from "@reduxjs/toolkit";
import logger from 'redux-logger';

import reducers from "./root-reducer";

//Redux persist
import { persistStore } from "redux-persist";

const middlewares = [logger];

export const store = configureStore({reducer: reducers, middleware: middlewares});

//Redux persist
export const persistor = persistStore(store)

export default {store, persistor};