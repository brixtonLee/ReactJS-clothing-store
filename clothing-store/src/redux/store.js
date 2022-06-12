/*
    Redux Store:
    1. Import configureStore from @reduxjs/toolkit
    2. declare the middlewares
    3. declare the store with reducers and middleware
*/

import { configureStore, applyMiddleware} from "@reduxjs/toolkit";
import logger from 'redux-logger';

import reducers from "./root-reducer";

const middlewares = [logger];

const store = configureStore({reducer: reducers, middleware: middlewares});

export default store;