import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// import listScreen from '../screens/listScreen';
// import Qrcodescanner from "../screens/qrcodescanner";
// import SelfServingScreen from "../screens/SelfServingScreen";
// import Transaction from "../screens/TransactionFolder/Transaction";
// import orderProducts from "../screens/orderProducts";
// import Manualordering from "../screens/manualOrderingfolder/Manualordering";


const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
     {/* <Stack.Screen name="showlists" component={ListorderingScreen} />  */}
    {/* <Stack.Screen name="addList" component={ListingEditScreen} /> */}
    {/* <Stack.Screen name="showlistitems" component={listScreen} />
    <Stack.Screen name="clientCash" component={ClientCashScreen} /> */}
    {/* <Stack.Screen name="itemDetails" component={prodPickerScreen} /> */}
    {/* <Stack.Screen name="add" component={AddItemScreens} /> */}
    {/* <Stack.Screen name="add1" component={AddItemScreens1} /> */}
    {/* <Stack.Screen name="ListingDetails" component={ListingDetailsScreen} /> */}
    {/* <Stack.Screen name="stores" component={ListTypeScreen} /> */}
    {/* <Stack.Screen name="categFilter" component={categFilter} /> */}
    {/* <Stack.Screen name="mainCategfilter" component={mainCategFilter} /> */}
    {/* <Stack.Screen name="products" component={productScreen1} /> */}
    {/* <Stack.Screen name="manifactureModeScreen" component={ManifactureModeScreen} />
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
    <Stack.Screen name="chosenProd" component={chosenProdScreen} /> */}
    {/* <Stack.Screen name="products" component={UpdateTwoStatesOnce} /> */}
  </Stack.Navigator>
);

export default FeedNavigator;
