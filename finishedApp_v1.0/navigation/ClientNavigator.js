import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// import SelfServingScreen from "../screens/selfServing/SelfServingScreen";
// import ClientTransaction from "../screens/TransactionFolder/ClientTransaction";
// import ClientModeScreen from "../screens/ClientModeScreens";
// import ClientListScreen from "../screens/showListNames/ClientListScreen";
import ClientCashScreen from "../screens/cash/ClientCashScreen";


const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
     <Stack.Screen name="showlists" component={ClientCashScreen} /> 
    {/* <Stack.Screen name="clientCash" component={ClientCashScreen} />
    <Stack.Screen name="clientModeScreen" component={ClientModeScreen} />
    <Stack.Screen name="selfServing" component={SelfServingScreen} />
    <Stack.Screen name="transaction" component={ClientTransaction} /> */}
  </Stack.Navigator>
);

export default FeedNavigator;
