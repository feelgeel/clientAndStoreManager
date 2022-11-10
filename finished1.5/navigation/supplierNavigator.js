import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import listScreen from '../screens/listScreen';
import ListingEditScreen from '../screens/ListingEditScreen';
import chosenProdScreen from '../screens/chosenProdScreen';
import qrcode from "../screens/qrcodegenerator";
import Qrcodescanner from "../screens/qrcodescanner";
import ScannerScreen from "../screens/ScannerScreen";
import AddGtingsScreen1 from "../screens/AddGtingsScreen.1";
import Sell from "../screens/TheSellfolder/Sell";
import Transaction from "../screens/TransactionFolder/Transaction";
import orderProducts from "../screens/orderProducts";
import Manualordering from "../screens/manualOrderingfolder/Manualordering";
import AddSupplierWorker from "../screens/AddWorker/AddSupplierWorker";
import ListOrderScreen from "../screens/ListorderFolder/ListOrderScreen";
import SupplierModeScreens from "../screens/SupplierModeScreens";


const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
   <Stack.Screen name="AddSupplierWorker" component={AddSupplierWorker} /> 
    <Stack.Screen name="sell" component={Sell} />
     <Stack.Screen name="listOrdering" component={ListOrderScreen} /> 
     <Stack.Screen name="transaction" component={Transaction} /> 
    <Stack.Screen name="addList" component={ListingEditScreen} />
    <Stack.Screen name="showlistitems" component={listScreen} />
    <Stack.Screen name="SupplierModeScreens" component={SupplierModeScreens} />
    <Stack.Screen name="manualOrdering" component={Manualordering} />
    <Stack.Screen name="orderProducts" component={orderProducts} />
    <Stack.Screen name="addgtings" component={AddGtingsScreen1} />
    <Stack.Screen name="codeBar" component={qrcode} />
    <Stack.Screen name="qrcodescanner" component={Qrcodescanner} />
    <Stack.Screen name="scannerScreen" component={ScannerScreen} />
    <Stack.Screen name="chosenProd" component={chosenProdScreen} />
  </Stack.Navigator>
);

export default FeedNavigator;
