import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {createStore, combineReducers} from "redux"
import {Provider} from "react-redux"

import {authorizationReducer} from "./9_Reducer_Auth"
import {productReducer} from "./9_Reducer_products"

import Axios from "axios"

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
const store = createStore(reducer)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
