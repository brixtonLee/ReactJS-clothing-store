/**
    Root Reducer:
    1. Root Reducer represents all reducer / consists of all small reducer
    2. 
 */
import { combineReducers } from '@reduxjs/toolkit';


/* Each reducer import */
import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';

/* Combine all the reducers into one variable */
const reducers = combineReducers({
    user: userReducer,
    cart: cartReducer
})

export default reducers;