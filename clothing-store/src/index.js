import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

/*
    Redux:
    1. In order to use provider in redux
    2. You must import configureStore (in index.js) and combineReducers from @reduxjs/toolkit (the combineReducers is in the root-reducer.js)
    3. import logger from redux-logger (which is the middleware)
    4. import the const from the root-reducer.js
    5. write const store = configureStore({reducer: name imported from root-reducer.js})
    6. Wrap the App tag with Provider tag
    7. The number 6 is purposely for the whole program could access to the redux store
 */

/* Redux */
import { Provider } from 'react-redux';
/* Redux Store */
import store from './redux/store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <BrowserRouter>
        
          <App />
        
      </BrowserRouter>
      </Provider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
