import { combineReducers } from "redux";
import bugsReducer from "./bugs";
import projReducer from './projects';
import usersReducer from './users';
import addingGtingReducer from './addingGting';
import addingGtingStoreReducer from './addingGtingStore';
import listNamesReducer from './listNames';
import storeListNamesReducer from './store_listNames';
import clientListNamesReducer from './client_listNames';
import storeProductsReducer from './store_products';
// import storeProductsReducer from './client_products';
import sellStoreReducer from './Sell_store';
import productsReducer from './products';



export default combineReducers({
bugs:bugsReducer,
projects:projReducer,
users:usersReducer,
addingGting:addingGtingReducer,
addingGtingStore:addingGtingStoreReducer,
listNames:listNamesReducer,
store_listNames:storeListNamesReducer,
client_listNames:clientListNamesReducer,
store_products:storeProductsReducer,
products:productsReducer,
sell_stores:sellStoreReducer,
})