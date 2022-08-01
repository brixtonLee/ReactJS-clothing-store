/*
    React Redux
    1. If we are using redux, we dont need to have the constructor anymore in the class component
    2. Redux mapDispatchToProps and mapStateToProps are all consisted in this.props for the class component
    3. If it is in functional component, it can be written directly in the params of functional component

    Redux Reducer:
    1. Reducer is the function that has two arguments which are (state, action)
    2. action is the object that has the type (specific type of action), payload (anything)
    3. The state is going to be something (current state) that redux store is going to pass to the reducer whenever the action get fired
    4. We have to set the INITIAL STATE for the reducer for the purpose of first time

    Redux Store:
    1. Import configureStore from @reduxjs/toolkit
    2. Import the reducers from root-reducers
    2. declare the middlewares
    3. declare the store with reducers and middleware

    Redux thunk:
    1. It is a piece of middleware that allows us to fire function
    2. If we have redux saga, we will not need to use redux thunk anymore

    Redux Saga:
    1. Must Declare three actions for each (start, success, failure)
    2. Create a file with name.sagas.js
    3. Create one generator function to run the logic behind the scene and another one to connect the start action with this logic function
    4. Exports it out into the root.sagas.js file
    5. put the root-saga into the store.js file
    6. Yield is kind of like await keyword
    7. put is same as dispatch the function
    8. you must put yield keyword and it is easier for debugging

    Take:
    1. We don't need to pass the function into as the second argument
    2. Instead of, it is waiting for the action to happen first
    3. It will return the promise / action payload that is going to be resolved
    4. The rest of the code would not execute until the action is operated
    5. It will only fire once the rest of code, its concept is same like the basic javascript generator function which we could not go back to the top to re run the code
    6. You can use the while loop to loop through the take so that the rest of the code can be fired again and again.

    Take Every:
    1. We need to pass the fucntion into as the second argument
    2. It will fire the function everytime the action is operated (It is created the new generator / spawning new saga and called it again and again)
    3. Take every will not pause the execution of JavaScript to wait anything in the second function parameter to come back

    take latest:
    1. It will cancel all the previous one using yield and only execute the latest one

    using delay, you can block the code from executing
*/

/*


 */

import { configureStore } from "@reduxjs/toolkit";
import logger from 'redux-logger';

/*

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