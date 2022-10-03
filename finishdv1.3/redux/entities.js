import { combineReducers } from "redux";
import maualOrder from "./storeManualOrder";
import StoreStock from "./StoreStock";




export default combineReducers({
maualOrder:maualOrder,
StoreStock:StoreStock,

})