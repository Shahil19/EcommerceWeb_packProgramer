import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { productDetailReducer, productsReducer } from "./reducers/productReducers"

const initialState = {

}

const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailReducer
}) // for all reducers to be in one variable

const middleWare = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleWare)))

export default store

// FOR redux in src folder
/**
 * Actions
 * Reducers
 * Constants
 */