import { combineReducers } from "redux";
import bugsReducer from "./bugs";
import projReducer from './projects';
import usersReducer from './users';
import addingGtingReducer from './addingGting';
import listNamesReducer from './listNames';
import productsReducer from './products';



export default combineReducers({
bugs:bugsReducer,
projects:projReducer,
users:usersReducer,
addingGting:addingGtingReducer,
listNames:listNamesReducer,
products:productsReducer,
})