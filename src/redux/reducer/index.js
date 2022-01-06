import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { productsReducer } from "./productReducer";
import { articleReducer } from "./articleReducer";
export const rootReducers = combineReducers({
    userReducer,
    productsReducer,
    articleReducer,

})