import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Sell from "../screens/sellFolder/Sell";
// import Transaction from "../screens/TransactionFolder/Transaction";
// import orderProducts from "../screens/orderProducts";
import Manualordering from "../screens/manualOrderingfolder/Manualordering";
// import ListOrderScreen from "../screens/listOrder/ListOrderScreen";
// import StoreModeScreens from "../screens/StoreModeScreens";
// import AddStoreWorker from "../screens/AddWorker/AddStoreWorker";
import AddGrosseryForm from "../components/AddGrosseryForm";



const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="sell" component={Sell} />
    <Stack.Screen name="manualOrdering" component={Manualordering} />
     <Stack.Screen name="AddGrosseryForm" component={AddGrosseryForm} /> 
     {/* <Stack.Screen name="AddStoreWorker" component={AddStoreWorker} /> 
     <Stack.Screen name="listOrdering" component={ListOrderScreen} /> 
     <Stack.Screen name="transaction" component={Transaction} /> 
    <Stack.Screen name="storeModeScreens" component={StoreModeScreens} />
    <Stack.Screen name="orderProducts" component={orderProducts} />  */}
  </Stack.Navigator>
);

export default FeedNavigator;
