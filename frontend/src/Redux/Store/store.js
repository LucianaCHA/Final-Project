import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
// import rootReducer from "../Reducers/reducers";
import rootReducer from '../Reducers/index'
// import { configureStore } from '@reduxjs/toolkit'


export const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);  