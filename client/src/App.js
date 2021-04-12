import logo from './logo.svg';
import './App.css';

import {Products, ProductDetails} from "./3_Products"
import {UpsertReview} from "./4_Reviews"
import {UserAccounts} from "./5_SuperUser"

import {MainRouter} from "./1_Router"



function App() {
  return (
    <MainRouter/>
  );
}

export default App;
 