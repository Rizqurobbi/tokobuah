import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { productsReducer } from "./productReducer";
export const rootReducers = combineReducers({
    userReducer,
    productsReducer
})