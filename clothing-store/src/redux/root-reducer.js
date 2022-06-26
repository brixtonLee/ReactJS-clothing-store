/**
    Root Reducer:
    1. Root Reducer represents all reducer / consists of all small reducer
    2. 
 */
import { combineReducers } from '@reduxjs/toolkit';

/*
    Redux persist 
    1. Redux persist is to store the data to the local storage or session storage
*/
import { persistReducer } from 'redux-persist';

// Using Local Storage
import storage from 'redux-persist/lib/storage';

// Using session storage
// import sessionStorage from 'redux-persist/es/storage/session';


/* Each reducer import */
import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

/* Redux persist */
const persistConfig ={
    key: 'root',
    storage,
    //The list of reducers that we want to persist / store to the local or session
    whitelist: ['cart']
}

/* Combine all the reducers into one variable */
const reducers = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer
})

//with Redux Persist
export default persistReducer(persistConfig,reducers);