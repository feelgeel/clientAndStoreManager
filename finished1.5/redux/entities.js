import { combineReducers } from "redux";
// import bugsReducer from "./bugs";
// import projReducer from './projects';
import listNamesReducer from './listNames';
import sellReducer from './st_sell';
import userReducer from './users';

export default combineReducers({
listNames:listNamesReducer,
sell:sellReducer,
user:userReducer
})