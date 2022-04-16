import { combineReducers } from "redux";
// import bugsReducer from "./bugs";
// import projReducer from './projects';
import usersReducer from './users';
import addingGtingReducer from './addingGting';
import addingGtingStoreReducer from './addingGtingStore';
import listNamesReducer from './listNames';
import storeListNamesReducer from './store_listNames';
import storeManualOrderListReducer from './storeMaualorderList';
import clientListNamesReducer from './client_listNames';
import storeProductsReducer from './store_products';
import storeManualOrderprodReducer from './storeManualOrderProducts';
import storeListOrderReducer from './StoreListOrder';
import clientProductsReducer from './client_products';
import storeStockReducer from './StoreStock';
import sellStoreReducer from './st_sell';
import productsReducer from './products';



export default combineReducers({
// bugs:bugsReducer,
// projects:projReducer,
addingGting:addingGtingReducer,
addingGtingStore:addingGtingStoreReducer,
listNames:listNamesReducer,
users:usersReducer,
store_listNames:storeListNamesReducer,
storeMaualorderList:storeManualOrderListReducer,
storeManualOrderProducts:storeManualOrderprodReducer,
st_List_order:storeListOrderReducer,
st_sell:sellStoreReducer,
store_stock:storeStockReducer,
store_products:storeProductsReducer,
client_listNames:clientListNamesReducer,
client_products:clientProductsReducer,
products:productsReducer,
})