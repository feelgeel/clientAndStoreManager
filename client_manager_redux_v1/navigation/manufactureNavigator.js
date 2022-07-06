import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";
import listScreen from '../screens/listScreen';
import AddItemScreens from '../screens/AddItemScreens';
import ShowListsScreen from '../screens/showListsScreen';
import AddItemScreens1 from '../screens/AddItemScreens1';
import ListingEditScreen from '../screens/ListingEditScreen';
import storesScreen from '../screens/storesScreen';
import categFilter from '../screens/categFilter';
import mainCategFilter from '../screens/mainCategFilter';
import productScreen1 from '../screens/productScreen2';
import UpdateTwoStatesOnce from '../screens/updateTwoStatesOnce';
import prodPickerScreen from "../screens/prodPickerScreen";
import chosenProdScreen from '../screens/chosenProdScreen';
import codeBarScreen from "../screens/codeBarScreen";
import qrcode from "../screens/qrcodegenerator";
import Qrcodescanner from "../screens/qrcodescanner";
import ModeScreens from "../screens/ModeScreens";
import SelfServingScreen from "../screens/SelfServingScreen";
import BuyFromtheStoreScreen from "../screens/BuyFromtheStoreScreen";
import ScannerScreen from "../screens/ScannerScreen";
import ListTypeScreen from "../screens/ListTypeScreen";
import AddGtingsScreen from "../screens/AddGtingsScreen";
import AddGtingsScreen1 from "../screens/AddGtingsScreen.1";
import Sell from "../screens/TheSellfolder/Sell";
// import Sell from "../screens/Sell/Sell";
import Transaction from "../screens/TransactionFolder/Transaction";
import ClientTransaction from "../screens/TransactionFolder/ClientTransaction";
import orderProducts from "../screens/orderProducts";
import Manualordering from "../screens/manualOrderingfolder/Manualordering";
import ListOrderScreen from "../screens/ListorderFolder/ListOrderScreen";
// import ManualOrderingScreen from "../screens/manualOrderingfolder/ManualOrderingScreen";
import ListorderingScreen from "../screens/ListOrderingScreen";
import ManifactureModeScreen from "../screens/ManifactureModeScreens";
import ShowListNamesScreen from "../screens/showListNames/ShowListNamesScreen";
import ClientListScreen from "../screens/showListNames/ClientListScreen";
import ClientCashScreen from "../screens/cash/ClientCashScreen";
import StoreCashScreen from "../screens/cash/StoreCashScreen";


const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
     {/* <Stack.Screen name="showlists" component={productScreen1} />  */}
     {/* <Stack.Screen name="showlists" component={ShowListsScreen} />  */}
     {/* <Stack.Screen name="showlists" component={ListOrderScreen} />  */}
     <Stack.Screen name="showlists" component={ListorderingScreen} /> 
    <Stack.Screen name="addList" component={ListingEditScreen} />
    <Stack.Screen name="showlistitems" component={listScreen} />
    <Stack.Screen name="clientCash" component={ClientCashScreen} />
    {/* <Stack.Screen name="itemDetails" component={prodPickerScreen} /> */}
    {/* <Stack.Screen name="add" component={AddItemScreens} /> */}
    {/* <Stack.Screen name="add1" component={AddItemScreens1} /> */}
    {/* <Stack.Screen name="ListingDetails" component={ListingDetailsScreen} /> */}
    {/* <Stack.Screen name="stores" component={ListTypeScreen} /> */}
    {/* <Stack.Screen name="categFilter" component={categFilter} /> */}
    {/* <Stack.Screen name="mainCategfilter" component={mainCategFilter} /> */}
    {/* <Stack.Screen name="products" component={productScreen1} /> */}
    <Stack.Screen name="manifactureModeScreen" component={ManifactureModeScreen} />
    <Stack.Screen name="selfServing" component={SelfServingScreen} />
    <Stack.Screen name="byuFromStore" component={BuyFromtheStoreScreen} />
    <Stack.Screen name="sell" component={Sell} />
    <Stack.Screen name="manualOrdering" component={Manualordering} />
    <Stack.Screen name="listOrdering" component={ListorderingScreen} />
    <Stack.Screen name="transaction" component={Transaction} />
    <Stack.Screen name="orderProducts" component={orderProducts} />
    <Stack.Screen name="addgtings" component={AddGtingsScreen1} />
    <Stack.Screen name="codeBar" component={qrcode} />
    <Stack.Screen name="qrcodescanner" component={Qrcodescanner} />
    <Stack.Screen name="scannerScreen" component={ScannerScreen} />
    <Stack.Screen name="chosenProd" component={chosenProdScreen} />
    {/* <Stack.Screen name="products" component={UpdateTwoStatesOnce} /> */}
  </Stack.Navigator>
);

export default FeedNavigator;
