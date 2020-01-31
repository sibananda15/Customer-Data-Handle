import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from "redux"
import { Provider } from "react-redux"
import { reducer } from "./reducers/reducer"



if (localStorage.getItem('data') == null)
    localStorage.setItem('data', JSON.stringify([]))
let initialState = {
    currentIndex: -1,
    list: JSON.parse(localStorage.getItem('data'))
}
var store = createStore(reducer, initialState)
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));


//1- After that create action 

