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
import ClientListReducer from './ClientList';
import TransactionReducer from './Transaction';
import storeStockReducer from './StoreStock';
import accountTypeReducer from './accountType';
import sellStoreReducer from './st_sell';
import counterREducer from './counter';
import productsReducer from './products';
import clientStockreducer from './clientStock';



export default combineReducers({
// bugs:bugsReducer,
// projects:projReducer,
addingGting:addingGtingReducer,
addingGtingStore:addingGtingStoreReducer,
listNames:listNamesReducer,
users:usersReducer,
counter:counterREducer,
store_listNames:storeListNamesReducer,
storeMaualorderList:storeManualOrderListReducer,
storeManualOrderProducts:storeManualOrderprodReducer,
st_List_order:storeListOrderReducer,
clientStock:clientStockreducer,
accountType:accountTypeReducer,
st_sell:sellStoreReducer,
Transaction:TransactionReducer,
store_stock:storeStockReducer,
store_products:storeProductsReducer,
client_listNames:clientListNamesReducer,
client_products:clientProductsReducer,
client_list:ClientListReducer,
products:productsReducer,
})