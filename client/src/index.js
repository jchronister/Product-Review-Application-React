import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {createStore, combineReducers, applyMiddleware} from "redux"
import {Provider} from "react-redux"

import {authorizationReducer} from "./9_Reducer_Auth"
import {productReducer} from "./9_Reducer_products"

import Axios from "axios"
import thunk from "redux-thunk"

// Axios Config
export const axios = Axios.create({
  baseURL: "http://localhost:3001",
  headers: {post: {"Content-Type": "application/json"}}
  }
);


// Combine Reducers
const reducer = combineReducers({
  auth: authorizationReducer,
  products: productReducer
})

// Create Store
const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

