import { combineReducers } from "redux";
// import bugsReducer from "./bugs";
// import projReducer from './projects';
import FormikPropsReducer from './FormikProps';
import listNamesReducer from './listNames';
import paymentReduxReducer from './paymentRedux';
import st_sellReducer from './st_sell';
import storeMaualorderListReducer from './storeMaualorderList';
import StoreStockReducer from './StoreStock';
import usersReducer from './users';
import store_listNamesReducer from './store_listNames';
import addingGtingReducer from './addingGting';


export default combineReducers({
formikProps:FormikPropsReducer,
listNames:listNamesReducer,
 paymentredux:paymentReduxReducer,
 addingGting:addingGtingReducer,
 users:usersReducer,
 store_listNames:store_listNamesReducer,
 st_sell:st_sellReducer,
 storeMaualorderList:storeMaualorderListReducer,
 StoreStock:StoreStockReducer,
})